  
  const baseUrl = "http://localhost:8000";
  const getImageUrl = (imageUrl?: string) => {
    if (!imageUrl) return '';
    if (imageUrl.startsWith('http')) return imageUrl;
    return imageUrl.startsWith('/') ? `${baseUrl}${imageUrl}` : `${baseUrl}/${imageUrl}`;
  };

  export default getImageUrl;