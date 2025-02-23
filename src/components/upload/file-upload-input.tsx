import {Input} from '@components/ui/input.tsx';
import {FileInput} from 'lucide-react';
import { Button } from '@components/ui/button.tsx';
import {ChangeEvent, useRef} from 'react';

interface Props {
  onFileChange: (arrayBuffer: ArrayBuffer) => void;
}

export default function FileUploadInput({ onFileChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleClick() {
    inputRef.current?.click();
  }

  async function onChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    const arrayBuffer = await file.arrayBuffer();

    onFileChange(arrayBuffer);
  }

  return (
    <Button onClick={handleClick}>
      <FileInput />
      파일 업로드
      <Input ref={inputRef} accept='.xls' type='file' className='hidden' onChange={onChange}/>
    </Button>
  );
}