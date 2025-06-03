import React from 'react';
import { Thumbnail } from './PreviewPhotoStyled';

type Imagem = {
  id: number;
  url: string;
  carroId: number;
  principal?: boolean;
};

interface CustomFile extends File {
  principal?: boolean;
}

type FileOrImagem = CustomFile | Imagem;

interface ImagePreviewProps {
  files: FileOrImagem[]; // <- o nome da prop é "files"
  onSetPrincipal: (index: number) => void;
}

function isCustomFile(file: FileOrImagem): file is CustomFile {
  return file instanceof File;
}
 const baseUrl = "https://my-first-project-repo-production.up.railway.app";
const ImagePreview: React.FC<ImagePreviewProps> = ({ files, onSetPrincipal }) => {
  if (files.length === 0) return null;

  return (
    <>
      {files.map((file, index) => (
        <Thumbnail
          key={index}
          isPrincipal={file.principal || false}
          onClick={() => onSetPrincipal(index)}
        >
          <img
            src={
              isCustomFile(file)
                ? URL.createObjectURL(file)
                : `${baseUrl}/uploads/carros/${file.url}`
            }
            alt={`Imagem ${index + 1}`}
          />
          <div>
            <label>
              Principal:
              <input
                type="checkbox"
                checked={file.principal || false}
                onChange={() => onSetPrincipal(index)}
              />
            </label>
          </div>
        </Thumbnail>
      ))}
    </>
  );
};

export default ImagePreview;
