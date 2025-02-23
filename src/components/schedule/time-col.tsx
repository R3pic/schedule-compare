import {PERIOD} from '@schedule/constants.ts';
import {ScheduleUtil} from '@schedule/utils.ts';

export default function TimeCol() {
  return (
    <div className="flex flex-col">
      {PERIOD.map((period, i) => (
        <div key={i} className="h-12 border border-black flex items-center justify-center">
          <p className="text-xs">{ScheduleUtil.periodToTime(period)}:00</p>
        </div>
      ))}
    </div>
  );
}