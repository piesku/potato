/**
 * @module systems/sys_control_always2d
 */

import {get_translation} from "../../common/mat2d.js";
import {float, integer} from "../../common/random.js";
import {Entity} from "../../common/world.js";
import {ProcessKind} from "../components/com_control_process.js";
import {set_color, set_sprite} from "../components/com_render2d.js";
import {Game, Layer} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.ControlProcess | Has.CollideDynamic;

export function sys_control_process(game: Game, delta: number) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) === QUERY) {
            update(game, i);
        }
    }
}

function update(game: Game, entity: Entity) {
    let control = game.World.ControlProcess[entity];
    let collide = game.World.CollideDynamic[entity];
    let rigid_body = game.World.RigidBody2D[entity];
    let transform = game.World.Transform2D[entity];

    if (collide.ContactId === null) {
        return;
    }

    let other = game.World.CollideStatic[collide.ContactId];
    if (control.Needs & other.Layer) {
        control.Needs &= ~other.Layer;
        collide.Mask &= ~other.Layer;

        game.World.Signature[entity] |= Has.Dirty;
        rigid_body.VelocityResolved[0] = 0;
        rigid_body.VelocityResolved[1] = 0;

        if (other.Layer & Layer.ProcessCook) {
            set_color(game, entity, [1, 1, 1, 1]);
            switch (control.Kind) {
                case ProcessKind.Potato:
                    if (control.Needs & Layer.ProcessPeel) {
                        set_sprite(game, entity, "ziemniak_ugotowany");
                    } else {
                        set_sprite(game, entity, "ziemniak_obrany_ugotowany");
                        control.Needs |= Layer.ProcessCut;
                    }
                    break;
                case ProcessKind.Carrot:
                    if (control.Needs & Layer.ProcessPeel) {
                        set_sprite(game, entity, "marchewka_ugotowana");
                    } else {
                        set_sprite(game, entity, "marchewka_obrana_ugotowana");
                        control.Needs |= Layer.ProcessCut;
                    }
                    break;
                case ProcessKind.GreenPea:
                    set_sprite(game, entity, "groszek_ugotowany");
                    control.Needs |= Layer.ProcessPeel;
                    break;
                case ProcessKind.Apple:
                    break;
            }
            return;
        }

        if (other.Layer & Layer.ProcessPeel) {
            set_color(game, entity, [1, 1, 1, 1]);
            switch (control.Kind) {
                case ProcessKind.Potato:
                    if (control.Needs & Layer.ProcessCook) {
                        set_sprite(game, entity, "ziemniak_obrany");
                    } else {
                        set_sprite(game, entity, "ziemniak_obrany_ugotowany");
                        control.Needs |= Layer.ProcessCut;
                    }
                    break;
                case ProcessKind.Carrot:
                    if (control.Needs & Layer.ProcessCook) {
                        set_sprite(game, entity, "marchewka_obrana");
                    } else {
                        set_sprite(game, entity, "marchewka_obrana_ugotowana");
                        control.Needs |= Layer.ProcessCut;
                    }
                    break;
                case ProcessKind.GreenPea:
                    set_sprite(game, entity, "groszek_obrany");
                    control.Needs |= Layer.ProcessFinish;
                    transform.Scale[0] = 0.5;
                    transform.Scale[1] = 0.5;
                    break;
                case ProcessKind.Apple:
                    set_sprite(game, entity, "jablko_obrane");
                    control.Needs |= Layer.ProcessCut;
                    break;
            }

            let other_transform = game.World.Transform2D[other.EntityId];
            let parent_entity = other_transform.Parent;
            if (parent_entity !== undefined) {
                let exit_entity = game.World.Children[parent_entity].Children[0];
                let exit_transform = game.World.Transform2D[exit_entity];
                get_translation(transform.Translation, exit_transform.World);
            }

            rigid_body.Acceleration[0] = 300;
            return;
        }

        if (other.Layer & Layer.ProcessCut) {
            set_color(game, entity, [1, 1, 1, 1]);
            switch (control.Kind) {
                case ProcessKind.Potato:
                    set_sprite(game, entity, "ziemniak_kawalek" + integer(1, 2));
                    control.Needs |= Layer.ProcessFinish;
                    break;
                case ProcessKind.Carrot:
                    set_sprite(game, entity, "marchewka_kawalek" + integer(1, 2));
                    control.Needs |= Layer.ProcessFinish;
                    break;
                case ProcessKind.Apple:
                    set_sprite(game, entity, "jablko_kawalek" + integer(1, 2));
                    control.Needs |= Layer.ProcessFinish;
                    break;
            }

            let other_transform = game.World.Transform2D[other.EntityId];
            let parent_entity = other_transform.Parent;
            if (parent_entity !== undefined) {
                let exit_entity = game.World.Children[parent_entity].Children[0];
                let exit_transform = game.World.Transform2D[exit_entity];
                get_translation(transform.Translation, exit_transform.World);
            }

            transform.Scale[0] = 0.5;
            transform.Scale[1] = 0.5;

            rigid_body.Acceleration[0] = float(-200, 200);
            collide.Radius = 0.5;
            return;
        }

        if (other.Layer & Layer.ProcessFinish) {
            game.World.Signature[entity] &= ~Has.RigidBody2D;
            game.World.Signature[entity] &= ~Has.CollideDynamic;
        }
    } else if (other.Layer > Layer.Obstacle) {
        // The ingredient is not supported by the current process. Eject it.
        rigid_body.Acceleration[0] = float(-200, 200);
        rigid_body.Acceleration[1] = float(200, 300);
    }
}
