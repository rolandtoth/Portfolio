/*
A date formatter filter for Nunjucks
*/
export default function (date, part) {
  const d = (date === "now") ? new Date() : new Date(date);

  if (part === 'year') {
    return d.getUTCFullYear();
  } else if (part === 'timestamp') {
    return Date.parse(date);
  } else if (part === 'toISOString') {
    return new Date(date).toISOString();
  } else {
    var day = d.getDate(),
        ordinal = nth(day),
        months = [
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

    return `${day}<sup>${ordinal}</sup> of ${months[d.getMonth()]}, ${d.getUTCFullYear()}`;
  }

  function nth(d) {
    if (d > 3 && d < 21) return 'th';

    switch (d % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
    }
  }
};
