<template>
    <div ref="chartEl" class="w-full h-[400px]"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { api } from '@/lib/http'

const chartEl = ref(null)

async function fetchPie() {
    const res = await api.get('/pie/omset')
    return res.data
}

onMounted(async () => {
    const data = await fetchPie()

    Highcharts.chart(chartEl.value, {
        chart: { type: 'pie' },
        colors: ['#088395', '#09637E', '#1A3263'],
        title: {
            text: `Realisasi Omset ${data.month}`
        },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: {point.y:,.0f}'
                }
            }
        },
        series: [
            {
                name: 'Omset',
                data: [
                    {
                        name: 'Terealisasi',
                        y: data.realized,
                        sliced: true,
                        selected: true
                    },
                    {
                        name: 'Sisa Target',
                        y: data.remaining
                    }
                ]
            }
        ]
    })
})
</script>
