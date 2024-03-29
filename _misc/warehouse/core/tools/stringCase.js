const crypto = require('crypto');
const path = require('path');

class StringCase {
    convertStyleValue(value) {
        value = value.trim().replace(';', '');
        return value
    }

    convertStyleString(styleString) {
        const propertys = styleString.split(':').map(s => s.trim(';'));// 将 styleString 拆分成多个样式属性
        propertys[0] = this.convertToCamelCase(propertys[0])
        propertys[1] = this.convertStyleValue(propertys[1]);
        return propertys
    }

    convertToCamelCase(string) {
        const components = string.split("-");
        return components[0] + components.slice(1).map(component => component.charAt(0).toUpperCase() + component.slice(1)).join("");
    }

    convertString(str) {
        if (str === "true") {
            return true;
        } else if (str === "false") {
            return false;
        } else if (!isNaN(str)) {
            return Number(str);
        } else {
            return str;
        }
    }

    toJSON(stringify) {
        let json_string
        try {
            json_string = JSON.parse(stringify)
        } catch (e) {
            json_string = stringify
        }
        return json_string
    }

    obfuscate(a, b = '$#@FDsewt#@42fsdwe') {
        if (typeof a != "string") {
            return a
        }
        let pre_str = 'obfuscate:'
        if (a.startsWith(pre_str)) {
            return a
        }
        let c = '';
        for (let i = 0; i < a.length; i++) {
            c += String.fromCharCode(a.charCodeAt(i) ^ b.charCodeAt(i % b.length));
        }
        return pre_str + c;
    }

    deobfuscate(b, c = '$#@FDsewt#@42fsdwe') {
        let a = b
        b = c
        if (typeof a != "string") {
            return a
        }
        let pre_str = 'obfuscate:'
        if (!a.startsWith(pre_str)) {
            return a
        }
        a = a.substring(pre_str.length);
        c = '';
        for (let i = 0; i < a.length; i++) {
            c += String.fromCharCode(a.charCodeAt(i) ^ b.charCodeAt(i % b.length));
        }
        return c;
    }

    createString(length = 10) {
        const letters = 'abcdefghijklmnopqrstuvwxyz';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        return result;
    }

    get_md5(value) {
        const hash = crypto.createHash('md5');
        hash.update(value);
        return hash.digest('hex');
    }

    get_id(value, pre) {
        value = `` + value
        const md5 = this.get_md5(value);
        let _id = `id${md5}`
        if (pre) _id = pre + _id
        return _id;
    }

    create_id(value) {
        if (!value) value = this.createString(128)
        const _id = this.get_id(value);
        return _id;
    }

    createTime() {
        const currentDate = new Date();
        const dateString = currentDate.toISOString().substr(0, 19).replace('T', ' ');
        return dateString
    }

    createTimestamp() {
        const timestamp = new Date().getTime();
        return timestamp;
    }

    createPhone() {
        const operators = [
            '134', '135', '136', '137', '138', '139', '147', '150', '151', '152',
            '157', '158', '159', '178', '182', '183', '184', '187', '188'
        ];
        const operator = operators[Math.floor(Math.random() * operators.length)];
        const mobileNumber = operator + this.createNumber(8);
        return mobileNumber;
    }

