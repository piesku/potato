/**
 * @module components/com_spawn
 */

import {Blueprint} from "../../common/game.js";
import {Entity} from "../../common/world.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

interface Creator {
    (game: Game): Blueprint<Game>;
}

export interface Spawn {
    Creator: Creator;
    Counter: number;
    SinceLast: number;
}

export function spawn(creator: Creator, counter: number) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.Spawn;
        game.World.Spawn[entity] = {
            Creator: creator,
            Counter: counter,
            SinceLast: 0,
        };
    };
}
