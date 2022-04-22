import {get_translation} from "../../common/mat2d.js";
import {distance, distance_squared, normalize, subtract} from "../../common/vec2.js";
import {Collide2D} from "../components/com_collide2d.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY_DYNAMIC = Has.Transform2D | Has.CollideDynamic;
const QUERY_STATIC = Has.Transform2D | Has.CollideStatic;

export function sys_collide2d(game: Game, delta: number) {
    // Prepare dynamic colliders.
    for (let ent = 0; ent < game.World.Signature.length; ent++) {
        if ((game.World.Signature[ent] & QUERY_DYNAMIC) === QUERY_DYNAMIC) {
            let transform = game.World.Transform2D[ent];
            let collider = game.World.CollideDynamic[ent];
            get_translation(collider.Center, transform.World);
            collider.ContactId = null;
        }
    }

    // For each static collider, check for collisions with all dynamic ones.
    for (let ent = 0; ent < game.World.Signature.length; ent++) {
        if ((game.World.Signature[ent] & QUERY_STATIC) === QUERY_STATIC) {
            let transform = game.World.Transform2D[ent];
            let collider = game.World.CollideStatic[ent];

            // Update the position of the static collider.
            get_translation(collider.Center, transform.World);

            // Check for collisions with all dynamic colliders.
            for (let oth = 0; oth < game.World.Signature.length; oth++) {
                if ((game.World.Signature[oth] & QUERY_DYNAMIC) === QUERY_DYNAMIC) {
                    let other_collider = game.World.CollideDynamic[oth];
                    if (
                        other_collider.Mask & collider.Layer &&
                        intersect(collider, other_collider)
                    ) {
                        other_collider.ContactId = ent;
                        subtract(
                            other_collider.ContactNormal,
                            other_collider.Center,
                            collider.Center
                        );
                        normalize(other_collider.ContactNormal, other_collider.ContactNormal);
                        other_collider.ContactDepth =
                            collider.Radius +
                            other_collider.Radius -
                            distance(collider.Center, other_collider.Center);
                    }
                }
            }
        }
    }
}

function intersect(a: Collide2D, b: Collide2D) {
    return distance_squared(a.Center, b.Center) < (a.Radius + b.Radius) ** 2;
}
