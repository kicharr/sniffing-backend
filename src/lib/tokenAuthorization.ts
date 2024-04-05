import {sign} from "jsonwebtoken";
import {appConfig} from "./appConfig";

export function generateTokenFromId(id: string) {
    try {
        return sign(id, appConfig.secretKey);
    } catch (e) {
        throw e;
    }
}