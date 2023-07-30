// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useState } from 'react';
import styles from './styles.css.js';
import clsx from 'clsx';
import InternalIcon from '../../icon/internal';
export function useDropzoneVisible() {
    const [isDropzoneVisible, setDropzoneVisible] = useState(false);
    // Registering global drag events listeners.
    useEffect(() => {
        // The timer helps avoiding dropzone blinking.
        let dragTimer = null;
        // The file-upload dropzone is shown when the user drags files over to the browser.
        const onDocumentDragOver = (event) => {
            var _a, _b;
            event.preventDefault();
            if (((_b = (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.types) === null || _b === void 0 ? void 0 : _b.indexOf('Files')) !== -1) {
                setDropzoneVisible(true);
                dragTimer && clearTimeout(dragTimer);
            }
        };
        // When the files are no longer dragged over the browser the state must be reset.
        const onDocumentDragLeave = (event) => {
            event.preventDefault();
            dragTimer = setTimeout(() => setDropzoneVisible(false), 25);
        };
        // If the files were dropped the state must be reset.
        const onDocumentDrop = (event) => {
            event.preventDefault();
            dragTimer = setTimeout(() => setDropzoneVisible(false), 25);
        };
        document.addEventListener('dragover', onDocumentDragOver, false);
        document.addEventListener('dragleave', onDocumentDragLeave, false);
        document.addEventListener('drop', onDocumentDrop, false);
        return () => {
            dragTimer && clearTimeout(dragTimer);
            document.removeEventListener('dragover', onDocumentDragOver);
            document.removeEventListener('dragleave', onDocumentDragLeave);
            document.removeEventListener('drop', onDocumentDrop);
        };
    }, []);
    return isDropzoneVisible;
}
export function Dropzone({ onChange, children }) {
    const [isDropzoneHovered, setDropzoneHovered] = useState(false);
    const onDragOver = (event) => {
        event.preventDefault();
        setDropzoneHovered(true);
        if (event.dataTransfer) {
            event.dataTransfer.dropEffect = 'copy';
        }
    };
    const onDragLeave = (event) => {
        event.preventDefault();
        setDropzoneHovered(false);
        if (event.dataTransfer) {
            event.dataTransfer.dropEffect = 'none';
        }
    };
    const onDrop = (event) => {
        event.preventDefault();
        setDropzoneHovered(false);
        onChange(Array.from(event.dataTransfer.files));
    };
    return (React.createElement("div", { className: clsx(styles.dropzone, isDropzoneHovered && styles['dropzone-hovered']), onDragOver: onDragOver, onDragLeave: onDragLeave, onDrop: onDrop },
        React.createElement(InternalIcon, { name: "upload" }),
        React.createElement("span", null, children)));
}
//# sourceMappingURL=index.js.map