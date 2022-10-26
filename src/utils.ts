export function remToPx(rem: number): number {
  const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  return rem * fontSize;
}

export function pxToRem(px: number): number {
  const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  return px / fontSize;
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

export function evaluateEntitiesInString(source: string): string {
  const split = source.split("&#");
  if (split.length <= 1) {
    return source;
  }
  let result = split[0];
  for (let i = 1; i < split.length; i++) {
    const charCodeSplit = split[i].split(";");
    const charCode = Number.parseInt(charCodeSplit[0]);
    result += `${String.fromCharCode(charCode)}${charCodeSplit[1]}`;
  }
  return result;
}
