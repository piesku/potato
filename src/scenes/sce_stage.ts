import {hsva_to_vec4} from "../../common/color.js";
import {instantiate} from "../../common/game.js";
import {orthographic} from "../../common/projection.js";
import {float} from "../../common/random.js";
import {animate_sprite} from "../components/com_animate_sprite.js";
import {camera_canvas} from "../components/com_camera.js";
import {children} from "../components/com_children.js";
import {collide_dynamic, collide_static} from "../components/com_collide2d.js";
import {control_player} from "../components/com_control_player.js";
import {control_process} from "../components/com_control_process.js";
import {grabbable} from "../components/com_grabbable.js";
import {order, render2d} from "../components/com_render2d.js";
import {RigidKind, rigid_body2d} from "../components/com_rigid_body2d.js";
import {transform2d} from "../components/com_transform2d.js";
import {Game, Layer, WORLD_CAPACITY} from "../game.js";
import {World} from "../world.js";

export function scene_stage(game: Game) {
    game.World = new World(WORLD_CAPACITY);
    game.ViewportResized = true;

    // Camera.
    instantiate(game, [
        transform2d([0, 0]),
        camera_canvas(orthographic(5, 1, 3), [0, 0, 0, 0]),
        control_player(),
    ]);

    instantiate(game, [
        transform2d([0, 5], 0, [4, 3]),
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
    ]);

    instantiate(game, [
        transform2d([0, 0], 0, [4, 3]),
        render2d("garnek2_front"),
        order(1),
        grabbable(),
        children(
            [transform2d(), render2d("garnek21"), order(0)],
            [transform2d([0, -0.2]), collide_static(Layer.ProcessPeel, 1)],
            [
                transform2d([-0.3, 0]),
                collide_static(Layer.Obstacle, 0.3, 0.25),
                rigid_body2d(RigidKind.Static, 1),
            ],
            [
                transform2d([0.3, 0]),
                collide_static(Layer.Obstacle, 0.3, 0.25),
                rigid_body2d(RigidKind.Static, 1),
            ]
        ),
    ]);

    instantiate(game, [
        transform2d([0, -5], 0, [4, 3]),
        render2d("garnek2_front"),
        order(1),
        grabbable(),
        children(
            [transform2d(), render2d("garnek21"), order(0)],
            [transform2d([0, -0.2]), collide_static(Layer.ProcessCut, 1)],
            [
                transform2d([-0.3, 0]),
                collide_static(Layer.Obstacle, 0.3, 0.25),
                rigid_body2d(RigidKind.Static, 1),
            ],
            [
                transform2d([0.3, 0]),
                collide_static(Layer.Obstacle, 0.3, 0.25),
                rigid_body2d(RigidKind.Static, 1),
            ]
        ),
    ]);

    instantiate(game, [
        transform2d([-2.5, 10], -45, [4, 1]),
        render2d("platform1"),
        collide_static(Layer.Obstacle, 1, -0.65),
        rigid_body2d(RigidKind.Static, 1.3),
        grabbable(),
    ]);

    instantiate(game, [
        transform2d([2.5, 10], 45, [4, 1]),
        render2d("platform1"),
        collide_static(Layer.Obstacle, 1, -0.65),
        rigid_body2d(RigidKind.Static, 1.3),
        grabbable(),
    ]);

    let dynamic_count = 10000;
    for (let i = 0; i < dynamic_count; i++) {
        instantiate(game, [
            transform2d([float(-3, 3), float(20, 100)], 0),
            render2d(
                "ziemniak_surowy",
                hsva_to_vec4(float(0.1, 0.15), float(0, 0.5), float(0.5, 1), 1)
            ),
            control_process(Layer.ProcessBoil | Layer.ProcessPeel | Layer.ProcessCut),
            collide_dynamic(
                1,
                Layer.Obstacle | Layer.ProcessBoil | Layer.ProcessPeel | Layer.ProcessCut
            ),
            rigid_body2d(RigidKind.Dynamic, float(0.99, 0.999)),
        ]);
    }
}
