import * as dat from "dat.gui";
import {create_texture_from, fetch_image} from "../common/texture.js";
import {destroy_all} from "./components/com_children.js";
import {Game} from "./game.js";
import {scene_stage} from "./scenes/sce_stage.js";
import {Has} from "./world.js";

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

let sim = {
    pause() {
        game.Stop();
    },

    resume() {
        game.Start();
    },

    restart() {
        game.ItemCount = 0;
        for (let ent = 0; ent < game.World.Signature.length; ent++) {
            if (game.World.Signature[ent] & Has.ControlProcess) {
                destroy_all(game.World, ent);
            }
        }
    },
};

let gui = new dat.GUI();

let gui_sim = gui.addFolder("Simulation");
gui_sim.add(sim, "restart").name("Restart");
gui_sim.add(sim, "pause").name("Pause");
gui_sim.add(sim, "resume").name("Resume");

let gui_spawn = gui.addFolder("Spawning");
gui_spawn.add(game, "spawnInterval", 0, 1).step(0.01).name("Interval (s)");
gui_spawn.add(game, "spawnCount", 0, 5).step(1).name("Multiplier");
