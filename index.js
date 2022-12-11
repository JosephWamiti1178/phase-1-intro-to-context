// Your code here
//build a time card and payroll application using the record-oriented approach. 
//When someone enters the company's state of the art technical office, 
//the employee has to insert their card in a time clock which will record the time they came in
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!
 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */
 
// const allWagesFor = function () {
//     const eligibleDates = this.timeInEvents.map(function (e) {
//         return e.date
//     })

//     const payable = eligibleDates.reduce(function (memo, d) {
//         return memo + wagesEarnedOnDate.call(this, d)
//     }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

//     return payable
// }

// let createEmployeeRecord = function(row){
//     return {
//         firstName: row[0],
//         familyName: row[1],
//         title: row[2],
//         payPerHour: row[3],
//         timeInEvents: [],
//         timeOutEvents: []
//     }
// }

// let createEmployeeRecords = function(employeeRowData) {
//     return employeeRowData.map(function(row){
//         return createEmployeeRecord(row)
//     })
// }

// let createTimeInEvent = function(dateStamp){
//     let [date, hour] = dateStamp.split(' ')

//     this.timeInEvents.push({
//         type: "TimeIn",
//         hour: parseInt(hour, 10),
//         date,
//     })

//     return this
// }

// let createTimeOutEvent = function(dateStamp){
//     let [date, hour] = dateStamp.split(' ')

//     this.timeOutEvents.push({
//         type: "TimeOut",
//         hour: parseInt(hour, 10),
//         date,
//     })

//     return this
// }

// let hoursWorkedOnDate = function(soughtDate){
//     let comingIn = this.timeInEvents.find(function(e){
//         return e.date === soughtDate
//     })

//     let goingOut = this.timeOutEvents.find(function(e){
//         return e.date === soughtDate
//     })

//     return (goingOut.hour - comingIn.hour) / 100
// }

// let wagesEarnedOnDate = function(dateSought){
//     let rawWage = hoursWorkedOnDate.call(this, dateSought)
//         * this.payPerHour
//     return parseFloat(rawWage.toString())
// }

// let findEmployeeByFirstName = function(srcArray, firstName) {
//   return srcArray.find(function(rec){
//     return rec.firstName === firstName
//   })
// }

// let calculatePayroll = function(arrayOfEmployeeRecords){
//     return arrayOfEmployeeRecords.reduce(function(memo, rec){
//         return memo + allWagesFor.call(rec)
//     }, 0)
// }
function createEmployeeRecord(array){
    const employeeRecord = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRecord;
}

function createEmployeeRecords(arrayOfArrays){
    const arrayOfObjects = [];
    arrayOfArrays.map(nestedArray => {arrayOfObjects.push(createEmployeeRecord(nestedArray))});

    return arrayOfObjects;
}

function createTimeInEvent(employeeRecord, dateStamp){
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: Number.parseInt(dateStamp.slice(11)),
        date: dateStamp.slice(0, 10)
    })
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp){
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: Number.parseInt(dateStamp.slice(11)),
        date: dateStamp.slice(0, 10)
    })
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date){
    for(let i in employeeRecord.timeInEvents){
        if(employeeRecord.timeInEvents[i].date === date){
            return (employeeRecord.timeOutEvents[i].hour - employeeRecord.timeInEvents[i].hour)/100
        }
    }
    // // Check that the date is the same as the time in
    // const startTime = (date === employeeRecord.timeInEvents[0].date ? employeeRecord.timeInEvents[0].hour : console.log('Different date than time in.'));
    // // Check that the date is the same as the time out
    // const endTime = (date === employeeRecord.timeInEvents[0].date ? employeeRecord.timeOutEvents[0].hour : console.log('Different date than time out.'));

    // const hoursWorked = (endTime - startTime)/100;
    // return hoursWorked;
}

function wagesEarnedOnDate(employeeRecord, date){
    const payOwed = hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour;
    return payOwed;
}

function allWagesFor(employeeRecord){
    // use wagesEarnedOnDate to get the wages for that day then add it to the accumulated value (reduce) for each timeInEvent element   
    let total = employeeRecord.timeInEvents.reduce((accumulator, timeInElement) => {
        let total = wagesEarnedOnDate(employeeRecord, timeInElement.date)
        return accumulator += total;
    }, 0)
    return total;
}

function calculatePayroll(arrayOfEmployees){
    const reducer = (accumulator, employee) => {
        let totalWages = allWagesFor(employee);
        return accumulator += totalWages;
    }
   return arrayOfEmployees.reduce(reducer, 0)
}

// let rRecord = createEmployeeRecord(["Rafiki", "", "Aide", 10])
// let sRecord = createEmployeeRecord(["Simba", "", "King", 100])

// let sTimeData = [
//     ["2019-01-01 0900", "2019-01-01 1300"], // 4 * 100 = 400
//     ["2019-01-02 1000", "2019-01-02 1300"]  // 3 * 100 = 300 ===> 700 total
// ]

// let rTimeData = [
//     ["2019-01-11 0900", "2019-01-11 1300"], // 4 * 10 = 40
//     ["2019-01-12 1000", "2019-01-12 1300"]  // 3 * 10 = 40 ===> 70 total ||=> 770
// ]

// sTimeData.forEach(function (d) {
//     let [dIn, dOut] = d
//     sRecord = createTimeInEvent(sRecord, dIn)
//     sRecord = createTimeOutEvent(sRecord, dOut)
// })

// rTimeData.forEach(function (d, i) {
//     let [dIn, dOut] = d
//     rRecord = createTimeInEvent(rRecord, dIn)
//     rRecord = createTimeOutEvent(rRecord, dOut)
// })

// let employees = [sRecord, rRecord]

// console.log(calculatePayRoll(employees))