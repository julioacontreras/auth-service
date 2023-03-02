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
const security_1 = require("../../../../src/infrastructure/auth/core/services/security");
test('should generate two diffrents values ', () => __awaiter(void 0, void 0, void 0, function* () {
    const { generateSalt } = (0, security_1.useSecurity)();
    const s1 = generateSalt();
    const s2 = generateSalt();
    expect(s1 !== s2).toEqual(true);
}));
test('should generate same hash ', () => __awaiter(void 0, void 0, void 0, function* () {
    const { generateHash } = (0, security_1.useSecurity)();
    const v1 = generateHash('asd');
    const v2 = generateHash('asd');
    expect(v1).toEqual(v2);
}));
test('should generate verify valid hash ', () => __awaiter(void 0, void 0, void 0, function* () {
    const { generateHash, verifyHash } = (0, security_1.useSecurity)();
    const hash = generateHash('asd');
    expect(verifyHash('asd', hash)).toEqual(true);
}));
test('should generate verify invalid hash ', () => __awaiter(void 0, void 0, void 0, function* () {
    const { generateHash, verifyHash } = (0, security_1.useSecurity)();
    const hash = generateHash('asd');
    expect(verifyHash('ass', hash)).toEqual(false);
}));
