import {instantiate} from "../../common/game.js";
import {orthographic} from "../../common/projection.js";
import {float} from "../../common/random.js";
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
import {blueprint_apple} from "./blu_apple.js";
import {blueprint_carrot} from "./blu_carrot.js";
import {blueprint_cooker} from "./blu_cooker.js";
import {blueprint_cutter} from "./blu_cutter.js";
import {blueprint_greenpea} from "./blu_greenpea.js";
import {blueprint_peeler} from "./blu_peeler.js";
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

    // Potato box.
    instantiate(game, [
        transform2d([-7.5, 20]),
        grabbable(),
        children(
            [transform2d([-1, 0.5], 180), render2d("ziemniak_surowy"), order(1)],
            [transform2d(undefined, 0, [4, 3]), render2d("karton"), order(0)],
            [transform2d(undefined, 0, [4, 3]), render2d("karton_front"), order(1)],
            [transform2d(), shake([1.3, 0.8]), spawn(blueprint_potato, 1)],
            [transform2d(), shake([1.3, 0.8]), spawn(blueprint_potato, 2)],
            [transform2d(), shake([1.3, 0.8]), spawn(blueprint_potato, 3)],
            [transform2d(), shake([1.3, 0.8]), spawn(blueprint_potato, 4)],
            [transform2d(), shake([1.3, 0.8]), spawn(blueprint_potato, 5)]
        ),
    ]);

    // Carrot box.
    instantiate(game, [
        transform2d([-2.5, 20]),
        grabbable(),
        children(
            [transform2d([-1, 0.5], 180), render2d("marchewka_surowa"), order(1)],
            [transform2d(undefined, 0, [4, 3]), render2d("karton"), order(0)],
            [transform2d(undefined, 0, [4, 3]), render2d("karton_front"), order(1)],
            [transform2d(), shake([1.3, 0.8]), spawn(blueprint_carrot, 1)],
            [transform2d(), shake([1.3, 0.8]), spawn(blueprint_carrot, 2)],
            [transform2d(), shake([1.3, 0.8]), spawn(blueprint_carrot, 3)],
            [transform2d(), shake([1.3, 0.8]), spawn(blueprint_carrot, 4)],
            [transform2d(), shake([1.3, 0.8]), spawn(blueprint_carrot, 5)]
        ),
    ]);

    // Grean pea box.
    instantiate(game, [
        transform2d([2.5, 20]),
        grabbable(),
        children(
            [transform2d([-1, 0.5], 180), render2d("groszek_surowy"), order(1)],
            [transform2d(undefined, 0, [4, 3]), render2d("karton"), order(0)],
            [transform2d(undefined, 0, [4, 3]), render2d("karton_front"), order(1)],
            [transform2d(), shake([1.3, 0.8]), spawn(blueprint_greenpea, 1)],
            [transform2d(), shake([1.3, 0.8]), spawn(blueprint_greenpea, 2)],
            [transform2d(), shake([1.3, 0.8]), spawn(blueprint_greenpea, 3)],
            [transform2d(), shake([1.3, 0.8]), spawn(blueprint_greenpea, 4)],
            [transform2d(), shake([1.3, 0.8]), spawn(blueprint_greenpea, 5)]
        ),
    ]);

    // Apple box.
    instantiate(game, [
        transform2d([7.5, 20]),
        grabbable(),
        children(
            [transform2d([-1, 0.5], 180), render2d("jablko_surowe"), order(1)],
            [transform2d(undefined, 0, [4, 3]), render2d("karton"), order(0)],
            [transform2d(undefined, 0, [4, 3]), render2d("karton_front"), order(1)],
            [transform2d(), shake([1.3, 0.8]), spawn(blueprint_apple, 1)],
            [transform2d(), shake([1.3, 0.8]), spawn(blueprint_apple, 2)],
            [transform2d(), shake([1.3, 0.8]), spawn(blueprint_apple, 3)],
            [transform2d(), shake([1.3, 0.8]), spawn(blueprint_apple, 4)],
            [transform2d(), shake([1.3, 0.8]), spawn(blueprint_apple, 5)]
        ),
    ]);

    instantiate(game, [...blueprint_cooker(game), transform2d([0, 5], 0, [4, 3])]);

    instantiate(game, [...blueprint_peeler(game), transform2d([0, 0], 0, [4, 3])]);

    instantiate(game, [...blueprint_cutter(game), transform2d([0, -5], 0, [4, 3])]);

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
