import {Day, LectureScheduleRow} from '@schedule/types';
import {useIsMobile} from '@components/hook/use-modile.tsx';

export interface CellData extends LectureScheduleRow {
  color: string;
  isMarked: boolean;
}

export type CellMap = Map<Day, Map<number, CellData>>;

interface Props {
  isFirstCell?: boolean;
  cellData?: CellData;
  aboveCell?: CellData;
  belowCell?: CellData;
  day: Day;
  period: number;
  onToggleMark: (day: Day, period: number) => void;
}

export default function Cell({ isFirstCell, cellData, aboveCell, belowCell, day, period, onToggleMark }: Props) {
  const isMobile = useIsMobile();
  const cellClasses = getCellBorderClasses();

  function getCellBorderClasses() {
    if (!cellData?.lectureName) {
      return 'h-12 border border-black';
    }
    const aboveSame = aboveCell?.lectureName === cellData.lectureName;
    const belowSame = belowCell?.lectureName === cellData.lectureName;

    if (!aboveSame && belowSame) {
      return `h-12 border-t border-l border-r border-black border-b-0 ${cellData.color}`;
    }
    if (aboveSame && belowSame) {
      return `h-12 border-l border-r border-black border-t-0 border-b-0 ${cellData.color}`;
    }
    if (aboveSame && !belowSame) {
      return `h-12 border-l border-r border-black border-t-0 border-b ${cellData.color}`;
    }

    return `h-12 border border-black ${cellData.color}`;
  }

  function onCellClick() {
    if (cellData?.lectureName) return;

    onToggleMark(day, period);
  }
  return (
    <div className={`${cellClasses} ${cellData?.isMarked ? 'bg-black' : ''}`} onClick={onCellClick}>
      {isFirstCell && cellData ? (
        <div className={isMobile ? 'text-xs p-0.5' : 'text-sm p-0.5'}>
          <p className="font-bold overflow-hidden">{cellData.lectureName}</p>
        </div>
      ) : null}
    </div>
  );
}