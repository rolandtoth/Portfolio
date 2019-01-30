/*
A date formatter filter for Nunjucks
*/
module.exports = function (date, part) {

  var d = (date === "now") ? new Date() : new Date(date);

  if (part === 'year') {
    return d.getUTCFullYear();
  } else if (part === 'timestamp') {
    return Date.parse(date);
  } else if (part === 'toISOString') {
    return new Date(date).toISOString();
  } else {
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    return `${d.getUTCFullYear()}. ${months[d.getMonth()]} ${d.getDate()}.`;
  }
};
