function remToPx(rem) {
  var fontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );
  return rem * fontSize;
}

function daysBetweenDates(from, to) {
  return Math.ceil(((new Date(to)) - (new Date(from))) / 86400000);
}

export { remToPx, daysBetweenDates };
