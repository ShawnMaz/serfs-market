// correctly format the date when it is returned from the database
function formatDate(date) {
  var minutes = new Date(date).getMinutes();
  var hours = new Date(date).getHours();
  var days = new Date(date).getDate();
  var month = new Date(date).getMonth() + 1;

  // add 0s
  if (hours < 10) { hours = "0"+hours };
  if (minutes < 10) { minutes = "0"+minutes };
  // deprecated
  // if (days < 10) { days = "0"+days };
  // if (month < 10) { month = "0"+month };

  // switch statement for month
  switch(month) {
    case 1:
      month = "January";
      break;
    case 2:
      month = "February";
      break;
    case 3:
      month = "March";
      break;
    case 4:
      month = "April";
      break;
    case 5:
      month = "May";
      break;
    case 6:
      month = "June";
      break;
    case 7:
      month = "July";
      break;
    case 8:
      month = "August";
      break;
    case 9:
      month = "September";
      break;
    case 10:
      month = "October";
      break;
    case 11:
      month = "November";
      break;
    case 12:
      month = "December";
      break;
  }

  // construct our date
  return `${hours}:${minutes} / ${month} ${days}`;
}

// export
module.exports = { formatDate };
