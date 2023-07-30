import { isDataSeries, isXThreshold, isYThreshold, matchesX } from './utils';
/** Formats provided x-position and its corresponding series values. */
export default function formatHighlighted(position, series, xTickFormatter) {
    const formattedPosition = xTickFormatter ? xTickFormatter(position) : position.toString();
    const details = [];
    series.forEach(s => {
        const detail = getSeriesDetail(s, position);
        if (detail) {
            details.push(detail);
        }
    });
    return { position: formattedPosition, details };
}
function getSeriesDetail(internalSeries, targetX) {
    const { series, color } = internalSeries;
    // X-thresholds are only shown when X matches.
    if (isXThreshold(series)) {
        return series.x === targetX
            ? {
                key: series.title,
                value: '',
                color,
                markerType: 'dashed',
            }
            : null;
    }
    if (isYThreshold(series)) {
        return {
            key: series.title,
            value: series.valueFormatter ? series.valueFormatter(series.y) : series.y,
            color,
            markerType: 'dashed',
        };
    }
    if (isDataSeries(series)) {
        for (const datum of series.data) {
            if (matchesX(targetX, datum.x)) {
                return {
                    key: series.title,
                    value: series.valueFormatter ? series.valueFormatter(datum.y, targetX) : datum.y,
                    color,
                    markerType: series.type === 'line' ? 'line' : 'rectangle',
                };
            }
        }
    }
    return null;
}
//# sourceMappingURL=format-highlighted.js.map