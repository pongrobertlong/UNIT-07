/***************************************/
/*             Variables               */
/***************************************/

const userField = document.getElementById("userField");
const messageField = document.getElementById("messageField");
const send = document.getElementById("send");
const mainAlert = document.getElementById("alert");
const formSubmit = document.getElementById("form-submit");
const notifications = document.getElementById("notifications");
const bell = document.getElementById("bell");
const greenNotification = document.getElementById("green-notification");
const trafficNav = document.querySelector(".traffic-nav");
const trafficLinks = document.querySelectorAll(".traffic-nav-link");
const dataList = document.getElementById("datalist");
const save = document.getElementById("save");
const cancel = document.getElementById("cancel");
const profilePublic = document.getElementById("profile-public");
const sendEmail = document.getElementById("send-email");
const timeZone = document.getElementById("timezone");

const weekly = [
  0,
  750,
  1250,
  1000,
  2000,
  1500,
  1750,
  1250,
  1850,
  2250,
  1500,
  2500,
];
const daily = [0, 250, 350, 1100, 2300, 1400, 150, 900, 1850, 2050, 1500, 2000];
const hourly = [0, 800, 850, 300, 1500, 1300, 766, 898, 1999, 2401, 15, 2300];
const monthly = [
  0,
  1990,
  2000,
  2010,
  2040,
  400,
  170,
  1820,
  1340,
  2150,
  1700,
  2020,
];

/***************************************/
/*          Drop Down Menu             */
/***************************************/

bell.addEventListener("click", (e) => {
  e.stopPropagation(); // This prevents the onclick from happening before
  greenNotification.style.display = "none";
  notifications.innerHTML = `
  <a href="#">Update Current Charts</a>
  <a href="#">Update New Memebers</a>
  <a href="#">Finish Node.Js</a>
  <a class="see-more" href="#">See More</a>
  `;
  notifications.style.display = "block";
});

// This will close the drop down menu when user clicks elsewhere

window.onclick = (e) => {
  if (e.target !== notifications) {
    notifications.style.display = "none";
  }
};

/***************************************/
/*            Alert Banner             */
/***************************************/

mainAlert.innerHTML = `<div class="alert-banner"><p><strong>Alert:</strong> You have <strong>6</strong> overdue tasks to complete</p><p class="alert-banner-close">x</p></div>`;

mainAlert.addEventListener("click", (e) => {
  let close = e.target;
  if (close.classList.contains("alert-banner-close")) {
    mainAlert.style.display = "none";
  }
});

/***************************************/
/* Main Chart Data, Options, and Chart */
/***************************************/

let mChartData = {
  labels: [
    "16-22",
    "23-29",
    "30-5",
    "6-12",
    "13-19",
    "20-26",
    "27-3",
    "4-10",
    "11-17",
    "18-24",
    "25-31",
  ],
  datasets: [
    {
      data: weekly,
      backgroundColor: "rgba(116, 119, 191, .3)",
      borderWidth: 1,
      pointRadius: 5,
      pointBackgroundColor: "#fff",
      lineTension: 0,
    },
  ],
};

let mChartOpts = {
  aspectRatio: 2.5,
  responsive: true,
  animation: {
    duration: 0,
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
  legend: {
    display: false,
  },
};

const mChart = document.getElementById("traffic-chart").getContext("2d");
const lineChart = new Chart(mChart, {
  type: "line",
  data: mChartData,
  options: mChartOpts,
});

/*************************************/
/* Add Active Class and Change Chart */
/*************************************/

for (let i = 0; i < trafficLinks.length; i++) {
  trafficLinks[i].addEventListener("click", (e) => {
    const current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    e.target.className += " active";
    if (e.target == trafficLinks[0]) {
      addHourly();
    } else if (e.target == trafficLinks[1]) {
      addDaily();
    } else if (e.target == trafficLinks[2]) {
      addWeekly();
    } else if (e.target == trafficLinks[3]) {
      addMonthly();
    }
  });
}

/*********************************/
/* Functions for Traffic buttons */
/*********************************/

function addHourly() {
  lineChart.data.datasets[0].data = hourly;
  lineChart.update();
}

function addDaily() {
  lineChart.data.datasets[0].data = daily;
  lineChart.update();
}

function addWeekly() {
  lineChart.data.datasets[0].data = weekly;
  lineChart.update();
}

function addMonthly() {
  lineChart.data.datasets[0].data = monthly;
  lineChart.update();
}

/****************************************/
/* Daily Chart Data, Options, and Chart */
/****************************************/

//Chart Data

const dChartData = {
  labels: ["S", "M", "T", "W", "T", "F", "S"],
  datasets: [
    {
      label: "# of Hits",
      data: [75, 115, 175, 125, 225, 200, 100],
      backgroundColor: "#7477BF",
      borderWidth: 1,
    },
  ],
};

//Chart Options

const dChartOpts = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
  legend: {
    display: false,
  },
};

