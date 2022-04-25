/**
 * @module systems/sys_physics_resolve
 */

import {Vec2} from "../../common/math.js";
import {add, copy, dot, scale} from "../../common/vec2.js";
import {Entity} from "../../common/world.js";
import {RigidKind} from "../components/com_rigid_body2d.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.Transform2D | Has.CollideDynamic | Has.RigidBody2D;

export function sys_physics2d_resolve(game: Game, delta: number) {
    for (let ent = 0; ent < game.World.Signature.length; ent++) {
        if ((game.World.Signature[ent] & QUERY) === QUERY) {
            update(game, ent);
        }
    }
}

const response_translation: Vec2 = [0, 0];
const response_velocity: Vec2 = [0, 0];

function update(game: Game, entity: Entity) {
    let transform = game.World.Transform2D[entity];
    let rigid_body = game.World.RigidBody2D[entity];
    let collide = game.World.CollideDynamic[entity];

    if (rigid_body.Kind === RigidKind.Dynamic) {
        if (
            collide.ContactId !== null &&
            game.World.Signature[collide.ContactId] & Has.RigidBody2D
        ) {
            scale(response_translation, collide.ContactNormal, collide.ContactDepth);
            add(transform.Translation, transform.Translation, response_translation);
            game.World.Signature[entity] |= Has.Dirty;

            let response_magnitude = dot(rigid_body.VelocityIntegrated, collide.ContactNormal);
            scale(
                response_velocity,
                collide.ContactNormal,
                -response_magnitude * game.physicsBounce
            );
            add(rigid_body.VelocityResolved, rigid_body.VelocityIntegrated, response_velocity);
        } else {
            copy(rigid_body.VelocityResolved, rigid_body.VelocityIntegrated);
        }
    }
}
