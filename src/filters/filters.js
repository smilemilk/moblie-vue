import {
    parseTime,
    moneyFormat
} from '@/filters/index';

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
        }
    }
}
