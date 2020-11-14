/** Rule Definitions **/
const rule1 = {
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { hostEquals: 'www.asos.com', pathEquals: '/bag' }
    }),
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { hostEquals: 'www.amazon.co.uk', pathEquals: '/gp/cart/view.html' }
    })
  ],
  actions: [
    new chrome.declarativeContent.ShowPageAction()
  ]
};



chrome.runtime.onInstalled.addListener(() => {

  // Set Default Annual Salary.
  chrome.storage.sync.set({
    salary: {
      annual: {
        gross: 35000.00,
        net: 27440.00
      },
      daily: {
        gross: 134.62,
        net: 105.54
      }
    },
    hours: {
      daily: 8
    }
  })

  // Set Declarative Content Events.
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([rule1]);
  });

});


