/* --------------- Spin Wheel  --------------------- */
const spinWheel = document.getElementById("spinWheel");
const spinBtn = document.getElementById("spin_btn");
const text = document.getElementById("text");
/* --------------- Minimum And Maximum Angle For A value  --------------------- */
const spinValues = [
  { minDegree: 81, maxDegree: 120, value: "Voucher giảm giá phụ tùng 10%" },
  { minDegree: 41, maxDegree: 80, value: "Voucher giảm giá phụ tùng 20%" },
  { minDegree: 0, maxDegree: 40, value: "Voucher gói GTGT 300.000đ" },
  { minDegree: 321, maxDegree: 360, value: "Voucher gói GTGT 500.000đ" },
  { minDegree: 281, maxDegree: 320, value: "Voucher gói GTGT 1.000.000đ" },
  { minDegree: 241, maxDegree: 280, value: "Voucher dịch vụ 200.000đ" },
  { minDegree: 201, maxDegree: 240, value: "Voucher dịch vụ 500.000đ" },
  { minDegree: 161, maxDegree: 200, value: "Voucher dịch vụ 800.000đ" },
  { minDegree: 121, maxDegree: 160, value: "Túi café khử mùi" },
];
/* --------------- Size Of Each Piece  --------------------- */
const size = [10, 10, 10, 10, 10, 10, 10, 10, 10];
/* --------------- Background Colors  --------------------- */
var spinColors = [
  "#E74C3C",
  "#7D3C98",
  "#2E86C1",
  "#138D75",
  "#F1C40F",
  "#D35400",
  "#138D75",
  "#F1C40F",
  "#b163da",
];
/* --------------- Chart --------------------- */
/* --------------- Guide : https://chartjs-plugin-datalabels.netlify.app/guide/getting-started.html --------------------- */
let spinChart = new Chart(spinWheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: [
      "Voucher giảm giá phụ tùng 10%",
      "Voucher giảm giá phụ tùng 20%",
      "Voucher gói GTGT 300.000đ",
      "Voucher gói GTGT 500.000đ",
      "Voucher gói GTGT 1.000.000đ",
      "Voucher dịch vụ 200.000đ",
      "Voucher dịch vụ 500.000đ",
      "Voucher dịch vụ 800.000đ",
      "Túi café khử mùi",
    ],
    datasets: [
      {
        backgroundColor: spinColors,
        data: size,
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: {
        display: false,
      },
      datalabels: {
        rotation: 90,
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 16 },
      },
    },
  },
});
/* --------------- Display Value Based On The Angle --------------------- */
const generateValue = (angleValue) => {
  for (let i of spinValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      text.innerHTML = `<p>Xin chúc mừng bạn đã nhận được [${i.value}] ! </p>`;
      spinBtn.disabled = false;
      break;
    }
  }
};
function myRand(arr, freq,  n) { 

  // Create and fill prefix array 

  let prefix= [];

  let i; 

  prefix[0] = freq[0]; 

  for (i = 1; i < n; ++i) 

      prefix[i] = prefix[i - 1] + freq[i]; 


  // prefix[n-1] is sum of all frequencies.

  // Generate a random number with 

  // value from 1 to this sum 

  let r = Math.floor((Math.random()* prefix[n - 1])) + 1; 


  // Find index of ceiling of r in prefix array

  let indexc = findCeil(prefix, r, 0, n - 1); 

  return arr[indexc]; 

}
/* --------------- Spinning Code --------------------- */
let count = 0;
let resultValue = 101;
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  text.innerHTML = `<p>Xin Chúc Mừng!</p>`;
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  let rotationInterval = window.setInterval(() => {
    spinChart.options.rotation = spinChart.options.rotation + resultValue;
    spinChart.update();
    if (spinChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      spinChart.options.rotation = 0;
    } else if (count > 15 && spinChart.options.rotation == randomDegree) {
      generateValue(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});
/* --------------- End Spin Wheel  --------------------- */
