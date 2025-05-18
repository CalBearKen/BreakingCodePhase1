// app.js
import Vue from 'vue';
import App from './App.vue';
import Chart from 'chart.js';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');

// Sample usage of Chart.js
new Chart(document.getElementById('myChart'), {
  type: 'bar',
  data: {
    labels: ['January', 'February', 'March'],
    datasets: [{
      label: 'Appointment Count',
      data: [10, 15, 12],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});