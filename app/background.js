/** Rule Definitions **/
const rule1 = {
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { hostEquals: 'www.asos.com' }
    }),
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { hostEquals: 'www.amazon.co.uk' }
    })
  ],
  actions: [
    new chrome.declarativeContent.ShowPageAction()
  ]
};


chrome.runtime.onInstalled.addListener(() => {


  /************************/
  /** SET DEFAULT SALARY **/
  /************************/
  chrome.storage.sync.set({
    salary: {
      annual: { gross: 35000.00, net: 27440.00 },
      daily: { gross: 134.62, net: 105.54 },
      hourly: { gross: 4, net: 13 }
    },
    hours: { daily: 8 },
    email: null
  })


  /************************/
  /****** ADD RULES *******/
  /************************/
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([rule1]);
  });

});
