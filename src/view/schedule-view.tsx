import {Day, LectureScheduleInfo, LectureScheduleRow} from '@schedule/types';
import WeekHeader from '@components/schedule/week-header';
import { DAYS, PERIOD } from '@schedule/constants';
import { ScheduleUtil } from '@schedule/utils';
import { useIsMobile } from '@components/hook/use-modile';
import {CELL_COLOR} from '@components/schedule/constants.ts';
import TimeCol from '@components/schedule/time-col.tsx';
import html2canvas from 'html2canvas-pro';
import {useRef, useState} from 'react';
import {Button} from '@components/ui/button.tsx';
import {Save} from 'lucide-react';
import Cell, {CellData, CellMap} from '@components/schedule/cell';
import {PngMetadataUtil} from '@lib/png/metadata-util.ts';

interface Props {
  lectureScheduleInfo: LectureScheduleInfo;
}

function createScheduleMap(rows: LectureScheduleRow[]) {
  const cellMap: CellMap = new Map();
  DAYS.forEach((day) => {
    cellMap.set(day, new Map<number, CellData>());
  });

  PERIOD.forEach((period) => {
    DAYS.forEach((day) => {
      cellMap.get(day)!.set(period, {
        isMarked: false,
        color: '',
        lectureName: '',
        lectureRoom: '',
        professor: '',
        lectureTime: '',
      });
    });
  });

  const lectureColorMap= new Map<string, string> ();
  let colorIndex = 0;

  rows.forEach((row) => {
    let color = lectureColorMap.get(row.lectureName);
    if (!color) {
      color = CELL_COLOR[colorIndex % CELL_COLOR.length];
      lectureColorMap.set(row.lectureName, color);
      colorIndex++;
    }
    const parsedTimes = ScheduleUtil.parseLectureTimeString(row.lectureTime);
    parsedTimes.forEach(({ day, periods }) => {
      periods.forEach((period) => {
        if (!cellMap.has(day)) cellMap.set(day, new Map<number, CellData>());
        cellMap.get(day)?.set(period, {
          ...row,
          color,
          isMarked: false,
        });
      });
    });
  });

  return cellMap;
}

export default function ScheduleView({ lectureScheduleInfo }: Props) {
  const { year, term, rows } = lectureScheduleInfo;
  const [cellMap, setCellMap] = useState(createScheduleMap(rows));
  const isMobile = useIsMobile();
  const captureRef = useRef<HTMLDivElement>(null);

  function toScheduleArray(cellMap: CellMap) {
    const scheduleArray: number[] = Array.from({ length: 91 }, () => 0);
    let index = 0;
    PERIOD.forEach((period) => {
      DAYS.forEach((day) => {
        const cell = cellMap.get(day)?.get(period);
        if (cell && (cell.isMarked || cell.lectureName)) scheduleArray[index] = 1;
        index++;
      });
    });

    console.log(scheduleArray);

    return scheduleArray;
  }

  function handleToggleMark(day: Day, period: number) {
    setCellMap((prevState) => {
      const newMap: CellMap = new Map(prevState);
      const dayMap = newMap.get(day);
      if (dayMap) {
        const cellData = dayMap.get(period);
        if (cellData) {
          dayMap.set(period, { ...cellData, isMarked: !cellData.isMarked });
        }
      }

      return newMap;
    });
  }

  async function clickDownload() {
    if (!captureRef.current) return;
    try {
      const canvas = await html2canvas(captureRef.current);
      canvas.toBlob(async (blob) => {
        if (!blob) return;

        const arrayBuffer = await blob.arrayBuffer();
        const PNGUint8Array = new Uint8Array(arrayBuffer);
        const newBuffer = PngMetadataUtil.set(PNGUint8Array, toScheduleArray(cellMap));
        const newBlob = new Blob([newBuffer], { type: 'image/png' });

        const downloadUrl = URL.createObjectURL(newBlob);

        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = '시간표.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(downloadUrl);
      }, 'image/png');
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      {/* 학기 정보 */}
      <div className='w-full flex items-center justify-between px-4'>
        <h2 className="font-bold">{year}년 {term}학기</h2>
        {isMobile ? (
          <Button size='icon' onClick={clickDownload}>
            <Save />
          </Button>
        ) : (
          <Button onClick={clickDownload}>
            <Save />
            <p>저장하기</p>
          </Button>
        )}
      </div>
      {/* 표 */}
      <div ref={captureRef} id='capture' className="w-full h-full flex flex-col">
        {/* 요일 헤더 */}
        <WeekHeader />
        {/* 시간표 그리드 */}
        <div className="h-full grid grid-cols-8">
          {/* 시간 열 */}
          <TimeCol />
          {/* 각 요일의 열 */}
          {DAYS.map((day, j) => (
            <div key={j} className="flex flex-col">
              {PERIOD.map((period, i) => {
                const cellData = cellMap.get(day)?.get(period);
                const aboveCell = cellMap.get(day)?.get(period - 1);
                const belowCell = cellMap.get(day)?.get(period + 1);
                const isFirstCell = cellData && cellMap.get(day)?.get(period - 1)?.lectureName !== cellData.lectureName;
                return (
                  <Cell
                    key={i}
                    isFirstCell={isFirstCell}
                    cellData={cellData}
                    aboveCell={aboveCell}
                    belowCell={belowCell}
                    day={day}
                    period={period}
                    onToggleMark={handleToggleMark}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
