import {Day} from '@schedule/types';

export class ScheduleUtil {
  static getEmptyScheduleArray() {
    return Array.from({ length: 91 }, () => 0);
  }

  static periodToTime(period: number) {
    return period + 8;
  }

  static parseLectureTimeString(
    lectureTimeStr: string
  ): { day: Day; periods: number[] }[] {
    const result: { day: Day; periods: number[] }[] = [];
    const regex = /([월화수목금토일])\s*([\d,]+)/g;
    let match;
    while ((match = regex.exec(lectureTimeStr)) !== null) {
      const day = match[1] as Day;
      const periods = match[2]
        .split(',')
        .map((str) => parseInt(str.trim(), 10))
        .filter((num) => !isNaN(num));
      result.push({ day, periods });
    }
    return result;
  }
}