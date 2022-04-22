import {get_translation} from "../../common/mat2d.js";
import {distance, distance_squared, normalize, subtract} from "../../common/vec2.js";
import {Collide2D} from "../components/com_collide2d.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.Transform2D | Has.Collide2D;

export function sys_collide2d(game: Game, delta: number) {
    // Prepare all colliders.
    for (let ent = 0; ent < game.World.Signature.length; ent++) {
        if ((game.World.Signature[ent] & QUERY) === QUERY) {
            let transform = game.World.Transform2D[ent];
            let collider = game.World.Collide2D[ent];
            get_translation(collider.Center, transform.World);
            if (collider.Dynamic) {
                collider.ContactId = null;
            }
        }
    }

    // For each static collider, check for collisions with all dynamic ones.
    for (let ent = 0; ent < game.World.Signature.length; ent++) {
        if ((game.World.Signature[ent] & QUERY) === QUERY) {
            let collider = game.World.Collide2D[ent];
            if (!collider.Dynamic) {
                for (let oth = 0; oth < game.World.Signature.length; oth++) {
                    if ((game.World.Signature[oth] & QUERY) === QUERY) {
                        let other_collider = game.World.Collide2D[oth];
                        if (
                            other_collider.Dynamic &&
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
}

function intersect(a: Collide2D, b: Collide2D) {
    return distance_squared(a.Center, b.Center) < (a.Radius + b.Radius) ** 2;
}
