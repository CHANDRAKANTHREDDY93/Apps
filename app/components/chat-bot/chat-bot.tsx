import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import EmojiPicker from 'emoji-picker-react';
import chatBtn from '../../../assets/chat.gif';
import Card from "../card/card";
import { useSelector } from "react-redux";

const apiBase = import.meta.env.VITE_API_BASE_URL;

export default function ChatBot() {
    const chatWindow = useRef<any>('');
    const chatWindoyBody = useRef<any>('');
    const [userInput, setUserInput] = useState("");
    const [showPicker, setShowPicker] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const cartSelector = useSelector(item => item.cartReducer)?.carts;

    // Clear input on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (chatWindow.current && !chatWindow.current.contains(event.target as Node)) {
                setIsOpen(false);
                setShowPicker(false);
                setMessages([]);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const debounce = ((func: any, delay: number) => {
        let timer: any;
        return (...args: any) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay)
        }
    });

    const handleChat = async () => {
        setIsLoading(true);
        await fetch(`${apiBase}/api/chat`, {
            credentials: 'include',
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userInput })
        }).then(async (response) => {
            const data = await response.json();
            if (response.status === 200) {
                setIsLoading(false);
                if (data.length) {
                    setMessages(messages => {
                        const nextId = messages.length + 1;
                        const updated = [...messages, { id: nextId, sender: 'user', text: userInput }, { id: nextId + 1, sender: 'bot', data: data }];
                        return updated;
                    });
                }
            }
            setUserInput('');
            setShowPicker(false);
        }).catch(error => {
            setIsLoading(false);
            console.error(error);
        })
    }

    //Memoize debounce so it's not recreated again
    const debouncedSearch = useMemo(
        () => debounce(handleChat, 500),
        [handleChat]
    )

    const handleChange = useCallback(() => {
        debouncedSearch(userInput);
    }, [debouncedSearch]);

    const handleEmojiClick = (emojiData: any) => {
        const emoji = emojiData.emoji;
        setUserInput((prev) => prev + emoji);
        inputRef.current?.focus();
        setShowPicker(false);
    };


    return (
        <>
            <div ref={chatWindow} className="fixed bottom-5 right-5">
                {isOpen ?
                    <div
                        ref={chatWindoyBody}
                        className="w-full sm:w-[30rem] h-[24rem] bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col overflow-hidden" >
                        <div className="bg-emerald-500 text-white p-4">
                            <h2 className="text-lg font-semibold">Search by Product Name</h2>
                            <div className="absolute top-2 right-2">
                                <i className="fa fa-times cursor-pointer float-right relative top-[12px] mr-2" onClick={() => setIsOpen(!isOpen)}></i>
                            </div>
                        </div>
                        <div className="flex-grow p-4 overflow-y-auto">
                            <div className="mb-4">
                                <div className="bg-gray-200 text-gray-800 p-2 rounded-lg mb-1 text-left">
                                    Please Enter Product Name
                                </div>
                                {isLoading && (
                                    <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg max-w-xs animate-pulse">
                                        Typing...
                                    </div>
                                )}
                                {!isLoading && messages.map((item, index) => {
                                    return (
                                        item.sender === 'user' ?
                                            <div className="w-80 bg-emerald-500 text-white p-2 rounded-lg self-end ml-auto text-left" key={index}>
                                                {item.text}
                                            </div> :
                                            <div className="my-2" key={index}>
                                                <div className="max-w-full sm:max-w-[20rem] bg-gray-200 text-gray-800 p-2 rounded-lg mb-1 text-left">
                                                    {
                                                        item.data.some(obj => '_id' in obj) ?
                                                            <Card paginatedProducts={item.data} cartSelector={cartSelector} isChat={true} /> :
                                                            <>{item.data?.[0]?.response}</>
                                                    }
                                                </div>
                                            </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="p-4 border-t border-gray-300 flex flex-col sm:flex-row gap-2">
                            <input
                                ref={inputRef}
                                value={userInput}
                                type="text"
                                className="w-full border border-gray-300 rounded-lg p-2 text-gray-800"
                                placeholder="Type your message..."
                                onChange={(event) => setUserInput(event.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleChat()}
                            />
                            <button
                                onClick={() => setShowPicker((prev) => !prev)}
                                className="text-xl"
                            >
                                😊
                            </button>

                            <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full sm:w-auto" onClick={handleChange}>
                                Send
                            </button>
                        </div>
                        {showPicker && (
                            <div className="absolute bottom-12 right-0 z-10">
                                <EmojiPicker onEmojiClick={handleEmojiClick} />
                            </div>
                        )}

                    </div> :
                    <div className="mt-2 flex justify-end">
                        <button className="text-white px-4 py-2 rounded-lg" onClick={() => { setIsOpen(!isOpen), setMessages([]) }}>
                            <img
                                src={chatBtn}
                                alt="Chat with Mickey"
                                className="h-16 w-16 rounded-full shadow-lg animate-bounce bg-emerald-500"
                            />
                        </button>
                    </div>
                }
            </div >
        </>
    );
}