// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import clsx from 'clsx';
import ChartPopover from '../internal/components/chart-popover';
import ChartSeriesDetails from '../internal/components/chart-series-details';
import InternalBox from '../box/internal';
import styles from './styles.css.js';
import { Transition } from '../internal/components/transition';
export default React.forwardRef(MixedChartPopover);
function MixedChartPopover({ containerRef, trackRef, isOpen, isPinned, highlightDetails, footer, onDismiss, size = 'medium', dismissAriaLabel, onMouseEnter, onMouseLeave, }, popoverRef) {
    return (React.createElement(Transition, { in: isOpen }, (state, ref) => (React.createElement("div", { ref: ref, className: clsx(state === 'exiting' && styles.exiting) }, (isOpen || state !== 'exited') && highlightDetails && (React.createElement(ChartPopover, { ref: popoverRef, title: highlightDetails.position, trackRef: trackRef, trackKey: highlightDetails.position, dismissButton: isPinned, dismissAriaLabel: dismissAriaLabel, onDismiss: onDismiss, container: containerRef.current, size: size, onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave },
        React.createElement(ChartSeriesDetails, { details: highlightDetails.details }),
        footer && React.createElement(InternalBox, { margin: { top: 's' } }, footer)))))));
}
//# sourceMappingURL=chart-popover.js.map