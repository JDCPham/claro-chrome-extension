getQuery(location.href);



function getPrice(query) {
    // Check Query Is Not Null.
    if (query == null) return;

    // Get Price Element.
    let element = document.querySelector(query);
    let price = element.innerHTML;
    console.log(element)

    // Parse Price
    price = parseFloat(price.replace("£", ""));

    return price

    
}


function getQuery(href) {

    url = new URL(href);
    hostPath = url['hostname'] + url['pathname'];

    httpGetAsync(`https://jy9hknmhw8.execute-api.eu-west-1.amazonaws.com/prod/price-element?hostPath=${hostPath}`, (data) => {

        data = JSON.parse(data);
        var price = getPrice(data['query']);
        calculateWorkHours(price, (x, y) => generateElement(x, y))
    });

}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () => { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); 
    xmlHttp.send(null);
}

function calculateWorkHours(price, callbackFn = (x, y) => {}) {
    chrome.storage.sync.get(['salary', 'hours'], data => {
        let workHours = currency(price).divide(data['salary']['hourly']['net']).value
        callbackFn(price, workHours);
    });
}


function generateElement(price, workHours) {


    var banner = document.createElement("div");
    banner.style.display = "flex";
    banner.style.justifyContent = "space-between";
    banner.style.alignItems = "center";
    banner.style.width = "100%";
    banner.style.padding = "15px";
    banner.style.backgroundColor = "#9DCEA3";
    banner.style.color = "#CC2C4F";

    var refreshButton = document.createElement("button");
    refreshButton.classList.add('btn');
    refreshButton.classList.add('btn-primary');
    refreshButton.innerText = "Refresh";

    var workHoursText = document.createElement("div");
    workHoursText.innerHTML = `Price: £${price} // Work Hours: ${workHours}`;

    banner.appendChild(workHoursText);
    banner.appendChild(refreshButton)
    console.log(banner)

    // Get Body.
    document.body.insertBefore(banner, document.body.childNodes[0]);

}
