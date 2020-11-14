// Get background page.
var bkg = chrome.extension.getBackgroundPage();

// Get options button.
var optionsButton = document.getElementById("options-button");

// Set event listener.
optionsButton.addEventListener("click", () => {
    bkg.console.log("HELLO")
    window.open("chrome-extension://jiklkpjoiaganoomocngfdafbjmcomne/app/options/options.html")
})

function doSomething() {
    alert("hi")
}