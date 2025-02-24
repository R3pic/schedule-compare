import DragDropInput from '@components/upload/drag-drop-input.tsx';
import FileUploadInput from '@components/upload/file-upload-input.tsx';
import {ScheduleParser} from '@parser/schedule-parser.ts';
import {InvalidHanbatScheduleException} from '@parser/error';
import {toast, Toaster} from 'sonner';
import {TOAST_OPTIONS} from '@components/constants.ts';
import {LectureScheduleInfo} from '@schedule/types';
import {Button} from '@components/ui/button.tsx';
import {Calendar} from 'lucide-react';
import {ScheduleUtil} from '@schedule/utils.ts';

interface Props {
  setData: (data: LectureScheduleInfo) => void;
}

export default function FileUploadView({ setData }: Props) {
  async function bufferToLectureScheduleInfo(arrayBuffer: ArrayBuffer) {
    try {
      const parser = new ScheduleParser();
      const parsed = await parser.parse(arrayBuffer);
      setData(parsed);
    } catch(e) {
      if (e instanceof InvalidHanbatScheduleException) {
        toast.error("시간표를 해석할 수 없는 파일입니다.", {
          ...TOAST_OPTIONS,
          description: '올바른 파일이 맞나요?',
        });
      }
    }
  }

  async function onDragDropErrorHandle() {
    toast.error('지원하지 않는 파일 확장자입니다.', {
      ...TOAST_OPTIONS,
      description: '지원하는 확장자 목록 : .xls, .xlsx',
    });
  }

  function onCreateEmptyScheduleClick() {
    const year = ScheduleUtil.getCurrentYear();
    const term = ScheduleUtil.getCurrentTerm();

    setData({
      year,
      term,
      rows: [],
    });
  }

  return (
    <div className='w-full h-full flex flex-col items-center justify-between'>
      <Toaster expand />
      <DragDropInput
        onFileUploaded={bufferToLectureScheduleInfo}
        onError={onDragDropErrorHandle}
      />
      <div className="flex p-4 w-full justify-between">
        <Button onClick={onCreateEmptyScheduleClick}>
          <Calendar />
          빈 시간표 만들기
        </Button>
        <FileUploadInput
          onFileChange={bufferToLectureScheduleInfo}
        />
      </div>
    </div>
  );
}