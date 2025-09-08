import { useRef, useState } from "react";
import chatBtn from '../../../assets/chat.gif';

export default function ChatBot () {
    const chatWindow = useRef<any>('');
    const chatWindoyBody= useRef<any>('');
    const useInput = useRef('');

    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div ref={chatWindow} className="fixed bottom-5 right-5">
                {isOpen ? 
                    <div ref={chatWindoyBody} className="w-120 h-96 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col overflow-hidden">
                        <div className="bg-emerald-500 text-white p-4">
                            <h2 className="text-lg font-semibold">Chat Bot</h2>
                            <div className="absolute top-2 right-2">
                                <i className="fa fa-times cursor-pointer float-right relative top-[12px] mr-2" onClick={() => setIsOpen(!isOpen)}></i>
                            </div>
                        </div>
                        <div className="flex-grow p-4 overflow-y-auto">
                            <div className="mb-4">
                                <div className="w-80 bg-gray-200 text-gray-800 p-2 rounded-lg mb-2">
                                    Hello! How can I assist you today?
                                </div>
                                <div className="w-80 bg-emerald-500 text-white p-2 rounded-lg self-end ml-auto text-center">
                                    I have a question about my order.
                                </div>
                            </div>
                        </div>
                        <div className="p-4 border-t border-gray-300 flex gap-1">
                            <input
                                ref={useInput}
                                type="text"
                                className="w-full border border-gray-300 rounded-lg p-2 text-gray-800"
                                placeholder="Type your message..."
                            />
                            <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                                Send
                            </button>
                        </div>
                    </div> : 
                    <div className="mt-2 flex justify-end">
                        <button className="text-white px-4 py-2 rounded-lg" onClick={() => setIsOpen(!isOpen)}>
                            <img
                                src={chatBtn}
                                alt="Chat with Mickey"
                                className="h-16 w-16 rounded-full shadow-lg animate-bounce bg-emerald-500"
                            />
                        </button>
                    </div>
                }
            </div>
        </>
    );
}