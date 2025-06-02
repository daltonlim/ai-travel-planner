// Function to format the itinerary response from markdown to HTML
export const formatItinerary = (text) => {
  if (!text) return '';
  
  // Convert markdown-style formatting to HTML with improved patterns
  let formatted = text
    // Headers (more specific patterns)
    .replace(/### (.*?)(?=\n|$)/g, '<h3 class="section-header">$1</h3>')
    .replace(/#### (.*?)(?=\n|$)/g, '<h4 class="day-header">$1</h4>')
    .replace(/##### (.*?)(?=\n|$)/g, '<h5 class="sub-header">$1</h5>')
    .replace(/## (.*?)(?=\n|$)/g, '<h2 class="main-header">$1</h2>')
    
    // Bold text (avoid conflicts with other patterns)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    
    // Italic text (be more specific to avoid conflicts)
    .replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, '<em>$1</em>')
    
    // Horizontal rules
    .replace(/^---+$/gm, '<hr class="divider">')
    
    // Lists - improved pattern
    .replace(/^[-*+] (.*?)$/gm, '<li class="list-item">$1</li>')
    
    // Numbered lists
    .replace(/^\d+\. (.*?)$/gm, '<li class="numbered-item">$1</li>')
    
    // Price highlights - more comprehensive pattern
    .replace(/(IDR\s?[\d,]+|USD?\s?\$?[\d,]+|\$[\d,]+|€[\d,]+|£[\d,]+)/g, '<span class="price">$1</span>')
    
    // Time highlights - improved pattern
    .replace(/(\d{1,2}:\d{2}\s?(?:AM|PM|am|pm)|\d{1,2}\s?(?:AM|PM|am|pm))/g, '<span class="time">$1</span>')
    
    // Duration highlights
    .replace(/(\d+\s?(?:hours?|hrs?|minutes?|mins?|days?))/gi, '<span class="duration">$1</span>')
    
    // Address/Location highlights - be more specific
    .replace(/\*([^*\n]+(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Plaza|Square|Center|Centre)[^*\n]*)\*/gi, '<span class="location">$1</span>')
    
    // Important notes in brackets
    .replace(/\[(Important|Note|Warning|Tip):\s*([^\]]+)\]/gi, '<div class="info-box info-$1"><strong>$1:</strong> $2</div>')
    
    // Email addresses
    .replace(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, '<a href="mailto:$1" class="contact-link">$1</a>')
    
    // Phone numbers (basic pattern)
    .replace(/(\+?\d{1,3}[\s-]?\(?\d{1,4}\)?[\s-]?\d{1,4}[\s-]?\d{1,9})/g, '<span class="phone">$1</span>')
    
    // Websites/URLs
    .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="external-link">$1</a>')
    
    // Convert line breaks to proper HTML structure
    .replace(/\n\n+/g, '</div><div class="content-block">')
    .replace(/\n/g, '<br>');
  
  // Wrap in content blocks
  formatted = '<div class="content-block">' + formatted + '</div>';
  
  // Group list items properly
  formatted = formatted
    .replace(/(<li class="list-item">.*?<\/li>)/gs, (match) => {
      // Check if this list item is already inside a list
      return match;
    });
  
  // Create proper unordered lists
  formatted = formatted.replace(
    /(<li class="list-item">.*?<\/li>)(?=(?:(?!<li class="list-item">).)*?(?:<li class="list-item">|$))/gs,
    (match) => {
      // Group consecutive list items
      const items = match.match(/<li class="list-item">.*?<\/li>/g);
      if (items && items.length > 0) {
        return '<ul class="custom-list">' + items.join('') + '</ul>';
      }
      return match;
    }
  );
  
  // Create proper ordered lists
  formatted = formatted.replace(
    /(<li class="numbered-item">.*?<\/li>)(?=(?:(?!<li class="numbered-item">).)*?(?:<li class="numbered-item">|$))/gs,
    (match) => {
      const items = match.match(/<li class="numbered-item">.*?<\/li>/g);
      if (items && items.length > 0) {
        return '<ol class="numbered-list">' + items.join('') + '</ol>';
      }
      return match;
    }
  );
  
  // Clean up any remaining standalone list items
  formatted = formatted.replace(
    /(?<!<[uo]l[^>]*>)\s*<li class="list-item">/g,
    '<ul class="custom-list"><li class="list-item">'
  );
  
  formatted = formatted.replace(
    /<\/li>\s*(?!<\/[uo]l>)(?!<li)/g,
    '</li></ul>'
  );
  
  // Clean up empty content blocks
  formatted = formatted.replace(/<div class="content-block">\s*<\/div>/g, '');
  
  // Fix multiple consecutive breaks
  formatted = formatted.replace(/(<br>\s*){3,}/g, '<br><br>');
  
  return formatted;
}; 