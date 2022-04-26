import {float} from "../../common/random.js";
import {collide_dynamic} from "../components/com_collide2d.js";
import {control_process, ProcessKind} from "../components/com_control_process.js";
import {render2d} from "../components/com_render2d.js";
import {RigidKind, rigid_body2d} from "../components/com_rigid_body2d.js";
import {Game, Layer} from "../game.js";

export function blueprint_apple(game: Game) {
    game.ItemCount++;
    return [
        render2d("jablko_surowe"),
        control_process(ProcessKind.Apple, Layer.ProcessPeel),
        collide_dynamic(
            1,
            Layer.Obstacle | Layer.ProcessBoil | Layer.ProcessPeel | Layer.ProcessCut
        ),
        rigid_body2d(RigidKind.Dynamic, float(0.01, 0.001)),
    ];
}
