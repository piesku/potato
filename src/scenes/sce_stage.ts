import {instantiate} from "../../common/game.js";
import {orthographic} from "../../common/projection.js";
import {float} from "../../common/random.js";
import {animate_sprite} from "../components/com_animate_sprite.js";
import {camera_canvas} from "../components/com_camera.js";
import {children} from "../components/com_children.js";
import {collide_static} from "../components/com_collide2d.js";
import {control_player} from "../components/com_control_player.js";
import {grabbable} from "../components/com_grabbable.js";
import {order, render2d} from "../components/com_render2d.js";
import {RigidKind, rigid_body2d} from "../components/com_rigid_body2d.js";
import {shake} from "../components/com_shake.js";
import {spawn} from "../components/com_spawn.js";
import {transform2d} from "../components/com_transform2d.js";
import {Game, Layer, WORLD_CAPACITY} from "../game.js";
import {World} from "../world.js";
import {blueprint_potato} from "./blu_potato.js";

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
        transform2d([0, 20]),
        children(
            [transform2d(undefined, 0, [4, 3]), render2d("karton"), order(0)],
            [transform2d(undefined, 0, [4, 3]), render2d("karton_front"), order(1)],
            [transform2d(), shake([1.4, 0.9]), spawn(blueprint_potato)],
            [transform2d(), shake([1.4, 0.9]), spawn(blueprint_potato)],
            [transform2d(), shake([1.4, 0.9]), spawn(blueprint_potato)],
            [transform2d(), shake([1.4, 0.9]), spawn(blueprint_potato)],
            [transform2d(), shake([1.4, 0.9]), spawn(blueprint_potato)]
        ),
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
    ]);

    instantiate(game, [
        transform2d([0, -5], 0, [4, 3]),
        render2d("szatkownica_front"),
        order(1),
        grabbable(),
        children(
            [transform2d(), render2d("szatkownica"), order(0)],
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

    let dynamic_count = 0;
    for (let i = 0; i < dynamic_count; i++) {
        instantiate(game, [
            ...blueprint_potato(game),
            transform2d([float(-3, 3), float(20, 100)], 0),
        ]);
    }
}
