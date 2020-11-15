var yearly_gross = 45000;
var api_key = 3128649984;
let annualSalaryInput = document.getElementById("annual-salary");
let dailyHoursInput = document.getElementById("daily-hours");
let updateButton = document.getElementById("update-button");

setInputFromStorage();

updateButton.addEventListener('click', () => {
  $.get(`https://www.income-tax.co.uk/api/${api_key}/${annualSalaryInput.value}/`, function (data) {
            // data is the returned results, do whatever you want with it
            console.log(data);

            let salary = {
              annual: {
                gross: annualSalaryInput.value,
                net: data['take_home']['yearly']
              },
              daily: {
                gross: data['income']['daily'],
                net: data['take_home']['daily']
              }
            }

            let hours = {
              daily: dailyHoursInput.value
            }
            setStorage(salary, hours)

        })
        .done(function () {
            setInputFromStorage();
            alert("success")
        })
        .fail(function () {
            //alert( "error" );
        })
        .always(function () {
            //alert( "finished" );
        });
			
})

function setStorage(salary, hours) {
  chrome.storage.sync.set({
    salary: salary,
    hours: hours
  })
}

function setInputFromStorage() {
  chrome.storage.sync.get(['salary', 'hours'], (data) => {
    annualSalaryInput.value = data['salary']['annual']['gross']
    dailyHoursInput.value = data['hours']['daily']
  })
}


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