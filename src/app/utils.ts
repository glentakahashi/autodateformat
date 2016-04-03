export class Utils {
  public static isNumber(n: string): boolean {
    return /^\d+$/.test(n);
  }
}
