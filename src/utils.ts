export function remToPx(rem: number): number {
  const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  return rem * fontSize;
}

export function daysBetweenDates(from: string, to: string): number {
  const fromDate = new Date(from);
  const toDate = new Date(to);
  return Math.ceil((toDate.getTime() - fromDate.getTime()) / 86400000);
}

export function dateToString(date: Date): string {
  return date.toLocaleDateString("en-CA");
}

export function getDateShift(date: string | Date, shift: number): string {
  const result = new Date(date);
  result.setDate(result.getDate() + shift);
  return dateToString(result);
}

export function getFirstLetterUppercase(str: string): string {
  return str[0].toLocaleUpperCase() + str.substring(1, str.length);
}

export function getFullRoomType(entity: string, roomType: string): string {
  return `${getFirstLetterUppercase(entity)} (${getFirstLetterUppercase(roomType)})`;
}
