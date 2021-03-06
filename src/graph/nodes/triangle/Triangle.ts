import nodeFS from './Triangle.fs.glsl';
import pickingFS from './Triangle.picking.fs.glsl';
import {Circle} from '../circle/Circle';
import {RenderableShaders} from '../../../renderer/Renderable';

export class Triangle extends Circle {
    protected getDrawShaders(): RenderableShaders {
        const shaders = super.getDrawShaders();
        shaders.fs = nodeFS;
        return shaders;
    }

    protected getPickingShaders(): RenderableShaders {
        const shaders = super.getPickingShaders();
        shaders.fs = pickingFS;
        return shaders;
    }
}
