function convertTime(text="") {
    let days = 0;
    if(text.toLowerCase().includes("days") || text.toLowerCase().includes("day")){
        days += parseFloat(text);
    }
    if(text.toLowerCase().includes("hours") || text.toLowerCase().includes("hour")){
        days += Math.ceil(parseFloat(text)/24);
    }
    if(text.toLowerCase().includes("months") || text.toLowerCase().includes("month")){
        days += Math.ceil(parseFloat(text)*24);
    }
    if(text.toLowerCase().includes("years") || text.toLowerCase().includes("year")){
        days += Math.ceil(parseFloat(text)*24*12);
    }
    return days;
}

console.log(convertTime("73 eee"));

// console.log(25/2);