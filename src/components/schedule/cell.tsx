import {LectureScheduleRow} from '@schedule/types';
import {useIsMobile} from '@components/hook/use-modile.tsx';
import {useState} from 'react';

interface CellData extends LectureScheduleRow {
  color: string;
}

export interface CellMap {
 [day: string]: {
   [period: number]: CellData
 }
}

interface Props {
  day: string;
  period: number;
  cellMap: CellMap;
}

export default function Cell({ day, period, cellMap }: Props) {
  const isMobile = useIsMobile();
  const [isMarked, setIsMarkd] = useState<boolean>(false);

  const cellData = cellMap[day]?.[period];
  const isFirstCell = cellData && cellMap[day]?.[period - 1]?.lectureName !== cellData.lectureName;
  const cellClasses = getCellBorderClasses(day, period);

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
  }

  function onCellClick() {
    if (cellData) return;
    setIsMarkd(!isMarked);
  }
  return (
    <div className={`${cellClasses} ${isMarked ? 'bg-black' : ''}`} onClick={onCellClick}>
      {isFirstCell && cellData ? (
        <div className={isMobile ? 'text-xs p-0.5' : 'text-sm p-0.5'}>
          <p className="font-bold overflow-hidden">{cellData.lectureName}</p>
        </div>
      ) : null}
    </div>
  );
}