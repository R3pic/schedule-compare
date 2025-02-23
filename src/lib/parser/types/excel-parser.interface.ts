import {LectureScheduleInfo} from '@schedule/types';

export interface LectureScheduleParser {
  parse(xlsArrayBuffer: Buffer): Promise<LectureScheduleInfo>;
}