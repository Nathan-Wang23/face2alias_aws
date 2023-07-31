// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { useCallback, useState } from 'react';
export function useHighlightedOption({ options, isHighlightable, }) {
    const [highlightedIndex, setHighlightedIndexState] = useState(-1);
    const [highlightType, setHighlightType] = useState('keyboard');
    const setHighlightedIndex = useCallback((index, highlightType) => {
        setHighlightedIndexState(index);
        setHighlightType(highlightType);
    }, []);
    const highlightedOption = options[highlightedIndex] && isHighlightable(options[highlightedIndex]) ? options[highlightedIndex] : undefined;
    const moveHighlightFrom = (direction, startIndex = highlightedIndex, highlightType) => {
        let newIndex = startIndex;
        do {
            newIndex += direction;
        } while (options[newIndex] && !isHighlightable(options[newIndex]));
        if (options[newIndex]) {
            setHighlightedIndex(newIndex, highlightType);
        }
    };
    const moveHighlight = (direction, highlightType) => moveHighlightFrom(direction, highlightedIndex, highlightType);
    const highlightOption = useCallback((option, highlightType) => {
        const index = options.indexOf(option);
        setHighlightedIndex(index, highlightType);
    }, [options, setHighlightedIndex]);
    return [
        { highlightType, highlightedIndex, highlightedOption },
        {
            setHighlightedIndexWithMouse: (index) => setHighlightedIndex(index, 'mouse'),
            moveHighlightWithKeyboard: (direction) => moveHighlight(direction, 'keyboard'),
            highlightOptionWithKeyboard: (option) => highlightOption(option, 'keyboard'),
            resetHighlightWithKeyboard: () => setHighlightedIndex(-1, 'keyboard'),
            goHomeWithKeyboard: () => moveHighlightFrom(1, -1, 'keyboard'),
            goEndWithKeyboard: () => moveHighlightFrom(-1, options.length, 'keyboard'),
        },
    ];
}
//# sourceMappingURL=use-highlight-option.js.map