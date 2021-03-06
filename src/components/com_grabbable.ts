import {Entity} from "../../common/world.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export function grabbable() {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.Grabbable;
    };
}
