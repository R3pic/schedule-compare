import {Card} from '@components/ui/card.tsx';
import {DragEvent} from 'react';
import {InvalidFileExtensionException} from '@components/upload/errors';

interface Props {
  onFileUploaded: (arrayBuffer: ArrayBuffer) => void;
  onError: (e: Error) => void;
}

function suppress(e: DragEvent) { e.stopPropagation(); e.preventDefault(); }

export default function DragDropInput({ onFileUploaded, onError }: Props) {
  async function handleDragDrop(e: DragEvent) {
    suppress(e);
    const file = e.dataTransfer.files[0];

    if (!file.name.endsWith('.png')) {
      onError(new InvalidFileExtensionException());
      return;
    }

    const arrayBuffer = await file.arrayBuffer();

    onFileUploaded(arrayBuffer);
  }

  return (
    <Card
      className="p-4 w-full flex-1 border-dashed text-center text-muted-foreground justify-center"
      onDrop={handleDragDrop}
      onDragOver={suppress}
      onDragEnter={suppress}
    >
      <h3 className="text-xl">드래그 앤 드랍으로 파일을 업로드하세요</h3>
      <p className="text-sm">.png 형식의 파일을 지원합니다.</p>
    </Card>
  );
}