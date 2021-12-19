function remToPx(rem: number) {
  const fontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );
  return rem * fontSize;
}

function daysBetweenDates(from: string, to: string) {
  const fromDate = new Date(from);
  const toDate = new Date(to);
  return Math.ceil((toDate.getTime() - fromDate.getTime()) / 86400000);
}

export { remToPx, daysBetweenDates };
