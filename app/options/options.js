setInputFromStorage();
showVerifyEmailNotice(false)

getEmail(data => {
    if (data['status'] === "pending") {
        showVerifyEmailNotice();
    } else if (data['status'] === "subscribed") {
        setEmailDisabled();
        setSalaryDisabled(false);
        setEmail(emailAddressInput.value)
    }
});

registerButton.addEventListener('click', () => {
    getEmail(data => {
        if (data['status'] === "pending") {
            showVerifyEmailNotice();
        } else if (data['status'] === "subscribed") {
            setEmailDisabled();
            setSalaryDisabled(false);
            setEmail(emailAddressInput.value)
        }
    });
})


updateButton.addEventListener('click', () => {
    $.get(`https://www.income-tax.co.uk/api/${api_key}/${annualSalaryInput.value}/`, function (data) {
        // data is the returned results, do whatever you want with it
        console.log(data);

        let salary = {
            annual: { gross: annualSalaryInput.value, net: data['take_home']['yearly'] },
            daily: { gross: data['income']['daily'], net: data['take_home']['daily'] },
            hourly: { gross: data['income']['daily'] / 8, net: data['take_home']['daily'] / 8 }
        }

        let hours = { daily: 8 }
        setStorage(salary, hours)

    }).done(function (data) {
        console.log(data)
        setInputFromStorage();
        alert(`Set Take Home (Annual): £${data['take_home']['yearly']} | Set Take Home (Daily): £${data['take_home']['daily']}`)
    })

})

function setStorage(salary, hours) {
    chrome.storage.sync.set({
        salary: salary,
        hours: hours
    })
}

function setEmail(email) {
    chrome.storage.sync.set({email})
}

function setInputFromStorage() {
    chrome.storage.sync.get(['salary', 'email'], ({ salary, email }) => {
        
        annualSalaryInput.value = salary['annual']['gross']
        if (email != null) emailAddressInput.value = email;
        else emailAddressInput.value = null;

        if (emailAddressInput.value != "" && emailAddressInput.value != null) {
            getEmail((data) => {
                if (data['status'] === "pending") {
                    showVerifyEmailNotice();
                } else if (data['status'] === "subscribed") {
                    setEmailDisabled();
                    setSalaryDisabled(false);
                    setEmail(emailAddressInput.value)
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
        data: JSON.stringify({ email: emailAddressInput.value })
    });
}

function setEmailDisabled(disabled = true) {
    registerButton.disabled = disabled;
    emailAddressInput.disabled = disabled;
}

function setSalaryDisabled(disabled = true) {
    annualSalaryInput.disabled = disabled;
    updateButton.disabled = disabled;
}


