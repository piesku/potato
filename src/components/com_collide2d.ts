import {Vec2} from "../../common/math.js";
import {Entity} from "../../common/world.js";
import {Game, Layer} from "../game.js";
import {Has} from "../world.js";

export interface Collide2D {
    EntityId: Entity;
    /** The radius of the collider in world units. */
    Radius: number;
    /** The world position of the center. */
    Center: Vec2;
}

export interface CollideDynamic extends Collide2D {
    Mask: number;
    ContactId: Entity | null;
    /* Penetration normal into this collider. */
    ContactNormal: Vec2;
    ContactDepth: number;
}

export function collide_dynamic(diameter: number, mask: number) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.CollideDynamic;
        game.World.CollideDynamic[entity] = {
            EntityId: entity,
            Mask: mask,
            Radius: diameter / 2,
            Center: [0, 0],
            ContactId: null,
            ContactNormal: [0, 0],
            ContactDepth: 0,
        };
    };
}

export interface CollideStatic extends Collide2D {
    Layer: Layer;
}

export function collide_static(layer: Layer, diameter: number) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.CollideStatic;
        game.World.CollideStatic[entity] = {
            EntityId: entity,
            Layer: layer,
            Radius: diameter / 2,
            Center: [0, 0],
        };
    };
}
