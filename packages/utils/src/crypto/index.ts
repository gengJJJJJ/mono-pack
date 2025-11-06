// import cryptojs from 'crypto-js'

// import {CRIPTO_KEY} from '@/constants/app'
// //不可逆加密 bcryptjs 适用密码加密
// import bcryptjs from 'bcryptjs'

// /** 密码加密
//  * @param value 待加密值
//  * @param bcryptVal 已加密字符串
//  * @returns String | Boolean 一个参数时，返回加密后的值，两个参数时，返回是否匹配
//  */
// export function bcrypt(value: string, bcryptVal?: string) {
// 	if (bcryptVal) return bcryptjs.compareSync(value, bcryptVal)
// 	return bcryptjs.hashSync(value, 10)
// }

// /** 加密 */
// export function encrypt(value: string, key = CRIPTO_KEY) {
// 	const keyBytes = cryptojs.enc.Utf8.parse(key)
// 	const encrypted = cryptojs.AES.encrypt(value, keyBytes, {
// 		iv: keyBytes,
// 		mode: cryptojs.mode.CBC,
// 		padding: cryptojs.pad.ZeroPadding
// 	})
// 	return encrypted.toString()
// }

// /** 解密 */
// export function decrypt(value: any, key = CRIPTO_KEY) {
// 	const keyBytes = cryptojs.enc.Utf8.parse(key)
// 	const decrypted = cryptojs.AES.decrypt(value, keyBytes, {
// 		iv: keyBytes,
// 		mode: cryptojs.mode.CBC,
// 		padding: cryptojs.pad.ZeroPadding
// 	})
// 	return cryptojs.enc.Utf8.stringify(decrypted)
// }

// export function encryptData(data: object, key = CRIPTO_KEY) {
// 	return encrypt(JSON.stringify(data), key)
// }

// export function decryptData(data: string, key = CRIPTO_KEY) {
// 	return JSON.parse(decrypt(data, key))
// }
