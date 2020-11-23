chrome.tabs.query({
    active: true,
    currentWindow: true
}, processTabURL)


chrome.storage.sync.get(['salary', 'hours'], ({salary, hours}) => {

    // Set Text in Popup.
    grossAnnualSalaryText.innerText = currency(salary['annual']['gross']).format({symbol:''});
    netAnnualSalaryText.innerText = currency(salary['annual']['net']).format({symbol:''});
    grossDailySalaryText.innerText = currency(salary['daily']['gross']).format({symbol:''});
    netDailySalaryText.innerText = currency(salary['daily']['net']).format({symbol:''});
    dailyHoursWorkedText.innerText = hours['daily'];
    netHourlySalaryText.innerText = currency(salary['hourly']['net']).format({symbol:''});
})

function processTabURL([{ url, id }]) {

    // Get Price Selector
    let priceQuerySelector = "span#sc-subtotal-amount-buybox > span.a-size-medium.a-color-base.sc-price.sc-white-space-nowrap";

    chrome.runtime.sendMessage({
        purpose: "PRICE_REQUEST",
        query: priceQuerySelector
    }, () => {});
}