    createNumber(length = 8) {
        const digits = '0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += digits.charAt(Math.floor(Math.random() * digits.length));
        }
        return result;
    }

    isJsonString(jsonStr) {
        if (typeof jsonStr !== 'string') {
            return false;
        }
        jsonStr = jsonStr.trim();
        if (jsonStr.length === 0) {
            return false;
        }
        const firstChar = jsonStr[0];
        if (!['{', '"'].includes(firstChar)) {
            return false;
        }
        try {
            JSON.parse(jsonStr);
            return true;
        } catch (error) {
            return false;
        }
    }

    toJSON(str) {
        if (!this.isJsonString(str)) {
            return str
        }
        try {
            str = JSON.parse(str)
        } catch (e) {
            console.log('toJSON Error:', e)
        }
        return str
    }

    toString(obj, indent = 2) {
        if (typeof obj == 'string' || typeof obj == 'number') {
            obj = "" + obj
            obj = obj.replace(/\\/g, '/');
            obj = obj.replace(/`/g, '"');
            obj = obj.replace(/\x00/g, '')
            return obj;
        } else {
            if (obj === null) {
                return `null`;
            }
            else if (obj === false) {
                return `false`;
            }
            else if (obj === true) {
                return `true`;
            } else if (Array.isArray(obj)) {
                const formattedArray = obj.map(item => this.toString(item, indent));
                return `[${formattedArray.join(', ')}]`;
            } else {
                try {
                    let str = JSON.stringify(obj);
                    return str;
                } catch (error) {
                    let str = obj.toString()
                    return str;
                }
            }
        }
    }

    to_boolean(value) {
        if (!value) return false;

        if (typeof value == 'string') {
            value = value.trim().toLowerCase();
            if (['', 'false', 'null', '0'].includes(value)) return false;
        } else if (Array.isArray(value) && value.length === 0) {
            return false;
        } else if (typeof value === 'object' && Object.keys(value).length === 0) {
            return false;
        }
        return true;
    }

    getDefault(str, default_str) {
        if ((!str || typeof str != 'string') && default_str) {
            return default_str
        } else {
            str = this.toString(str)
            return str
        }
    }

    containsUniqueElement(a, b) {
        return a.some(element =>
            !b.some(bElement => bElement.toLowerCase() == element.toLowerCase())
        );
    }

    to_windowspath(path) {
        return path.replace(/\//g, '\\');
    }

    to_linuxpath(path) {
        return path.replace(/\\/g, '/');
    }

    trimLeft(str) {
        return str.replace(/^[^a-zA-Z0-9]+/, '');
    }

    trim(str) {
        return str.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, "");
    }

    getCastConfigKey(str) {
        // 匹配 "#xxx" 格式
        if (str.startsWith('#')) {
            return str.slice(1);
        }
        // 匹配 [name='xxx'] 或 [name="xxx"] 格式
        else if (str.match(/^\[name=['"].+['"]\]$/)) {
            return 'name_' + str.match(/['"](.*?)['"]/)[1];
        }
        else if (str.match(/^(\.\w+\s*)+$/)) {
            return 'class' + str.split(/\s+/).join('_').replace(/\./g, '_');
        }
        else {
            return str;
        }
    }

    getShareStringUserPassword(input) {
        let url = input.split(/[a-zA-Z0-9]+\:[a-zA-Z0-9]+/)[0]
        url = url.replace(/\/+$/, '');
        let match = /[a-zA-Z0-9]+\:[a-zA-Z0-9]+/.exec(input);
        let usr = ``, pwd = ``
        if (match) {
            match = match[0]
            match = match.split(':')
            usr = match[0]
            if (match.length > 1) {
                pwd = match[1]
            }
        }
        let result = {
            url,
            usr,
            pwd
        };
        return result
    }

    parseShareDirHostAndPath(host) {
        host = host.replace(/^[\/\\]+|[\/\\]+$/g, '');
        const pathParts = host.split(/[\/\\]+/);
        // 根据你的描述，我们会将前两部分视为1-2级，然后其余的为2级以后的
        const hostname = `\\\\` + pathParts.slice(0, 2).join('\\');
        let pathname = pathParts.slice(2).join('\\');
        pathname = pathname.replace(/^[\/\\]+|[\/\\]+$/g, '');
        return {
            hostname, pathname
        }
    }

    findFirstNumberInString(str) {
        // 将字符串按空格分割成数组
        const parts = str.split(/\s+/);

        for (const part of parts) {
            // 使用正则表达式来查找数字
            const match = part.match(/\d/);
            if (match) {
                return part;
            }
        }
        return '0';
    }
}

module.exports = new StringCase()