"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = require("../../../../src/infrastructure/auth/core/services/token");
test('should token return valid ', () => __awaiter(void 0, void 0, void 0, function* () {
    const token = (0, token_1.useToken)('token-secret');
    const tokenAccess = token.generateAccessToken('julio');
    const restul = yield token.verifyAccessToken(tokenAccess);
    expect(restul).toEqual(true);
}));
test('should token return invalid ', () => __awaiter(void 0, void 0, void 0, function* () {
    const token = (0, token_1.useToken)('token-secret');
    const result = yield token.verifyAccessToken('invalid-token');
    expect(result).toEqual(false);
}));
