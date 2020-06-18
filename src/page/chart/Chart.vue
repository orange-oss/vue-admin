<template>
    <div ref="main" class="main"></div>
</template>
<script>
const echarts = require('echarts')
export default {
    name: 'Chart',
    data() {
        return {
            categoryData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // 横坐标
            lineData: [820, 932, 901, 934, 1290, 1330, 1320]
        }
    },
    mounted() {
        this.getEchart()
    },
    methods: {
        // 渲染echart图表
        getEchart() {
            const myChart = echarts.init(this.$refs.main)
            myChart.setOption({
                xAxis: {
                    type: 'category',
                    data: this.categoryData
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: this.lineData,
                        type: 'line'
                    }
                ]
            })
        }
    }
}
</script>

<style lang="less" scoped>
.main {
    height: 350px;
    width: 800px;
}
</style>
