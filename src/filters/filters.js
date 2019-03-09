import {
    parseTime,
    moneyFormat
} from '@/filters/index';
import {moneyFormat_noComma} from "./index";

export default {
    filters: {
        $_filters_parseDate: (val) => {
            return parseTime(val, '{y}-{m}-{d}');
        },
        $_filters_parseTime: (val) => {
            return parseTime(val);
        },
        $_filters_moneyFormat_fen: (val) => {
            return moneyFormat(val/100);
        },
        $_filters_moneyFormat_noComma: (val) => {
            return moneyFormat_noComma(val)
        }
    }
}
