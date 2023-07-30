import { ComparisonOperator, GroupText, I18nStrings, InternalFilteringOption, InternalFilteringProperty, JoinOperation, ParsedText, Query, Token } from './interfaces';
import { NonCancelableEventHandler } from '../internal/events';
import { AutosuggestInputRef } from '../internal/components/autosuggest-input';
export declare const getQueryActions: (query: Query, onChange: NonCancelableEventHandler<Query>, inputRef: React.RefObject<AutosuggestInputRef>) => {
    setToken: (index: number, newToken: Token) => void;
    removeToken: (index: number) => void;
    removeAllTokens: () => void;
    addToken: (newToken: Token) => void;
    setOperation: (newOperation: JoinOperation) => void;
};
export declare const getAllowedOperators: (property: InternalFilteringProperty) => ComparisonOperator[];
export declare const parseText: (filteringText: string, filteringProperties: readonly InternalFilteringProperty<any>[] | undefined, disableFreeTextFiltering: boolean) => ParsedText;
export declare const getPropertyOptions: (filteringProperty: InternalFilteringProperty, filteringOptions: readonly InternalFilteringOption[]) => InternalFilteringOption[];
interface OptionGroup<T> {
    label: string;
    options: T[];
}
export declare const getAllValueSuggestions: (filteringOptions: readonly InternalFilteringOption[], filteringProperties: readonly InternalFilteringProperty[], operator: ComparisonOperator | undefined, i18nStrings: I18nStrings, customGroupsText: readonly GroupText[]) => OptionGroup<import("../internal/components/option/interfaces").OptionDefinition>[];
export declare function createPropertiesCompatibilityMap(filteringProperties: readonly InternalFilteringProperty[]): (propertyA: string, propertyB: string) => boolean;
export declare function getPropertySuggestions<T>(filteringProperties: readonly InternalFilteringProperty[], customGroupsText: readonly GroupText[], i18nStrings: I18nStrings, filteringPropertyToOption: (filteringProperty: InternalFilteringProperty) => T): OptionGroup<T>[];
export declare const getAutosuggestOptions: (parsedText: ParsedText, filteringOptions: readonly InternalFilteringOption[], filteringProperties: readonly InternalFilteringProperty[], customGroupsText: readonly GroupText[], i18nStrings: I18nStrings) => {
    filterText: string;
    options: {
        options: {
            value: string;
            label: string;
            __labelPrefix: string;
        }[];
        label: string;
    }[];
} | {
    filterText: string;
    options: (OptionGroup<{
        value: string;
        label: string;
        keepOpenOnSelect: boolean;
    }> | {
        options: {
            value: string;
            label: string;
            description: string | undefined;
            keepOpenOnSelect: boolean;
        }[];
        label: string | undefined;
    })[];
} | {
    filterText: string;
    options: (OptionGroup<import("../internal/components/option/interfaces").OptionDefinition> | OptionGroup<{
        value: string;
        label: string;
        keepOpenOnSelect: boolean;
    }>)[];
};
export declare const operatorToDescription: (operator: ComparisonOperator, i18nStrings: I18nStrings) => string | undefined;
export {};
//# sourceMappingURL=controller.d.ts.map