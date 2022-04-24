import {Entity} from "../../common/world.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export interface ControlProcess {
    Needs: number;
}

export function control_process(needs: number) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.ControlProcess;
        game.World.ControlProcess[entity] = {
            Needs: needs,
        };
    };
}
