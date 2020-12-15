
const moment = require('moment')

var classDate = '2020-12-15'
var classStartTime = '00:01'
var classEndTime = '02:46'

var currentDate = moment(new Date()).format('YYYY-MM-DD')
var currentTime = moment(new Date()).format('HH:mm')

//.toString()

// console.log(moment(moment(currentTime, 'HH:mm')).isBefore(moment('23:00', 'HH:mm')));

var compareDate = moment('2020-12-09').isBefore('2020-12-13');

const sessionState = (classDate,startTime,endTime,currentDate,currentTime) => {

    if(moment(currentDate).isBefore(classDate))
    {
        return -1
    }
    else if(moment(currentDate).isAfter(classDate))
    {
        return 1
    }
    else
    {
        console.log('ttt');
        
        if(moment(moment(currentTime, 'HH:mm')).isBefore(moment(classStartTime , 'HH:mm')))
        {
            return -1
        }
        else if(moment(moment(currentTime, 'HH:mm')).isAfter(moment(endTime, 'HH:mm')))
        {
            return 1
        }
        else{
            return 0
        }
    }
}
console.log(sessionState(classDate,classStartTime,classEndTime,currentDate,currentTime));
console.log(currentTime);


