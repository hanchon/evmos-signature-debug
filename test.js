import { Wallet, utils } from "ethers";
import { signEthSecp256k1 } from "@hanchon/evmos-signer";
import { keccak256 } from "@ethersproject/keccak256";

const privKey = Buffer.from([
  186, 11, 156, 234, 90, 241, 218, 188, 13, 58, 202, 98, 87, 101, 244, 128, 253,
  23, 0, 180, 96, 155, 216, 190, 230, 170, 65, 163, 85, 86, 11, 163,
]);

const payload = Buffer.from([
  10, 140, 1, 10, 137, 1, 10, 28, 47, 99, 111, 115, 109, 111, 115, 46, 98, 97,
  110, 107, 46, 118, 49, 98, 101, 116, 97, 49, 46, 77, 115, 103, 83, 101, 110,
  100, 18, 105, 10, 44, 101, 118, 109, 111, 115, 49, 116, 102, 101, 103, 102,
  53, 48, 110, 53, 120, 108, 48, 104, 100, 53, 99, 120, 102, 122, 106, 99, 97,
  51, 121, 108, 115, 102, 112, 103, 48, 102, 110, 113, 122, 116, 121, 101, 51,
  18, 44, 101, 118, 109, 111, 115, 49, 116, 102, 101, 103, 102, 53, 48, 110, 53,
  120, 108, 48, 104, 100, 53, 99, 120, 102, 122, 106, 99, 97, 51, 121, 108, 115,
  102, 112, 103, 48, 102, 110, 113, 122, 116, 121, 101, 51, 26, 11, 10, 6, 97,
  101, 118, 109, 111, 115, 18, 1, 49, 18, 112, 10, 89, 10, 79, 10, 40, 47, 101,
  116, 104, 101, 114, 109, 105, 110, 116, 46, 99, 114, 121, 112, 116, 111, 46,
  118, 49, 46, 101, 116, 104, 115, 101, 99, 112, 50, 53, 54, 107, 49, 46, 80,
  117, 98, 75, 101, 121, 18, 35, 10, 33, 2, 4, 240, 251, 139, 244, 117, 162, 43,
  198, 195, 82, 91, 129, 92, 67, 226, 40, 138, 120, 15, 177, 225, 112, 28, 237,
  67, 158, 203, 50, 160, 234, 153, 18, 4, 10, 2, 8, 1, 24, 1, 18, 19, 10, 13,
  10, 7, 97, 112, 104, 111, 116, 111, 110, 18, 2, 50, 48, 16, 192, 154, 12, 26,
  12, 101, 118, 109, 111, 115, 95, 57, 48, 48, 48, 45, 49, 32, 16,
]);
const message = Buffer.from([
  46, 216, 18, 140, 155, 82, 71, 78, 114, 100, 66, 230, 26, 141, 22, 194, 246,
  183, 230, 188, 216, 79, 233, 9, 168, 103, 247, 57, 151, 250, 155, 146,
]);

const sig = signEthSecp256k1(privKey, message);
console.log(sig);
console.log(Uint8Array.from(sig));

const privateKey = Uint8Array.from([
  186, 11, 156, 234, 90, 241, 218, 188, 13, 58, 202, 98, 87, 101, 244, 128, 253,
  23, 0, 180, 96, 155, 216, 190, 230, 170, 65, 163, 85, 86, 11, 163,
]);

const wallet = new Wallet(privateKey);
const signature = await wallet.signMessage(message);

console.log(signature);

const converted = keccak256(payload);
console.log("both values should be the same");
console.log(Buffer.from(converted.split("0x")[1], "hex"));
console.log(message);

console.log("wallet sign");
const sig2 = wallet._signingKey().signDigest(converted);
console.log(sig);

const temp2 = utils.splitSignature(sig2);
console.log(temp2.r);
console.log(temp2.s);
console.log(utils.concat([temp2.r, temp2.s]));

// const temp = utils.splitSignature(signature);
// console.log(temp.r);
// console.log(temp.s);
// console.log(utils.concat([temp.r, temp.s]));

// import BN from "bn.js";

// let r = new BN(temp.r.split("0x")[1], 16);
// let s = new BN(temp.s.split("0x")[1], 16);
// console.log(new Uint8Array(r.toArray("be", 32).concat(s.toArray("be", 32))));
