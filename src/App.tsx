import {useState} from 'react';

import { Card } from '@components/ui/card.tsx';
import ScheduleView from 'src/view/schedule-view.tsx';
import {LectureScheduleInfo} from '@schedule/types';
import FileUploadView from 'src/view/file-upload-view.tsx';
import {useIsMobile} from '@components/hook/use-modile.tsx';

function App() {
  const isMobile = useIsMobile();
  const [isDone, setIsDone] = useState<boolean>(false);
  const [data, setData] = useState<LectureScheduleInfo | null>(null);

  return (
    <div className="h-screen w-screen flex flex-col items-center bg-gradient-to-br from-white to-green-200">
      <h1 className="my-4 text-4xl font-bold">시간표 생성기</h1>
      <Card className={isMobile ?
         'w-full flex-1 justify-end rounded-none'
        :
         'w-3/4 h-11/12 p-4 mb-4 flex flex-col items-center'
      }>
        {isDone && data ? (
          <ScheduleView
            lectureScheduleInfo={data}
          />
        ) : (
          <FileUploadView
            setIsDone={setIsDone}
            setData={setData}
          />
        )}
      </Card>
    </div>
  )
}

export default App
