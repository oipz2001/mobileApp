
var targetDate = new Date();
// targetDate.setDate(targetDate.getDate()+7 );


// console.log( targetDate);

var dd = targetDate.getDate();
var mm = targetDate.getMonth() + 1; // 0 is January, so we must add 1
var yyyy = targetDate.getFullYear();

var dateString = dd + "/" + mm + "/" + yyyy;
var dupDay = []
console.log( dateString)
while(true){
    targetDate.setDate(targetDate.getDate()+7 );
    dd = targetDate.getDate()
    mm = targetDate.getMonth() + 1;
    yyyy = targetDate.getFullYear()
    dateString = dd + "/" + mm + "/" + yyyy;
    if(mm == 11) break ;
    console.log( dateString + " " + targetDate.getDay())
}

console.log();
