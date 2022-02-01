const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

//show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}
//SHow new quotes
function newQuotes() {
    loading();
    //pick a random quotes from api Quotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    //check if author field is blan and replcae with 'Unknown'

    if(!quote.author){
        authorText.textContent = 'Unknown';
    }

    else {
        authorText.textContent = quote.author;
    }

    //check quote length to determine style

    if(quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } 
    else {
        quoteText.classList.remove('long-quote');
    }
    //Set quote, hide loader
    quoteText.textContent = quote.text;
    complete();
}
// Get Quotes from API
async function getQuotes() {
    loading();
    const apiURL= 'https://type.fit/api/quotes'
    try {
        const responce = await fetch(apiURL);
        apiQuotes = await responce.json();
        newQuotes();
    } catch (error) {
        //Catch Error Here
    }
        
    }

    //Tweet Quote
    function tweetQuote() {
        const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
        window.open(twitterURL, '_blank');

    }

    //event listeners
    newQuoteBtn.addEventListener('click', newQuotes);
    twitterBtn.addEventListener('click', tweetQuote);

    //On load 
    getQuotes();
