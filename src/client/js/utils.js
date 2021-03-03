import _ from "lodash"
function getStandardDate(_date = new Date()){
    const date = getTime(_date)
    return `${date.year}-${date.month}-${date.date}`
}

function getStandardTime(_date = new Date()){
    const date = getTime(_date)
    return `${date.hours}:${date.minutes}`
}

function getTime(datea, timezone=2){
    let date = Date.now()
    if(datea instanceof Date) date = new Date(datea.getTime() + timezone*60*60*1000)
    else date = new Date(parseInt(datea) + timezone*60*60*1000)
    return {
        year: pad(date.getUTCFullYear(), 4),
        month: pad(date.getUTCMonth(), 2),
        date: pad(date.getUTCDate(), 2),
        day: date.getUTCDay(),
        hours: pad(date.getUTCHours(), 2),
        minutes: pad(date.getUTCMinutes(), 2),
        seconds: pad(date.getUTCSeconds(), 2),
        timestamp: date.getTime()
    }
}


function pad(value, length=2){
    return _.padStart(value, length, '0');
}



export default{
    getStandardDate,
    getStandardTime,
    pad
}