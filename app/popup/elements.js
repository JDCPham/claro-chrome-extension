// Buttons.
var optionsButton = document.getElementById("options-button");

// Text.
var pageHostText = document.getElementById("page-host-text");
var grossAnnualSalaryText = document.getElementById("gross-annual-salary-text");
var netAnnualSalaryText = document.getElementById("net-annual-salary-text");
var grossDailySalaryText = document.getElementById("gross-daily-salary-text");
var netDailySalaryText = document.getElementById("net-daily-salary-text");
var dailyHoursWorkedText = document.getElementById("daily-hours-worked-text");
var netHourlySalaryText = document.getElementById("net-hourly-salary-text");

function openOptions() {
    window.open("chrome-extension://jiklkpjoiaganoomocngfdafbjmcomne/app/options/options.html")
}