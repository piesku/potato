import {Entity} from "../../common/world.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export interface ControlProcess {
    Kind: ProcessKind;
    Needs: number;
}

export const enum ProcessKind {
    Potato,
    Carrot,
    GreenPea,
    Apple,
}

export function control_process(kind: ProcessKind, needs: number) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.ControlProcess;
        game.World.ControlProcess[entity] = {
            Kind: kind,
            Needs: needs,
        };
    };
}
