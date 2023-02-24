import * as cy from 'currency-formatter-typescript'
import { format, parse } from 'fecha'
export class Utils {
    /**
     * 格式化日期
     * @param date : 待转化日期
     * @param formatter 日期格式
     */
    static formatDate = (date: Date, formatter?: string): string => {
        if (date === undefined || date === null) return ''
        try {
            if (formatter) {
                formatter = formatter.replace(/y/g, "Y")
            }
            return format(date, formatter ?? 'YYYY.MM.DD HH:mm:ss');
        } catch (e) {
            console.warn(e);
        }
        return '';
    }

    /**
     * toDate 将字符串格式化为日期
     * @param date
     * @returns
     */
    static toDate = (date: string, fmt: string): Date | undefined => {
        if (!date || date === '') return;
        if (!fmt || fmt === '') return;
        try {
            let result = parse(date, fmt.replace(/y/g, "Y"));
            console.log("parse date:", date, "result:", result);
            if (result) {
                return result;
            }
        } catch (e) {
            console.warn(e);
        }
        return;
    }

    /**
     * 隐藏字符串部分字符
     * @param source 源字符串
     * @param preDigit 前部保留位数
     * @param lastDigit 后部保留位数
     * @returns 隐藏部分字符的新字符串
     */
    static hideSomeInStrs = (source: string, preDigit: number, lastDigit: number) => {
        if (source === null || source === '' || source === undefined) return source
        if (preDigit < 0 || lastDigit < 0) return source

        const len = source.length
        if (preDigit + lastDigit >= len) return source

        const preStr = source.substr(0, preDigit)
        const lastStr = source.substr(len - lastDigit, len)
        const starts = "*".repeat(len - preDigit - lastDigit)

        return preStr + starts + lastStr
    }

    static formatMoney(amount: string | number | undefined): string {
        if (amount == undefined) {
            return ""
        }
        var num = Number(amount);
        return cy.format(num, { currency: 'CNY', symbol: '' }).toString();
    }

    static formatMoneyDecimal(amount: string | number | undefined): string {
        if (amount == undefined) {
            return ""
        }
        var num = Number(amount);
        return cy.format(num, { currency: 'CNY', symbol: '¥' }).toString();
    }

    static formatMoneyDecimalNoSymbol(amount: string | number | undefined): string {
        if (amount == undefined) {
            return ""
        }
        var num = Number(amount);
        return cy.format(num, { currency: 'CNY', symbol: '' }).toString();
    }


    static DateAdd(interval: string, number: number, date: any) {
        switch (interval) {
            case "Y": {
                date.setFullYear(date.getFullYear() + number);
                return date.getTime() / 1000;
            }
            case "M": {
                date.setMonth(date.getMonth() + number);
                return date.getTime() / 1000;
            }
            case "D": {
                date.setDate(date.getDate() + number);
                return date.getTime() / 1000;
            }
            case "h ": {
                date.setHours(date.getHours() + number);
                return date.getTime() / 1000;
            }
            case "m ": {
                date.setMinutes(date.getMinutes() + number);
                return date.getTime() / 1000;
            }
            case "s ": {
                date.setSeconds(date.getSeconds() + number);
                return date.getTime() / 1000;
            }
            default: {
                date.setDate(date.getDate() + number);
                return date.getTime() / 1000;
            }
        }
    }

    static zeroAdd = (k: any): string => {
        let zero = '';
        for (let i = 0; i < k; i++) {
            zero = zero + '0'
        }
        return zero;
    }

    static contains(arr: any, obj: any): Boolean {
        let i = arr.length;
        while (i--) {
            if (arr[i] === obj) {
                return true;
            }
        }
        return false;
    }

    static accountDecimal(sInt: any, decimal: any, k: any): any {
        let account;
        if (decimal === '' || decimal === undefined) {
            account = String(sInt) + '.' + this.zeroAdd(k);
        } else {
            decimal = '0.' + decimal;
            decimal = parseFloat(decimal + '').toFixed(k) + '';
            let dec = decimal.split('.')[1];
            account = String(sInt) + '.' + String(dec);
        }
        return account;
    }

    static moneyFormat(s: any, k: any): any {
        if (s || s === 0 || s === 0.00) {
            s = s + '';
            let sInt = s.split('.')[0], decimal = s.split('.')[1];
            let account = this.accountDecimal(sInt, decimal, k);
            let l = account.split('.')[0].split('').reverse();
            let sIntNeg = ((s + '').replace(/[^\d.]/g, '')) + '';
            sIntNeg = sIntNeg + '';
            let sInt2 = sIntNeg.split('.')[0], decimal2 = sIntNeg.split('.')[1];
            let account2 = this.accountDecimal(sInt2, decimal2, k);
            let f = account2.split('.')[0].split('').reverse(), dec = account2.split('.')[1];
            let t = '';
            for (let i = 0; i < f.length; i++) {
                t += f[i] + ((i + 1) % 3 === 0 && (i + 1) !== f.length ? ',' : '');
            }
            if (this.contains(l, '-')) {
                if (k === 0) {
                    return '-' + t.split('').reverse().join('');
                } else {
                    return '-' + t.split('').reverse().join('') + '.' + dec;
                }
            } else if (this.contains(l, '+')) {
                if (k === 0) {
                    return '+' + t.split('').reverse().join('');
                } else {
                    return '+' + t.split('').reverse().join('') + '.' + dec;
                }
            } else {
                if (k === 0) {
                    return t.split('').reverse().join('');
                } else {
                    return t.split('').reverse().join('') + '.' + dec;
                }
            }
        } else {
            return s;
        }
    }

    static formatCurrency(currency: any, amount: any): any {
        if (currency === '' || currency === undefined) {
            return this.moneyFormat(amount, 2);
        } else {
            let currency0 = ["BIF", "BYR", "CLP", "DJF", "GNF", "ISK", "JPY", "KMF", "KRW", "PYG", "RWF", "UGX", "UYI", "VND", "VUV", "XAF", "XJP #", "XKR #", "XOF", "XPF", "XUA", "XVN #", "XXK #", "XXP #", "XXX", "YYY", "ZZV #"];
            let currency3 = ["AUL", "CLF", "BHD", "IQD", "JOD", "KWD", "LYD", "OMR", "TND", "XAG", "XAU", "XPD", "XPT"];
            if (this.contains(currency0, currency)) {
                return this.moneyFormat(amount, 0);
            } else if (this.contains(currency3, currency)) {
                return this.moneyFormat(amount, 3);
            } else {
                return this.moneyFormat(amount, 2);
            }
        }
    }

    static beautyMoney(val: any) {
        var str = val;
        var len1 = str.substr(0, 1);
        var len2 = str.substr(1, 1);
        //如果第一位是0，第二位不是点，就用数字把点替换掉
        if (str.length > 1 && len1 == 0 && len2 != ".") {
            str = str.substr(1, 1);
        }
        //第一位不能是.
        if (len1 == ".") {
            str = "";
        }
        //限制只能输入一个小数点
        if (str.indexOf(".") != -1) {
            var str_ = str.substr(str.indexOf(".") + 1);
            if (str_.indexOf(".") != -1) {
                str = str.substr(0, str.indexOf(".") + str_.indexOf(".") + 1);
            }
        }
        //正则替换，保留数字和小数点
        str = (str.match(/^\d*(\.?\d{0,2})/g)[0]) || null
        return str;
    }
}