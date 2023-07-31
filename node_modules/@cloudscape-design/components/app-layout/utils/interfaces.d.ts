import React from 'react';
export interface SizeControlProps {
    position: 'side' | 'bottom';
    panelRef?: React.RefObject<HTMLDivElement>;
    handleRef?: React.RefObject<HTMLDivElement>;
    setSidePanelWidth: (width: number) => void;
    setBottomPanelHeight: (height: number) => void;
    hasTransitions?: boolean;
}
//# sourceMappingURL=interfaces.d.ts.map