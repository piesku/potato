import {hsva_to_vec4} from "../../common/color.js";
import {instantiate} from "../../common/game.js";
import {orthographic} from "../../common/projection.js";
import {float} from "../../common/random.js";
import {camera_canvas} from "../components/com_camera.js";
import {collide2d} from "../components/com_collide2d.js";
import {control_player} from "../components/com_control_player.js";
import {grabbable} from "../components/com_grabbable.js";
import {order, render2d} from "../components/com_render2d.js";
import {RigidKind, rigid_body2d} from "../components/com_rigid_body2d.js";
import {transform2d} from "../components/com_transform2d.js";
import {Game, WORLD_CAPACITY} from "../game.js";
import {World} from "../world.js";

export function scene_stage(game: Game) {
    game.World = new World(WORLD_CAPACITY);
    game.ViewportResized = true;

    // Camera.
    instantiate(game, [
        transform2d([0, 0]),
        camera_canvas(orthographic(5, 1, 3)),
        control_player(),
    ]);

    // Garnek1.
    instantiate(game, [
        transform2d([-6, 0], 0, [4, 3]),
        render2d([4, 2.33], [0, 0]),
        order(1),
        grabbable(),
        collide2d(false, 2),
        rigid_body2d(RigidKind.Static, 1.5),
    ]);

    // Garnek2.
    instantiate(game, [
        transform2d([0, -3], 0, [4, 3]),
        render2d([4, 2.33], [0, 1]),
        order(1),
        grabbable(),
        collide2d(false, 2),
        rigid_body2d(RigidKind.Static, 1.5),
    ]);

    for (let i = 0; i < 5; i += 0.5) {
        instantiate(game, [
            transform2d([i + 4, i], 0),
            render2d([16, 7], [0, 6], hsva_to_vec4(float(0.1, 0.2), 0.2, 1, 1)),
            collide2d(false, 0.5),
            rigid_body2d(RigidKind.Static, 1.5),
        ]);
    }

    let dynamic_count = 20_000;
    for (let i = 0; i < dynamic_count; i++) {
        instantiate(game, [
            transform2d([float(-8, -4), float(10, 100)], 0),
            render2d([16, 7], [0, 6], hsva_to_vec4(float(0.1, 0.2), 0.2, 1, 1)),
            // Place entities from closest to the farthest away to avoid overdraw.
            order(1 - i / dynamic_count),
            collide2d(true, 1),
            rigid_body2d(RigidKind.Dynamic, float(0.99, 0.999)),
        ]);

        instantiate(game, [
            transform2d([float(4, 8), float(10, 100)], 0),
            render2d([16, 7], [1, 6], hsva_to_vec4(float(0.1, 0.2), 0.5, 1, 1)),
            // Place entities from closest to the farthest away to avoid overdraw.
            order(1 - i / dynamic_count),
            collide2d(true, 1),
            rigid_body2d(RigidKind.Dynamic, float(0.99, 0.999)),
        ]);
    }
}
