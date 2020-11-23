var yearly_gross = 45000;
var api_key = 2733823872;
let annualSalaryInput = document.getElementById("annual-salary");
let dailyHoursInput = document.getElementById("daily-hours");
let updateButton = document.getElementById("update-button");
let registerButton = document.getElementById("register-button");
let emailAddressInput = document.getElementById("email-address");

chrome.storage.sync.set({
  salary: {
    annual: {
      gross: 30800.00,
      net: 24584.00
    },
    daily: {
      gross: 118.46,
      net: 94.55
    }
  },
  hours: {
    daily: 8
  }
}, () => {})

setInputFromStorage();



registerButton.addEventListener('click', () => {
  getEmail(data => {
    if (data['status'] === "pending") {
      alert("Please verify email address.")
    } else if (data['status'] === "subscribed") {
      setEmailDisabled();
      setSalaryDisabled(false);
    }
  });
})


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
              daily: 8
            }
            setStorage(salary, hours)

        })
        .done(function (data) {
            console.log(data)
            setInputFromStorage();
            alert(`Set Take Home (Annual): £${data['take_home']['yearly']}
                   Set Take Home (Daily): £${data['take_home']['daily']}`)
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
  chrome.storage.sync.get(['salary', 'hours', 'email'], (data) => {
    annualSalaryInput.value = data['salary']['annual']['gross']
    if (data['email'] != null) emailAddressInput.value = data['email']
    else emailAddressInput.value = null;

    if (emailAddressInput.value != "" && emailAddressInput.value != null) {
      getEmail((data) => {
        if (data['status'] === "pending") {
          alert("Please verify email address.")
        } else if (data['status'] === "subscribed") {
          setEmailDisabled();
          setSalaryDisabled(false);
        }
      })
    }

  })
}

function getEmail(cb) {
  $.ajax({
    url: 'https://jy9hknmhw8.execute-api.eu-west-1.amazonaws.com/prod/email',
    type: 'post',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
        cb(data)
    },
    data: JSON.stringify({email: emailAddressInput.value})
  });
}

function setEmailDisabled(disabled=true) {
  registerButton.disabled = disabled;
  emailAddressInput.disabled = disabled;
}

function setSalaryDisabled(disabled=true){
  annualSalaryInput.disabled = disabled;
  updateButton.disabled = disabled;
}


