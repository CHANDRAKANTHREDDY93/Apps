function resolveImage(product: any, images) {
  const categories = [product.category?.toLowerCase(), 'fruits', 'vegetables', 'beauty_hygiene'];
  for (const cat of categories) {
    const path = `../../../assets/${cat}/${product.image}.jpg`;
    if (images[path]?.default) return images[path].default;
  }
  
  return null;
}

export default resolveImage;
