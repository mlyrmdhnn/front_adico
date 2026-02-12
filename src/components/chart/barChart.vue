<template>
    <div ref="chartEl" class="w-full h-[400px]"></div>
</template>

<script setup>
import { api } from '@/lib/http'
import { onMounted, ref } from 'vue'

const chartEl = ref(null)

onMounted(async () => {
    const res = await api.get('/chart/omset')
    const data = res.data

    Highcharts.chart(chartEl.value, {
        colors: ['#088395', '#09637E'],
        chart: { type: 'column' },
        title: {
            text: `Realisasi omset tahun ${data.year}`
        },
        xAxis: {
            categories: data.months
        },
        yAxis: {
            title: { text: 'Nominal' }
        },
        series: [
            {
                name: 'Terealisasi',
                data: data.series.realized.map(Number)
            },
            {
                name: 'Target',
                data: data.series.target.map(Number)
            }
        ]
    })
})
</script>
