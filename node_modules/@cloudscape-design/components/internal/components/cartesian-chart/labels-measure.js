// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { memo, useEffect } from 'react';
import clsx from 'clsx';
import styles from './styles.css.js';
import { useContainerQuery } from '@cloudscape-design/component-toolkit';
export default memo(LabelsMeasure);
// Places the invisible left-hand side labels to calculate their maximum width.
function LabelsMeasure({ scale, ticks, tickFormatter, autoWidth }) {
    const [width, ref] = useContainerQuery(rect => rect.contentBoxWidth);
    // Tell elements's width to the parent.
    useEffect(() => {
        autoWidth(width || 0);
    }, [autoWidth, width]);
    const labelMapper = (value) => {
        const scaledValue = scale.d3Scale(value);
        if (scaledValue === undefined || !isFinite(scaledValue)) {
            return null;
        }
        return (React.createElement("div", { key: `${value}`, className: styles['labels-left__label'], "aria-hidden": "true" }, tickFormatter ? tickFormatter(value) : value.toString()));
    };
    return (React.createElement("div", { ref: ref, className: clsx(styles['labels-left'], styles['labels-left--hidden']) }, ticks.map(labelMapper)));
}
//# sourceMappingURL=labels-measure.js.map