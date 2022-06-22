export interface JsonViewerState {
    expanded: Record<string, boolean>;
    filtered: Record<string, boolean>;
    highlight: string | null;
}

export const enum SupportedTypes {
    String = 'string',
    Number = 'number',
    Boolean = 'boolean',
    Object = 'object',
    Null = 'null',
    Array = 'array'
}

export type Primitive = string | number | boolean;
