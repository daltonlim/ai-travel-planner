// Function to format the itinerary response from markdown to HTML
export const formatItinerary = (text) => {
  if (!text) return '';
  
  // Convert markdown-style formatting to HTML
  let formatted = text
    // Headers
    .replace(/### (.*?)(?=\n|$)/g, '<h3 class="section-header">$1</h3>')
    .replace(/#### (.*?)(?=\n|$)/g, '<h4 class="day-header">$1</h4>')
    .replace(/## (.*?)(?=\n|$)/g, '<h2 class="main-header">$1</h2>')
    
    // Bold text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    
    // Italic text
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    
    // Horizontal rules
    .replace(/---/g, '<hr class="divider">')
    
    // Lists
    .replace(/^- (.*?)$/gm, '<li class="list-item">$1</li>')
    
    // Price highlights
    .replace(/(IDR [0-9,]+|[$][0-9,]+)/g, '<span class="price">$1</span>')
    
    // Time highlights
    .replace(/(\d{1,2}:\d{2}\s?(AM|PM)|\d{1,2}\s?(AM|PM))/gi, '<span class="time">$1</span>')
    
    // Location highlights
    .replace(/\*(.*?)\*/g, '<span class="location">$1</span>')
    
    // Convert line breaks
    .replace(/\n\n/g, '</div><div class="content-block">')
    .replace(/\n/g, '<br>');
  
  // Wrap in content blocks
  formatted = '<div class="content-block">' + formatted + '</div>';
  
  // Group list items
  formatted = formatted.replace(/(<li class="list-item">.*?<\/li>)/gs, '<ul class="custom-list">$1</ul>');
  
  return formatted;
}; 