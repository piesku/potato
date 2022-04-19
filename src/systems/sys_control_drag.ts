import {copy, subtract} from "../../common/vec2.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export function sys_control_drag(game: Game, delta: number) {
    if (game.DraggedEntity === null) {
        return;
    }

    let entity = game.DraggedEntity;

    if (game.InputDelta["Mouse0"] === -1) {
        document.body.classList.remove("grabbing");
        game.DraggedEntity = null;
        return;
    }

    let entity_transform = game.World.Transform2D[entity];
    copy(entity_transform.Translation, game.PointerPosition);
    subtract(entity_transform.Translation, entity_transform.Translation, game.PointerOffset);
    game.World.Signature[entity] |= Has.Dirty;
}
