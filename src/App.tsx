import {useState} from 'react';

import { Card } from '@components/ui/card.tsx';
import ScheduleView from 'src/view/schedule-view.tsx';
import {LectureScheduleInfo} from '@schedule/types';
import FileUploadView from 'src/view/file-upload-view.tsx';

function App() {
  const [isDone, setIsDone] = useState<boolean>(false);
  const [data, setData] = useState<LectureScheduleInfo | null>(null);

  return (
    <div className="h-screen w-screen flex flex-col items-center bg-gradient-to-br from-white to-gray-300 p-8">
      <h1 className="my-4 text-4xl font-bold">시간표 생성기</h1>
      {isDone && data ? (
        <ScheduleView
          lectureScheduleInfo={data}
        />
      ) : (
        <Card className="w-3/4 h-11/12 p-4 flex flex-col items-center">
          <FileUploadView
            setIsDone={setIsDone}
            setData={setData}
          />
        </Card>
      )}
    </div>
  )
}

export default App
