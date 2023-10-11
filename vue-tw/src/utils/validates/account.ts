export const matchPhoneNumber = (value: string) => /^((13[0-9])|(14[5|7])|(15[0-3|5-9])|(17[0|1|3|5-8])|(18[0-9])|166|198|199)\d{8}$/.test(value)

// 密码强度, 6~20 位, 必须包含: 数字/小写字母/大写字母/特殊字符($@,._)
export const matchUserPassword = (value: string) => /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[.,@#$-_]).{6,20}$/.test(value)
