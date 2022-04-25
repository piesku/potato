import {children} from "../components/com_children.js";
import {collide_static} from "../components/com_collide2d.js";
import {grabbable} from "../components/com_grabbable.js";
import {order, render2d} from "../components/com_render2d.js";
import {RigidKind, rigid_body2d} from "../components/com_rigid_body2d.js";
import {transform2d} from "../components/com_transform2d.js";
import {Game, Layer} from "../game.js";

export function blueprint_peeler(game: Game) {
    return [
        render2d("obieraczka_front"),
        order(1),
        grabbable(),
        children(
            // Child 0: Exit.
            [transform2d([0.25, -0.25])],
            [transform2d(), render2d("obieraczka"), order(0)],
            [transform2d([0, -0.2]), collide_static(Layer.ProcessPeel, 1)],
            [
                transform2d([-0.2, 0]),
                collide_static(Layer.Obstacle, 0.3, 0.5),
                rigid_body2d(RigidKind.Static, 1),
            ],
            [
                transform2d([0.2, 0.1]),
                collide_static(Layer.Obstacle, 0.3, 0.3),
                rigid_body2d(RigidKind.Static, 1),
            ]
        ),
    ];
}
