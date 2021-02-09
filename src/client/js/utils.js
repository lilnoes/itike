function getStandardDate(){
    return (new Date()).toJSON().substr(0, 10);
}

function getStandardTime(){
    return (new Date()).toJSON().substr(11, 5);
}



export default{
    getStandardDate,
    getStandardTime,
}