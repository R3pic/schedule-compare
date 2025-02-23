export const SCHEDULE_COL_NAME = {
  YEAR: "학년도",
  TERM: "학기",
  LECTURE_NAME: "교과목명",
  CLASS: "분반",
  TYPE: "구분",
  GRADE: "학점",
  PROFESSOR: "담당교수",
  LECTURE_TIME: "강의시간",
  LECTURE_ROOM: "강의실",
  GRADE_ACCEPT: "성적인정",
  RETRY: "재이수",
  RETRY_YEAR: "재이수학년도",
} as const;
Object.freeze(SCHEDULE_COL_NAME);

export const SCHEDULE_COL = {
  YEAR: 0,
  TERM: 1,
  LECTURE_NAME: 2,
  PROFESSOR: 6,
  LECTURE_TIME: 7,
  LECTURE_ROOM: 8,
} as const;
Object.freeze(SCHEDULE_COL);