import {collide_static} from "../components/com_collide2d.js";
import {grabbable} from "../components/com_grabbable.js";
import {render2d} from "../components/com_render2d.js";
import {RigidKind, rigid_body2d} from "../components/com_rigid_body2d.js";
import {Game, Layer} from "../game.js";

export function blueprint_board1(game: Game) {
    return [
        render2d("deska1"),
        collide_static(Layer.Obstacle, 1, -0.65),
        rigid_body2d(RigidKind.Static, 1),
        grabbable(),
    ];
}
