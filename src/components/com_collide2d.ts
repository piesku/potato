import {Vec2} from "../../common/math.js";
import {Entity} from "../../common/world.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export interface Collide2D {
    EntityId: Entity;
    Dynamic: boolean;
    /** The radius of the collider in world units. */
    Radius: number;
    /** The world position of the center. */
    Center: Vec2;
    /** Other colliders colliding with this collider during this tick. */
    Collisions: Array<Collision>;
}

export interface Collision {
    OtherId: Entity;
    Normal: Vec2;
    Depth: number;
}

export function collide2d(dynamic: boolean, diameter: number) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.Collide2D;
        game.World.Collide2D[entity] = {
            EntityId: entity,
            Dynamic: dynamic,
            Radius: diameter / 2,
            Center: [0, 0],
            Collisions: [],
        };
    };
}
