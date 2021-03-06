import {float} from "../../common/random.js";
import {collide_dynamic} from "../components/com_collide2d.js";
import {control_process, ProcessKind} from "../components/com_control_process.js";
import {render2d} from "../components/com_render2d.js";
import {RigidKind, rigid_body2d} from "../components/com_rigid_body2d.js";
import {Game, Layer} from "../game.js";

export function blueprint_greenpea(game: Game) {
    game.ItemCount++;
    return [
        render2d("groszek_surowy"),
        control_process(ProcessKind.GreenPea, Layer.ProcessCook),
        collide_dynamic(
            1,
            Layer.Obstacle |
                Layer.ProcessCook |
                Layer.ProcessPeel |
                Layer.ProcessCut |
                Layer.ProcessFinish
        ),
        rigid_body2d(RigidKind.Dynamic, float(0.01, 0.001)),
    ];
}
