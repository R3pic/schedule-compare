import {Input} from '@components/ui/input.tsx';
import {FileInput} from 'lucide-react';
import { Button } from '@components/ui/button.tsx';
import {ChangeEvent, useRef} from 'react';

interface Props {
  onFileChange: (files: File[]) => void;
}

export default function FileMultiUploadInput({ onFileChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleClick() {
    inputRef.current?.click();
  }

  async function onChange(e: ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;

    if (!fileList) return;

    const files = Array.from(fileList);

    onFileChange(files);
  }

  return (
    <Button onClick={handleClick}>
      <FileInput />
      여러 파일 업로드
      <Input ref={inputRef} accept='.png' type='file' className='hidden' onChange={onChange} multiple/>
    </Button>
  );
}