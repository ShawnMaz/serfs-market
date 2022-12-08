// correctly format the date when it is returned from the database
function formatDate(date) {
  var minutes = new Date(date).getMinutes();
  var hours = new Date(date).getHours();
  var days = new Date(date).getDate();
  var month = new Date(date).getMonth() + 1;

  // add 0s
  if (hours < 10) { hours = "0"+hours };
  if (minutes < 10) { minutes = "0"+minutes };
  if (days < 10) { days = "0"+days };
  if (month < 10) { month = "0"+month };

  // construct our date
  return `${hours}:${minutes} / ${days} / ${month}`;
}

// export
module.exports = { formatDate };
