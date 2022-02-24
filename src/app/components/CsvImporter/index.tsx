import * as React from 'react';
import { Importer, ImporterField } from './components/Importer';
import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme =>
  createStyles({
    CSVImporter_Wrapper: {
      position: 'relative',
      display: 'block',
    },
  }),
);

interface CsvImporterProps {
  id: string;
  fields: { value: string; label: string }[];
  sending?: boolean;
  style?: object;
  results?: {
    error_record_count: number;
    inserted_record_count: number;
    error_records: number[];
  };
  onClose: () => void;
  processRequest: (row: any) => void;
}

const CSVImporter = React.memo(function CSVImporter(props: CsvImporterProps) {
  const classes = useStyles();
  let output = [];
  return (
    <div id={`${props.id}_wrapper`} style={props.style} className={classes.CSVImporter_Wrapper}>
      <Importer
        assumeNoHeaders={false}
        restartable
        results={props.results}
        processChunk={async rows => {
          // @ts-ignore
          output = output.concat(rows);
        }}
        onComplete={() => {
          props.processRequest(output);
          output.length = 0;
        }}
        onClose={props.onClose}
      >
        {props.fields.map(field => (
          <ImporterField key={field.value} name={field.value} label={field.label} />
        ))}
      </Importer>
    </div>
  );
});

export default CSVImporter;
