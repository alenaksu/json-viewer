import { ComplexAttributeConverter } from 'lit';
import { SupportedTypes } from './types';

export function isRegex(obj: RegExp | unknown): boolean {
    return obj instanceof RegExp;
}

export function getType(obj: any): SupportedTypes {
    return obj === null
        ? SupportedTypes.Null
        : Array.isArray(obj)
        ? SupportedTypes.Array
        : obj.constructor.name.toLowerCase();
}

export function isPrimitive(obj: any) {
    return obj !== Object(obj);
}

export function isNode(obj: any) {
    return !!obj && !!obj.nodeType;
}

export function isPrimitiveOrNode(obj: any) {
    return isPrimitive(obj) || isNode(obj);
}

export function generateNodePreview(
    node: any,
    { nodeCount = 3, maxLength = 15 }: { nodeCount?: number; maxLength?: number } = {}
) {
    const isArray = Array.isArray(node);
    const objectNodes = Object.keys(node);
    const keys = objectNodes.slice(0, nodeCount);
    const preview = [isArray ? '[ ' : '{ '];

    const getNodeProview = (nodeValue: any) => {
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

        nodePreview.push(getNodeProview(nodeValue));
        childPreviews.push(nodePreview.join(''));
    }
    if (objectNodes.length > nodeCount) childPreviews.push('...');

    preview.push(childPreviews.join(', '));
    preview.push(isArray ? ' ]' : ' }');

    return preview.join('');
}

export function* deepTraverse(obj: any) {
    const stack: Array<[string, any, any[]]> = [['', obj, []]];
    while (stack.length) {
        const [path, node, parents] = stack.shift()!;

        if (path) {
            yield [node, path, parents];
        }

        if (!isPrimitive(node)) {
            for (const [key, value] of Object.entries(node)) {
                stack.push([`${path}${path ? '.' : ''}${key}`, value, [...parents, path]]);
            }
        }
    }
}

/**
 * Matches a string using a glob-like syntax)
 */
export function checkGlob(str: string, glob: string) {
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
    fromAttribute: (value) => {
        return value && value.trim() ? JSON.parse(value) : undefined;
    },
    toAttribute: (value) => {
        return JSON.stringify(value);
    }
};

export const isDefined = (value: any) => value !== void 0;
