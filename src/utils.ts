import { ComplexAttributeConverter } from 'lit';
import { JSONObject, JSONValue, Primitive, SupportedTypes } from './types';

export function isRegex(value: unknown) {
    return value instanceof RegExp;
}

export function getType(value: unknown): SupportedTypes {
    return value === null
        ? SupportedTypes.Null
        : Array.isArray(value)
        ? SupportedTypes.Array
        : (value!.constructor.name.toLowerCase() as SupportedTypes);
}

export function isPrimitive(value: unknown): value is Primitive {
    return value !== Object(value);
}

export function isNode(value: unknown): value is Node {
    return !!value && !!(value as Node).nodeType;
}

export function isPrimitiveOrNode(value: unknown) {
    return isPrimitive(value) || isNode(value);
}

export function generateNodePreview(
    node: any,
    { nodeCount = 3, maxLength = 15 }: { nodeCount?: number; maxLength?: number } = {}
): string {
    const isArray = Array.isArray(node);
    const objectNodes = Object.keys(node);
    const keys = objectNodes.slice(0, nodeCount);
    const preview = [];

    const getNodePreview = (nodeValue: any) => {
        const nodeType = getType(nodeValue);

        switch (nodeType) {
            case SupportedTypes.Object:
                return Object.keys(nodeValue).length === 0 ? '{ }' : '{ ... }';
            case SupportedTypes.Array:
                return nodeValue.length === 0 ? '[ ]' : '[ ... ]';
            case SupportedTypes.String:
                return `"${nodeValue.substring(0, maxLength)}${nodeValue.length > maxLength ? '...' : ''}"`;
            default:
                return String(nodeValue);
        }
    };

    const childPreviews = [];
    for (const key of keys) {
        const nodePreview = [];
        const nodeValue = node[key];

        if (!isArray) nodePreview.push(`${key}: `);

        nodePreview.push(getNodePreview(nodeValue));
        childPreviews.push(nodePreview.join(''));
    }

    if (objectNodes.length > nodeCount) {
        childPreviews.push('...');
    }
    preview.push(childPreviews.join(', '));

    const previewText = preview.join('');

    return isArray ? `[ ${previewText} ]` : `{ ${previewText} }`;
}

export function* deepTraverse(obj: any): Generator<[any, string, string[]]> {
    const stack: Array<[any, string, string[]]> = [[obj, '', []]];

    while (stack.length) {
        const [node, path, parents] = stack.shift()!;

        if (path) {
            yield [node, path, parents];
        }

        if (!isPrimitive(node)) {
            for (const [key, value] of Object.entries(node)) {
                stack.push([value, `${path}${path ? '.' : ''}${key}`, [...parents, path]]);
            }
        }
    }
}

/**
 * Matches a string using a glob-like syntax
 *
 * @example
 * checkGlob('a.b.c', 'a.*.c') // true
 * checkGlob('a.b.c.d.e.f', 'a.**.f') // true
 */
export function checkGlob(str: string, glob: string): boolean {
    const strParts = str.split('.');
    const globaParts = glob.split('.');

    const isStar = (s: string) => s === '*';
    const isGlobStar = (s: string) => s === '**';

    let strIndex = 0;
    let globIndex = 0;

    while (strIndex < strParts.length) {
        const globPart = globaParts[globIndex];
        const strPart = strParts[strIndex];

        if (globPart === strPart || isStar(globPart)) {
            globIndex++;
            strIndex++;
        } else if (isGlobStar(globPart)) {
            globIndex++;
            strIndex = strParts.length - (globaParts.length - globIndex);
        } else {
            return false;
        }
    }

    return globIndex === globaParts.length;
}

export const JSONConverter: ComplexAttributeConverter = {
    fromAttribute: (value: string): JSONValue => {
        return value && value.trim() ? JSON.parse(value) : undefined;
    },
    toAttribute: (value: JSONValue): string => {
        return JSON.stringify(value);
    }
};

export const isDefined = (value: unknown) => value !== void 0;

export const isMatchingPath = (path: string, criteria: string | RegExp) =>
    isRegex(criteria) ? !!path.match(criteria as RegExp) : checkGlob(path, criteria as string);

export const getValueByPath = (json: JSONValue, path: string) =>
    path.split('.').reduce((acc, key) => (acc as JSONObject)![key], json);
