import React from 'react';
import { useTranslation } from 'react-i18next';

import { ImageType } from 'react-images-uploading/dist/typings';

import { createStyles, makeStyles } from '@material-ui/core';
import PrimaryButton from 'app/components/PrimaryButton';
import { lang } from 'locales/translations';

const useStyles = makeStyles(() =>
  createStyles({
    uploaderButton: {
      marginLeft: '16px',
    },
  }),
);

interface ImageFileDisplayProps {
  image: ImageType;
  onSubmit: () => void;
  onUpdate: () => void;
  onCancel: () => void;
}

export default function ImageFileDisplay({
  image,
  onSubmit,
  onUpdate,
  onCancel,
}: ImageFileDisplayProps) {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <>
      <img
        src={image['data_url']}
        alt={'large organization logo'}
        width={'200'}
        onClick={onUpdate}
      />
      <PrimaryButton
        id={'update_org_image_btn'}
        onClick={onSubmit}
        className={classes.uploaderButton}
      >
        {t(lang.action.update)}
      </PrimaryButton>
      <PrimaryButton
        id={'remove_org_image_btn'}
        variant={'outlined'}
        onClick={onCancel}
        className={classes.uploaderButton}
      >
        {t(lang.action.cancel)}
      </PrimaryButton>
    </>
  );
}