const dChart = document.getElementById("daily-chart");
const barChart = new Chart(dChart, {
  type: "bar",
  data: dChartData,
  options: dChartOpts,
});

/****************************************/
/* Donut Chart Data, Options, and Chart */
/****************************************/

// Chart Data

const mobileChartData = {
  labels: ["Desktop", "Tablet", "Phones"],
  datasets: [
    {
      label: "# of Users",
      data: [2000, 550, 500],
      borderWidth: 0,
      backgroundColor: ["#7477BF", "#78CF82", "#51B6C8"],
    },
  ],
};

// Chart Options

const mobileChartOpts = {
  legend: {
    position: "right",
    labels: {
      boxWidth: 20,
      fontStyle: "bold",
    },
  },
};

// Chart

const mobileChart = document.getElementById("mobile-chart");
const pieChart = new Chart(mobileChart, {
  type: "doughnut",
  data: mobileChartData,
  options: mobileChartOpts,
});

/*************************************/
/*          Message Form             */
/*************************************/

send.addEventListener("click", (e) => {
  e.preventDefault();
  if (userField.value == "" && messageField.value == "") {
    formSubmit.style.display = "block";
    setTimeout(() => {
      formSubmit.style.display = "none";
    }, 2000);
    formSubmit.classList.add("error");
    formSubmit.innerHTML = `<p>Please fill out user and message fields before sending</p>`;
  } else if (userField.value == "") {
    formSubmit.style.display = "block";
    setTimeout(() => {
      formSubmit.style.display = "none";
    }, 2000);
    formSubmit.classList.add("error");
    formSubmit.innerHTML = `<p>Please fill out user field before sending</p>`;
  } else if (messageField.value == "") {
    formSubmit.style.display = "block";
    setTimeout(() => {
      formSubmit.style.display = "none";
    }, 2000);
    formSubmit.classList.add("error");
    formSubmit.innerHTML = `<p>Please fill out message field before sending</p>`;
  } else {
    formSubmit.style.display = "block";
    setTimeout(() => {
      formSubmit.style.display = "none";
      formSubmit.classList.remove("success");
    }, 2000);
    formSubmit.classList.add("success");
    formSubmit.innerHTML = `<p>Message successfully sent to ${userField.value}</p>`;
    userField.value = "";
    messageField.value = "";
  }
});

/*************************************/
/*          Auto Complete            */
/*************************************/

//Team Member Array
const newMemebers = [
  "Victoria Chambers",
  "Dale Byrd",
  "Dawn Wood",
  "Dan Oliver",
];

//Function to autocomplete
function autocomplete(inp, arr) {
  let currentFocus;
  inp.addEventListener("input", function (e) {
    let a,
      b,
      i,
      val = this.value;
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    a.style.display = "none";
    this.parentNode.appendChild(a);
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].toUpperCase().includes(val.toUpperCase())) {
        a.style.display = "block";
        b = document.createElement("DIV");
        b.innerHTML = arr[i].substr(0, val.length);
        b.innerHTML += arr[i].substr(val.length);
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        b.addEventListener("click", (e) => {
          inp.value = e.target.getElementsByTagName("input")[0].value;
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });

  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      currentFocus++;
      addActive(x);
    } else if (e.keyCode == 38) {
      currentFocus--;
      addActive(x);
    } else if (e.keyCode == 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

autocomplete(userField, newMemebers);

/*************************************/
/*     Local Storage for Settings    */
/*************************************/

console.log(timeZone.length);

//Save Function
//Send Items to Local Storage
function saved() {
  localStorage.setItem("send-email", sendEmail.checked);
  localStorage.setItem("profile-public", profilePublic.checked);
  localStorage.setItem("timezone", timeZone.value);
}

//Function Load When User Refreshes
function load() {
  let checkedOne = JSON.parse(localStorage.getItem("send-email"));
  sendEmail.checked = checkedOne;
  let checkedTwo = JSON.parse(localStorage.getItem("profile-public"));
  profilePublic.checked = checkedTwo;
  let timeValue = localStorage.getItem("timezone");
  timeZone.value = timeValue;
}

//Call Save Function
save.addEventListener("click", () => {
  saved();
});

//Load from Local Storage
load();

//Cancel Local Storage, Reset Checked and Timezone
cancel.addEventListener("click", () => {
  timeZone.selectedIndex = 0;
  localStorage.clear();
  sendEmail.checked = false;
  profilePublic.checked = false;
});
