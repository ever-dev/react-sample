import React from 'react';
import ImageUploading from 'react-images-uploading';
import ImageFileSelector from './components/FileSelector';
import ImageFileDisplay from './components/FileDisplay';

export default function ImageImporter() {
  const [images, setImages] = React.useState([]);

  const onChange = imageList => {
    setImages(imageList);
  };

  const onSubmit = () => {
    console.log('submit image', images[0]);
  };

  return (
    <ImageUploading value={images} onChange={onChange} dataURLKey={'data_url'}>
      {({ imageList, onImageUpload, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
        <div>
          {imageList[0] ? (
            <ImageFileDisplay
              image={imageList[0]}
              onSubmit={onSubmit}
              onUpdate={() => onImageUpdate(0)}
              onCancel={() => onImageRemove(0)}
            />
          ) : (
            <ImageFileSelector
              isDragging={isDragging}
              onClick={onImageUpload}
              dragProps={dragProps}
            />
          )}
        </div>
      )}
    </ImageUploading>
  );
}
