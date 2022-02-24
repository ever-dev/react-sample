import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { lang } from 'locales/translations';

const useStyles = makeStyles(theme =>
  createStyles({
    fileSelector: {
      width: '100%',
      border: `0.25em dashed ${theme.palette.grey[900]}`,
      padding: '4em',
      borderRadius: '0.4em',
      cursor: 'pointer',
      background: theme.palette.grey[100],
      textAlign: 'center',
      color: theme.palette.grey[900],
      transition: 'background 0.1s ease-out',
    },
    fileDragging: {
      background: theme.palette.grey[300],
    },
  }),
);

interface ImageFileSelectorProps {
  isDragging: boolean;
  onClick: () => void;
  dragProps: {
    onDrop: (e: any) => void;
    onDragEnter: (e: any) => void;
    onDragLeave: (e: any) => void;
    onDragOver: (e: any) => void;
    onDragStart: (e: any) => void;
  };
}

export default function ImageFileSelector({
  isDragging,
  onClick,
  dragProps,
}: ImageFileSelectorProps) {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <button
      className={`${classes.fileSelector} ${isDragging ? classes.fileDragging : ''}`}
      onClick={onClick}
      {...dragProps}
    >
      {isDragging ? t(lang.action.confirm_drop) : t(lang.action.drag_and_drop)}
    </button>
  );
}
