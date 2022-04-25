import {animate_sprite} from "../components/com_animate_sprite.js";
import {children} from "../components/com_children.js";
import {collide_static} from "../components/com_collide2d.js";
import {grabbable} from "../components/com_grabbable.js";
import {order, render2d} from "../components/com_render2d.js";
import {RigidKind, rigid_body2d} from "../components/com_rigid_body2d.js";
import {transform2d} from "../components/com_transform2d.js";
import {Game, Layer} from "../game.js";

export function blueprint_cooker(game: Game) {
    return [
        render2d("garnek2_front"),
        order(1),
        grabbable(),
        children(
            [
                transform2d(),
                render2d("garnek21"),
                order(0),
                animate_sprite({
                    garnek21: 0.1,
                    garnek22: 0.1,
                    garnek23: 0.1,
                    garnek24: 0.1,
                }),
            ],
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
            [transform2d([0, -0.2]), collide_static(Layer.ProcessBoil, 0.5, -0.5)]
        ),
    ];
}
