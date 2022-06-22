import { JsonViewerState } from './types';
import { checkGlob, deepTraverse, isDefined, isRegex } from './utils';

const isMatching = (path: string, criteria: string | RegExp) =>
    isRegex(criteria) ? !!path.match(criteria as RegExp) : checkGlob(path, criteria as string);

export const toggleNode = (path: string, expanded?: boolean) => (state: JsonViewerState) => ({
    expanded: {
        ...state.expanded,
        [path]: isDefined(expanded) ? !!expanded : !state.expanded[path]
    }
});

export const expand = (regexOrGlob: string | RegExp, isExpanded: boolean) => (_state: JsonViewerState, el: any) => {
    const expanded: Record<string, boolean> = {};

    if (regexOrGlob) {
        for (const [, path, parents] of deepTraverse(el.data)) {
            if (isMatching(path, regexOrGlob)) {
                expanded[path] = isExpanded;
                parents.forEach((p: string) => (expanded[p] = isExpanded));
            }
        }
    }

    return { expanded };
};

export const filter = (regexOrGlob: string | RegExp) => (_state: JsonViewerState, el: any) => {
    const filtered: Record<string, boolean> = {};

    if (regexOrGlob) {
        for (const [, path, parents] of deepTraverse(el.data)) {
            if (isMatching(path, regexOrGlob)) {
                filtered[path] = false;
                parents.forEach((p: string) => (filtered[p] = false));
            } else {
                filtered[path] = true;
            }
        }
    }

    return { filtered };
};

export const resetFilter = () => () => ({ filtered: {} });

export const highlight = (path: string | null) => () => ({
    highlight: path
});
