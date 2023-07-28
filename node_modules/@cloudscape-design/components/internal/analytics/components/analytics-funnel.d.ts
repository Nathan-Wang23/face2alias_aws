import React from 'react';
import { FunnelStepContextValue } from '../context/analytics-context';
import { FunnelProps, FunnelStepProps } from '../interfaces';
export declare const FUNNEL_VERSION = "1.0";
type AnalyticsFunnelProps = {
    children?: React.ReactNode;
} & Pick<FunnelProps, 'funnelType' | 'optionalStepNumbers' | 'totalFunnelSteps'>;
export declare const AnalyticsFunnel: ({ children, ...props }: AnalyticsFunnelProps) => JSX.Element;
type AnalyticsFunnelStepProps = {
    children?: React.ReactNode | ((props: FunnelStepContextValue) => React.ReactNode);
} & Pick<FunnelStepProps, 'stepNumber' | 'stepNameSelector'>;
export declare const AnalyticsFunnelStep: ({ children, stepNumber, stepNameSelector }: AnalyticsFunnelStepProps) => JSX.Element;
interface AnalyticsFunnelSubStepProps {
    children?: React.ReactNode;
}
export declare const AnalyticsFunnelSubStep: ({ children }: AnalyticsFunnelSubStepProps) => JSX.Element;
export {};
//# sourceMappingURL=analytics-funnel.d.ts.map