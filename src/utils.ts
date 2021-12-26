import globals from "./globals";

export function remToPx(rem: number): number {
  const fontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );
  return rem * fontSize;
}

export function daysBetweenDates(from: string, to: string): number {
  const fromDate = new Date(from);
  const toDate = new Date(to);
  return Math.ceil((toDate.getTime() - fromDate.getTime()) / 86400000);
}

export function getInitialScrollLeft(): number {
  const columnWidth = remToPx(4) + 1;
  return columnWidth * globals.TABLE_PRELOAD_AMOUNT + 1;
}
