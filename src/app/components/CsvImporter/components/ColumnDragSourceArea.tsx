import React, { useState, useMemo } from 'react';
import { useDrag } from 'react-use-gesture';

import { FieldAssignmentMap } from './parser';
import { Column } from './ColumnPreview';
import { DragState } from './ColumnDragState';
import { ColumnDragCard } from './ColumnDragCard';
import { createStyles, IconButton, makeStyles } from '@material-ui/core';
import ReplayIcon from '@material-ui/icons/Replay';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';

const useStyles = makeStyles(() =>
  createStyles({
    CSVImporter_ColumnDragSourceArea: {
      display: 'flex',
      marginTop: '0.5em',
      marginBottom: '1em',
    },
    CSVImporter_ColumnDragSourceArea__control: {
      flex: 'none',
      display: 'flex',
      alignItems: 'center',
    },
    CSVImporter_ColumnDragSourceArea__page: {
      position: 'relative',
      flex: '1 1 0',
      display: 'flex',
      paddingTop: '0.5em',
      paddingLeft: '0.5em',
    },
    CSVImporter_ColumnDragSourceArea__pageIndicator: {
      position: 'absolute',
      top: '-1em',
      right: 0,
      left: 0,
      textAlign: 'center',
      fontSize: '0.75em',
    },
    CSVImporter_ColumnDragSourceArea__pageFiller: {
      flex: '1 1 0',
      marginRight: '0.5em',
    },
  }),
);

const useBoxStyles = makeStyles(() =>
  createStyles({
    CSVImporter_ColumnDragSourceArea__box: {
      position: 'relative',
      flex: '1 1 0',
      marginRight: '0.5em',
      width: 0,
    },
    CSVImporter_ColumnDragSourceArea__boxAction: {
      position: 'absolute',
      top: 0,
      right: 0,
      zIndex: 1,
    },
    CSVImporter_ColumnDragSourceArea__boxAction__focusOnly: {
      opacity: 0,
      '&:hover': {
        opacity: '0.5',
      },
      '&:focus': {
        opacity: 1,
      },
    },
  }),
);

const SOURCES_PAGE_SIZE = 5; // fraction of 10 for easier counting

// @todo readable status text if not mouse-drag
const SourceBox: React.FC<{
  column: Column;
  fieldAssignments: FieldAssignmentMap;
  dragState: DragState | null;
  eventBinder: (column: Column) => ReturnType<typeof useDrag>;
  onSelect: (column: Column) => void;
  onUnassign: (column: Column) => void;
}> = ({ column, fieldAssignments, dragState, eventBinder, onSelect, onUnassign }) => {
  const classes = useBoxStyles();
  const isDragged = dragState ? column === dragState.column : false;

  const isAssigned = useMemo(
    () =>
      Object.keys(fieldAssignments).some(fieldName => fieldAssignments[fieldName] === column.index),
    [fieldAssignments, column],
  );

  const eventHandlers = useMemo(() => eventBinder(column), [eventBinder, column]);

  return (
    <div className={classes.CSVImporter_ColumnDragSourceArea__box}>
      <div {...(isAssigned ? {} : eventHandlers)}>
        <ColumnDragCard
          column={column}
          isAssigned={isAssigned}
          isShadow={isDragged || isAssigned}
          isDraggable={!dragState && !isDragged && !isAssigned}
        />
      </div>

      {/* tab order after column contents */}
      <div className={classes.CSVImporter_ColumnDragSourceArea__boxAction}>
        {isAssigned ? (
          <IconButton
            size={'small'}
            aria-label={'Clear column assignment'}
            onClick={() => onUnassign(column)}
          >
            <ReplayIcon />
          </IconButton>
        ) : (
          <IconButton
            key={'dragSelect'}
            size={'small'}
            className={classes.CSVImporter_ColumnDragSourceArea__boxAction__focusOnly}
            aria-label={
              dragState && dragState.column === column
                ? 'Unselect column'
                : 'Select column for assignment'
            }
            onClick={() => onSelect(column)}
          >
            <AssignmentReturnedIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
};

// @todo current page indicator (dots)
export const ColumnDragSourceArea: React.FC<{
  columns: Column[];
  fieldAssignments: FieldAssignmentMap;
  dragState: DragState | null;
  eventBinder: (column: Column) => ReturnType<typeof useDrag>;
  onSelect: (column: Column) => void;
  onUnassign: (column: Column) => void;
}> = ({ columns, fieldAssignments, dragState, eventBinder, onSelect, onUnassign }) => {
  const classes = useStyles();
  const [page, setPage] = useState<number>(0);
  const [pageChanged, setPageChanged] = useState<boolean>(false);
  const pageCount = Math.ceil(columns.length / SOURCES_PAGE_SIZE);

  const start = page * SOURCES_PAGE_SIZE;
  const pageContents = columns
    .slice(start, start + SOURCES_PAGE_SIZE)
    .map((column, columnIndex) => (
      <SourceBox
        key={columnIndex}
        column={column}
        fieldAssignments={fieldAssignments}
        dragState={dragState}
        eventBinder={eventBinder}
        onSelect={onSelect}
        onUnassign={onUnassign}
      />
    ));

  while (pageContents.length < SOURCES_PAGE_SIZE) {
    pageContents.push(
      <div
        key={pageContents.length}
        className={classes.CSVImporter_ColumnDragSourceArea__pageFiller}
      />,
    );
  }

  return (
    <section className={classes.CSVImporter_ColumnDragSourceArea} aria-label={'Columns to import'}>
      <div className={classes.CSVImporter_ColumnDragSourceArea__control}>
        <IconButton
          aria-label={'Show previous columns'}
          disabled={page === 0}
          onClick={() => {
            setPage(prev => Math.max(0, prev - 1));
            setPageChanged(true);
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>
      </div>
      <div className={classes.CSVImporter_ColumnDragSourceArea__page}>
        {dragState && !dragState.pointerStartInfo ? (
          <div className={classes.CSVImporter_ColumnDragSourceArea__pageIndicator} role={'status'}>
            Assigning column {dragState.column.code}
          </div>
        ) : (
          // show page number if needed (and treat as status role if it has changed)
          // @todo changing role to status does not seem to work
          pageCount > 1 && (
            <div
              className={classes.CSVImporter_ColumnDragSourceArea__pageIndicator}
              role={pageChanged ? 'status' : 'text'}
            >
              Page {page + 1} of {pageCount}
            </div>
          )
        )}

        {pageContents}
      </div>
      <div className={classes.CSVImporter_ColumnDragSourceArea__control}>
        <IconButton
          aria-label={'Show next columns'}
          disabled={page === pageCount - 1}
          onClick={() => {
            setPage(prev => Math.min(pageCount - 1, prev + 1));
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
    </section>
  );
};
