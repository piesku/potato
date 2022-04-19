import {get_translation, transform_point} from "../../common/mat2d.js";
import {Vec2, Vec3, Vec4} from "../../common/math.js";
import {subtract} from "../../common/vec2.js";
import {transform_position} from "../../common/vec3.js";
import {Entity} from "../../common/world.js";
import {CameraKind} from "../components/com_camera.js";
import {Transform2D} from "../components/com_transform2d.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.Grabbable | Has.Transform2D;

export function sys_control_grab(game: Game, delta: number) {
    let camera_entity = game.Cameras[0];
    if (camera_entity === undefined) {
        return;
    }

    let camera = game.World.Camera[camera_entity];
    if (camera.Kind === CameraKind.Xr) {
        throw new Error("XR not implemented");
    }

    let x_ndc = (game.InputState["MouseX"] / game.ViewportWidth) * 2 - 1;
    // In the browser, +Y is down. Invert it, so that in NDC it's up.
    let y_ndc = -(game.InputState["MouseY"] / game.ViewportHeight) * 2 + 1;

    // The pointer position is in NDC space. Transform it to the eye space,
    // and then to the world space.
    let pointer3d: Vec3 = [x_ndc, y_ndc, 0];
    transform_position(pointer3d, pointer3d, camera.Projection.Inverse);

    let camera_transform = game.World.Transform2D[camera_entity];
    let pointer2d: Vec2 = [pointer3d[0], pointer3d[1]];
    transform_point(game.PointerPosition, pointer2d, camera_transform.World);

    let hovered: Entity | null = null;
    for (let ent = 0; ent < game.World.Signature.length; ent++) {
        if ((game.World.Signature[ent] & QUERY) === QUERY) {
            let entity_transform = game.World.Transform2D[ent];
            if (is_pointer_over(game.PointerPosition, entity_transform)) {
                hovered = ent;
                break;
            }
        }
    }

    if (hovered !== null) {
        document.body.classList.add("grab");

        if (game.InputDelta["Mouse0"] === 1) {
            document.body.classList.add("grabbing");
            game.DraggedEntity = hovered;

            let dragged_transform = game.World.Transform2D[hovered];
            subtract(game.PointerOffset, game.PointerPosition, dragged_transform.Translation);
        }
    } else {
        document.body.classList.remove("grab");
    }
}

const world_position: Vec2 = [0, 0];
const bounds_world: Vec4 = [0, 0, 0, 0];

function is_pointer_over(pointer_world_position: Vec2, entity_transform: Transform2D) {
    get_translation(world_position, entity_transform.World);

    bounds_world[0] = world_position[0] - entity_transform.Scale[0] / 2;
    bounds_world[1] = world_position[0] + entity_transform.Scale[0] / 2;
    bounds_world[2] = world_position[1] - entity_transform.Scale[1] / 2;
    bounds_world[3] = world_position[1] + entity_transform.Scale[1] / 2;

    return (
        pointer_world_position[0] > bounds_world[0] &&
        pointer_world_position[0] < bounds_world[1] &&
        pointer_world_position[1] > bounds_world[2] &&
        pointer_world_position[1] < bounds_world[3]
    );
}
