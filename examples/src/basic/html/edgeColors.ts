import {html, render} from 'lit-html';
import '../../../../src/grafer/GraferView';

export async function edgeColors(container: HTMLElement): Promise<void> {
    const nodes = {
        data: [
            { x: -8.6, y: 5.0 },
            { x: 8.6, y: 5.0 },
            { x: 0.0, y: -10.0 },
            { x: 0.0, y: 0.0 },
        ],
    };

    const edges = {
        data: [
            { source: 0, target: 1, sourceColor: '#5e81ac', targetColor: '#b48ead' },
            { source: 1, target: 2, sourceColor: '#b48ead', targetColor: '#88c0d0' },
            { source: 2, target: 0, sourceColor: '#88c0d0', targetColor: '#5e81ac' },

            { source: 3, target: 0, sourceColor: 'orange', targetColor: '#5e81ac' },
            { source: 3, target: 1, sourceColor: 'orange', targetColor: '#b48ead' },
            { source: 3, target: 2, sourceColor: 'orange', targetColor: '#88c0d0' },
        ],
    };

    const layers = [
        { nodes, edges },
    ];

    render(html`<grafer-view class="grafer_container" .layers="${layers}"></grafer-view><mouse-interactions></mouse-interactions>`, container);
}
