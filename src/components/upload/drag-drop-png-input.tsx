import {Card} from '@components/ui/card.tsx';
import {DragEvent} from 'react';
import {InvalidFileExtensionException} from '@components/upload/errors';

interface Props {
  onFileUploaded: (files: File[]) => void;
  onError: (e: Error) => void;
}

function suppress(e: DragEvent) { e.stopPropagation(); e.preventDefault(); }

export default function DragDropPngInput({ onFileUploaded, onError }: Props) {
  async function handleDragDrop(e: DragEvent) {
    suppress(e);
    const fileList = e.dataTransfer.files;

    const files = Array.from(fileList);

    if (!files.every((file) => file.name.endsWith(".png"))) {
      onError(new InvalidFileExtensionException());
      return;
    }

    const pngFiles = files.filter((file) => file.name.endsWith('.png'));

    onFileUploaded(pngFiles);
  }

  return (
    <Card
      className="p-4 w-full flex-1 border-dashed text-center text-muted-foreground justify-center"
      onDrop={handleDragDrop}
      onDragOver={suppress}
      onDragEnter={suppress}
    >
      <h3 className="text-xl break-keep">드래그 앤 드랍으로 파일을 업로드할 수 있습니다.</h3>
      <p className="text-sm">.png 형식의 파일을 지원합니다.</p>
    </Card>
  );
}