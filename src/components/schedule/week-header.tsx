import {DAYS} from '@schedule/constants.ts';

export default function WeekHeader() {
  return (
    <div className="grid grid-cols-8 text-center font-bold">
      <div className="border border-black">시간</div>
      {DAYS.map((day, i) => (
        <div key={i} className='border border-black'>{ day }</div>
      ))}
    </div>
  );
}