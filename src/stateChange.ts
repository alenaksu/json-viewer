import { JsonViewerState } from './types';
import { deepTraverse, isDefined, isMatchingPath } from './utils';

export const toggleNode =
    (path: string, expanded?: boolean) =>
    (state: JsonViewerState): Partial<JsonViewerState> => ({
        expanded: {
            ...state.expanded,
            [path]: isDefined(expanded) ? !!expanded : !state.expanded[path]
        }
    });

export const expand =
    (regexOrGlob: string | RegExp, isExpanded: boolean) =>
    (_state: JsonViewerState, el: any): Partial<JsonViewerState> => {
        const expanded: Record<string, boolean> = {};

        if (regexOrGlob) {
            for (const [, path, parents] of deepTraverse(el.data)) {
                if (isMatchingPath(path, regexOrGlob)) {
                    expanded[path] = isExpanded;
                    parents.forEach((p: string) => (expanded[p] = isExpanded));
                }
            }
        }

        return { expanded };
    };

export const filter =
    (regexOrGlob: string | RegExp) =>
    (_state: JsonViewerState, el: any): Partial<JsonViewerState> => {
        const filtered: Record<string, boolean> = {};

        if (regexOrGlob) {
            for (const [, path, parents] of deepTraverse(el.data)) {
                if (isMatchingPath(path, regexOrGlob)) {
                    filtered[path] = false;
                    parents.forEach((p: string) => (filtered[p] = false));
                } else {
                    filtered[path] = true;
                }
            }
        }

        return { filtered };
    };

export const resetFilter = () => (): Partial<JsonViewerState> => ({ filtered: {} });

export const highlight = (path: string | null) => (): Partial<JsonViewerState> => ({
    highlight: path
});
