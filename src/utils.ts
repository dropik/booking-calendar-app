export class Utils {
  static remToPx(rem: number): number {
    const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    return rem * fontSize;
  }

  static pxToRem(px: number): number {
    const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    return px / fontSize;
  }

  static daysBetweenDates(from: string, to: string): number {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    return Math.ceil((toDate.getTime() - fromDate.getTime()) / 86400000);
  }

  static dateToString(date: Date): string {
    return date.toLocaleDateString("en-CA");
  }

  static getDateShift(date: string | Date, shift: number): string {
    const result = new Date(date);
    result.setDate(result.getDate() + shift);
    return Utils.dateToString(result);
  }

  static evaluateEntitiesInString(source: string): string {
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

  static getCanvasFontSize(el: HTMLElement = document.body): string {
    const fontWeight = Utils.getCssStyle(el, "font-weight") || "normal";
    const fontSize = Utils.getCssStyle(el, "font-size") || "16px";
    const fontFamily = Utils.getCssStyle(el, "font-family") || "Times New Roman";

    return `${fontWeight} ${fontSize} ${fontFamily}`;
  }

  static getCanvasLetterSpacing(el: HTMLElement = document.body): string {
    const letterSpacing = Utils.getCssStyle(el, "letter-spacing") || "inherit";
    return letterSpacing;
  }

  private static getCssStyle(element: HTMLElement, prop: string): string {
    return window.getComputedStyle(element, null).getPropertyValue(prop);
  }

  static getTextWidth(canvas: HTMLCanvasElement, text: string, font: string, letterSpacing: string): number {
    const context = canvas.getContext("2d");
    if (context) {
      context.font = font;
      const metrics = context.measureText(text);
      const letterSpacingPx = parseFloat(letterSpacing);
      return metrics.width + letterSpacingPx * text.length;
    }

    return 0;
  }
}
