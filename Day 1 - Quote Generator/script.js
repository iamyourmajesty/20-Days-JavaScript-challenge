const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


// we fill fetch the quotes from api
let apiQuotes=[];

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
    
}

// hide loading
function completer()
{
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//show new quote
function newQuote() {
    loading();
    // pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    // console.log(quote);

    // set author text
    //check quote.author
    if(!quote.author)
    {
        authorText.textContent = "Unknown";
        
    }
    else
    {
        authorText.textContent = quote.author;
    }

    // if quote.text is too long
    if(quote.text.length > 100)
    {
        quoteText.classList.add('long-quote')
    }
    else{
        quoteText.classList.remove('long-quote');
    }
    
    //set quote
    quoteText.textContent = quote.text;
    completer();

}


async function getQuotes() {
    loading();

    const url = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(url);
        apiQuotes = await response.json();// fetch don't provies json

        // console.log(apiQuotes);
        newQuote(); // call new quote

    }catch(error){
        console.log(error);
    }
}

// tweet quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    //open twitter window
    window.open(twitterUrl,'_blank');
}

// add event listener to  button to call tweetQuote
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);



getQuotes();