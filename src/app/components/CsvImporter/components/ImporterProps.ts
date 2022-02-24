import React from 'react';
import { CustomizablePapaParseConfig, ParseCallback, BaseRow } from './parser';

// information for displaying a spreadsheet-style column
export interface ImporterPreviewColumn {
  index: number; // 0-based position inside spreadsheet
  header?: string; // header, if present
  values: string[]; // row values after the header
}

export interface ImporterFilePreview {
  rawData: string; // raw first data chunk consumed by parser for preview
  columns: ImporterPreviewColumn[]; // per-column parsed preview
  skipHeaders: boolean; // true if user has indicated that file has no headers
  // @ts-ignore
  parseWarning?: Papa.ParseError; // any non-blocking PapaParse message
}

// separate props definition to safely include in tests
export interface ImportInfo {
  file: File;
  preview: ImporterFilePreview;
  fields: string[]; // list of fields that user has assigned
  columnFields: (string | undefined)[]; // per-column list of field names (or undefined if unassigned)
}

export type ImporterContentRenderProp = (info: {
  file: File | null;
  preview: ImporterFilePreview | null;
}) => React.ReactNode;

export interface ImporterFieldProps {
  name: string;
  label: string;
  optional?: boolean;
}

export interface ImporterProps<Row extends BaseRow> extends CustomizablePapaParseConfig {
  chunkSize?: number;
  assumeNoHeaders?: boolean;
  restartable?: boolean;
  processChunk: ParseCallback<Row>;
  results?: {
    error_record_count: number;
    inserted_record_count: number;
    error_records: number[];
  };
  onStart?: (info: ImportInfo) => void;
  onComplete?: (info: ImportInfo) => void;
  onClose: () => void;
  children?: ImporterContentRenderProp | React.ReactNode;
}
