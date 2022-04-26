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

let sim = {
    pause() {
        game.Stop();
    },

    resume() {
        game.Start();
    },

    restart() {
        game.Restart();
    },

    physicsReset() {
        game.physicsGravity = 9.81;
        game.physicsFriction = 0;
        game.physicsBounce = 1;
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

let gui_physics = gui.addFolder("Physics");
gui_physics.add(game, "physicsCollisions").name("Enable Collisions");
gui_physics.add(game, "physicsGravity", 0, 20).step(0.01).listen().name("Gravity");
gui_physics.add(game, "physicsFriction", 0, 1).step(0.01).listen().name("Friction");
gui_physics.add(game, "physicsBounce", 0, 3).step(0.01).listen().name("Bounciness");
gui_physics.add(sim, "physicsReset").name("Reset");
