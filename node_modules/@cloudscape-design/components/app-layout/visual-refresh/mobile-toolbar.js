// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import clsx from 'clsx';
import { InternalButton } from '../../button/internal';
import { MobileTriggers as DrawersMobileTriggers } from './drawers';
import { useAppLayoutInternals } from './context';
import styles from './styles.css.js';
import testutilStyles from '../test-classes/styles.css.js';
export default function MobileToolbar() {
    var _a, _b, _c;
    const { ariaLabels, breadcrumbs, drawers, handleNavigationClick, handleToolsClick, hasDrawerViewportOverlay, isMobile, isNavigationOpen, isToolsOpen, navigationHide, navigationRefs, toolsHide, toolsRefs, } = useAppLayoutInternals();
    if (!isMobile || (navigationHide && !breadcrumbs && toolsHide && !drawers)) {
        return null;
    }
    return (React.createElement("section", { className: clsx(styles['mobile-toolbar'], {
            [styles['has-breadcrumbs']]: breadcrumbs,
            [styles.unfocusable]: hasDrawerViewportOverlay,
            [testutilStyles['mobile-bar']]: isMobile,
        }, testutilStyles['mobile-bar'], 'awsui-context-content-header') },
        !navigationHide && (React.createElement("nav", { "aria-hidden": isNavigationOpen, className: clsx(styles['mobile-toolbar-nav'], { [testutilStyles['drawer-closed']]: !isNavigationOpen }) },
            React.createElement(InternalButton, { ariaLabel: (_a = ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.navigationToggle) !== null && _a !== void 0 ? _a : undefined, ariaExpanded: isNavigationOpen ? undefined : false, iconName: "menu", formAction: "none", onClick: () => handleNavigationClick(true), variant: "icon", className: testutilStyles['navigation-toggle'], ref: navigationRefs.toggle, disabled: hasDrawerViewportOverlay, __nativeAttributes: { 'aria-haspopup': isNavigationOpen ? undefined : true } }))),
        breadcrumbs && (React.createElement("div", { className: clsx(styles['mobile-toolbar-breadcrumbs'], testutilStyles.breadcrumbs) }, breadcrumbs)),
        isMobile && !toolsHide && !drawers && (React.createElement("aside", { "aria-hidden": isToolsOpen, "aria-label": (_b = ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.tools) !== null && _b !== void 0 ? _b : undefined, className: clsx(styles['mobile-toolbar-tools'], { [testutilStyles['drawer-closed']]: !isToolsOpen }) },
            React.createElement(InternalButton, { className: testutilStyles['tools-toggle'], ariaExpanded: isToolsOpen, disabled: hasDrawerViewportOverlay, ariaLabel: (_c = ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.toolsToggle) !== null && _c !== void 0 ? _c : undefined, iconName: "status-info", formAction: "none", onClick: () => handleToolsClick(true), variant: "icon", ref: toolsRefs.toggle, __nativeAttributes: { 'aria-haspopup': true } }))),
        React.createElement(DrawersMobileTriggers, null)));
}
//# sourceMappingURL=mobile-toolbar.js.map