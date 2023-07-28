// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { useState } from 'react';
export const useOpenState = ({ onOpen, onClose }) => {
    const [isOpen, setIsOpen] = useState(false);
    const openDropdown = () => {
        if (!isOpen) {
            setIsOpen(true);
            onOpen === null || onOpen === void 0 ? void 0 : onOpen();
        }
    };
    const closeDropdown = () => {
        if (isOpen) {
            setIsOpen(false);
            onClose === null || onClose === void 0 ? void 0 : onClose();
        }
    };
    const toggleDropdown = () => {
        if (isOpen) {
            closeDropdown();
        }
        else {
            openDropdown();
        }
    };
    return { isOpen, openDropdown, closeDropdown, toggleDropdown };
};
//# sourceMappingURL=use-open-state.js.map