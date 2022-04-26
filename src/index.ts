import * as dat from "dat.gui";
import {instantiate} from "../common/game.js";
import {create_texture_from, fetch_image} from "../common/texture.js";
import {transform2d} from "./components/com_transform2d.js";
import {Game} from "./game.js";
import {blueprint_board1} from "./scenes/blu_board1.js";
import {scene_stage} from "./scenes/sce_stage.js";
import {scene_title} from "./scenes/sce_title.js";

let game = new Game();

// @ts-ignore
window.game = game;

Promise.all([load_texture(game, "spritesheet.png")]).then(() => {
    scene_title(game);
    game.Start();
});

async function load_texture(game: Game, name: string) {
    let image = await fetch_image("../textures/" + name + ".webp");
    game.Textures[name] = create_texture_from(game.Gl, image);
}

// @ts-ignore
window.playNow = function () {
    game.PlayState = "play";
    scene_stage(game);

    document.querySelector("audio")!.play();

    let sim = {
        pauseLoop() {
            game.Stop();
        },

        resumeLoop() {
            game.Start();
        },

        start() {
            game.spawnEnabled = !game.spawnEnabled;
            if (game.spawnEnabled) {
                run.name("Pause");
            } else {
                run.name("Resume");
            }
        },

        restart() {
            game.Restart();
            game.spawnEnabled = true;
            run.name("Pause");
        },

        physicsReset() {
            game.physicsGravity = 9.81;
            game.physicsFriction = 0;
            game.physicsBounce = 1.1;
        },

        addPlank() {
            instantiate(game, [transform2d([0, 0], -45, [4, 1]), ...blueprint_board1(game)]);
        },

        toggleMusic() {
            let audio = document.querySelector("audio")!;
            if (audio.paused) {
                toggleMusic.name("Pause Music");
                audio.play();
            } else {
                toggleMusic.name("Play Music");
                audio.pause();
            }
        },
    };

    let gui = new dat.GUI();

    let gui_sim = gui.addFolder("Simulation");
    var run = gui_sim.add(sim, "start").name("Run!");
    gui_sim.add(sim, "restart").name("Restart");
    gui_sim.open();

    let gui_audio = gui.addFolder("Settings");
    var toggleMusic = gui_audio.add(sim, "toggleMusic").name("Pause Music");
    gui_audio.open();

    let gui_objects = gui.addFolder("Utensils");
    gui_objects.add(sim, "addPlank").name("Add a Wooden Board");
    gui_objects.open();

    let gui_spawn = gui.addFolder("Ingredients");
    gui_spawn.add(game, "spawnInterval", 0, 1).step(0.01).name("Interval (s)");
    gui_spawn.add(game, "spawnCount", 1, 5).step(1).name("Multiplier");

    let gui_physics = gui.addFolder("Physics");
    gui_physics.add(game, "physicsCollisions").name("Enable Collisions");
    gui_physics.add(game, "physicsGravity", 0, 20).step(0.01).listen().name("Gravity");
    gui_physics.add(game, "physicsFriction", 0, 1).step(0.01).listen().name("Friction");
    gui_physics.add(game, "physicsBounce", 0, 3).step(0.01).listen().name("Bounciness");
    gui_physics.add(sim, "physicsReset").name("Reset");

    let gui_loop = gui.addFolder("Game Loop");
    gui_loop.add(sim, "pauseLoop").name("Pause");
    gui_loop.add(sim, "resumeLoop").name("Resume");
};
