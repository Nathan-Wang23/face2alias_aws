// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import clsx from 'clsx';
import styles from './styles.css.js';
const Arrow = (props) => (React.createElement("div", { className: clsx(styles.arrow, props.position && styles[`arrow-position-${props.position}`]) },
    React.createElement("div", { className: styles['arrow-outer'] }),
    React.createElement("div", { className: styles['arrow-inner'] })));
export default React.memo(Arrow);
//# sourceMappingURL=arrow.js.map