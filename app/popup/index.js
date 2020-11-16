function loadPopup(url, id) {

    // Get Query and Page Title.
    let { query, title } = getDetails(url)

    // Set Page Host.
    pageHostText.innerText = url['hostname'];

}


function getDetails(url) {
    return {
        query: "span#sc-subtotal-amount-buybox > span.a-size-medium.a-color-base.sc-price.sc-white-space-nowrap",
        title: "Amazon UK"
    }
}