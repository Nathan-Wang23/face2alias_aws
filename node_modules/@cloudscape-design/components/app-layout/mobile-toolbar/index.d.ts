import React from 'react';
import { ButtonProps } from '../../button/interfaces';
import { AppLayoutProps } from '../interfaces';
import { DrawerItem } from '../drawer/interfaces';
interface MobileToolbarProps {
    anyPanelOpen: boolean | undefined;
    unfocusable: boolean | undefined;
    toggleRefs: {
        navigation: React.Ref<ButtonProps.Ref>;
        tools: React.Ref<ButtonProps.Ref>;
    };
    navigationHide: boolean | undefined;
    toolsHide: boolean | undefined;
    topOffset?: number;
    ariaLabels?: AppLayoutProps.Labels;
    mobileBarRef: React.Ref<HTMLDivElement>;
    children: React.ReactNode;
    onNavigationOpen: () => void;
    onToolsOpen: () => void;
    drawers?: {
        items: Array<DrawerItem>;
        activeDrawerId: string | undefined;
        onChange: (changeDetail: {
            activeDrawerId: string | undefined;
        }) => void;
        ariaLabel?: string;
    };
}
export declare function MobileToolbar({ ariaLabels, toggleRefs, topOffset, navigationHide, toolsHide, anyPanelOpen, unfocusable, children, onNavigationOpen, onToolsOpen, drawers, mobileBarRef, }: MobileToolbarProps): JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map