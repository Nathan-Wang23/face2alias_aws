// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { useState } from 'react';
import { fireNonCancelableEvent } from '../internal/events';
import { useUniqueId } from '../internal/hooks/use-unique-id';
import { findUpUntil } from '../internal/utils/dom';
import { getTrackableValue } from './utils';
import selectionStyles from './selection-control/styles.css.js';
import { joinStrings } from '../internal/utils/strings';
const SELECTION_ITEM = 'selection-item';
const SELECTION_ROOT = 'selection-root';
function findSelectionControlByIndex(rootContainer, index) {
    if (index === -1) {
        // find "select all" checkbox
        return rootContainer.querySelector(`[data-${SELECTION_ITEM}="all"] .${selectionStyles.root} input`);
    }
    return rootContainer.querySelectorAll(`[data-${SELECTION_ITEM}="item"] .${selectionStyles.root} input`)[index];
}
function findRootContainer(element) {
    return findUpUntil(element, node => node.dataset.selectionRoot === 'true');
}
export function useFocusMove(selectionType, totalItems) {
    if (selectionType !== 'multi') {
        return {};
    }
    function moveFocus(sourceElement, fromIndex, direction) {
        let index = fromIndex;
        const rootContainer = findRootContainer(sourceElement);
        while (index >= -1 && index < totalItems) {
            index += direction;
            const control = findSelectionControlByIndex(rootContainer, index);
            if (control && !control.disabled) {
                control.focus();
                break;
            }
        }
    }
    const [moveFocusDown, moveFocusUp] = [1, -1].map(direction => {
        return (event) => {
            const target = event.currentTarget;
            const itemNode = findUpUntil(target, node => node.dataset.selectionItem === 'item');
            const fromIndex = Array.prototype.indexOf.call(itemNode.parentElement.children, itemNode);
            moveFocus(target, fromIndex, direction);
        };
    });
    return {
        moveFocusDown,
        moveFocusUp,
        moveFocus,
    };
}
// A set, that compares items by their "trackables" (the results of applying `trackBy` to them)
class ItemSet {
    constructor(trackBy, items) {
        this.map = new Map();
        this.put = (item) => this.map.set.call(this.map, getTrackableValue(this.trackBy, item), item);
        this.has = (item) => this.map.has.call(this.map, getTrackableValue(this.trackBy, item));
        this.forEach = this.map.forEach.bind(this.map);
        this.trackBy = trackBy;
        items.forEach(this.put);
    }
}
export const focusMarkers = {
    item: { ['data-' + SELECTION_ITEM]: 'item' },
    all: { ['data-' + SELECTION_ITEM]: 'all' },
    root: { ['data-' + SELECTION_ROOT]: 'true' },
};
export function useSelection({ items, selectedItems = [], selectionType, isItemDisabled = () => false, trackBy, onSelectionChange, ariaLabels, loading, }) {
    const [shiftPressed, setShiftPressed] = useState(false);
    const [lastClickedItem, setLastClickedItem] = useState(null);
    const selectionName = useUniqueId();
    const finalSelectedItems = selectionType === 'single' ? selectedItems.slice(0, 1) : selectedItems;
    const selectedSet = new ItemSet(trackBy, finalSelectedItems);
    const itemIndexesMap = new Map();
    items.forEach((item, i) => itemIndexesMap.set(getTrackableValue(trackBy, item), i));
    const isItemSelected = selectedSet.has.bind(selectedSet);
    const getItemState = (item) => ({
        disabled: isItemDisabled(item),
        selected: isItemSelected(item),
    });
    const [allDisabled, allEnabledSelected] = selectionType
        ? items.reduce(([allDisabled, allEnabledSelected], item) => {
            const { disabled, selected } = getItemState(item);
            return [
                // all items are disabled (or none are present)
                allDisabled && disabled,
                // all enabled items are selected (or none are present)
                allEnabledSelected && (selected || disabled),
            ];
        }, [true, true])
        : [true, true];
    // the page has at least one selected item
    const hasSelected = finalSelectedItems.length > 0;
    const handleToggleAll = () => {
        const requestedItems = new ItemSet(trackBy, items);
        const newSelectedItems = allEnabledSelected ? deselectItems(requestedItems) : selectItems(requestedItems);
        fireNonCancelableEvent(onSelectionChange, { selectedItems: newSelectedItems });
    };
    const getRequestedItems = (item) => {
        const requestedItems = new ItemSet(trackBy, [item]);
        let lastClickedItemIndex = lastClickedItem ? itemIndexesMap.get(getTrackableValue(trackBy, lastClickedItem)) : -1;
        if (lastClickedItemIndex === undefined) {
            lastClickedItemIndex = -1;
        }
        // we use lastClickedItemIndex to determine if filtering/sorting/pagination
        // made previously selected item invisible, therefore we reset state for shift-select
        if (shiftPressed && lastClickedItemIndex !== -1) {
            // item is always in items
            const currentItemIndex = itemIndexesMap.get(getTrackableValue(trackBy, item));
            const start = Math.min(currentItemIndex, lastClickedItemIndex);
            const end = Math.max(currentItemIndex, lastClickedItemIndex);
            items.slice(start, end + 1).forEach(item => requestedItems.put(item));
        }
        return requestedItems;
    };
    const deselectItems = (requestedItems) => {
        const newSelectedItems = [];
        selectedItems.forEach(selectedItem => {
            const toUnselect = requestedItems.has(selectedItem);
            if (!toUnselect || isItemDisabled(selectedItem)) {
                newSelectedItems.push(selectedItem);
            }
        });
        return newSelectedItems;
    };
    const selectItems = (requestedItems) => {
        const newSelectedItems = [...selectedItems];
        requestedItems.forEach(newItem => {
            const { selected, disabled } = getItemState(newItem);
            if (!selected && !disabled) {
                newSelectedItems.push(newItem);
            }
        });
        return newSelectedItems;
    };
    const handleToggleItem = (item) => () => {
        const { disabled, selected } = getItemState(item);
        if (disabled || (selectionType === 'single' && selected)) {
            return;
        }
        if (selectionType === 'single') {
            fireNonCancelableEvent(onSelectionChange, { selectedItems: [item] });
        }
        else {
            const requestedItems = getRequestedItems(item);
            const selectedItems = selected ? deselectItems(requestedItems) : selectItems(requestedItems);
            fireNonCancelableEvent(onSelectionChange, { selectedItems });
            setLastClickedItem(item);
        }
    };
    return {
        isItemSelected,
        getSelectAllProps: () => {
            var _a;
            if (!selectionType) {
                throw new Error('Invariant violation: calling selection props with missing selection type.');
            }
            return {
                name: selectionName,
                disabled: allDisabled || !!loading,
                selectionType: selectionType,
                indeterminate: hasSelected && !allEnabledSelected,
                checked: hasSelected && allEnabledSelected,
                onChange: handleToggleAll,
                ariaLabel: joinStrings(ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.selectionGroupLabel, (_a = ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.allItemsSelectionLabel) === null || _a === void 0 ? void 0 : _a.call(ariaLabels, { selectedItems })),
            };
        },
        getItemSelectionProps: (item) => {
            var _a;
            if (!selectionType) {
                throw new Error('Invariant violation: calling selection props with missing selection type.');
            }
            return {
                name: selectionName,
                selectionType: selectionType,
                ariaLabel: joinStrings(ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.selectionGroupLabel, (_a = ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.itemSelectionLabel) === null || _a === void 0 ? void 0 : _a.call(ariaLabels, { selectedItems }, item)),
                onChange: handleToggleItem(item),
                checked: isItemSelected(item),
                disabled: isItemDisabled(item),
            };
        },
        updateShiftToggle: (value) => {
            setShiftPressed(value);
        },
    };
}
//# sourceMappingURL=use-selection.js.map