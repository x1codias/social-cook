import {
  AddRounded,
  CloseRounded,
  EditRounded,
} from '@mui/icons-material';
import theme from '../../../themes/global.theme';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './styles';

type ImageInputProps = {
  onImageChanged: (file: File) => void;
  onDeleteImage: (fileName: string) => void;
};

const ImageInput: React.FC<ImageInputProps> = ({
  onImageChanged,
  onDeleteImage,
}): JSX.Element => {
  const { ImageContainer } = styles;
  const [imagePreview, setImagePreview] = useState<
    string | ArrayBuffer | null
  >('');
  const [showEditBtn, setShowEditBtn] = useState(false);
  const [filename, setFilename] = useState('');

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
          setImagePreview(reader.result);
        };

        reader.readAsDataURL(file);
        setFilename(file.name);
        onImageChanged(file);
      }
    },
    [onImageChanged]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    maxFiles: 1,
  });

  return (
    <ImageContainer
      {...getRootProps()}
      imgUrl={imagePreview}
      onMouseEnter={() =>
        (imagePreview as string).trim().length > 0 &&
        setShowEditBtn(true)
      }
      onMouseLeave={() =>
        (imagePreview as string).trim().length > 0 &&
        setShowEditBtn(false)
      }
    >
      <input {...getInputProps()} />

      {showEditBtn && (
        <div
          style={{
            position: 'absolute', // Position absolutely within the container
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)', // Center the icon
            backgroundColor: theme.palette.default.primary,
            borderRadius: '30px',
            border: `3px solid ${theme.palette.default.dark}`,
            zIndex: 2,
            padding: '8px',
            pointerEvents: 'none', // Make sure the icon is not clickable to avoid interfering with dropzone
          }}
        >
          <EditRounded
            style={{
              fontSize: '36px',
              fill: theme.palette.customBackground.input,
            }}
          />
        </div>
      )}

      {(imagePreview as string).trim().length === 0 ? (
        <AddRounded
          style={{
            fontSize: '46px',
            fill: theme.palette.customBackground.input,
            backgroundColor: theme.palette.default.primary,
            borderRadius: '8px 0 0 0',
            borderLeft: `3px solid ${theme.palette.default.dark}`,
            borderTop: `3px solid ${theme.palette.default.dark}`,
            zIndex: 2,
          }}
        />
      ) : (
        <CloseRounded
          style={{
            fontSize: '46px',
            fill: theme.palette.customBackground.input,
            backgroundColor: theme.palette.default.primary,
            borderRadius: '8px 0 0 0',
            borderLeft: `3px solid ${theme.palette.default.dark}`,
            borderTop: `3px solid ${theme.palette.default.dark}`,
            zIndex: 2,
            pointerEvents: 'auto', // Ensure the icon is clickable for other interactions if needed
          }}
          onClick={e => {
            e.stopPropagation();
            onDeleteImage(filename);
            setImagePreview('');
            setShowEditBtn(false);
          }}
        />
      )}
    </ImageContainer>
  );
};

export default ImageInput;
