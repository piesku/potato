import {CameraKind} from "../components/com_camera.js";
import {BASE_UNIT_SIZE, Game} from "../game.js";

export function sys_draw_background(game: Game, delta: number) {
    let ctx = game.Context2D;
    let camera_entity = game.Cameras[0];
    let camera = game.World.Camera[camera_entity];
    if (camera.Kind === CameraKind.Xr) {
        throw new Error("XR not implemented");
    }

    ctx.resetTransform();
    ctx.fillStyle = "#D7AAA9";
    ctx.fillRect(0, 0, game.ViewportWidth, game.ViewportHeight);

    let x = game.ViewportWidth / 2 - camera.Position[0] * game.UnitSize;
    let y = game.ViewportHeight / 2 + camera.Position[1] * game.UnitSize;
    let s = game.UnitSize / BASE_UNIT_SIZE;
    let w = game.ViewportWidth / 2;
    let h = game.ViewportHeight / 2;

    ctx.fillStyle = "#FFD6D5";
    ctx.fillRect(x - w, y - h, w * 2, h * 2);

    ctx.setTransform(s, s * -0.2, s * -0.3, s, x, y);
    ctx.fillStyle = "#FFAA79";
    ctx.fillRect(0, 0, 400, 400);

    ctx.setTransform(s, s * 0.3, s * 0.2, s, x, y);
    ctx.fillStyle = "#D4FCA9";
    ctx.beginPath();
    ctx.arc(0, 0, 200, 0, 2 * Math.PI);
    ctx.fill();
}
