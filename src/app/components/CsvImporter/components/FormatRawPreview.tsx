import React from 'react';

import { FormatErrorMessage } from './FormatErrorMessage';
import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme =>
  createStyles({
    CSVImporter_FormatRawPreview__scroll: {
      marginBottom: '1.2em',
      height: '6em',
      overflow: 'auto',
      borderRadius: '0.4em',
      background: theme.palette.grey[800],
      color: theme.palette.grey[200],
    },
    CSVImporter_FormatRawPreview__pre: {
      margin: 0,
      padding: '0.5em 1em',
      lineHeight: '1.25',
      fontSize: '1em',
      fontFamily: 'monospace',
      '& > aside': {
        display: 'inline-block',
        marginLeft: '0.2em',
        borderRadius: '0.2em',
        background: theme.palette.common.white,
        fontSize: '0.75em',
        color: theme.palette.grey[600],
        opacity: '0.75',
      },
    },
  }),
);

const RAW_PREVIEW_SIZE = 500;

export const FormatRawPreview: React.FC<{
  chunk: string;
  // @ts-ignore
  warning?: Papa.ParseError;
  onCancelClick: () => void;
  // eslint-disable-next-line react/display-name
}> = React.memo(({ chunk, warning, onCancelClick }) => {
  const classes = useStyles();
  const chunkSlice = chunk.slice(0, RAW_PREVIEW_SIZE);
  const chunkHasMore = chunk.length > RAW_PREVIEW_SIZE;

  return (
    <div>
      <div className={classes.CSVImporter_FormatRawPreview__scroll}>
        <pre className={classes.CSVImporter_FormatRawPreview__pre}>
          {chunkSlice}
          {chunkHasMore && <aside>...</aside>}
        </pre>
      </div>

      {warning ? (
        <FormatErrorMessage onCancelClick={onCancelClick}>
          {warning.message || String(warning)}: please check data formatting
        </FormatErrorMessage>
      ) : null}
    </div>
  );
});
