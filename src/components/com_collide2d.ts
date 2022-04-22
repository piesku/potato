import {Vec2} from "../../common/math.js";
import {Entity} from "../../common/world.js";
import {Game, Layer} from "../game.js";
import {Has} from "../world.js";

export type Collide2D = Collide2dDynamic | Collide2dStatic;

export interface Collide2dDynamic {
    EntityId: Entity;
    Dynamic: true;
    /** The radius of the collider in world units. */
    Radius: number;
    Mask: number;
    /** The world position of the center. */
    Center: Vec2;
    ContactId: Entity | null;
    /* Penetration normal into this collider. */
    ContactNormal: Vec2;
    ContactDepth: number;
}

export function collide2d_dynamic(diameter: number, mask: number) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.Collide2D;
        game.World.Collide2D[entity] = {
            EntityId: entity,
            Dynamic: true,
            Mask: mask,
            Radius: diameter / 2,
            Center: [0, 0],
            ContactId: null,
            ContactNormal: [0, 0],
            ContactDepth: 0,
        };
    };
}

export interface Collide2dStatic {
    EntityId: Entity;
    Dynamic: false;
    Layer: Layer;
    /** The radius of the collider in world units. */
    Radius: number;
    /** The world position of the center. */
    Center: Vec2;
}

export function collide2d_static(layer: Layer, diameter: number) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.Collide2D;
        game.World.Collide2D[entity] = {
            EntityId: entity,
            Dynamic: false,
            Layer: layer,
            Radius: diameter / 2,
            Center: [0, 0],
        };
    };
}
