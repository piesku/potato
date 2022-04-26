import {collide_static} from "../components/com_collide2d.js";
import {control_always2d} from "../components/com_control_always2d.js";
import {grabbable} from "../components/com_grabbable.js";
import {move2d} from "../components/com_move2d.js";
import {render2d} from "../components/com_render2d.js";
import {RigidKind, rigid_body2d} from "../components/com_rigid_body2d.js";
import {Game, Layer} from "../game.js";

export function blueprint_board2(game: Game) {
    return [
        render2d("deska2"),
        collide_static(Layer.Obstacle, 1, -0.65),
        rigid_body2d(RigidKind.Static, 1),
        grabbable(),
        control_always2d(null, 1),
        move2d(0, 30),
    ];
}
