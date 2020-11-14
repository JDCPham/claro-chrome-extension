chrome.storage.sync.get(['salary', 'hours'], data => {

    // Get Basket Subtotal.
    let basketSubtotal = parseFloat(document.getElementById("sc-subtotal-amount-buybox").firstElementChild.innerText.substring(1));

    // Calculate Hourly Salary.
    let hourlySalary = currency(data['salary']['daily']['net']).divide(data['hours']['daily']).value;

    // Calculate hours worked required.
    let hoursRequired = currency(basketSubtotal).divide(hourlySalary).value;

    // Get Form Element.
    var cartViewFormElement = document.getElementById("gutterCartViewForm");

    // Append Elements
    cartViewFormElement.insertBefore(createClaroElement(hoursRequired), cartViewFormElement.firstChild)

});

var createClaroElement = (hoursRequired = null) => {

    // Create Div.
    var claroElement = document.createElement("div");

    // Set Display Style.
    claroElement.style.display = "flex";
    claroElement.style.flexDirection = "column";
    // claroElement.style.justifyContent = "space-between";
    claroElement.style.backgroundColor = "#9DCEA3";
    claroElement.style.padding = "16px";
    claroElement.style.borderRadius = "8px";
    claroElement.style.marginBottom = "18px";

    // Create paragraph element.
    var claroParagraphElement = document.createElement("p");

    // Set paragraph style.
    claroParagraphElement.style.color = "#CC2C4F";
    claroParagraphElement.style.fontFamily = "Gilroy";
    claroParagraphElement.style.margin = "0";

    // Add Text to paragraph.
    claroParagraphElement.innerText = "This purchase will cost you"

    // Create paragraph element.
    var claroParagraphElementB = document.createElement("p");

    // Set paragraph style.
    claroParagraphElementB.style.color = "#CC2C4F";
    claroParagraphElementB.style.fontFamily = "Gilroy";
    claroParagraphElementB.style.margin = "0";
    claroParagraphElementB.style.fontSize = "24px";
    claroParagraphElementB.style.marginTop = "5px";

    // Add Text to paragraph.
    claroParagraphElementB.innerText =  `${hoursRequired.toFixed(1)} hours work`

    // Append paragraph to claro element.
    claroElement.appendChild(claroParagraphElement);
    claroElement.appendChild(claroParagraphElementB);

    return claroElement;
    

}