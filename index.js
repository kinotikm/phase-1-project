const tickerList = document.getElementById('tickerList');

function searchSymbol() {
    const searchInput = document.getElementById("searchInput").value;

    console.log("Search for symbol: ", searchInput);
}

// Function to fetch ticker data from Binance API
async function fetchTickerData() {
    try {
        const response = await fetch('https://api4.binance.com/api/v3/ticker/24hr');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to fetch data from Binance API. Please try again later.');
    }
}


// Function to display ticker data
function displayTickerData(tickerData) {
    tickerList.innerHTML = '';

    tickerData.forEach(ticker => {
        const li = document.createElement('li');
        li.textContent = `${ticker.symbol}: ${ticker.lastPrice}`;
        tickerList.appendChild(li);
    });
}

function filterTickerData(searchTerm, tickerData) {
    return tickerData.filter(ticker => ticker.symbol.toLowerCase().includes(searchTerm.toLowerCase()));
}

// Function to handle search input
function handleSearchInput() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== '') {
        const filteredData = filterTickerData(searchTerm, tickerData);
        displayTickerData(filteredData);
    } else {
        displayTickerData(tickerData);
    }
}

// Event listener for search input
searchInput.addEventListener('input', handleSearchInput);

// Fetch ticker data and display it initially
let tickerData;
fetchTickerData()
    .then(data => {
        tickerData = data;
        displayTickerData(tickerData);
    });

