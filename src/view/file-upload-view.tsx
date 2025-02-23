import DragDropInput from '@components/upload/drag-drop-input.tsx';
import FileUploadInput from '@components/upload/file-upload-input.tsx';
import {ScheduleParser} from '@parser/schedule-parser.ts';
import {InvalidHanbatScheduleException} from '@parser/error';
import {toast, Toaster} from 'sonner';
import {TOAST_OPTIONS} from '@components/constants.ts';
import {LectureScheduleInfo} from '@schedule/types';
import {useIsMobile} from '@components/hook/use-modile.tsx';

interface Props {
  setIsDone: (isDone: boolean) => void;
  setData: (data: LectureScheduleInfo) => void;
}

export default function FileUploadView({ setIsDone, setData }: Props) {
  const isMobile = useIsMobile();

  async function bufferToLectureScheduleInfo(arrayBuffer: ArrayBuffer) {
    try {
      const parser = new ScheduleParser();
      const parsed = await parser.parse(arrayBuffer);
      setData(parsed);
      setIsDone(true);
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

  return (
    <>
      <Toaster expand />
      {!isMobile && <DragDropInput
        onFileUploaded={bufferToLectureScheduleInfo}
        onError={onDragDropErrorHandle}
      />}
      <FileUploadInput
        onFileChange={bufferToLectureScheduleInfo}
      />
    </>
  );
}