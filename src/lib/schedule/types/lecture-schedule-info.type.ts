import { LectureScheduleRow } from '@schedule/types';

export type LectureScheduleInfo = {
  year: string;
  term: string;
  rows: LectureScheduleRow[];
}