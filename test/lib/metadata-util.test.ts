import {
  describe,
  it,
  expect, beforeEach,
} from 'bun:test';
import * as fs from 'node:fs';
import * as path from 'node:path';
import {PngMetadataUtil} from '@lib/png/metadata-util.ts';
import {InvalidPngFileException} from '@lib/png/errors';

describe('PNGMetadataUtil 테스트',() => {
  let pngBuffer: Uint8Array;

  beforeEach(() => {
    pngBuffer = fs.readFileSync(path.resolve(__dirname, '../data/시간표.png'));
  });

  it('사진에 데이터를 삽입하고 확인할 수 있다.', () => {
    const expected = Array.from({ length: 91 }, () => 0);
    const modifiedPngBuffer = PngMetadataUtil.set(pngBuffer, expected);
    fs.writeFileSync(path.resolve(__dirname, '../data/데이터-추가된-시간표.png'), modifiedPngBuffer);
    const newPngBuffer = fs.readFileSync(path.resolve(__dirname, '../data/데이터-추가된-시간표.png'));
    const actual = PngMetadataUtil.get(newPngBuffer);
    expect(actual).toEqual(expected);
  });

  it('데이터가 없는 사진일 경우 InvalidPngFileException을 발생시킨다.', () => {
    expect(() => PngMetadataUtil.get(pngBuffer)).toThrowError(InvalidPngFileException);
  });
})