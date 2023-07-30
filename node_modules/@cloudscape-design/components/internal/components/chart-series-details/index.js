import { __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { memo } from 'react';
import clsx from 'clsx';
import { getBaseProps } from '../../base-component';
import InternalBox from '../../../box/internal';
import ChartSeriesMarker from '../chart-series-marker';
import styles from './styles.css.js';
export default memo(ChartSeriesDetails);
function ChartSeriesDetails(_a) {
    var { details } = _a, restProps = __rest(_a, ["details"]);
    const baseProps = getBaseProps(restProps);
    const className = clsx(baseProps.className, styles.root);
    return (React.createElement("div", Object.assign({}, baseProps, { className: className }),
        React.createElement("ul", { className: styles.list }, details.map(({ key, value, markerType, color, isDimmed }, index) => (React.createElement("li", { key: index, className: clsx({
                [styles.dimmed]: isDimmed,
                [styles['list-item']]: true,
            }) },
            React.createElement("div", { className: styles.key },
                markerType && color && React.createElement(ChartSeriesMarker, { type: markerType, color: color }),
                React.createElement("span", null, key)),
            React.createElement(InternalBox, { textAlign: "right" }, value)))))));
}
//# sourceMappingURL=index.js.map