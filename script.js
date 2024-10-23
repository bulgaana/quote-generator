const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
} 

// Hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}


// Show new quote
function newQuote() {
    loading();
    // Pick a rendom quote
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //Check if author field is blank and replace it with
    if (!quote,author) {
        authorText.textContent = 'Unknow';
    } else {
        authorText.textContent = quote.author;
    }
    // Cheqck quote lenght to determine styling
    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
//set quote, hide loader
    quoteText.textContent = quote.text;
    complete();
}


// Get quotes from api
async function getQuotes() {
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch error here
    }
}

// Tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// event listener
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


// On Load
getQuotes();
