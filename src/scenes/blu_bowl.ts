import {children} from "../components/com_children.js";
import {collide_static} from "../components/com_collide2d.js";
import {grabbable} from "../components/com_grabbable.js";
import {order, render2d} from "../components/com_render2d.js";
import {RigidKind, rigid_body2d} from "../components/com_rigid_body2d.js";
import {transform2d} from "../components/com_transform2d.js";
import {Game, Layer} from "../game.js";

export function blueprint_bowl(game: Game) {
    return [
        grabbable(),
        children(
            [transform2d(), render2d("miska"), order(0)],
            [transform2d(), render2d("miska_front"), order(1)],
            [
                transform2d([-0.4, 0]),
                collide_static(Layer.Obstacle, 0.2, 0.4),
                rigid_body2d(RigidKind.Static, 1),
            ],
            [
                transform2d([0.4, 0]),
                collide_static(Layer.Obstacle, 0.2, 0.4),
                rigid_body2d(RigidKind.Static, 1),
            ],
            [transform2d([0, -0.1]), collide_static(Layer.ProcessFinish, 0.5, -0.5)]
        ),
    ];
}
