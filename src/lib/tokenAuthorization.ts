import {sign, verify} from "jsonwebtoken";
import {appConfig} from "./appConfig";

export function generateTokenFromId(id: string) {
    try {
        return sign(id, appConfig.secretKey);
    } catch (e) {
        throw e;
    }
}

export function getIdFromToken(token: string) {
    try {
        return verify(token, appConfig.secretKey) as string;
    } catch (e) {
        throw e
    }
}