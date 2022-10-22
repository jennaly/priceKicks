# PriceKicks 
**Link to project:** http://pricekicks.jennaly.net

**Tech used:** Node, Express, Axios, MongoDB, EJS, Mongoose, Passport, Tailwind, DaisyUI

An application that allows sneakers secondary market sellers to quickly conduct market research on current prices of products across the two biggest sneakers reselling E-Commerce platforms - StockX and Goat. 

With a quick enter of the product SKU (a unique identification value that comes with all sneakers), the user is able to retrieve a product's lowest "ask" prices - the listing prices by other resellers - for all sizes that the product comes in from StockX and Goat. This data is taken live at the moment of the search, giving the closest reflection of the live relling market at the convenience of a single search. 

![image](https://user-images.githubusercontent.com/106183040/197365026-80f96302-e8e5-4202-850c-67731e01b5e0.png)

In addition to the product's lowest ask prices, the end user will also receive a report of what their payout will look like, having taken into account their seller profile on StockX and Goat. These variables are critical in determining what a seller actually receives after accounting for shipping, taxes, and seller fees - which can vary between 8% to 10% and 9.5% to 25% for StockX and Goat, respectively. Ultimately, this feature provides the user a personalized summary of what their individual compensation would start at given that they list a product at its current competitive listing price.

![image](https://user-images.githubusercontent.com/106183040/197365016-69abeb8e-4417-416f-9362-5a4281354c03.png)

The user is able to save a product to their favorites list, which allows them to quickly reference products from their dashboard without having to re-enter the product SKU. 

![image](https://user-images.githubusercontent.com/106183040/197365049-339827eb-8c63-4f29-a1cf-8dd9b107ab54.png)

PriceKicks compares prices from leading sneaker websites and calculates the reseller's payout based on the fee structure of each marketplace and their unique seller profile to get them the best deal.

## Optimizations

1. Solution for edge cases 
- display a message in the case that a product cannot be found in the StockX/Goat database and give them the option to be redirected back to the index page

2. Add a progress indicator
- add a loading bar component to let users know that the data is currently getting fetched when data is not getting instantly returned.

## Skills Learned:
- Navigating different tabs in the browser's Developer Tools to see the contents of what is getting sent across the browser, the website's client, and their server.
- Finding a website's API by looking the Network tab to see requests that the website makes when user input is being submitted.
- Recreating those requests to simulate API calls to the server and getting relevant data back.
- Tranforming JSON data retrieved from their server and integrating it to PriceKicks, streaming the data to the client in a presentable form.
- Deploying the application manually to a cloud server.


