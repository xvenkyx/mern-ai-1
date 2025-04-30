exports.preprocessAndChunk = (text) => {
    const cleaned = text
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/[^\w\s.]/gi, '')
      .toLowerCase();
  
    const words = cleaned.split(' ');
    const chunks = [];
    const chunkSize = 300;
  
    for (let i = 0; i < words.length; i += chunkSize) {
      const chunk = words.slice(i, i + chunkSize).join(' ');
      chunks.push(chunk);
    }
  
    return chunks;
  };
  