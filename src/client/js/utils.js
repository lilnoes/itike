import _ from "lodash"
function getStandardDate(){
    return (new Date()).toJSON().substr(0, 10);
}

function getStandardTime(){
    return (new Date()).toJSON().substr(11, 5);
}

function pad(value, length=2){
    return _.padStart(value, length, '0');
}



export default{
    getStandardDate,
    getStandardTime,
    pad
}