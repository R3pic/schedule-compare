import {LectureScheduleInfo} from '@schedule/types';

export interface LectureScheduleParser {
  parse(xlsArrayBuffer: ArrayBuffer | ArrayBufferLike): Promise<LectureScheduleInfo>;
}