import { JsonViewer } from './JsonViewer';

customElements.define('json-viewer', JsonViewer);

declare global {
    interface HTMLElementTagNameMap {
        'json-viewer': JsonViewer;
    }
}
