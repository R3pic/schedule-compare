import {useState} from 'react';

import { Card } from '@components/ui/card.tsx';
import ScheduleView from 'src/view/schedule-view.tsx';
import {LectureScheduleInfo} from '@schedule/types';
import FileUploadView from 'src/view/file-upload-view.tsx';
import {useIsMobile} from '@components/hook/use-modile.tsx';
import CompareView from 'src/view/compare-view.tsx';
import {Button} from '@components/ui/button.tsx';
import {ArrowRightLeft} from 'lucide-react';

function App() {
  const isMobile = useIsMobile();
  const [isCompareView, setIsCompareView] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [data, setData] = useState<LectureScheduleInfo | null>(null);

  return (
    <div className="h-screen w-screen flex flex-col items-center bg-gradient-to-br from-white to-green-200">
      <div className="relative flex w-3/4 items-center">
        <Button
          onClick={() => setIsCompareView(!isCompareView)}
          size={isMobile ? 'icon' : 'default'}
          className={`absolute ${isMobile ? '-left-5' : 'left-5'}`}>
          { isMobile ? (
            <ArrowRightLeft />
          ) : (
            <p>{ isCompareView ? '시간표 생성' : '시간표 비교' }</p>
          )}
        </Button>
        <h1 className="flex-1 text-center my-4 text-4xl font-bold">
          {isCompareView ? '시간표 비교' : '시간표 생성'}
        </h1>
      </div>
      <Card className={isMobile ?
        'p-4 w-full flex-1 justify-end rounded-none'
        :
        'w-3/4 h-11/12 p-4 mb-4 flex flex-col items-center'
      }>
      {isCompareView ? (
        <CompareView />
      ) : (
        <>
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
        </>
      )}
      </Card>
    </div>
  )
}

export default App
