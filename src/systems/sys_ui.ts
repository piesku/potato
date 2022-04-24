/**
 * @module systems/sys_ui
 */

import {Game} from "../game.js";
import {App} from "../ui.js";

let prev: string;

export function sys_ui(game: Game, delta: number) {
    let next = App(game);
    if (next !== prev) {
        game.Ui.innerHTML = prev = next;
    }
}
