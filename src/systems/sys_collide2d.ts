import {get_translation, transform_point} from "../../common/mat2d.js";
import {Vec2} from "../../common/math.js";
import {
    add,
    copy,
    distance,
    distance_squared,
    dot,
    normalize,
    scale,
    subtract,
} from "../../common/vec2.js";
import {Collide2D, CollideDynamic, CollideStatic} from "../components/com_collide2d.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY_DYNAMIC = Has.Transform2D | Has.CollideDynamic;
const QUERY_STATIC = Has.Transform2D | Has.CollideStatic;

const closest_point: Vec2 = [0, 0];
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

            if (collider.Length > 0) {
                transform_point(collider.Base, [0, -collider.Length / 2], transform.World);
                transform_point(collider.Tip, [0, collider.Length / 2], transform.World);
            } else {
                transform_point(collider.Base, [collider.Length / 2, 0], transform.World);
                transform_point(collider.Tip, [-collider.Length / 2, 0], transform.World);
            }

            // Check for collisions with all dynamic colliders.
            for (let oth = 0; oth < game.World.Signature.length; oth++) {
                if ((game.World.Signature[oth] & QUERY_DYNAMIC) === QUERY_DYNAMIC) {
                    let other_collider = game.World.CollideDynamic[oth];
                    if (other_collider.Mask & collider.Layer) {
                        closest_point_on_section(
                            closest_point,
                            collider.Base,
                            collider.Tip,
                            other_collider.Center
                        );
                        if (
                            distance_squared(closest_point, other_collider.Center) <
                            (collider.Radius + other_collider.Radius) ** 2
                        ) {
                            other_collider.ContactId = ent;
                            subtract(
                                other_collider.ContactNormal,
                                other_collider.Center,
                                closest_point
                            );
                            normalize(other_collider.ContactNormal, other_collider.ContactNormal);
                            other_collider.ContactDepth =
                                collider.Radius +
                                other_collider.Radius -
                                distance(closest_point, other_collider.Center);
                        }
                    }
                }
            }
        }
    }
}

function intersect_sphere_sphere(a: Collide2D, b: Collide2D) {
    return distance_squared(a.Center, b.Center) < (a.Radius + b.Radius) ** 2;
}

function intersect_capsule_sphere(capsule: CollideStatic, sphere: CollideDynamic) {
    return (
        distance_squared_to_section(capsule.Base, capsule.Tip, sphere.Center) <
        (capsule.Radius + sphere.Radius) ** 2
    );
}

// See https://arrowinmyknee.com/2021/03/15/some-math-about-capsule-collision/

const ab: Vec2 = [0, 0];
const ac: Vec2 = [0, 0];
const bc: Vec2 = [0, 0];

function distance_squared_to_section(base: Vec2, tip: Vec2, point: Vec2) {
    subtract(ab, tip, base);
    subtract(ac, point, base);
    subtract(bc, point, tip);

    // Handle cases where c projects outside ab
    let e = dot(ac, ab);
    if (e <= 0) return dot(ac, ac);
    let f = dot(ab, ab);
    if (e >= f) return dot(bc, bc);

    // Handle cases where c projects onto ab
    return dot(ac, ac) - (e * e) / f;
}

function closest_point_on_section(out: Vec2, base: Vec2, tip: Vec2, point: Vec2) {
    subtract(ab, tip, base);
    subtract(ac, point, base);
    subtract(bc, point, tip);

    // Project c onto ab, but deferring divide by Dot(ab, ab)
    let t = dot(ac, ab);
    if (t <= 0) {
        // c projects outside the [a,b] interval, on the a side; clamp to a
        t = 0;
        copy(out, base);
    } else {
        let denom = dot(ab, ab); // Always nonnegative since denom = ||ab||∧2
        if (t >= denom) {
            // c projects outside the [a,b] interval, on the b side; clamp to b
            t = 1;
            copy(out, tip);
        } else {
            // c projects inside the [a,b] interval; must do deferred divide now
            t = t / denom;
            scale(out, ab, t);
            add(out, out, base);
        }
    }
    return t;
}
