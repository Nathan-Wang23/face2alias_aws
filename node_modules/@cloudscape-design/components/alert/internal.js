import { __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import clsx from 'clsx';
import { InternalButton } from '../button/internal';
import InternalIcon from '../icon/internal';
import { getBaseProps } from '../internal/base-component';
import VisualContext from '../internal/components/visual-context';
import styles from './styles.css.js';
import { fireNonCancelableEvent } from '../internal/events';
import { useContainerBreakpoints } from '../internal/hooks/container-queries';
import { useVisualRefresh } from '../internal/hooks/use-visual-mode';
import { useMergeRefs } from '../internal/hooks/use-merge-refs';
import { useInternalI18n } from '../internal/i18n/context';
import { DATA_ATTR_ANALYTICS_ALERT } from '../internal/analytics/selectors';
const typeToIcon = {
    error: 'status-negative',
    warning: 'status-warning',
    success: 'status-positive',
    info: 'status-info',
};
export default function InternalAlert(_a) {
    var { type, statusIconAriaLabel, visible = true, dismissible, dismissAriaLabel, children, header, buttonText, action, onDismiss, onButtonClick, __internalRootRef = null } = _a, rest = __rest(_a, ["type", "statusIconAriaLabel", "visible", "dismissible", "dismissAriaLabel", "children", "header", "buttonText", "action", "onDismiss", "onButtonClick", "__internalRootRef"]);
    const baseProps = getBaseProps(rest);
    const i18n = useInternalI18n('alert');
    const [breakpoint, breakpointRef] = useContainerBreakpoints(['xs']);
    const mergedRef = useMergeRefs(breakpointRef, __internalRootRef);
    const isRefresh = useVisualRefresh();
    const size = isRefresh ? 'normal' : header && children ? 'big' : 'normal';
    const actionButton = action || (React.createElement(InternalButton, { className: styles['action-button'], onClick: () => fireNonCancelableEvent(onButtonClick), formAction: "none" }, buttonText));
    const hasAction = Boolean(action || buttonText);
    const analyticsAttributes = {
        [DATA_ATTR_ANALYTICS_ALERT]: type,
    };
    return (React.createElement("div", Object.assign({}, baseProps, analyticsAttributes, { "aria-hidden": !visible, className: clsx(styles.root, { [styles.hidden]: !visible }, baseProps.className, styles[`breakpoint-${breakpoint}`]), ref: mergedRef }),
        React.createElement(VisualContext, { contextName: "alert" },
            React.createElement("div", { className: clsx(styles.alert, styles[`type-${type}`]) },
                React.createElement("div", { className: clsx(styles.icon, styles.text), role: "img", "aria-label": statusIconAriaLabel },
                    React.createElement(InternalIcon, { name: typeToIcon[type], size: size })),
                React.createElement("div", { className: styles.body },
                    React.createElement("div", { className: clsx(styles.message, styles.text) },
                        header && React.createElement("div", { className: styles.header }, header),
                        React.createElement("div", { className: styles.content }, children)),
                    hasAction && React.createElement("div", { className: styles.action }, actionButton)),
                dismissible && (React.createElement("div", { className: styles.dismiss },
                    React.createElement(InternalButton, { className: styles['dismiss-button'], variant: "icon", iconName: "close", formAction: "none", ariaLabel: i18n('dismissAriaLabel', dismissAriaLabel), onClick: () => fireNonCancelableEvent(onDismiss) })))))));
}
//# sourceMappingURL=internal.js.map