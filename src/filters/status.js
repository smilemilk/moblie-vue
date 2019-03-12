export function orderStatus(value) {
    let item = '';
    if (arguments.length === 0) {
        return null;
    }
    if (value === undefined || value === null) {
        return '';
    }
    if (value === '0' || value === 0) {
        item = '待支付';
    } else if (value === '2' || value === 2) {
        item = '支付成功';
    } else if (value === '3' || value === 3) {
        item = '支付失败';
    } else if (value === '4' || value === 4) {
        item = '支付部分成功';
    } else if (value === '5' || value === 5) {
        item = '转入退款';
    } else if (value === '8' || value === 8) {
        item = '手动取消';
    } else if (value === '9' || value === 9) {
        item = '废单，重复调用等方式导致废单';
    } else {
        item = '';
    }
    return item;
}


export function payFundStatus(value) {
    let item = '';
    if (arguments.length === 0) {
        return null;
    }
    if (value === undefined || value === null) {
        return '';
    }
    if (value === 'alipay' || value === 'alipay_wap' || value === 'alipay_pc_direct' || value === 'alipay_barcode_pay' || value === 'alipay_qr') {
        //支付宝支付
        // "alipay", "支付宝手机支付"
        // "alipay_wap", "支付宝手机网页支付"
        // "alipay_pc_direct", "支付宝PC网页支付"
        // "alipay_barcode_pay", "支付宝条码支付"
        // "alipay_qr", "支付宝扫码支付"
        item = 'alipay';
    } else if (value === 'wx' || value === 'wx_pub' || value === 'wx_pub_qr' || value === 'wx_barcode_pay' || value === 'wx_mweb' || value === 'wx_miniapp') {
        //微信支付
        // "wx", "微信移动支付"
        // "wx_pub", "微信公众账号支付"
        // "wx_pub_qr", "微信扫码支付"
        // "wx_barcode_pay", "微信刷卡支付"
        // "wx_mweb", "微信H5支付"
        // "wx_miniapp", "微信小程序支付"
        item = 'wx';
    } else if (value === 'balance') {
        //微脉余额支付
        // "balance", "余额支付"
        item = 'wm';
    }

    return item;

    // //易宝支付
    // YeepayOneKey("yeepay_onekey", "易宝一键支付"),
    // YeepayWap("yeepay_wap", "易宝手机网页支付"),
    //
    // //银联支付
    // CpB2B("cp_b2b", "银联企业网银支付"),
    // Upacp("upacp", "银联全渠道支付"),
    // UpacpWap("upacp_wap", "银联全渠道手机网页支付"),
    // UpacpPC("upacp_pc", "银联PC网页支付"),
    // CnpU("cnp_u", "应用内快捷支付（银联）"),
    // CnpF("cnp_f", "应用内快捷支付（外卡）"),
    //
    // //百度钱包支付
    // BFB("bfb", "百度钱包移动快捷支付"),
    // BFBWap("bfb_wap", "百度钱包手机网页支付"),
    //
    // //京东支付
    // JDPayWap("jdpay_wap", "京东手机网页支付"),
    //
    // //灵猫支付
    // lmalipay("lm_alipay", "灵猫支付宝"),
    // lmalipayQrCode("lm_alipay_qr_code", "灵猫支付宝扫码"),
    // lmalipayBarCode("lm_alipay_bar_code", "灵猫支付宝条码"),
    // lmwxpay("lm_wx", "灵猫微信"),
    // lmwxpayH5("lm_wechat_h5_pay", "灵猫微信h5"),
    //

    //
    // //微脉诊后付
    // CreditPay("creditpay", "信用支付"),
    //
    // //微脉平台优惠
    // Coupon("coupon", "代金券抵扣支付"),//非现金类-代金券抵扣支付
    // RandMinus("randminus", "随机立减"),
    // ScoreEnv("score_env", "红包抵扣支付"), //非现金类
    //
    // //银行支付
    // ZjnxEPay("zjnx_epay","丰收e支付"),
    //
    // //外部支付
    // InsurancePay("insurance_pay", "第三方保险支付"),
    // Instalment("instalment", "分期支付"),
    // MedicalCard("medical_card", "就诊卡支付"),
    // Hospital("hospital", "医保支付"),
    //
    // //其他支付
    // ApplepayUpacp("applepay_upacp", "Apple Pay"),
    // ScoreBean("score_bean", "脉豆抵扣支付"),
    // WeiMaiQr("wei_mai_qr", "微脉扫码支付"),
    //
    // CCBBarCodePay("ccb_bar_code", "建行条码支付"),
    // CCBWAP("ccb_wap","建设银行手机网页支付"),
    // CSCB("cscb","长沙e钱庄APP支付"),
    //
    // TEST_PAY("test_pay","测试宝支付");
}
