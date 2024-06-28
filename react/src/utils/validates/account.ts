export const validatePhoneNumber = (value: string) => /^(?:13\d|14[5|7]|15[0-3|5-9]|17[0|135-8]|18\d|166|198|199)\d{8}$/.test(value)

// 密码强度, 6~20 位, 必须包含: 数字/小写字母/大写字母/特殊字符($@,._)
export const validateUserPassword = (value: string) => /^(?:(?=.*\d)(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])|(?=.*\d)(?=.*[.,@#$_-])|(?=.*[a-z])(?=.*[A-Z])|(?=.*[a-z])(?=.*[.,@#$_-])|(?=.*[A-Z])(?=.*[.,@#$_-])).{6,20}$/.test(value)

export const validateUserEmail = (value: string) => /^\w+(?:-\w+|\.\w+)*@[A-Z0-9]+(?:(?:\.|-)[A-Z0-9]+)*\.[A-Z0-9]+$/i.test(value)
