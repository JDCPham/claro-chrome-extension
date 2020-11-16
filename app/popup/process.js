function processTabURL([{ url: fullUrl, id: id }] = null) {

    try {

        // Parse URL.
        const url = new URL(fullUrl);

        // Pass Host Path URL to Load Popup Function.
        loadPopup(url, id);

    } catch (error) {

        // Pass null to Load Popup Function.
        loadPopup(null, null);

    }

}


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
