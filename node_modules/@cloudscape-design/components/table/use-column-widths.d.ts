import React from 'react';
export declare const DEFAULT_COLUMN_WIDTH = 120;
export interface ColumnWidthDefinition {
    id: PropertyKey;
    minWidth?: string | number;
    width?: string | number;
}
interface WidthsContext {
    totalWidth: number;
    columnWidths: Record<PropertyKey, number>;
    updateColumn: (columnId: PropertyKey, newWidth: number) => void;
    setCell: (columnId: PropertyKey, node: null | HTMLElement) => void;
}
declare const WidthsContext: React.Context<WidthsContext>;
interface WidthProviderProps {
    visibleColumns: readonly ColumnWidthDefinition[];
    resizableColumns: boolean | undefined;
    children: React.ReactNode;
}
export declare function ColumnWidthsProvider({ visibleColumns, resizableColumns, children }: WidthProviderProps): JSX.Element;
export declare function useColumnWidths(): WidthsContext;
export {};
//# sourceMappingURL=use-column-widths.d.ts.map