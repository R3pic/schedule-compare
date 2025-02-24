import DragDropPngInput from '@components/upload/drag-drop-png-input.tsx';
import {toast, Toaster} from 'sonner';
import {TOAST_OPTIONS} from '@components/constants.ts';
import {useState} from 'react';
import {PngMetadataUtil} from '@lib/png/metadata-util.ts';
import {ScheduleUtil} from '@schedule/utils.ts';
import {InvalidPngFileException} from '@lib/png/errors';
import {Button} from '@components/ui/button.tsx';
import {Check} from 'lucide-react';
import FileMultiUploadInput from '@components/upload/file-multi-upload-input.tsx';
import WeekHeader from '@components/schedule/week-header.tsx';
import TimeCol from '@components/schedule/time-col.tsx';

export default function CompareView() {
  const [isCompare, setIsCompare] = useState<boolean>(false);
  const [compareArray, setCompareArray] = useState<number[]>([]);
  const [fileScheduleArrays, setFileScheduleArrays] = useState<number[][]>([]);

  async function onFileUploaded(files: File[]) {
    const scheduleArrays: number[][] = [];

    for (const file of files) {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const PNGUint8Array = new Uint8Array(arrayBuffer);
        scheduleArrays.push(PngMetadataUtil.get(PNGUint8Array));
      } catch (e) {
        if (e instanceof InvalidPngFileException)
          toast.error(`${file.name}는 해석할 수 없습니다.`, {
            ...TOAST_OPTIONS,
            description: '스케줄 정보가 존재하나요?'
          })
      }
    }

    setFileScheduleArrays(scheduleArrays);
    toast.info(`${scheduleArrays.length}개의 파일이 업로드되었습니다.`, { ...TOAST_OPTIONS });
  }

  function createCompareArray(scheduleArrays: number[][]) {
    const result = ScheduleUtil.getEmptyScheduleArray();

    scheduleArrays.forEach((scheduleArray) => {
      scheduleArray.forEach((value, index) => {
        if (value === 1) result[index] = 1;
      });
    });

    return result;
  }

  async function onDragDropErrorHandle() {
    toast.error('지원하지 않는 파일 확장자입니다.', {
      ...TOAST_OPTIONS,
      description: '지원하는 확장자 목록 : .png',
    });
  }

  async function compareButtonClick() {
    if (fileScheduleArrays.length > 0) {
      setCompareArray(createCompareArray(fileScheduleArrays));
      setIsCompare(true);
    }
    else {
      toast.warning('최소한 2개의 파일이 업로드되어야합니다.', {
        ...TOAST_OPTIONS,
      })
    }
  }

  return (
    <div className='w-full h-full flex flex-col items-center justify-between'>
      <Toaster expand />
      {isCompare ? (
        <div className='w-full h-full flex flex-col'>
          <WeekHeader />
          <div className="h-full grid grid-cols-8">
            {/* 첫 번째 열: TimeCol */}
            <TimeCol />
            {Array.from({ length: 7 }).map((_, dayIndex) => (
              <div className='flex flex-col'>
                {Array.from({ length: 13 }).map((_, timeIndex) => (
                  <div
                    key={`${timeIndex}-${dayIndex}`}
                    className={`h-12 border border-black flex items-center justify-center ${compareArray[timeIndex * 7 + dayIndex] ? 'bg-red-400' : 'bg-green-300'}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <DragDropPngInput
            onFileUploaded={onFileUploaded}
            onError={onDragDropErrorHandle}
          />
          <div className="flex p-4 w-full justify-between">
            <div className='flex gap-2'>
              <Button
                className={fileScheduleArrays.length > 0 ? 'animate-bounce' : ''}
                onClick={compareButtonClick}
              >
                <Check/>
                비교하기
              </Button>
              {fileScheduleArrays.length > 0 && <p className='text-xs text-green-500'>총 { fileScheduleArrays.length }개의 일정을 지금 바로 비교할 수 있어요!</p>}
            </div>
            <FileMultiUploadInput onFileChange={onFileUploaded}/>
          </div>
        </>
      )}
    </div>
  )
}