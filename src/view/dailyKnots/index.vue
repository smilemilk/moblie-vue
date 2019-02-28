<template>
    <div :class="dailyList && dailyList.length > 0 ? '' : 'white'"
         class="dailyKnots-wrapper container-wrapper">

        <div class="date-choose-box">
            <div class="date-choose-pre"
                 @click="dateChooseAction('pre')"
            ><i class="icon-left"></i>上一天
            </div>
            <div class="date-choose-current"
                 @click="dateChangeAction()"
            >
                <i class="icon-calendar"></i>
                {{dateSearch|$_filters_parseDate}}
            </div>
            <div class="date-choose-next"
                 @click="dateChooseAction('next')"
            >下一天<i class="icon-right"></i></div>
        </div>

        <div v-if="dailyList && dailyList.length > 0">
            <div class="interval-item">
                实收（元）：￥1221.00
            </div>

            <div class="set-form cell-group">
                <div class="cell cell_hover">
                    <div class="cell-inner cell-inner-lr">
                        <label>全部收银员</label>
                        <i class="cell-right-arrow">
                        </i>
                    </div>
                </div>
            </div>

            <div class="set-form cell-group mt10">
                <div class="cell cell_small">
                    <div class="cell-inner cell-inner-lr">
                        <label class="span_light">门店</label>
                        <div class="cell-right">富阳喜脉健康</div>
                    </div>
                </div>
                <div class="cell cell_small">
                    <div class="cell-inner cell-inner-lr">
                        <label class="span_light">门店</label>
                        <div class="cell-right">富阳喜脉健康</div>
                    </div>
                </div>
            </div>
            <div class="set-form cell-group mt10">
                <div class="cell cell_small">
                    <div class="cell-inner cell-inner-lr">
                        <label class="span_light">门店</label>
                        <div class="cell-right">富阳喜脉健康</div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else>
            <div class="prompt-item prompt_small">
                <i class="prompt-img noneFound"></i>
                <div class="prompt-label">{{promptLabel}}</div>
            </div>
        </div>

        <van-popup
                v-model="dateTimePickerStatus"
                position="bottom"
                :overlay="true"
        >
            <van-datetime-picker
                    v-model="dateSearch"
                    v-if="dateTimePickerStatus"
                    type="date"
                    :min-date="minDate"
                    :max-date="maxDate"
                    :item-height="34"
                    @change="dateTimeChangeAction(this.dateSearch)"
                    @cancel="dateTimeCancelAction()"
                    @confirm="dateTimeConfirmAction()"
            />
        </van-popup>

    </div>
</template>

<script>
    import {
        Tag,
        Col,
        Icon,
        Cell,
        CellGroup,
        Swipe,
        Toast,
        SwipeItem,
        GoodsAction,
        GoodsActionBigBtn,
        GoodsActionMiniBtn,
        DatetimePicker,
        Popup
    } from 'vant';
    import storeData from './store/index';
    import moment from 'moment';

    export default {
        components: {
            [Tag.name]: Tag,
            [Col.name]: Col,
            [Icon.name]: Icon,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
            [GoodsAction.name]: GoodsAction,
            [GoodsActionBigBtn.name]: GoodsActionBigBtn,
            [GoodsActionMiniBtn.name]: GoodsActionMiniBtn,
            DatetimePicker: DatetimePicker,
            Popup: Popup
        },

        data() {
            return storeData.call(this);
        },
        created() {
            this.dateSearch = new Date();
            this.minDate = new Date(2019, 0, 1);
            this.maxDate = new Date();
        },
        methods: {
            dateChooseAction(status) {
                const filter = {
                    'pre': 1,
                    'next': -1
                };
                this.dateSearch = moment(this.dateSearch).subtract(filter[status], 'days').format("YYYY-MM-DD");
            },
            dateChangeAction() {
                this.dateTimePickerStatus = true;
            },
            dateTimeChangeAction(picker) {
                this.dateSearch = picker.getValues();
            },
            dateTimeCancelAction() {
                this.dateTimePickerStatus = false;
            },
            dateTimeConfirmAction() {
                this.dateTimeChangeAction(picker);
                this.dateTimePickerStatus = false;
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "../../style/formation.less";

</style>
