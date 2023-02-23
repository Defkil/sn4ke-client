import {Container} from "inversify";
import {Game} from "./Game";
import TYPES from "./inversify.types";
import {GameInterface} from "./Types";
import {AppPixiInterface} from "./pixi/app/app.pixi.interface";
import {AppPixi} from "./pixi/app/app.pixi";
import {TexturesPixi} from "./pixi/textures/textures.pixi";
import {TexturesPixiInterface} from "./pixi/textures/textures.pixi.interface";
import {ConnectionCoreInterface} from "./core/connection/connection.core.interface";
import {ConnectionCore} from "./core/connection/connection.core";
import {RoughPixi} from "./pixi/rough/rough.pixi";
import {RoughPixiInterface} from "./pixi/rough/rough.pixi.interface";
import {TexturesGeneratorPixi} from "./pixi/textures-generator/textures-generator.pixi";
import {TexturesGeneratorPixiInterface} from "./pixi/textures-generator/textures-generator.pixi.interface";
import {MapController} from "./controller/map/map.controller";
import {MapControllerInterface} from "./controller/map/map.controller.interface";
import {MsgCoderControllerInterface} from "./controller/msg-coder/msg-coder.controller.interface";
import {ProtobufMsgCoderController} from "./controller/msg-coder/protobuf/protobuf.msg-coder.controller";
import {ColorsController} from "./controller/colors/colors.controller";
import {ColorsControllerInterface} from "./controller/colors/colors.controller.interface";

const container = new Container()

container.bind<GameInterface>(TYPES.GAME).to(Game).inSingletonScope()
container.bind<AppPixiInterface>(TYPES.PIXI.APP).to(AppPixi).inSingletonScope()
container.bind<TexturesPixiInterface>(TYPES.PIXI.TEXTURES).to(TexturesPixi).inSingletonScope()
container.bind<TexturesGeneratorPixiInterface>(TYPES.PIXI.TEXTURES_GENERATOR).to(TexturesGeneratorPixi)
container.bind<ConnectionCoreInterface>(TYPES.CORE.CONNECTION).to(ConnectionCore).inSingletonScope()
container.bind<RoughPixiInterface>(TYPES.PIXI.ROUGH).to(RoughPixi)
container.bind<MapControllerInterface>(TYPES.CONTROLLER.MAP).to(MapController).inSingletonScope()
container.bind<MsgCoderControllerInterface>(TYPES.CONTROLLER.MSG_CODER).to(ProtobufMsgCoderController).inSingletonScope();
container.bind<ColorsControllerInterface>(TYPES.CONTROLLER.COLORS).to(ColorsController).inSingletonScope();

export { container }
