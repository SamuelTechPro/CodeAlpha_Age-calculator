



const ageCalculate = () => {
    const today = new Date();
    const inputDate = new Date(document.getElementById("input-date").value);

    const birthDetails = {
        date: inputDate.getDate(),
        month: inputDate.getMonth() + 1,
        year: inputDate.getFullYear(),
    }

    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDate = today.getDate();

    if(isFutureDate(birthDetails, currentYear, currentMonth, currentDate)){
        alert("Not Born yet");
        displayResult("-", "-", "-");
        return;
    }

    const {years, months, days} = calculateAge(
        birthDetails,
        currentYear,
        currentMonth,
        currentDate
    );

    displayResult(days, months, years);
};

const isFutureDate = (birthDetails, currentYear, currentMonth, currentDate) => {
    return (
        birthDetails.year > currentYear ||
        (birthDetails.year === currentYear && (birthDetails.month > currentMonth || (birthDetails.month === currentMonth && birthDetails.date > currentDate)))
    );
};

const calculateAge = (birthDetails, currentYear, currentMonth, currentDate) => {
    let years = currentYear - birthDetails.year;
    let months, days;

    if(currentMonth < birthDetails.month){
        years--;
        months = 12 - (birthDetails.month - currentMonth);
    } else{
        months = currentMonth - birthDetails.month;
    }

    if (currentDate < birthDetails.date){
        months--;
        const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
        const daysInLastMonth = getDaysInMonth(lastMonth, currentYear);
        days = daysInLastMonth - (birthDetails.date - currentDate);
    } else {
        days = currentDate - birthDetails.date;
    } 

    return {years, months, days};
};

const getDaysInMonth = (month, year) => {
    const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    const daysInMonth = [31, isLeapYear ? 29 : 28,
        31, 30, 31, 30,
        31, 31, 30, 31, 30, 31
    ];
    return daysInMonth[month - 1];
};

const displayResult = (bdate, bMonth, bYear) => {
    document.getElementById("days").textContent = bdate;
    document.getElementById("months").textContent = bMonth;
    document.getElementById("yrs").textContent = bYear;
}

document.getElementById("age-btn").addEventListener("click", ageCalculate);
