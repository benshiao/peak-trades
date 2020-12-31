# Ben's First React Project

App using React hooks, D3 graphs API, and Alpha Vantage stock data API. 

Built to visualize stock data and simple paper trading algorithms.

# Ben's Progress:
Learn React JS 
https://www.youtube.com/watch?v=sBws8MSXN7A
## Day 1: half
npm - have
npx - to use react w/o download, idk
vscode - dont have
## Day 2: 
Find tutorial on React Hooks/TSX website
## Day 3: 
https://www.youtube.com/watch?v=XuFDcZABiDQ
## Day 3.2: 
video 3: https://www.youtube.com/watch?v=KyWaXA_NvT0
backend tutorial… I dont need right
imagine trading view, refresh to reset
## Day 4: 
set up environment and base website
## Day 5: base UI: 
some CSS/bootstrap
## Day 6:
Nav Bar format plus search API (done through addTransaction function)
test regular API call for data
## Day 7:
HOW→ user types in search bar, on pressing ENTER, api call made
display drop down of (TICKER) company name
user can click → creates new container below search results
## Day 8:
make a D3 graph(put it in graph section, need to figure out get graph section == true)
## Day 9:
make a d3 bar graph(edit react code to have candlestick api)
source code: https://codesandbox.io/s/react-d3-candlestick-chart-forked-1rl7v?file=/src/App.js
## Day 10:
figure out how to manipulate input data for candlestick chart
make search → call API → fix data → input for proper graphs
## Day 11:
move working graph to GraphSection.js
deal with reversed data/stock splits
do below custom settings(make function graphSymbol() take more parameters… chosen in the html part of searchItem.js or on GraphSection.js buttons
add some 1D, 1W,... buttons
## day :
add X axis, move the dollar display?
add date under dollar display, calculated by mouse x coordinate
## day :
* 10 minute candles = day = <100 candles
* 1 hr candles = week(5 days) = <100 candles
* 1 day candles = month(4 weeks/20 days) = ~25 candles
* 1 day candles = 3 months = ~75 candles
* 1 week candles = 1 year ~52 candles
* PAPER TRADER: 1 day candles, over ALL

* ROBINHOOD:
 * DAY- 96, 10 min candles
 * WEEK- 25, 1 hr candles
 * MONTH- 20, 1 day candles(4 weeks)
 * 3 MONTH - 60, 1 day candles(12 weeks)
 * YEAR - 52, 1 week candles


### Future goals:
RSI graph + paper trade calculation
hard coded case?
don't display indicator, just link them to TV or smth
future: record profitable trades etc
FRONTEND
search results 
container boxes, symbol and name, whole square clickable
D3 graphs prettier/centered
background/text colors
project title/tab icon/name
price data on mouse should flip to left side if on right edge of graph
menu bar: home(refresh), about, disclaimer, 
or just make the default home page(nothing searched) to have my about and disclaimer(instead of SPY call)
add cryptos, just have my own search/button array of coins to USD
custom paper trading formula/calculations
