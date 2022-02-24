import React, { useMemo } from 'react';
import { useDrag } from 'react-use-gesture';

import { FieldAssignmentMap } from './parser';
import { Column } from './ColumnPreview';
import { DragState, Field } from './ColumnDragState';
import { ColumnDragCard } from './ColumnDragCard';
import { createStyles, IconButton, makeStyles } from '@material-ui/core';
import AssignmentReturnIcon from '@material-ui/icons/AssignmentReturn';
import CloseIcon from '@material-ui/icons/Close';

export type FieldTouchedMap = { [name: string]: boolean | undefined };

const useStyles = makeStyles(() =>
  createStyles({
    CSVImporter_ColumnDragTargetArea: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
    },
  }),
);

const useBoxStyles = makeStyles(theme =>
  createStyles({
    CSVImporter_ColumnDragTargetArea__box: {
      flexBasis: '25%',
      flexGrow: 0,
      flexShrink: 1,
      width: 0,
      paddingTop: '1em',
      paddingRight: '1em',
    },
    CSVImporter_ColumnDragTargetArea__boxLabel: {
      marginBottom: '0.25em',
      fontWeight: 'bold',
      color: theme.palette.grey[900],
      wordBreak: 'break-word',
      '& > b': {
        marginLeft: '0.25em',
        color: theme.palette.error.main,
      },
    },
    CSVImporter_ColumnDragTargetArea__boxValue: {
      position: 'relative',
    },
    CSVImporter_ColumnDragTargetArea__boxValueAction: {
      position: 'absolute',
      top: 0,
      right: 0,
      zIndex: 1,
    },
    CSVImporter_ColumnDragTargetArea__boxPlaceholderHelp: {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '98%',
      padding: '0.5em',
      textAlign: 'center',
      color: theme.palette.grey[600],
    },
  }),
);

const TargetBox: React.FC<{
  field: Field;
  touched?: boolean;
  assignedColumn: Column | null;
  dragState: DragState | null;
  eventBinder: (column: Column, startFieldName?: string) => ReturnType<typeof useDrag>;
  onHover: (fieldName: string, isOn: boolean) => void;
  onAssign: (fieldName: string) => void;
  onUnassign: (column: Column) => void;
}> = ({
  field,
  touched,
  assignedColumn,
  dragState,
  eventBinder,
  onHover,
  onAssign,
  onUnassign,
}) => {
  const classes = useBoxStyles();
  const mouseHoverHandlers =
    dragState && dragState.pointerStartInfo
      ? {
          onMouseEnter: () => onHover(field.name, true),
          onMouseLeave: () => onHover(field.name, false),
        }
      : {};

  const sourceColumn =
    dragState && dragState.dropFieldName === field.name ? dragState.column : null;

  // see if currently assigned column is being dragged again
  const isReDragged = dragState ? dragState.column === assignedColumn : false;

  const dragHandlers = useMemo(
    () => (assignedColumn && !isReDragged ? eventBinder(assignedColumn, field.name) : {}),
    [eventBinder, assignedColumn, isReDragged, field.name],
  );

  const valueContents = useMemo(() => {
    if (sourceColumn) {
      return <ColumnDragCard rowCount={3} column={sourceColumn} isDropIndicator />;
    }

    if (assignedColumn) {
      return (
        <ColumnDragCard
          rowCount={3}
          column={assignedColumn}
          isShadow={isReDragged}
          isDraggable={!isReDragged}
        />
      );
    }

    const hasError = touched && !field.isOptional;
    return <ColumnDragCard rowCount={3} hasError={hasError} />;
  }, [field, touched, assignedColumn, sourceColumn, isReDragged]);

  // @todo mouse cursor changes to reflect draggable state
  return (
    <section
      className={classes.CSVImporter_ColumnDragTargetArea__box}
      aria-label={`${field.label} (${field.isOptional ? 'optional' : 'required'})`}
      {...mouseHoverHandlers}
    >
      <div className={classes.CSVImporter_ColumnDragTargetArea__boxLabel} aria-hidden>
        {field.label}
        {field.isOptional ? null : <b>*</b>}
      </div>

      <div className={classes.CSVImporter_ColumnDragTargetArea__boxValue}>
        {!sourceColumn && !assignedColumn && (
          <div className={classes.CSVImporter_ColumnDragTargetArea__boxPlaceholderHelp} aria-hidden>
            Drag column here
          </div>
        )}

        <div {...dragHandlers}>{valueContents}</div>

        {/* tab order after column contents */}
        {dragState && !dragState.pointerStartInfo ? (
          <div className={classes.CSVImporter_ColumnDragTargetArea__boxValueAction}>
            <IconButton
              size={'small'}
              aria-label={`Assign column ${dragState.column.code}`}
              onClick={() => onAssign(field.name)}
            >
              <AssignmentReturnIcon />
            </IconButton>
          </div>
        ) : (
          !sourceColumn &&
          assignedColumn && (
            <div className={classes.CSVImporter_ColumnDragTargetArea__boxValueAction}>
              <IconButton
                size={'small'}
                aria-label={'Clear column assignment'}
                onClick={() => onUnassign(assignedColumn)}
              >
                <CloseIcon />
              </IconButton>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export const ColumnDragTargetArea: React.FC<{
  fields: Field[];
  columns: Column[];
  fieldTouched: FieldTouchedMap;
  fieldAssignments: FieldAssignmentMap;
  dragState: DragState | null;
  eventBinder: (
    // @todo import type from drag state tracker
    column: Column,
    startFieldName?: string,
  ) => ReturnType<typeof useDrag>;
  onHover: (fieldName: string, isOn: boolean) => void;
  onAssign: (fieldName: string) => void;
  onUnassign: (column: Column) => void;
}> = ({
  fields,
  columns,
  fieldTouched,
  fieldAssignments,
  dragState,
  eventBinder,
  onHover,
  onAssign,
  onUnassign,
}) => {
  const classes = useStyles();
  return (
    <section className={classes.CSVImporter_ColumnDragTargetArea} aria-label={'Target fields'}>
      {fields.map(field => {
        const assignedColumnIndex = fieldAssignments[field.name];

        return (
          <TargetBox
            key={field.name}
            field={field}
            touched={fieldTouched[field.name]}
            assignedColumn={assignedColumnIndex !== undefined ? columns[assignedColumnIndex] : null}
            dragState={dragState}
            eventBinder={eventBinder}
            onHover={onHover}
            onAssign={onAssign}
            onUnassign={onUnassign}
          />
        );
      })}
    </section>
  );
};
