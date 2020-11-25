import PicoGL, {App} from 'picogl';
import {LayerRenderable} from '../LayerRenderable';
import {GraphPoints} from '../../data/GraphPoints';
import {DataMappings} from '../../data/DataTools';
import {PickingManager} from '../../UX/picking/PickingManager';
import {GLDataTypes} from '../../renderer/Renderable';
import {GraferInputColor} from '../../renderer/ColorRegistry';

export interface BasicEdgeData {
    id?: number | string;
    source: number;
    target: number;
    sourceColor?: GraferInputColor,
    targetColor?: GraferInputColor,
}

export const kBasicEdgeMappings: DataMappings<BasicEdgeData> = {
    id: (entry: any, i) => 'id' in entry ? entry.id : i,
    source: (entry: any) => entry.source,
    target: (entry: any) => entry.target,
    sourceColor: (entry: any) => 'sourceColor' in entry ? entry.sourceColor : 0, // first registered color
    targetColor: (entry: any) => 'targetColor' in entry ? entry.targetColor : 0, // first registered color
};

export const kBasicEdgeDataTypes: GLDataTypes<BasicEdgeData> = {
    source: PicoGL.UNSIGNED_INT,
    target: PicoGL.UNSIGNED_INT,
    sourceColor: PicoGL.UNSIGNED_INT,
    targetColor: PicoGL.UNSIGNED_INT,
};

export abstract class Edges<T_SRC extends BasicEdgeData, T_TGT> extends LayerRenderable<T_SRC, T_TGT> {
    public static get defaultMappings(): DataMappings<BasicEdgeData> {
        return kBasicEdgeMappings;
    }

    public alpha: number = 1.0;

    protected constructor(context: App,
                          points: GraphPoints,
                          data: unknown[],
                          mappings: Partial<DataMappings<T_SRC>>,
                          pickingManager: PickingManager
    ) {
        super(context, points, data, mappings, pickingManager);
    }

    protected computeMappings(mappings: Partial<DataMappings<T_SRC>>): DataMappings<T_SRC> {
        const edgesMappings = Object.assign({}, kBasicEdgeMappings, mappings);

        // patches the mappings to get the points index from their IDs
        const sourceMapping = edgesMappings.source;
        edgesMappings.source = (entry, i): number => {
            return this.points.getPointIndex(sourceMapping(entry, i));
        };

        const targetMapping = edgesMappings.target;
        edgesMappings.target = (entry, i): number => {
            return this.points.getPointIndex(targetMapping(entry, i));
        };

        return edgesMappings as DataMappings<T_SRC>;
    }
}
