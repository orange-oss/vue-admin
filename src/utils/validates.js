/**
 * 匹配路径的方法
 * @param path {string}
 * @returns {Boolean}
 */
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * JS字符串截取（获取指定字符后面的所有字符内容）
 * @param str {string} 被截取的原字符串
 * @param tag {string} 指定的字符
 * @returns str {string} 截取后的字符串
 */
export function getCaption(str, tag) {
    const index = str.lastIndexOf(tag)
    str = str.substring(index + 1, str.length)
    return str
}
