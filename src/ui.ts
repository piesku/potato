import {Game} from "./game.js";

export function App(game: Game) {
    return `<div>
		Potatos: ${game.ItemCount}
	</div>`;
}
