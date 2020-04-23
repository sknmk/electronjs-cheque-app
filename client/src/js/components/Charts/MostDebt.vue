<script>
const { ipcRenderer } = require("electron");
import { PolarArea } from "vue-chartjs";

export default {
  extends: PolarArea,
  mounted() {
    let data = ipcRenderer.sendSync('getDebts')
    this.renderChart(
      {
        labels: data.map(value => value.name),
        datasets: [
          {
            backgroundColor: ["rgba(48,63,159,0.65)", "rgba(255,176,0,0.65)","rgba(0,121,107,0.65)", "rgba(237,66,144,0.65)","rgba(75,192,192,0.65)","rgba(12,156,235,0.66)"],
            data: data.map(value => value.amount),
            barPercentage: 0.2
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                drawBorder: false,
                drawOnChartArea: false,
                color: "rgba(0, 0, 0, 0)",
                lineWidth: 0
              },
              ticks: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                drawBorder: false,
                drawOnChartArea: false,
                color: "rgba(0, 0, 0, 0)",
                lineWidth: 0
              },
              ticks: {
                display: false
              }
            }
          ]
        },
        title: {
          display: false
        },
        legend: {
          display: true,
          position: "left",
          labels: {
            fontSize: 11,
            usePointStyle: true
          }
        },
        barPercentage: 0.5
      }
    );
  }
};
</script>