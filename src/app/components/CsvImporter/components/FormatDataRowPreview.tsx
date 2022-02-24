import React from 'react';

import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme =>
  createStyles({
    CSVImporter_FormatDataRowPreview: {
      maxHeight: '12em',
      minHeight: '6em',
      border: `1px solid ${theme.palette.grey[600]}`,
      overflow: 'scroll',
    },
    CSVImporter_FormatDataRowPreview__table: {
      width: '100%',
      borderSpacing: 0,
      borderCollapse: 'collapse',
      '& > thead > tr > th': {
        fontStyle: 'italic',
        fontWeight: 'normal',
        color: theme.palette.grey[600],
      },
      '& > thead > tr > th, & > tbody > tr > td': {
        borderRight: `1px solid ${theme.palette.grey[300]}`,
        padding: '0.5em 0.5em',
        lineHeight: 1,
        fontSize: '0.75em',
        whiteSpace: 'no-wrap',
        '&:last-child': {
          borderRight: 'none',
        },
      },
      '& > thead + tbody > tr:first-child > td, & > tbody > tr + tr > td': {
        paddingTop: 0,
      },
    },
  }),
);

export const FormatDataRowPreview: React.FC<{
  hasHeaders: boolean;
  rows: string[][];
  // eslint-disable-next-line react/display-name
}> = React.memo(({ hasHeaders, rows }) => {
  const classes = useStyles();
  const headerRow = hasHeaders ? rows[0] : null;
  const bodyRows = hasHeaders ? rows.slice(1) : rows;

  return (
    <div className={classes.CSVImporter_FormatDataRowPreview}>
      <table className={classes.CSVImporter_FormatDataRowPreview__table}>
        {headerRow && (
          <thead>
            <tr>
              {headerRow.map((item, itemIndex) => (
                <th key={itemIndex}>{item}</th>
              ))}
            </tr>
          </thead>
        )}

        <tbody>
          {bodyRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((item, itemIndex) => (
                <td key={itemIndex}>{item}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
