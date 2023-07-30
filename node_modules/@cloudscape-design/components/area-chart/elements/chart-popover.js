// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import ChartPopover from '../../internal/components/chart-popover';
import ChartSeriesDetails from '../../internal/components/chart-series-details';
import InternalBox from '../../box/internal';
import styles from '../styles.css.js';
export default function AreaChartPopover({ model, highlightDetails, dismissAriaLabel, footer, size, }) {
    if (!highlightDetails) {
        return null;
    }
    const popoverProps = {
        title: highlightDetails.formattedX,
        trackRef: model.refs.verticalMarker,
        trackKey: highlightDetails.highlightIndex,
        dismissButton: highlightDetails.isPopoverPinned,
        onDismiss: model.handlers.onPopoverDismiss,
        onMouseLeave: model.handlers.onPopoverLeave,
        ref: model.refs.popoverRef,
    };
    return (React.createElement(ChartPopover, Object.assign({}, popoverProps, { container: model.refs.container.current, dismissAriaLabel: dismissAriaLabel, size: size }),
        React.createElement(ChartSeriesDetails, { details: highlightDetails.seriesDetails }),
        React.createElement("div", { className: styles['popover-divider'] }),
        React.createElement(ChartSeriesDetails, { details: highlightDetails.totalDetails }),
        footer && React.createElement(InternalBox, { margin: { top: 's' } }, footer)));
}
//# sourceMappingURL=chart-popover.js.map