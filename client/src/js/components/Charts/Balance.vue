<script>
const { ipcRenderer } = require("electron");
import { HorizontalBar } from "vue-chartjs";

export default {
  extends: HorizontalBar,
  mounted() {
    let data = ipcRenderer.sendSync('getBalance')
    if (data.length < 1) {
      return false
    }

    this.renderChart(
      {
        labels: ["Alacaklar", "Borçlar"],
        datasets: [
          {
            label: "Tutar (TRY)",
            backgroundColor: ["rgba(75,192,192,0.65)", "rgba(255,33,82,0.65)"],
            data: [data[0].amount, data[1].amount],
            barPercentage: .5,
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    );

    this.dataset = ipcRenderer.sendSync('getBalance');
  }
};
</script>