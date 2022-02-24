import React, { useMemo } from 'react';

import { PREVIEW_ROW_COUNT } from './parser';
import { Column } from './ColumnPreview';
import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme =>
  createStyles({
    CSVImporter_ColumnDragCard: {
      position: 'relative',
      zIndex: 0,
      padding: '0.5em 0.75em',
      borderRadius: '0.4em',
      background: theme.palette.common.white,
      boxShadow: '0 1px 1px rgba(0 0 0 / 0.25)',
      cursor: 'default',
      "&[data-draggable='true']": {
        cursor: 'grab',
      },
      "&[data-dummy='true']": {
        borderRadius: '0',
        background: theme.palette.grey['100'],
        boxShadow: 'none',
        opacity: '0.5',
        userSelect: 'none',
      },
      "&[data-error='true']": {
        background: '#f8e3e1',
        color: theme.palette.grey['900'],
      },
      "&[data-shadow='true']": {
        background: theme.palette.grey['100'],
        boxShadow: 'none',
        color: 'rgba(0 0 0 / 0.25)',
      },
      "&[data-drop-indicator='true']": {
        boxShadow: '0 1px 2px rgba(0 0 0 / 0.5)',
        color: theme.palette.common.black,
      },
    },
    CSVImporter_ColumnDragCard__cardHeader: {
      margin: '-0.25em -0.5em 0.25em -0.5em',
      height: '1.5em',
      fontWeight: 'bold',
      color: theme.palette.grey['600'],
      '& > b': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        background: theme.palette.grey['100'],
        lineHeight: '1',
      },
      '& > var': {
        display: 'block',
        marginBottom: '-1px',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
      },
    },
    CSVImporter_ColumnDragCard__cardValue: {
      marginTop: '0.25em',
      overflow: 'hidden',
      lineHeight: '1.25em',
      fontSize: '0.75em',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      "&[data-header='true']": {
        textAlign: 'center',
        fontStyle: 'italic',
        color: theme.palette.grey['600'],
      },
      '& + div': {
        marginTop: '0',
      },
    },
  }),
);

// @todo sort out "grabbing" cursor state (does not work with pointer-events:none)
export const ColumnDragCard: React.FC<{
  column?: Column;
  rowCount?: number;
  hasError?: boolean;
  isAssigned?: boolean;
  isShadow?: boolean;
  isDraggable?: boolean;
  isDragged?: boolean;
  isDropIndicator?: boolean;
}> = ({
  column: optionalColumn,
  rowCount = PREVIEW_ROW_COUNT,
  hasError,
  isAssigned,
  isShadow,
  isDraggable,
  isDragged,
  isDropIndicator,
}) => {
  const classes = useStyles();
  const isDummy = !optionalColumn;
  const column = useMemo<Column>(
    () =>
      optionalColumn || {
        index: -1,
        code: '',
        values: [...new Array(PREVIEW_ROW_COUNT)].map(() => ''),
      },
    [optionalColumn],
  );
  const headerValue = column.header;
  const dataValues = column.values.slice(0, headerValue === undefined ? rowCount : rowCount - 1);

  return (
    // not changing variant dynamically because it causes a height jump
    <div
      key={isDummy || isShadow ? 1 : isDropIndicator ? 2 : 0} // force re-creation to avoid transition anim
      className={classes.CSVImporter_ColumnDragCard}
      data-dummy={!!isDummy}
      data-error={!!hasError}
      data-shadow={!!isShadow}
      data-draggable={!!isDraggable}
      data-dragged={!!isDragged}
      data-drop-indicator={!!isDropIndicator}
    >
      <div className={classes.CSVImporter_ColumnDragCard__cardHeader}>
        {isDummy ? <var>Unassigned field</var> : <var>Column {column.code}</var>}
        {isDummy || isAssigned ? '\u00a0' : <b aria-hidden>{column.code}</b>}
      </div>

      {headerValue !== undefined ? (
        <div className={classes.CSVImporter_ColumnDragCard__cardValue} data-header>
          {headerValue || '\u00a0'}
        </div>
      ) : null}

      {/* all values grouped into one readable string */}
      <div>
        {dataValues.map((value, valueIndex) => (
          <div key={valueIndex} className={classes.CSVImporter_ColumnDragCard__cardValue}>
            {value || '\u00a0'}
          </div>
        ))}
      </div>
    </div>
  );
};
