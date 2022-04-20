import {get_translation} from "../../common/mat2d.js";
import {Vec2} from "../../common/math.js";
import {distance, distance_squared, negate, normalize, subtract} from "../../common/vec2.js";
import {Collide2D} from "../components/com_collide2d.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.Transform2D | Has.Collide2D;

export function sys_collide2d(game: Game, delta: number) {
    // Collect all colliders.
    let dynamic_colliders: Collide2D[] = [];
    let static_colliders: Collide2D[] = [];

    for (let ent = 0; ent < game.World.Signature.length; ent++) {
        if ((game.World.Signature[ent] & QUERY) === QUERY) {
            let transform = game.World.Transform2D[ent];
            let collider = game.World.Collide2D[ent];

            // Prepare the collider for this tick.
            collider.Collisions = [];
            get_translation(collider.Center, transform.World);

            if (collider.Dynamic) {
                dynamic_colliders.push(collider);
            } else {
                static_colliders.push(collider);
            }
        }
    }

    for (let i = 0; i < dynamic_colliders.length; i++) {
        check_collisions(dynamic_colliders[i], static_colliders);
    }
}

function check_collisions(collider: Collide2D, colliders: Array<Collide2D>) {
    for (let i = 0; i < colliders.length; i++) {
        let other = colliders[i];
        if (other !== collider && intersect(collider, other)) {
            let penetration_normal: Vec2 = [0, 0];
            subtract(penetration_normal, other.Center, collider.Center);
            normalize(penetration_normal, penetration_normal);
            let penetration_depth =
                collider.Radius + other.Radius - distance(collider.Center, other.Center);
            collider.Collisions.push({
                OtherId: other.EntityId,
                Normal: penetration_normal,
                Depth: penetration_depth,
            });
            other.Collisions.push({
                OtherId: collider.EntityId,
                Normal: negate([0, 0], penetration_normal),
                Depth: penetration_depth,
            });
        }
    }
}

function intersect(a: Collide2D, b: Collide2D) {
    return distance_squared(a.Center, b.Center) < (a.Radius + b.Radius) ** 2;
}
