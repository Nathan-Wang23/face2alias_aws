import { __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import clsx from 'clsx';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { getBaseProps } from '../internal/base-component';
import { warnOnce } from '@cloudscape-design/component-toolkit/internal';
import styles from './styles.css.js';
import icons from './icons';
import { useMergeRefs } from '../internal/hooks/use-merge-refs';
import { useVisualRefresh } from '../internal/hooks/use-visual-mode';
function iconSizeMap(height) {
    if (height === null) {
        // This is the best guess for the contextual height while server rendering.
        return 'normal';
    }
    if (height >= 50) {
        return 'large';
    }
    else if (height >= 36) {
        return 'big';
    }
    else if (height >= 24) {
        return 'medium';
    }
    else if (height <= 16) {
        return 'small';
    }
    else {
        return 'normal';
    }
}
const InternalIcon = (_a) => {
    var { name, size = 'normal', variant = 'normal', url, alt, svg, badge, __internalRootRef = null } = _a, props = __rest(_a, ["name", "size", "variant", "url", "alt", "svg", "badge", "__internalRootRef"]);
    const iconRef = useRef(null);
    // To ensure a re-render is triggered on visual mode changes
    useVisualRefresh();
    const [parentHeight, setParentHeight] = useState(null);
    const contextualSize = size === 'inherit';
    const iconSize = contextualSize ? iconSizeMap(parentHeight) : size;
    const inlineStyles = contextualSize && parentHeight !== null ? { height: `${parentHeight}px` } : {};
    const baseProps = getBaseProps(props);
    baseProps.className = clsx(baseProps.className, styles.icon, contextualSize && styles['icon-flex-height'], badge && styles.badge, !contextualSize && styles[`size-${iconSize}-mapped-height`], styles[`size-${iconSize}`], styles[`variant-${variant}`]);
    // Possible infinite loop is not a concern here because line
    // height should not change without an external state update.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useLayoutEffect(() => {
        if (!contextualSize || !iconRef.current) {
            return;
        }
        const { lineHeight } = getComputedStyle(iconRef.current);
        const newParentHeight = parseInt(lineHeight, 10);
        setParentHeight(newParentHeight);
    });
    const mergedRef = useMergeRefs(iconRef, __internalRootRef);
    if (svg) {
        if (url) {
            warnOnce('Icon', 'You have specified both `url` and `svg`. `svg` will take precedence and `url` will be ignored.');
        }
        return (React.createElement("span", Object.assign({}, baseProps, { ref: mergedRef, "aria-hidden": "true", style: inlineStyles }), svg));
    }
    if (url) {
        return (React.createElement("span", Object.assign({}, baseProps, { ref: mergedRef, style: inlineStyles }),
            React.createElement("img", { src: url, alt: alt })));
    }
    const validIcon = name && Object.prototype.hasOwnProperty.call(icons, name);
    return (React.createElement("span", Object.assign({}, baseProps, { 
        // dangerouslySetInnerHTML is safe here, as we control the content coming from `icons`
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML: validIcon ? { __html: icons[name] } : undefined, ref: mergedRef, style: inlineStyles })));
};
export default InternalIcon;
//# sourceMappingURL=internal.js.map