import { LectureScheduleInfo, LectureScheduleRow } from '@schedule/types';
import WeekHeader from '@components/schedule/week-header';
import { DAYS, PERIOD } from '@schedule/constants';
import { ScheduleUtil } from '@schedule/utils';
import { useIsMobile } from '@components/hook/use-modile';
import {CELL_COLOR} from '@components/schedule/constants.ts';
import TimeCol from '@components/schedule/time-col.tsx';

interface Props {
  lectureScheduleInfo: LectureScheduleInfo;
}

interface CellData extends LectureScheduleRow {
  color: string;
}

function createScheduleMap(rows: LectureScheduleRow[]) {
  const cellMap: { [day: string]: { [period: number]: CellData } } = {};
  const lectureColorMap: { [lectureName: string]: string } = {};
  let colorIndex = 0;

  rows.forEach((row) => {
    // 강의명에 대해 색상이 할당되지 않았다면 순차적으로 할당
    let color = lectureColorMap[row.lectureName];
    if (!color) {
      color = CELL_COLOR[colorIndex % CELL_COLOR.length];
      lectureColorMap[row.lectureName] = color;
      colorIndex++;
    }
    const parsedTimes = ScheduleUtil.parseLectureTimeString(row.lectureTime);
    parsedTimes.forEach(({ day, periods }) => {
      periods.forEach((period) => {
        if (!cellMap[day]) {
          cellMap[day] = {};
        }
        cellMap[day][period] = { ...row, color };
      });
    });
  });
  return cellMap;
}

export default function ScheduleView({ lectureScheduleInfo }: Props) {
  const { year, term, rows } = lectureScheduleInfo;
  const cellMap = createScheduleMap(rows);
  const isMobile = useIsMobile();

  function getCellBorderClasses(day: string, period: number) {
    const lecture = cellMap[day]?.[period];
    if (!lecture) {
      return 'h-12 border border-black';
    }
    const aboveSame = cellMap[day]?.[period - 1]?.lectureName === lecture.lectureName;
    const belowSame = cellMap[day]?.[period + 1]?.lectureName === lecture.lectureName;

    if (!aboveSame && belowSame) {
      return `h-12 border-t border-l border-r border-black border-b-0 ${lecture.color}`;
    }
    if (aboveSame && belowSame) {
      return `h-12 border-l border-r border-black border-t-0 border-b-0 ${lecture.color}`;
    }
    if (aboveSame && !belowSame) {
      return `h-12 border-l border-r border-black border-t-0 border-b ${lecture.color}`;
    }

    return `h-12 border border-black ${lecture.color}`;
  };

  return (
    <>
      {/* 학기 정보 */}
      <h2 className="font-bold">{year}년 {term}학기</h2>
      {/* 표 */}
      <div className="w-full h-full flex flex-col">
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
                const lecture = cellMap[day]?.[period];
                const isFirstCell = lecture && cellMap[day]?.[period - 1]?.lectureName !== lecture.lectureName;
                const cellClasses = getCellBorderClasses(day, period);
                return (
                  <div key={i} className={cellClasses}>
                    {isFirstCell && lecture ? (
                      <div className={isMobile ? 'text-xs p-0.5' : 'text-sm p-0.5'}>
                        <p className="font-bold overflow-hidden">{lecture.lectureName}</p>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
