
import { format, parse } from 'fecha'
import { Utils } from "./Utils"
export class ApiUtils {

    static toDate(date?: string | Date | undefined): Date | undefined {
        if (!date) {
            return undefined;
        }
        if (date instanceof Date) {
            return date;
        }
        if (typeof date === 'string') {
            try {
                let result = parse(date, 'YYYY-MM-DD HH:mm:ss');
                if (result) {
                    return result;
                }
            } catch (e) {
                console.warn(e);
            }
        }
        return;
    }

    static formatDateYMD(date?: Date | string) {
        return ApiUtils.formatDate("YYYY.MM.DD", date);
    }

    static formatDateYM(date?: Date | string) {
        return ApiUtils.formatDate("YYYY.MM", date);
    }  
    
    static formatDateYMD_hl(date?: Date | string) {
        return ApiUtils.formatDate("YYYY-MM-DD", date);
    }    

    static formatDateYM_hl(date?: Date | string) {
        return ApiUtils.formatDate("YYYY-MM", date);
    }

    static formatDateYMD_HM(date?: Date | string) {
        return ApiUtils.formatDate("YYYY.MM.DD HH:mm", date);
    }

    static formatDateYMD_HMS(date?: Date | string) {
        return ApiUtils.formatDate("YYYY.MM.DD HH:mm:ss", date);
    }

    static formatDate(formatter: string, date?: Date | string) {
        if (date === undefined || date === null) return ''
        let formatTarget: Date | undefined = ApiUtils.toDate(date);
        try {
            if (formatTarget) {
                formatter = formatter.replace(/y/g, "Y")
                return format(formatTarget, formatter);
            }
        } catch (e) {
            console.warn(e);
        }
        return '';
    }
    /**
     * 格式化金额
     * @param amount 
     * @returns 格式化结果:"¥100.05"
     */
    static formatMoney(amount: string | number | undefined): string {
        if (amount == undefined) {
            return ""
        }
        var num = Number(amount) / 100;
        return Utils.formatMoney(num);
    }
    /**
     * 格式化金额
     * @param amount 
     * @returns 格式化结果:"¥100.05"
     */
    static formatMoneyDecimal(amount: string | number | undefined): string {
        if (amount == undefined) {
            return ""
        }
        var num = Number(amount) / 100;
        return Utils.formatMoneyDecimal(num);
    }
    /**
     * 格式化金额
     * @param amount 
     * @returns 格式化结果:"100.05"
     */
    static formatMoneyDecimalNoSymbol(amount: string | number | undefined): string {
        if (amount == undefined) {
            return ""
        }
        var num = Number(amount) / 100;
        return Utils.formatMoneyDecimalNoSymbol(num);
    }
}