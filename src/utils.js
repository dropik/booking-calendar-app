function remToPx(rem) {
  var fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  return rem * fontSize;
}

export { remToPx };