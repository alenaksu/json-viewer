export interface JsonViewerState {
    expanded: { [path: string]: boolean };
    filtered: { [path: string]: boolean };
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

export type Primitive = string | number | boolean | null;

export type JSONValue = Primitive | JSONObject | JSONArray;

export type JSONObject = { [x: string]: JSONValue };

export type JSONArray = Array<JSONValue>;
