export const getOverflowParents = (element) => {
    const parents = [];
    let node = element;
    while ((node = node.parentElement) && node !== document.body) {
        getComputedStyle(node).overflow !== 'visible' && parents.push(node);
    }
    return parents;
};
export const getOverflowParentDimensions = (element, excludeClosestParent = false, expandToViewport = false, canExpandOutsideViewport = false) => {
    const parents = expandToViewport
        ? []
        : getOverflowParents(element).map(el => {
            const { height, width, top, left } = el.getBoundingClientRect();
            return {
                // Treat the whole scrollable area as the available height
                // if we're allowed to expand past the viewport.
                height: canExpandOutsideViewport ? el.scrollHeight : height,
                width,
                top,
                left,
            };
        });
    if (canExpandOutsideViewport && !expandToViewport) {
        const documentDimensions = document.documentElement.getBoundingClientRect();
        parents.push({
            width: Math.max(documentDimensions.width, document.documentElement.clientWidth),
            height: Math.max(documentDimensions.height, document.documentElement.clientHeight),
            top: documentDimensions.top,
            left: documentDimensions.left,
        });
    }
    else {
        parents.push({
            height: window.innerHeight,
            width: window.innerWidth,
            top: 0,
            left: 0,
        });
    }
    if (excludeClosestParent && !expandToViewport) {
        parents.shift();
    }
    return parents;
};
/**
 * Calls `scrollIntoView` on the provided element with sensible defaults. If
 * the element does not existed or does not support the `scrollIntoView`
 * method, it will do nothing. This wrapper is created to support environments
 * where the native function is not available like JSDom (feature request:
 * https://github.com/jsdom/jsdom/issues/1422).
 *
 * @param element to be scrolled into view
 * @param options native options for `scrollIntoView`
 */
export function scrollElementIntoView(element, options = { block: 'nearest', inline: 'nearest' }) {
    var _a;
    (_a = element === null || element === void 0 ? void 0 : element.scrollIntoView) === null || _a === void 0 ? void 0 : _a.call(element, options);
}
//# sourceMappingURL=scrollable-containers.js.map