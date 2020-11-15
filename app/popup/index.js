// Get options button.
var optionsButton = document.getElementById("options-button");

// Set event listener.
optionsButton.addEventListener("click", () => {
    openOptions();
})

function openOptions() {
    window.open("chrome-extension://jiklkpjoiaganoomocngfdafbjmcomne/app/options/options.html")
}
