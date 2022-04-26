import {instantiate} from "../../common/game.js";
import {orthographic} from "../../common/projection.js";
import {camera_canvas} from "../components/com_camera.js";
import {children} from "../components/com_children.js";
import {control_player} from "../components/com_control_player.js";
import {grabbable} from "../components/com_grabbable.js";
import {order, render2d} from "../components/com_render2d.js";
import {shake} from "../components/com_shake.js";
import {spawn} from "../components/com_spawn.js";
import {transform2d} from "../components/com_transform2d.js";
import {Game, WORLD_CAPACITY} from "../game.js";
import {World} from "../world.js";
import {blueprint_board1} from "./blu_board1.js";
import {blueprint_bowl} from "./blu_bowl.js";
import {blueprint_potato} from "./blu_potato.js";

export function scene_title(game: Game) {
    game.World = new World(WORLD_CAPACITY);
    game.ViewportResized = true;
    game.spawnEnabled = true;

    // Camera.
    instantiate(game, [
        transform2d([0, 0]),
        camera_canvas(orthographic(5, 1, 3), [0, 0, 0, 0]),
        control_player(),
    ]);

    // Potato box.
    instantiate(game, [
        transform2d([4, 5]),
        grabbable(),
        children(
            [transform2d([-1, 0.5], 180), render2d("ziemniak_surowy"), order(1)],
            [transform2d(undefined, 0, [4, 3]), render2d("karton"), order(0)],
            [transform2d(undefined, 0, [4, 3]), render2d("karton_front"), order(1)],
            [transform2d(), shake([1.3, 0.8]), spawn(blueprint_potato, 1)]
        ),
    ]);

    instantiate(game, [transform2d([3.5, -1], -45, [4, 1]), ...blueprint_board1(game)]);
    instantiate(game, [transform2d([8, -5], 45, [4, 1]), ...blueprint_board1(game)]);

    instantiate(game, [...blueprint_bowl(game), transform2d([4, -10], 0, [4, 3])]);
}
