const ARROW_OFFSET = 12;
export const PRIORITY_MAPPING = {
    top: [
        'top-center',
        'top-right',
        'top-left',
        'bottom-center',
        'bottom-right',
        'bottom-left',
        'right-top',
        'right-bottom',
        'left-top',
        'left-bottom',
    ],
    bottom: [
        'bottom-center',
        'bottom-right',
        'bottom-left',
        'top-center',
        'top-right',
        'top-left',
        'right-top',
        'right-bottom',
        'left-top',
        'left-bottom',
    ],
    left: [
        'left-top',
        'left-bottom',
        'right-top',
        'right-bottom',
        'bottom-center',
        'top-center',
        'bottom-left',
        'top-left',
        'bottom-right',
        'top-right',
    ],
    right: [
        'right-top',
        'right-bottom',
        'left-top',
        'left-bottom',
        'bottom-center',
        'top-center',
        'bottom-right',
        'top-right',
        'bottom-left',
        'top-left',
    ],
};
const RECTANGLE_CALCULATIONS = {
    'top-center': ({ body, trigger, arrow }) => {
        return {
            top: trigger.top - body.height - arrow.height,
            left: trigger.left + trigger.width / 2 - body.width / 2,
            width: body.width,
            height: body.height,
        };
    },
    'top-right': ({ body, trigger, arrow }) => {
        return {
            top: trigger.top - body.height - arrow.height,
            left: trigger.left,
            width: body.width,
            height: body.height,
        };
    },
    'top-left': ({ body, trigger, arrow }) => {
        return {
            top: trigger.top - body.height - arrow.height,
            left: trigger.left + trigger.width - body.width,
            width: body.width,
            height: body.height,
        };
    },
    'bottom-center': ({ body, trigger, arrow }) => {
        return {
            top: trigger.top + trigger.height + arrow.height,
            left: trigger.left + trigger.width / 2 - body.width / 2,
            width: body.width,
            height: body.height,
        };
    },
    'bottom-right': ({ body, trigger, arrow }) => {
        return {
            top: trigger.top + trigger.height + arrow.height,
            left: trigger.left,
            width: body.width,
            height: body.height,
        };
    },
    'bottom-left': ({ body, trigger, arrow }) => {
        return {
            top: trigger.top + trigger.height + arrow.height,
            left: trigger.left + trigger.width - body.width,
            width: body.width,
            height: body.height,
        };
    },
    'right-top': ({ body, trigger, arrow }) => {
        return {
            top: trigger.top + trigger.height / 2 - ARROW_OFFSET - arrow.height,
            left: trigger.left + trigger.width + arrow.height,
            width: body.width,
            height: body.height,
        };
    },
    'right-bottom': ({ body, trigger, arrow }) => {
        return {
            top: trigger.top + trigger.height / 2 - body.height + ARROW_OFFSET + arrow.height,
            left: trigger.left + trigger.width + arrow.height,
            width: body.width,
            height: body.height,
        };
    },
    'left-top': ({ body, trigger, arrow }) => {
        return {
            top: trigger.top + trigger.height / 2 - ARROW_OFFSET - arrow.height,
            left: trigger.left - body.width - arrow.height,
            width: body.width,
            height: body.height,
        };
    },
    'left-bottom': ({ body, trigger, arrow }) => {
        return {
            top: trigger.top + trigger.height / 2 - body.height + ARROW_OFFSET + arrow.height,
            left: trigger.left - body.width - arrow.height,
            width: body.width,
            height: body.height,
        };
    },
};
/**
 * Returns whether one rectangle fits in another.
 */
function canRectFit(inner, outer) {
    return (inner.left >= outer.left &&
        inner.top >= outer.top &&
        inner.left + inner.width <= outer.left + outer.width &&
        inner.top + inner.height <= outer.top + outer.height);
}
function fitIntoContainer(inner, outer) {
    let { left, width, top, height } = inner;
    // Adjust left boundary.
    if (left < outer.left) {
        width = left + width - outer.left;
        left = outer.left;
    }
    // Adjust right boundary.
    else if (left + width > outer.left + outer.width) {
        width = outer.left + outer.width - left;
    }
    // Adjust top boundary.
    if (top < outer.top) {
        height = top + height - outer.top;
        top = outer.top;
    }
    // Adjust bottom boundary.
    else if (top + height > outer.top + outer.height) {
        height = outer.top + outer.height - top;
    }
    return { left, width, top, height };
}
function getLargestRect(rect1, rect2) {
    const area1 = rect1.height * rect1.width;
    const area2 = rect2.height * rect2.width;
    return area1 >= area2 ? rect1 : rect2;
}
/**
 * Returns the area of the intersection of passed in rectangles or a null, if there is no intersection
 */
export function intersectRectangles(rectangles) {
    let boundingOffset = null;
    for (const currentRect of rectangles) {
        if (!boundingOffset) {
            boundingOffset = currentRect;
            continue;
        }
        const left = Math.max(boundingOffset.left, currentRect.left);
        const top = Math.max(boundingOffset.top, currentRect.top);
        const right = Math.min(boundingOffset.left + boundingOffset.width, currentRect.left + currentRect.width);
        const bottom = Math.min(boundingOffset.top + boundingOffset.height, currentRect.top + currentRect.height);
        if (right < left || bottom < top) {
            return null;
        }
        boundingOffset = {
            left,
            top,
            width: right - left,
            height: bottom - top,
        };
    }
    return boundingOffset && boundingOffset.height * boundingOffset.width;
}
/**
 * A functions that returns the correct popover position based on screen dimensions.
 */
export function calculatePosition(preferred, trigger, arrow, body, container, viewport, 
// the popover is only bound by the viewport if it is rendered in a portal
renderWithPortal) {
    let bestPositionOutsideViewport = null;
    let largestArea = 0;
    // Attempt to position the popover based on the priority list for this position,
    // trying to fit it inside the container and inside the viewport.
    for (const internalPosition of PRIORITY_MAPPING[preferred]) {
        const boundingOffset = RECTANGLE_CALCULATIONS[internalPosition]({ body, trigger, arrow });
        const fitsInContainer = renderWithPortal || canRectFit(boundingOffset, container);
        const fitsInViewport = canRectFit(boundingOffset, viewport);
        if (fitsInContainer && fitsInViewport) {
            return { internalPosition, boundingOffset };
        }
        const boundingRectangles = [boundingOffset, viewport];
        if (!renderWithPortal) {
            boundingRectangles.push(container);
        }
        const availableArea = intersectRectangles(boundingRectangles);
        if (availableArea && availableArea > largestArea) {
            bestPositionOutsideViewport = { internalPosition, boundingOffset };
            largestArea = availableArea;
        }
    }
    // Use best possible placement.
    const internalPosition = (bestPositionOutsideViewport === null || bestPositionOutsideViewport === void 0 ? void 0 : bestPositionOutsideViewport.internalPosition) || 'right-top';
    // Get default rect for that placement.
    const defaultOffset = RECTANGLE_CALCULATIONS[internalPosition]({ body, trigger, arrow });
    // Get largest possible rect that fits into viewport or container.
    const optimisedOffset = fitIntoContainer(defaultOffset, renderWithPortal ? viewport : getLargestRect(container, viewport));
    // If largest possible rect is smaller than original - set body scroll.
    const scrollable = optimisedOffset.height < defaultOffset.height;
    return { internalPosition, boundingOffset: optimisedOffset, scrollable };
}
//# sourceMappingURL=positions.js.map