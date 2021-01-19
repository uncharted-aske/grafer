import {RenderMode, RenderUniforms} from '../renderer/Renderable';
import {App} from 'picogl';
import {Nodes} from './nodes/Nodes';
import {Edges} from './edges/Edges';
import {GraphRenderable} from './GraphRenderable';
import {EventEmitter} from '@dekkai/event-emitter/build/lib/EventEmitter';
import {LayerRenderable} from './LayerRenderable';

export class Layer extends EventEmitter implements GraphRenderable {
    private _nodes: Nodes<any, any>;
    public get nodes(): Nodes<any, any> {
        return this._nodes;
    }

    private _edges: Edges<any, any> | null;
    public get edges(): Edges<any, any> | null {
        return this._edges;
    }

    private _labels: LayerRenderable<any, any> | null;
    public get labels(): LayerRenderable<any, any> | null {
        return this._labels;
    }

    private _nearDepth: number = 0.0;
    public get nearDepth(): number {
        return this._nearDepth;
    }
    public set nearDepth(value: number) {
        this._nearDepth = value;
        this.updateLabelsDepths();
        this.updateNodesDepths();
        this.updateEdgesDepths();
    }

    private _farDepth: number = 1.0;
    public get farDepth(): number {
        return this._farDepth;
    }
    public set farDepth(value: number) {
        this._farDepth = value;
        this.updateLabelsDepths();
        this.updateNodesDepths();
        this.updateEdgesDepths();
    }

    private _nodesNearDepth: number = 0;
    public get nodesNearDepth(): number {
        return this._nodesNearDepth;
    }
    public set nodesNearDepth(value: number) {
        this._nodesNearDepth = value;
        this.updateNodesDepths();
    }

    private _nodesFarDepth: number = 1;
    public get nodesFarDepth(): number {
        return this._nodesFarDepth;
    }
    public set nodesFarDepth(value: number) {
        this._nodesFarDepth = value;
        this.updateNodesDepths();
    }

    private _edgesNearDepth: number = 0;
    public get edgesNearDepth(): number {
        return this._edgesNearDepth;
    }
    public set edgesNearDepth(value: number) {
        this._edgesNearDepth = value;
        this.updateEdgesDepths();
    }

    private _edgesFarDepth: number = 1;
    public get edgesFarDepth(): number {
        return this._edgesFarDepth;
    }
    public set edgesFarDepth(value: number) {
        this._edgesFarDepth = value;
        this.updateEdgesDepths();
    }

    private _labelsNearDepth: number = 0;
    public get labelsNearDepth(): number {
        return this._labelsNearDepth;
    }
    public set labelsNearDepth(value: number) {
        this._labelsNearDepth = value;
        this.updateLabelsDepths();
    }

    private _labelsFarDepth: number = 1;
    public get labelsFarDepth(): number {
        return this._labelsFarDepth;
    }
    public set labelsFarDepth(value: number) {
        this._labelsFarDepth = value;
        this.updateLabelsDepths();
    }

    public enabled: boolean = true;
    public name: string;

    public constructor(nodes: Nodes<any, any>, edges: Edges<any, any>, labels: LayerRenderable<any, any>, name = 'Layer') {
        super();
        this._nodes = nodes;
        this._edges = edges;
        this._labels = labels;
        this.name = name;

        if (this._nodes) {
            this._nodes.on(EventEmitter.omniEvent, (event, id: string | number): void => {
                this.emit(event, {
                    layer: this.name,
                    type: 'node',
                    id,
                });
            });
        }

        if (this._edges) {
            this._edges.on(EventEmitter.omniEvent, (event, id: string | number): void => {
                this.emit(event, {
                    layer: this.name,
                    type: 'edge',
                    id,
                });
            });
        }
    }

    public render(context: App, mode: RenderMode, uniforms: RenderUniforms): void {
        this.renderLabels(context, mode, uniforms);
        this.renderNodes(context, mode, uniforms);
        this.renderEdges(context, mode, uniforms);
    }

    public renderNodes(context: App, mode: RenderMode, uniforms: RenderUniforms): void {
        if (this._nodes && this._nodes.enabled) {
            this._nodes.render(context, mode, uniforms);
        }
    }

    public renderEdges(context: App, mode: RenderMode, uniforms: RenderUniforms): void {
        if (this._edges && this._edges.enabled) {
            this._edges.render(context, mode, uniforms);
        }
    }

    public renderLabels(context: App, mode: RenderMode, uniforms: RenderUniforms): void {
        if (this._labels && this.labels.enabled) {
            this._labels.render(context, mode, uniforms);
        }
    }

    private updateLabelsDepths(): void {
        if (this._labels) {
            const depthRange = this._farDepth - this._nearDepth;
            this._labels.nearDepth = this._nearDepth + depthRange * this._labelsNearDepth;
            this._labels.farDepth = this._nearDepth + depthRange * this._labelsFarDepth;
        }
    }

    private updateNodesDepths(): void {
        if (this._nodes) {
            const depthRange = this._farDepth - this._nearDepth;
            this._nodes.nearDepth = this._nearDepth + depthRange * this._nodesNearDepth;
            this._nodes.farDepth = this._nearDepth + depthRange * this._nodesFarDepth;
        }
    }

    private updateEdgesDepths(): void {
        if (this._edges) {
            const depthRange = this._farDepth - this._nearDepth;
            this._edges.nearDepth = this._nearDepth + depthRange * this._edgesNearDepth;
            this._edges.farDepth = this._nearDepth + depthRange * this._edgesFarDepth;
        }
    }
}
