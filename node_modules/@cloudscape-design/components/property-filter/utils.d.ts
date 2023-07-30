import { ComparisonOperator, InternalFilteringOption, InternalFilteringProperty, Token } from './interfaces';
export declare function matchFilteringProperty(filteringProperties: readonly InternalFilteringProperty[], filteringText: string): null | InternalFilteringProperty;
export declare function matchOperator(allowedOperators: readonly ComparisonOperator[], filteringText: string): null | ComparisonOperator;
export declare function matchOperatorPrefix(allowedOperators: readonly ComparisonOperator[], filteringText: string): null | string;
export declare function matchTokenValue(token: Token, filteringOptions: readonly InternalFilteringOption[]): Token;
export declare function getPropertyByKey(filteringProperties: readonly InternalFilteringProperty[], key: string): InternalFilteringProperty<any> | undefined;
export declare function getFormattedToken(filteringProperties: readonly InternalFilteringProperty[], token: Token): {
    property: string | undefined;
    operator: import("@cloudscape-design/collection-hooks").PropertyFilterOperator;
    value: any;
    label: string;
};
export declare function trimStart(source: string): string;
export declare function trimFirstSpace(source: string): string;
//# sourceMappingURL=utils.d.ts.map