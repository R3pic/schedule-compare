import {LectureScheduleParser} from '@parser/types';
import {LectureScheduleInfo, LectureScheduleRow} from '@schedule/types';
import {XLSXUtil} from '@parser/xlsx.ts';
import {SCHEDULE_COL, SCHEDULE_COL_NAME} from '@parser/constants.ts';
import { InvalidHanbatScheduleException } from '@parser/error';

export class ScheduleParser implements LectureScheduleParser {
  async parse(xlsArrayBuffer: ArrayBuffer | ArrayBufferLike): Promise<LectureScheduleInfo> {
    const workbook = XLSXUtil.read(xlsArrayBuffer, { type: 'buffer' });

    const sheetName = workbook.SheetNames[0];
    const workSheet = workbook.Sheets[sheetName];
    const [headers, ...all_rows] = XLSXUtil.utils.sheet_to_json(workSheet, { header: 1 }) as string[][];

    const headersSet = new Set(headers);
    const requiredHeaders = Object.values(SCHEDULE_COL_NAME);
    const isValidHeader = requiredHeaders.every((name) => headersSet.has(name));

    if(!isValidHeader) throw new InvalidHanbatScheduleException();

    const data_rows = all_rows.slice(0, -2);

    const year = data_rows[0][SCHEDULE_COL.YEAR];
    const term = data_rows[0][SCHEDULE_COL.TERM];

    if (!year || !term) throw new InvalidHanbatScheduleException();

    const rows = data_rows.map<LectureScheduleRow>((row) => ({
      lectureName: row[SCHEDULE_COL.LECTURE_NAME],
      lectureRoom: row[SCHEDULE_COL.LECTURE_ROOM],
      lectureTime: row[SCHEDULE_COL.LECTURE_TIME],
      professor: row[SCHEDULE_COL.PROFESSOR],
    }));

    return {
      year,
      term,
      rows,
    };
  }

}