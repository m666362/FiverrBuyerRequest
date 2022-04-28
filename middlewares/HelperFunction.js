// C
module.exports.convertTime = (text) => {
    let days = 0;
    if(text.toLowerCase().includes("days") || text.toLowerCase().includes("day")){
        days += parseFloat(text);
    }
    if(text.toLowerCase().includes("hours") || text.toLowerCase().includes("hour")){
        days += Math.ceil(parseFloat(text)/24);
    }
    return days;
};
