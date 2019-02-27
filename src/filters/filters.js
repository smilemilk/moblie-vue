import {
    parseTime,
    moneyFormat
} from '@/filters/index';

export default {
    filters: {
        $_filters_parseTime: (val, type) => {
            return parseTime(val, type);
        },
        $_filters_moneyFormat_fen: (val) => {
            return moneyFormat(val/100);
        }
    }
}
