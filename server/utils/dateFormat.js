// correctly format the date when it is returned from the database
function formatDate(date) {
  return `${new Date(date).getHours()}:${new Date(date).getMinutes()} - ${new Date(date).getMonth() + 1} - ${new Date(date).getDate()}`;
}

// export
module.exports = { formatDate };
