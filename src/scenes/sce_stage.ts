import {hsva_to_vec4} from "../../common/color.js";
import {instantiate} from "../../common/game.js";
import {orthographic} from "../../common/projection.js";
import {float} from "../../common/random.js";
import {camera_canvas} from "../components/com_camera.js";
import {children} from "../components/com_children.js";
import {collide_dynamic, collide_static} from "../components/com_collide2d.js";
import {control_player} from "../components/com_control_player.js";
import {control_process, ProcessKind} from "../components/com_control_process.js";
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
        camera_canvas(orthographic(5, 1, 3)),
        control_player(),
    ]);

    instantiate(game, [
        transform2d([0, 5], 0, [4, 3]),
        render2d("garnek2_front"),
        order(1),
        collide_static(Layer.PotatoBoil, 1),
        grabbable(),
        children([transform2d(), render2d("garnek21"), order(0)]),
    ]);

    instantiate(game, [
        transform2d([0, 0], 0, [4, 3]),
        render2d("garnek2_front"),
        order(1),
        collide_static(Layer.PotatoPeel, 1),
        grabbable(),
        children([transform2d(), render2d("garnek21"), order(0)]),
    ]);

    instantiate(game, [
        transform2d([0, -5], 0, [4, 3]),
        render2d("garnek2_front"),
        order(1),
        collide_static(Layer.PotatoCut, 1),
        grabbable(),
        children([transform2d(), render2d("garnek21"), order(0)]),
    ]);

    let dynamic_count = 100;
    for (let i = 0; i < dynamic_count; i++) {
        instantiate(game, [
            transform2d([float(-1, 1), float(10, 100)], 0),
            render2d(
                "ziemniak_surowy",
                hsva_to_vec4(float(0.1, 0.15), float(0, 0.5), float(0.5, 1), 1)
            ),
            control_process(ProcessKind.Potato),
            collide_dynamic(1, Layer.None),
            rigid_body2d(RigidKind.Dynamic, float(0.99, 0.999)),
        ]);
    }
}
