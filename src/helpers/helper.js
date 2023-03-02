export function dateDifference(date1, date2) {
    let firstDate = new Date(date1);
    let secondDate = new Date(date2);
    let timeDifference = firstDate.getTime() - secondDate.getTime();
    let secDiff = Math.floor(timeDifference / 1000);
    let minutesDiff = Math.floor(secDiff / 60);
    let hoursDiff = Math.floor(minutesDiff / 60);
    let daysDiff = Math.floor(hoursDiff / 24);
    let yearsDiff = firstDate.getFullYear() - secondDate.getFullYear();
    let monthsDiff = yearsDiff * 12 + (secondDate.getMonth() - firstDate.getMonth());
    let time;
    if (yearsDiff >= 1) {
      time = {
        years: yearsDiff,
        months: monthsDiff - (yearsDiff*12),
      };
    } else if (monthsDiff >= 1) {
      time = {
        months: monthsDiff,
      };
    } else {
      time = {
        days: daysDiff,
      };
    }
    return time;
  }

  export function exactTime(time){
    let date = new Date(time);
    let weekDayIndex = date.getDay();
    let weekDays = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
    console.log(date)
    let dateTime= {
         hour : date.getHours(),
         minutes : date.getMinutes(),
         weekDay : weekDays[weekDayIndex],
         year : date.getFullYear(),
         month: date.getMonth(),
         date: date.getDate(),
    }
    return dateTime;
  }

  