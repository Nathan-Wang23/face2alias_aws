// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import clsx from 'clsx';
import { useAppLayoutInternals } from './context';
import styles from './styles.css.js';
export default function Background() {
    const { breadcrumbs, contentHeader, dynamicOverlapHeight, hasNotificationsContent, hasStickyBackground, isMobile, stickyNotifications, } = useAppLayoutInternals();
    if (!hasNotificationsContent && (!breadcrumbs || isMobile) && !contentHeader && dynamicOverlapHeight <= 0) {
        return null;
    }
    return (React.createElement("div", { className: clsx(styles.background, 'awsui-context-content-header') },
        React.createElement("div", { className: styles['scrolling-background'] }),
        !isMobile && hasStickyBackground && (React.createElement("div", { className: clsx(styles['sticky-background'], {
                [styles['has-sticky-notifications']]: stickyNotifications,
            }) }))));
}
//# sourceMappingURL=background.js.map