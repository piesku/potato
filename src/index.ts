import * as dat from "dat.gui";
import {create_texture_from, fetch_image} from "../common/texture.js";
import {Game} from "./game.js";
import {scene_stage} from "./scenes/sce_stage.js";

let game = new Game();

// @ts-ignore
window.game = game;

Promise.all([load_texture(game, "spritesheet.png")]).then(() => {
    scene_stage(game);
    game.Start();
});

async function load_texture(game: Game, name: string) {
    let image = await fetch_image("../textures/" + name + ".webp");
    game.Textures[name] = create_texture_from(game.Gl, image);
}

let gui = new dat.GUI();

let gui_sim = gui.addFolder("Simulation");
gui_sim.add(game, "Stop").name("Pause");
gui_sim.add(game, "Start").name("Resume");

let gui_items = gui.addFolder("Ingredients");
gui_items.add(game, "spawnInterval", 0, 1).step(0.01).name("Spawn interval (s)");
gui_items.add(game, "spawnCount", 0, 5).step(1).name("Spawn count");
