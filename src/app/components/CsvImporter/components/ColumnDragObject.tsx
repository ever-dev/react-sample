import React, { useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

import { ColumnDragCard } from './ColumnDragCard';
import { DragState } from './ColumnDragState';
import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    CSVImporter_ColumnDragObject: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      pointerEvents: 'none',
      zIndex: 2,
    },
    CSVImporter_ColumnDragObject__holder: {
      position: 'absolute',
      left: '-50%',
      top: '-50%',
      width: '100%',
      opacity: 0.9,
    },
  }),
);

export const ColumnDragObject: React.FC<{
  dragState: DragState | null;
}> = ({ dragState }) => {
  const classes = useStyles();
  const referenceBoxRef = useRef<HTMLDivElement | null>(null);

  // @todo wrap in a no-events overlay to clip against screen edges
  const dragBoxRef = useRef<HTMLDivElement | null>(null);
  const dragObjectPortal =
    dragState && dragState.pointerStartInfo
      ? createPortal(
          <div className={classes.CSVImporter_ColumnDragObject} ref={dragBoxRef}>
            <div className={classes.CSVImporter_ColumnDragObject__holder}>
              <ColumnDragCard column={dragState.column} isDragged />
            </div>
          </div>,
          document.body,
        )
      : null;

  // set up initial position
  const pointerStartInfo = dragState && dragState.pointerStartInfo;
  useLayoutEffect(() => {
    if (!pointerStartInfo || !dragBoxRef.current) {
      return;
    }

    const { initialXY, initialWidth, initialHeight } = pointerStartInfo;

    dragBoxRef.current.style.left = `${initialXY[0]}px`;
    dragBoxRef.current.style.top = `${initialXY[1]}px`;
    dragBoxRef.current.style.width = `${initialWidth}px`;
    dragBoxRef.current.style.height = `${initialHeight}px`;

    // copy known font style from main content
    // @todo consider other text style properties?
    if (referenceBoxRef.current) {
      const computedStyle = window.getComputedStyle(referenceBoxRef.current);
      dragBoxRef.current.style.fontFamily = computedStyle.fontFamily;
      dragBoxRef.current.style.fontSize = computedStyle.fontSize;
      dragBoxRef.current.style.fontWeight = computedStyle.fontWeight;
      dragBoxRef.current.style.fontStyle = computedStyle.fontStyle;
      dragBoxRef.current.style.letterSpacing = computedStyle.letterSpacing;
    }
  }, [pointerStartInfo]);

  // subscribe to live position updates without state changes
  useLayoutEffect(() => {
    if (dragState) {
      dragState.updateListener = (xy: number[]) => {
        if (!dragBoxRef.current) {
          return;
        }

        dragBoxRef.current.style.left = `${xy[0]}px`;
        dragBoxRef.current.style.top = `${xy[1]}px`;
      };
    }
  }, [dragState]);

  return <div ref={referenceBoxRef}>{dragObjectPortal}</div>;
};
