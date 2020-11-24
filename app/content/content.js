var tries = 0;

console.log("Claro Content Script is Running.")
getQuery(location.href);

function getPrice(query) {
    // Check Query Is Not Null.
    if (query == null) return;

    try {
        // Get Price Element.
        let element = document.querySelector(query);
        let price = element.innerHTML;
        return parseFloat(price.replace("£", ""));
    } catch (e) {
        tryAgain();
    }

    return null;

}

function tryAgain() {
    if (tries < 10) {
        setTimeout(() => { getQuery(location.href)}, 3000)
        tries++;
    }
}


function getQuery(href) {
    console.log("hi")

    url = new URL(href);
    hostPath = url['hostname'] + url['pathname'];

    httpGetAsync(`https://jy9hknmhw8.execute-api.eu-west-1.amazonaws.com/prod/price-element?hostPath=${hostPath}`, (data) => {

        data = JSON.parse(data);
        var price = getPrice(data['query']);
        if (price == null) return;
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
    banner.id = "claro-money-banner";
    banner.style.display = "flex";
    banner.style.justifyContent = "space-between";
    banner.style.alignItems = "center";
    banner.style.width = "100%";
    banner.style.padding = "15px";
    banner.style.backgroundColor = "#CC2C4F";
    banner.style.color = "#9DCEA3";

    var claroLogo = document.createElement("p");
    claroLogo.style.fontSize = "24px";
    claroLogo.style.margin = "0";
    claroLogo.style.fontFamily = "Gilroy";
    claroLogo.innerText = ".Claro"

    var refreshButton = document.createElement("button");
    refreshButton.style.backgroundColor = "#9DCEA3";
    refreshButton.style.color = "#CC2C4F";
    refreshButton.style.borderRadius = "30px";
    refreshButton.style.fontFamily = "Gilroy";
    refreshButton.style.paddingLeft = "20px";
    refreshButton.style.paddingRight = "20px";
    refreshButton.classList.add('btn');
    refreshButton.innerText = "Refresh";
    refreshButton.addEventListener('click', () => {
        removeExistingBanner();
        getQuery(location.href)
    })

    var workHoursText = document.createElement("div");
    workHoursText.style.fontFamily = "Gilroy";
    workHoursText.style.textAlign = "center";
    workHoursText.style.paddingLeft = "40px";
    workHoursText.style.paddingRight = "40px";
    workHoursText.innerHTML = `Your basket is worth £${price}. It will cost you ${workHours} working hours.`;

    banner.appendChild(claroLogo);
    banner.appendChild(workHoursText);
    banner.appendChild(refreshButton)

    // Get Body.
    document.body.insertBefore(banner, document.body.childNodes[0]);
    window.scrollTo(0, 0);

}


function removeExistingBanner() {
    var banner = document.getElementById('claro-money-banner');
    banner.parentNode.removeChild(banner);
}