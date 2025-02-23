import {
  describe,
  it,
  beforeEach,
  expect,
} from 'bun:test';
import { ScheduleParser } from '@parser/schedule-parser.ts';
import {LectureScheduleInfo} from '@schedule/types';
import * as fs from 'node:fs';
import * as path from 'node:path';
import {InvalidHanbatScheduleException} from '@parser/error';

describe('ScheduleParser 테스트',() => {
  let parser: ScheduleParser;

  beforeEach(() => {
    parser = new ScheduleParser();
  })

  it('정상적으로 값을 반환한다.', async () => {
    const expected: LectureScheduleInfo = {
      year: '2025',
      term: '1',
      rows: [
        {
          lectureName: '지식재산권',
          lectureRoom: '산업정보관(305)',
          lectureTime: '화6,7',
          professor: '정회환',
        },
        {
          lectureName: '진로설계4(취업전략과 실전취업)',
          lectureRoom: '산업정보관(DH301)',
          lectureTime: '화5',
          professor: '이연승',
        },
        {
          lectureName: '캡스톤디자인Ⅰ',
          lectureRoom: '산업정보관(305),산업정보관(305),산업정보관(305)',
          lectureTime: '월1,2,토1,2,토3,4',
          professor: '이동호,박현주',
        },
        {
          lectureName: '기업가정신과 창업',
          lectureRoom: undefined,
          lectureTime: '목5',
          professor: '박성욱',
        },
      ],
    };
    const arrayBuffer = fs.readFileSync(path.resolve(__dirname, '../data/test-data.xls'));
    const actual = await parser.parse(arrayBuffer);

    expect(actual).toEqual(expected);
  });

  it('XLS 컬럼 구조를 해석할 수 없을 경우 InvalidHanbatScheduleException을 발생시킨다.', async () => {
    const arrayBuffer = fs.readFileSync(path.resolve(__dirname, '../data/invalid-data-no-year.xlsx'));
    expect(parser.parse(arrayBuffer)).rejects.toThrowError(InvalidHanbatScheduleException);
  });
})