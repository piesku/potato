import {get_translation, transform_point} from "../../common/mat2d.js";
import {Vec2, Vec3} from "../../common/math.js";
import {copy, distance_squared, subtract} from "../../common/vec2.js";
import {transform_position} from "../../common/vec3.js";
import {CameraKind} from "../components/com_camera.js";
import {Transform2D} from "../components/com_transform2d.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.Grabbable | Has.Transform2D;
const pointer_position: Vec2 = [0, 0];
const pointer_offset: Vec2 = [0, 0];

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
    transform_point(pointer_position, pointer2d, camera_transform.World);

    if (game.DraggedEntity !== null) {
        if (game.InputDelta["Mouse0"] === -1) {
            document.body.classList.remove("grabbing");
            game.DraggedEntity = null;
            return;
        }

        let entity_transform = game.World.Transform2D[game.DraggedEntity];
        copy(entity_transform.Translation, pointer_position);
        subtract(entity_transform.Translation, entity_transform.Translation, pointer_offset);
        game.World.Signature[game.DraggedEntity] |= Has.Dirty;
        return;
    }

    for (let ent = 0; ent < game.World.Signature.length; ent++) {
        if ((game.World.Signature[ent] & QUERY) === QUERY) {
            let entity_transform = game.World.Transform2D[ent];
            if (is_pointer_over(pointer_position, entity_transform)) {
                document.body.classList.add("grab");
                if (game.InputDelta["Mouse0"] === 1) {
                    document.body.classList.add("grabbing");
                    game.DraggedEntity = ent;

                    let dragged_transform = game.World.Transform2D[ent];
                    subtract(pointer_offset, pointer_position, dragged_transform.Translation);
                }
                return;
            }
        }
    }

    document.body.classList.remove("grab");
}

const entity_world_position: Vec2 = [0, 0];

function is_pointer_over(pointer_world_position: Vec2, entity_transform: Transform2D) {
    get_translation(entity_world_position, entity_transform.World);
    // Assume all grabbables are spheres with radius ~= 1.7 world units.
    return distance_squared(pointer_world_position, entity_world_position) < 2.9;
}
