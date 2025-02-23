import { addMetadata, getMetadata } from 'meta-png';
import {InvalidPngFileException, InvalidScheduleArrayException} from '@lib/png/errors';

export class PngMetadataUtil {
  private static readonly KEY = 'schedule';

  static get(PNGUint8Array: Uint8Array) {
    const arrayString = getMetadata(PNGUint8Array, this.KEY);

    if (!arrayString) throw new InvalidPngFileException();

    const parseDecimal = (v: string) => parseInt(v, 10);
    const scheduleArray = arrayString.split(',').map(parseDecimal);

    return scheduleArray;
  }

  static set(PNGUint8Array: Uint8Array, scheduleArray: number[]) {
    if (scheduleArray.length !== 91) throw new InvalidScheduleArrayException();

    const value = scheduleArray.toString();
    return addMetadata(PNGUint8Array, this.KEY, value);
  }
}