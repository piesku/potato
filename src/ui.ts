import {html} from "../common/html.js";
import {Game} from "./game.js";

export function App(game: Game) {
    if (game.PlayState === "play") {
        return "";
    }

    return html` <div
        style="
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            font-size: 5vmin;
            color: white;
            padding: 5vmin;
        "
    >
        <h1
            style="margin: 0;
            text-shadow:
                2px 2px 0 orange,
                4px 4px 0 green,
                6px 6px 0 indigo;
            "
        >
            Super<br />Simple<br />Salad<br />Simulator
        </h1>
        <h2 onclick="playNow();" style="text-shadow: 2px 2px 0 yellow;">Play Now!</h2>
        <p style="text-shadow: 2px 2px 0 green;">
            Move objects by grabbing them with the mouse, rotate them with the mouse wheel. Discover
            the recipe for the perfect salad!
        </p>
    </div>`;
}
