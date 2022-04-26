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
            Super Simple Salad Simulator
        </h1>
        <p style="text-shadow: 2px 2px 0 green;">
            Discover the recipe for the tasty springtime treat: the veggy salad! Cut the green peas
            and cook the apples — or is it the other way around? Experiment to find out!
        </p>
        <p style="text-shadow: 2px 2px 0 orange;">
            Move objects by grabbing them with the mouse, rotate them with the mouse wheel.
        </p>
        <h2 onclick="playNow();" style="text-shadow: 2px 2px 0 yellow;">Play Now!</h2>
    </div>`;
}
