export class ScheduleUtil {
  static periodToTime(period: number) {
    return period + 8;
  }

  static parseLectureTimeString(
    lectureTimeStr: string
  ): { day: string; periods: number[] }[] {
    const result: { day: string; periods: number[] }[] = [];
    const regex = /([월화수목금토일])\s*([\d,]+)/g;
    let match;
    while ((match = regex.exec(lectureTimeStr)) !== null) {
      const day = match[1];
      const periods = match[2]
        .split(',')
        .map((str) => parseInt(str.trim(), 10))
        .filter((num) => !isNaN(num));
      result.push({ day, periods });
    }
    return result;
  }
}