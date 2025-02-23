import {LectureScheduleInfo} from '@schedule/types';

interface Props {
  lectureScheduleInfo: LectureScheduleInfo
}

export default function ScheduleView({ lectureScheduleInfo }: Props) {
  return (
    <div className='w-3/4 h-11/12 bg-green-300'>
      <p>{ lectureScheduleInfo.year }년</p>
      <p>{ lectureScheduleInfo.term }학기</p>
      {lectureScheduleInfo.rows.map((row, i) => (
        <div key={i}>
          <p>{ row.lectureName }</p>
          <p>{ row.lectureRoom }</p>
          <p>{ row.lectureTime }</p>
          <p>{ row.professor }</p>
        </div>
      ))}
    </div>
  );
}