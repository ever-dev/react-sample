import React, { useMemo, useRef, useEffect, useState } from 'react';

import { parsePreview, PreviewError, PreviewBase, CustomizablePapaParseConfig } from './parser';
import { ImporterFrame } from './ImporterFrame';
import { FormatRawPreview } from './FormatRawPreview';
import { FormatDataRowPreview } from './FormatDataRowPreview';
import { FormatErrorMessage } from './FormatErrorMessage';
import { Checkbox, createStyles, FormControlLabel, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme =>
  createStyles({
    CSVImporter_FormatPreview__header: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '0.5em',
      fontSize: '1.15em',
      color: theme.palette.grey[600],
    },
    CSVImporter_FormatPreview__headerToggle: {
      marginLeft: '1em',
    },
    CSVImporter_FormatPreview__mainResultBlock: {},
    CSVImporter_FormatPreview__mainPendingBlock: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2em',
      color: theme.palette.grey[600],
    },
  }),
);

export interface Preview extends PreviewBase {
  hasHeaders: boolean;
}

export const FormatPreview: React.FC<{
  customConfig: CustomizablePapaParseConfig;
  file: File;
  assumeNoHeaders?: boolean;
  currentPreview: Preview | null;
  onChange: (preview: Preview | null) => void;
  onAccept: () => void;
  onCancel: () => void;
  onClose: () => void;
}> = ({
  customConfig,
  file,
  assumeNoHeaders,
  currentPreview,
  onChange,
  onAccept,
  onCancel,
  onClose,
}) => {
  const classes = useStyles();
  // augmented PreviewResults from parser
  const [preview, setPreview] = useState<
    | PreviewError
    | ({
        parseError: undefined;
      } & Preview)
    | null
  >(
    () =>
      currentPreview && {
        parseError: undefined,
        ...currentPreview,
      },
  );

  // wrap in ref to avoid triggering effect
  const customConfigRef = useRef(customConfig);
  customConfigRef.current = customConfig;
  const assumeNoHeadersRef = useRef(assumeNoHeaders);
  assumeNoHeadersRef.current = assumeNoHeaders;
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  // notify of current state
  useEffect(() => {
    // @ts-ignore
    onChangeRef.current(preview && !preview.parseError ? preview : null);
  }, [preview]);

  // perform async preview parse
  const asyncLockRef = useRef<number>(0);
  useEffect(() => {
    // avoid re-parsing if already set up a preview for this file
    // @ts-ignore
    if (preview && !preview.parseError && preview.file === file) {
      return;
    }

    const oplock = asyncLockRef.current;

    parsePreview(file, customConfigRef.current).then(results => {
      // ignore if stale
      if (oplock !== asyncLockRef.current) {
        return;
      }

      if (results.parseError) {
        setPreview(results);
      } else {
        // pre-fill headers flag (only possible with >1 lines)
        // @ts-ignore
        const hasHeaders = !assumeNoHeadersRef.current && !results.isSingleLine;

        setPreview({ ...results, hasHeaders });
      }
    });

    return () => {
      // invalidate current oplock on change or unmount
      asyncLockRef.current += 1;
    };
  }, [file, preview]);

  const report = useMemo(
    () => {
      if (!preview) {
        return null;
      }

      if (preview.parseError) {
        return (
          <div className={classes.CSVImporter_FormatPreview__mainResultBlock}>
            <FormatErrorMessage onCancelClick={onCancel}>
              Import error: <b>{preview.parseError.message || String(preview.parseError)}</b>
            </FormatErrorMessage>
          </div>
        );
      }

      return (
        <div className={classes.CSVImporter_FormatPreview__mainResultBlock}>
          <div className={classes.CSVImporter_FormatPreview__header}>Raw File Contents</div>

          <FormatRawPreview
            chunk={
              // @ts-ignore
              preview.firstChunk
            }
            warning={
              // @ts-ignore
              preview.parseWarning
            }
            onCancelClick={onCancel}
          />

          {
            // @ts-ignore
            preview.parseWarning ? null : (
              <>
                <div className={classes.CSVImporter_FormatPreview__header}>
                  Preview Import
                  {
                    // @ts-ignore
                    !preview.isSingleLine && ( // hide setting if only one line anyway
                      <FormControlLabel
                        className={classes.CSVImporter_FormatPreview__headerToggle}
                        control={
                          <Checkbox
                            id={'csv_has_headers_toggle'}
                            color={'primary'}
                            checked={
                              // @ts-ignore
                              preview.hasHeaders
                            }
                            onChange={() => {
                              setPreview(prev =>
                                prev && !prev.parseError
                                  ? {
                                      ...prev,
                                      // @ts-ignore
                                      hasHeaders: !prev.hasHeaders,
                                    }
                                  : prev,
                              );
                            }}
                          />
                        }
                        label={'Data has headers'}
                      />
                    )
                  }
                </div>
                <FormatDataRowPreview
                  hasHeaders={
                    // @ts-ignore
                    preview.hasHeaders
                  }
                  rows={
                    // @ts-ignore
                    preview.firstRows
                  }
                />
              </>
            )
          }
        </div>
      );
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [preview, onCancel],
  );

  return (
    <ImporterFrame
      fileName={file.name}
      step={0}
      onSecondary={onCancel}
      nextDisabled={
        !preview ||
        !!preview.parseError ||
        // @ts-ignore
        !!preview.parseWarning
      }
      onNext={() => {
        if (!preview || preview.parseError) {
          throw new Error('unexpected missing preview info');
        }
        onAccept();
      }}
      onClose={onClose}
    >
      {report || (
        <div className={classes.CSVImporter_FormatPreview__mainPendingBlock}>
          Loading preview...
        </div>
      )}
    </ImporterFrame>
  );
};
