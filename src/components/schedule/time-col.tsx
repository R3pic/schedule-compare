import {PERIOD} from '@schedule/constants.ts';
import {ScheduleUtil} from '@schedule/utils.ts';
import {useIsMobile} from '@components/hook/use-modile.tsx';

export default function TimeCol() {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col">
      {PERIOD.map((period, i) => (
        <div key={i} className="h-12 border border-black flex justify-end">
          <p className={isMobile ? 'text-xs' : 'text-sm'}>{ScheduleUtil.periodToTime(period)}:00</p>
        </div>
      ))}
    </div>
  );
}