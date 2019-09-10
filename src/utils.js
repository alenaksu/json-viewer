import { isTemplate } from '@tiny-lit/core/dist/esm/utils';

export function getType(obj) {
    return obj === null ? 'null' : Array.isArray(obj) ? 'array' : typeof obj;
}

export function isPrimitive(obj) {
    return obj !== Object(obj);
}

export function isNode(obj) {
    return !!obj && (!!obj.nodeType || isTemplate(obj));
}

export function JsonObject(obj) {
    try {
        if (typeof obj === 'string') return JSON.parse(obj);
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

    preview.push(
        keys
            .reduce((allNodesPreview, key) => {
                const nodePreview = [];
                const nodeValue = node[key];
                const nodeType = getType(nodeValue);

                if (!isArray) nodePreview.push(`${key}: `);

                if (nodeType === 'object') nodePreview.push('{ ... }');
                else if (nodeType === 'array') nodePreview.push('[ ... ]');
                else if (nodeType === 'string')
                    nodePreview.push(
                        `"${nodeValue.substring(0, maxLength)}${nodeValue.length > maxLength ? '...' : ''}"`
                    );
                else nodePreview.push(String(nodeValue));

                return allNodesPreview.concat(nodePreview.join(''));
            }, [])
            .join(', ')
    );

    if (objectNodes.length > nodeCount) preview.push(', ...');

    preview.push(isArray ? ' ]' : ' }');

    return preview.join('');
}
