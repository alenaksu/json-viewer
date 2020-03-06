const TYPE_NULL = 'null';
const TYPE_ARRAY = 'array';
const TYPE_OBJECT = 'object';
const TYPE_STRING = 'string';

export function isRegex(obj) {
    return obj instanceof RegExp;
}

export function getType(obj) {
    return obj === null ? TYPE_NULL : Array.isArray(obj) ? TYPE_ARRAY : typeof obj;
}

export function isPrimitive(obj) {
    return obj !== Object(obj);
}

export function isNode(obj) {
    return !!obj && !!obj.nodeType;
}

export function isPrimitiveOrNode(obj) {
    return isPrimitive(obj) || isNode(obj);
}

export function JsonObject(obj) {
    try {
        if (typeof obj === TYPE_STRING) return JSON.parse(obj);
    } catch (ex) {
        console.error(ex);
    }
    return obj;
}

export function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export function generateNodePreview(node, options) {
    const { nodeCount, maxLength } = {
        nodeCount: 3,
        maxLength: 15,
        ...options
    };
    const isArray = Array.isArray(node);
    const objectNodes = Object.keys(node);
    const keys = objectNodes.slice(0, nodeCount);
    const preview = [isArray ? '[ ' : '{ '];

    const childPreviews = [];
    for (const key of keys) {
        const nodePreview = [];
        const nodeValue = node[key];
        const nodeType = getType(nodeValue);

        if (!isArray) nodePreview.push(`${key}: `);

        if (nodeType === TYPE_OBJECT) nodePreview.push('{ ... }');
        else if (nodeType === TYPE_ARRAY) nodePreview.push('[ ... ]');
        else if (nodeType === TYPE_STRING)
            nodePreview.push(`"${nodeValue.substring(0, maxLength)}${nodeValue.length > maxLength ? '...' : ''}"`);
        else nodePreview.push(String(nodeValue));

        childPreviews.push(nodePreview.join(''));
    }
    if (objectNodes.length > nodeCount) childPreviews.push('...');

    preview.push(childPreviews.join(', '));
    preview.push(isArray ? ' ]' : ' }');

    return preview.join('');
}

/**
 *
 * @param {any} obj
 * @param {any} previousValue
 */
export function* deepTraverse(obj) {
    const stack = [['', obj, []]];
    while (stack.length) {
        const [path, node, parents] = stack.shift();

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
 *
 * @param {string} str
 * @param {string} glob
 */
export function checkGlob(str, glob) {
    str = str.split('.');
    glob = glob.split('.');

    const isStar = (s) => s === '*';
    const isGlobStar = (s) => s === '**';

    let strIndex = 0;
    let globIndex = 0;

    while (strIndex < str.length) {
        const globPart = glob[globIndex];
        const strPart = str[strIndex];

        if (globPart === strPart || isStar(globPart)) {
            globIndex++;
            strIndex++;
        } else if (isGlobStar(globPart)) {
            globIndex++;
            strIndex = str.length - (glob.length - globIndex);
        } else return false;
    }

    return globIndex === glob.length;
}
