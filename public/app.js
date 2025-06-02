console.log('Script loaded successfully');

const form = document.getElementById('travelForm');
const loading = document.getElementById('loading');
const result = document.getElementById('result');
const resultContent = document.getElementById('resultContent');
const submitBtn = document.getElementById('submitBtn');

console.log('Elements found:', {
    form: !!form,
    loading: !!loading,
    result: !!result,
    resultContent: !!resultContent,
    submitBtn: !!submitBtn
});

// Function to format the itinerary response
function formatItinerary(text) {
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
}

if (!form) {
    console.error('Form element not found!');
} else {
    console.log('Adding event listener to form');
    
    form.addEventListener('submit', async (e) => {
        console.log('Form submit event triggered');
        e.preventDefault();
        console.log('Default prevented');
        
        // Get form data
        const formData = new FormData(form);
        const data = {
            destination: formData.get('destination'),
            duration: formData.get('duration'),
            budget: formData.get('budget'),
            interests: formData.get('interests'),
            travelDates: formData.get('travelDates'),
            groupSize: formData.get('groupSize'),
            accommodationType: formData.get('accommodationType')
        };
        
        console.log('Form data:', data);
        
        // Validation check
        if (!data.destination || !data.duration) {
            alert('Please fill in the required fields: Destination and Duration');
            return;
        }
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Generating...';
        loading.style.display = 'block';
        result.style.display = 'none';
        
        console.log('Starting API request...');
        
        try {
            const response = await fetch('/api/plan-trip', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            console.log('Response received:', response.status);
            
            const responseData = await response.json();
            console.log('Response data:', responseData);
            
            if (!response.ok) {
                throw new Error(responseData.error || 'Failed to generate itinerary');
            }
            
            // Format and show result
            const formattedItinerary = formatItinerary(responseData.itinerary);
            resultContent.innerHTML = formattedItinerary;
            result.className = 'result';
            result.style.display = 'block';
            
            // Scroll to result
            result.scrollIntoView({ behavior: 'smooth' });
            
        } catch (error) {
            console.error('Error:', error);
            resultContent.innerHTML = `<div class="error-message">❌ Error: ${error.message}</div>`;
            result.className = 'result error';
            result.style.display = 'block';
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.textContent = '✈️ Generate My Itinerary';
            loading.style.display = 'none';
            console.log('Request completed');
        }
    });
    
    console.log('Event listener added successfully');
}

// Additional debugging - check if the form submission is working
window.addEventListener('load', () => {
    console.log('Page fully loaded');
}); 