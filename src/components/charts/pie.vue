<template>
    <div ref="dom" class="charts chart-pie"></div>
</template>

<script>
    import echarts from 'echarts'
    import tdTheme from './theme.json'

    export default {
        name: 'ChartPie',
        props: {
            valuePie: Array,
            text: String,
            subtext: String,
            theme: {
                type: String,
                default: ''
            },
            legendStatus: true,
            radius: {
                type: String,
                default: '35%'
            },
            centerY: {
                type: String,
                default: '70%'
            },
        },
        mounted() {
            // this.$nextTick(() => {
            let legend;
            if (this.legendStatus === true) {
                legend = this.valuePie.map(_ => (_.name));
            } else {
                legend = [];
            }
            let option = {
                title: {
                    text: this.text,
                    subtext: this.subtext,
                    x: 'center'
                },
                // 提示框组件,鼠标移动上去显示的提示内容
                tooltip: {
                    trigger: 'item',
                    formatter: '{b} : {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'center',
                    top: '40',
                    data: legend
                },
                series: [
                    {
                        type: 'pie',
                        radius: this.radius,
                        center: ['50%', this.centerY],
                        data: this.valuePie,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        label: { // 饼状名称
                            normal: {
                                show: true,
                                position: 'outside',
                                formatter: '{b}  ' +
                                '\n({d}%)\n',//模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。{d}数据会根据value值计算百分比

                                textStyle: {
                                    align: 'center',
                                    baseline: 'middle',
                                    fontFamily: '微软雅黑',
                                    fontSize: 12,
                                    fontWeight: 'normal'
                                }
                            },
                        }
                    },
                ],
                data: this.valuePie
            };

            if (this.theme == 'blueLight') {
                tdTheme.color=  [
                    "rgba(45, 140, 240, .75)",
                    "rgba(25, 190, 107, .8)",
                ];
            } else {
                tdTheme.color=  [
                    "#389BFF",
                    "#70C64F",
                    "#FFD039",
                    "#FF7548",
                    "#EC3C77",
                    "#7E45FA",
                    "rgba(56, 155, 255, .7)",
                    "rgba(112, 198, 79, .7)",
                    "rgba(255, 208, 57, .7)"
                ];
            }

            echarts.registerTheme('tdTheme', tdTheme);

            let dom = echarts.init(this.$refs.dom, 'tdTheme');
            dom.setOption(option);
            // })
        }
    }
</script>

<style lang="less">
    .charts {
        //
    }
</style>
