import { checkGlob, deepTraverse, isRegex } from './utils';

const isMatching = (path, criteria) => (isRegex(criteria) ? !!path.match(criteria) : checkGlob(path, criteria));

export const toggleNode = (path, expanded) => (state) => ({
    expanded: {
        ...state.expanded,
        [path]: expanded === undefined ? !state.expanded[path] : !!expanded
    }
});

export const expand = (regexOrGlob, isExpanded) => (state, el) => {
    const expanded = {};

    if (regexOrGlob) {
        for (const [node, path, parents] of deepTraverse(el.data)) {
            if (isMatching(path, regexOrGlob)) {
                expanded[path] = isExpanded;
                parents.forEach((p) => (expanded[p] = isExpanded));
            }
        }
    }

    return { expanded };
};

export const filter = (regexOrGlob) => (state, el) => {
    const filtered = {};

    if (regexOrGlob) {
        for (const [node, path, parents] of deepTraverse(el.data)) {
            if (isMatching(path, regexOrGlob)) {
                filtered[path] = false;
                parents.forEach((p) => (filtered[p] = false));
            } else {
                filtered[path] = true;
            }
        }
    }

    return { filtered };
};

export const highlight = (path) => () => ({
    highlight: path
});
