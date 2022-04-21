/* eslint-disable */

const crypto = require('crypto');

// console.log(crypto.randomBytes(64).toString('hex'));

console.log(crypto.createHash('md5').update('1234' + 'ef1459adb50620982e7da69ad86f21330f627146ef3f9390ea7b9634156aef26b8e2a0de37e92c7e747d78efd3049841e364bffafaf2f97e65c131189ee638d8').digest('hex'));
