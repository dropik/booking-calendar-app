function remToPx(rem: number) {
  var fontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );
  return rem * fontSize;
}

function daysBetweenDates(from: string, to: string) {
  let fromDate = new Date(from);
  let toDate = new Date(to);
  return Math.ceil((toDate.getTime() - fromDate.getTime()) / 86400000);
}

export { remToPx, daysBetweenDates };
