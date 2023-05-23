import { isDeepestVisible, isAncestor, isEmptyObject } from './utils';

function findLastVisibleDescendant(node: Element): Element {
    if (isDeepestVisible(node)) return node;
    const deeperObject = node.querySelector('[part=object]');
    const nextDeepest = deeperObject?.lastElementChild;
    if (!nextDeepest) return node;
    return findLastVisibleDescendant(nextDeepest);
}

function findNearestParentWithAdditionalLeaves(node: Element, initial = node): Element | null {
    const ul = node.parentElement;
    if (!ul) return node;
    const parent = ul.parentElement;
    if (!parent || !parent.parentElement) return initial;
    if (isLastChild(parent)) {
        return findNearestParentWithAdditionalLeaves(parent, initial);
    } else {
        return parent.nextElementSibling;
    }
}

export const navigateUp = (path: string, shadowRoot: ShadowRoot): void => {
    const currentFocus = shadowRoot.querySelector(`[data-path="${path}"]`);
    if (!currentFocus) return;
    const possibleNewFocus = currentFocus.previousElementSibling || currentFocus.parentElement?.parentElement;
    if (!(possibleNewFocus instanceof Element)) return;
    const newFocus =
        !isDeepestVisible(possibleNewFocus) && !isAncestor(currentFocus, possibleNewFocus)
            ? findLastVisibleDescendant(possibleNewFocus)
            : possibleNewFocus;
    if (newFocus) changeFocusedKey(newFocus, currentFocus);
};

export const navigateDown = (path: string, shadowRoot: ShadowRoot): void => {
    const currentFocus = shadowRoot.querySelector(`[data-path="${path}"]`);
    if (!currentFocus) return;
    const newFocus = findNextElementToFocus(currentFocus);
    if (newFocus) changeFocusedKey(newFocus, currentFocus);
};

const findNextElementToFocus = (currentFocus: Element): Element | null => {
    if (!isDeepestVisible(currentFocus)) {
        if (isEmptyObject(currentFocus)) {
            return findNearestParentWithAdditionalLeaves(currentFocus);
        } else {
            return currentFocus.querySelector('[part=property]');
        }
    } else if (isLastChild(currentFocus)) {
        return findNearestParentWithAdditionalLeaves(currentFocus) || currentFocus;
    } else return currentFocus.nextElementSibling;
};

export const navigateToParent = (path: string, shadowRoot: ShadowRoot): void => {
    const currentFocus = shadowRoot.querySelector(`[data-path="${path}"]`);
    if (!currentFocus || !currentFocus.parentElement || !currentFocus.parentElement.parentElement) return;
    changeFocusedKey(currentFocus.parentElement.parentElement, currentFocus);
};

const changeFocusedKey = (newFocus: Element, oldFocus: Element): void => {
    const keyToFocus = newFocus.querySelector('[part=key]');
    const keyToBlur = oldFocus.querySelector('[part=key]');
    if (keyToBlur instanceof HTMLSpanElement && keyToFocus instanceof HTMLSpanElement) {
        keyToFocus.setAttribute('tabindex', '0');
        keyToBlur.setAttribute('tabindex', '-1');
        keyToFocus.focus();
    }
};

const isLastChild = (currentFocus: Element): boolean => !currentFocus.nextElementSibling;
