import {Game} from "../game.js";

export function sys_draw_background(game: Game, delta: number) {
    let ctx = game.Context2D;

    ctx.resetTransform();
    ctx.fillStyle = "#FFD6D5";
    ctx.fillRect(0, 0, game.ViewportWidth, game.ViewportHeight);

    ctx.setTransform(1, -0.2, -0.3, 1, 0, 0);
    ctx.fillStyle = "#FFAA79";
    ctx.fillRect(200, 200, 400, 400);

    ctx.setTransform(1, 0.3, 0.2, 1, 0, 0);
    ctx.fillStyle = "#D4FCA9";
    ctx.beginPath();
    ctx.arc(400, 400, 200, 0, 2 * Math.PI);
    ctx.fill();
}
