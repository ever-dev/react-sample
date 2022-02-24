import React, { useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { createStyles, makeStyles } from '@material-ui/core';
import PrimaryButton from '../../PrimaryButton';

const useStyles = makeStyles(theme =>
  createStyles({
    CSVImporter_FileSelector: {
      border: `0.25em dashed ${theme.palette.grey[900]}`,
      padding: '4em',
      borderRadius: '0.4em',
      background: theme.palette.grey[100],
      textAlign: 'center',
      color: theme.palette.grey[900],
      cursor: 'pointer',
      transition: 'background 0.1s ease-out',
      "&[data-active='true']": {
        background: theme.palette.grey[300],
      },
    },
  }),
);

export const FileSelector: React.FC<{
  onSelected: (file: File) => void;
  onClose: () => void;
}> = ({ onSelected, onClose }) => {
  const classes = useStyles();
  const onSelectedRef = useRef(onSelected);
  onSelectedRef.current = onSelected;

  const dropHandler = useCallback((acceptedFiles: File[]) => {
    // silently ignore if nothing to do
    if (acceptedFiles.length < 1) {
      return;
    }

    const file = acceptedFiles[0];
    onSelectedRef.current(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: dropHandler,
  });

  return (
    <>
      <div
        className={classes.CSVImporter_FileSelector}
        data-active={!!isDragActive}
        {...getRootProps()}
      >
        <input {...getInputProps()} />

        {isDragActive ? (
          <span>Drop CSV file here...</span>
        ) : (
          <span>Drag-and-drop CSV file here, or click to select in folder</span>
        )}
      </div>
      <PrimaryButton
        id={'csv_uploader_cancel_btn'}
        variant={'text'}
        onClick={onClose}
        style={{ marginTop: '16px' }}
      >
        Cancel
      </PrimaryButton>
    </>
  );
};
