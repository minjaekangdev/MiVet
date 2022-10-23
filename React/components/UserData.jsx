import { useState, useEffect } from "react";

function useGAUserData(startDate, endDate, response) {
  const [gaData, setGAData] = useState({
    users: {
      value: "",
      summaryIcon: "",
      difference: "",
      summaryValue: "",
      sevenDay: {
        sevenDayAvg: "",
      },
      thirtyDay: {
        thirtyDayAvg: "",
      },
      userChartSeries: [{ name: "User", data: [] }],
      userChartOptions: {
        chart: {
          height: 60,
          type: "area",
          toolbar: { show: !1 },
          sparkline: { enabled: !0 },
          grid: { show: !1, padding: { left: 0, right: 0 } },
        },
        dataLabels: { enabled: !1 },
        stroke: { curve: "smooth", width: 2 },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 0.9,
            opacityFrom: 0.7,
            opacityTo: 0.5,
            stops: [0, 80, 100],
          },
        },
        xaxis: { labels: { show: !1 }, axisBorder: { show: !1 } },
        yaxis: [
          { y: 0, offsetX: 0, offsetY: 0, padding: { left: 0, right: 0 } },
        ],
        tooltip: { x: { show: !1 } },
      },
    },

    newUsers: {
      value: "",
      summaryIcon: "",
      difference: "",
      summaryValue: "",
      visitorChartOptions: {
        chart: {
          height: 60,
          type: "area",
          toolbar: { show: !1 },
          sparkline: { enabled: !0 },
          grid: { show: !1, padding: { left: 0, right: 0 } },
        },
        colors: ["#19cb98"],
        dataLabels: { enabled: !1 },
        stroke: { curve: "smooth", width: 2 },
        fill: {
          colors: "#19cb98",
          type: "gradient",
          gradient: {
            type: "vertical",
            shadeIntensity: 0.9,
            opacityFrom: 0.7,
            opacityTo: 0.5,
            stops: [0, 100],
          },
        },
        xaxis: { labels: { show: !1 }, axisBorder: { show: !1 } },
        yaxis: [
          { y: 0, offsetX: 0, offsetY: 0, padding: { left: 0, right: 0 } },
        ],
        tooltip: { x: { show: !1 } },
      },
      visitorChartSeries: [{ name: "User", data: [] }],
    },

    bounceRate: {
      value: "",
      summaryIcon: "",
      difference: "",
      summaryValue: "",
      bounceChartOptions: {
        chart: {
          height: 60,
          type: "line",
          toolbar: { show: !1 },
          sparkline: { enabled: !0 },
          grid: { show: !1, padding: { left: 0, right: 0 } },
        },
        colors: ["#c28135"],
        dataLabels: { enabled: !1 },
        stroke: { curve: "straight", width: 4 },
        markers: { size: 4, hover: { size: 6, sizeOffset: 3 } },
        xaxis: { labels: { show: !1 }, axisBorder: { show: !1 } },
        yaxis: [
          { y: 0, offsetX: 0, offsetY: 0, padding: { left: 0, right: 0 } },
        ],
        tooltip: { x: { show: !1 } },
      },
      bounceChartSeries: [{ name: "Bonus Rate", data: [] }],
    },

    avgSessionDuration: {
      value: "",
      summaryIcon: "",
      difference: "",
      summaryValue: "",
      averageVisitTimeChartOptions: {
        chart: {
          height: 60,
          type: "area",
          toolbar: { show: !1 },
          sparkline: { enabled: !0 },
          grid: { show: !1, padding: { left: 0, right: 0 } },
        },
        colors: ["#e53f3c"],
        dataLabels: { enabled: !1 },
        stroke: { curve: "smooth", width: 2 },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 0.9,
            opacityFrom: 0.7,
            opacityTo: 0.5,
            stops: [0, 80, 100],
          },
        },
        xaxis: { labels: { show: !1 }, axisBorder: { show: !1 } },
        yaxis: [
          { y: 0, offsetX: 0, offsetY: 0, padding: { left: 0, right: 0 } },
        ],
        tooltip: { x: { show: !1 } },
      },
      averageVisitTimeChartSeries: [{ name: "User", data: [] }],
    },

    sessionChart: [
      {
        name: "Session Duration",
        data: [],
        colors: ["#754ffe"],
      },
      {
        name: "Page Views",
        data: [],
      },
      {
        name: "Total Visits",
        data: [],
      },
    ],
    sessionChartOptions: {},

    activeUsers: [
      {
        data: [],
      },
    ],
    activeUsersChartOptions: {
      chart: { type: "bar", height: 302, sparkline: { enabled: !0 } },
      states: {
        normal: { filter: { type: "none", value: 0 } },
        hover: { filter: { type: "darken", value: 0.55 } },
        active: {
          allowMultipleDataPointsSelection: !1,
          filter: { type: "darken", value: 0.55 },
        },
      },
      colors: ["#8968fe"],
      plotOptions: { bar: { borderRadius: 4, columnWidth: "50%" } },
      xaxis: { crosshairs: { width: 1 } },
      tooltip: {
        fixed: { enabled: !1 },
        x: { show: !1 },
        y: {
          title: {
            formatter: function () {
              return "Active User";
            },
          },
        },
        marker: { show: !1 },
      },
      responsive: [
        { breakpoint: 480, options: { chart: { height: 300 } } },
        { breakpoint: 1441, options: { chart: { height: 300 } } },
        { breakpoint: 1981, options: { chart: { height: 300 } } },
        { breakpoint: 2500, options: { chart: { height: 400 } } },
        { breakpoint: 3000, options: { chart: { height: 450 } } },
      ],
    },
  });

  useEffect(() => {
    setGAData((prevState) => {
      const pd = { ...prevState };
      const usersData = response.map(mapUsers).slice(-7);
      const newUsersData = response.map(mapNewUsers).slice(-7);
      const avgVisitData = response.map(mapAvgVistTime).slice(-7);
      const bounceData = response.map(mapBounceRate).slice(-7);
      const datesArr = createDatesArr(startDate, endDate);

      pd.sessionChartOptions = {
        chart: {
          toolbar: { show: !1 },
          height: 200,
          type: "line",
          zoom: { enabled: !1 },
        },
        dataLabels: { enabled: !1 },
        stroke: { width: [4, 3, 3], curve: "smooth", dashArray: [0, 5, 4] },
        legend: { show: !1 },
        colors: ["#754ffe", "#19cb98", "#ffaa46"],
        markers: { size: 0, hover: { sizeOffset: 6 } },
        xaxis: {
          categories: datesArr.slice(-11),
          labels: {
            style: {
              colors: ["#5c5776"],
              fontSize: "12px",
              fontFamily: "Inter",
              cssClass: "apexcharts-xaxis-label",
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: ["#5c5776"],
              fontSize: "12px",
              fontFamily: "Inter",
              cssClass: "apexcharts-xaxis-label",
            },
            offsetX: -12,
            offsetY: 0,
          },
        },
        tooltip: {
          y: [
            {
              title: {
                formatter: function (e) {
                  return e + " (mins)";
                },
              },
            },
            {
              title: {
                formatter: function (e) {
                  return e + " per session";
                },
              },
            },
            {
              title: {
                formatter: function (e) {
                  return e;
                },
              },
            },
          ],
        },
        grid: { borderColor: "#f1f1f1" },
        responsive: [
          { breakpoint: 480, options: { chart: { height: 300 } } },
          { breakpoint: 1441, options: { chart: { height: 360 } } },
          { breakpoint: 1980, options: { chart: { height: 400 } } },
          { breakpoint: 2500, options: { chart: { height: 470 } } },
          { breakpoint: 3000, options: { chart: { height: 450 } } },
        ],
      };

      pd.users.userChartSeries = [
        { name: "Users", data: response.map(mapUsers).slice(-7) },
      ];

      pd.newUsers.visitorChartSeries = [
        { name: "Unique Visitors", data: response.map(mapNewUsers).slice(-7) },
      ];

      pd.avgSessionDuration.averageVisitTimeChartSeries = [
        {
          name: "Avg Visit Time",
          data: response.map(mapAvgVistTime).slice(-7),
        },
      ];

      pd.bounceRate.bounceChartSeries = [
        {
          name: "Bounce Rate",
          data: response.map(mapBounceRate).slice(-7),
        },
      ];
      pd.users.value = `${usersData[usersData.length - 1]}`;

      pd.users.difference = getDailyChange(pd.users.userChartSeries[0].data);
      pd.users.summaryValue = Math.abs(pd.users.difference).toString();
      pd.users.summaryIcon = pd.users.difference <= 0 ? "up" : "down";

      pd.users.sevenDay.sevenDayAvg = Math.floor(
        getDataAvg(pd.users.userChartSeries[0].data.slice(-7))
      ).toString();
      pd.users.thirtyDay.thirtyDayAvg = Math.floor(
        getDataAvg(response.map(mapUsers).slice(-30)).toString()
      ).toString();

      pd.newUsers.value = `${newUsersData[newUsersData.length - 1]}`;
      pd.newUsers.difference = getDailyChange(
        pd.newUsers.visitorChartSeries[0].data
      );
      pd.newUsers.summaryValue = Math.abs(pd.newUsers.difference).toString();
      pd.newUsers.summaryIcon = pd.newUsers.difference <= 0 ? "up" : "down";

      pd.bounceRate.value = `${bounceData[bounceData.length - 1]}%`;
      pd.bounceRate.difference = getDailyChange(
        pd.bounceRate.bounceChartSeries[0].data
      );
      pd.bounceRate.summaryValue = `${Math.abs(pd.bounceRate.difference)}%`;
      pd.bounceRate.summaryIcon =
        parseInt(pd.bounceRate.difference) >= 0 ? "up" : "down";

      pd.avgSessionDuration.value = convertToMinSecs(
        avgVisitData[avgVisitData.length - 1]
      );
      pd.avgSessionDuration.summaryValue = convertToMinSecs(
        getDailyChange(
          pd.avgSessionDuration.averageVisitTimeChartSeries[0].data
        ) * -1
      );
      pd.avgSessionDuration.summaryIcon =
        getDailyChange(
          pd.avgSessionDuration.averageVisitTimeChartSeries[0].data
        ) <= 0
          ? "up"
          : "down";

      pd.sessionChart = [
        { data: response.map(mapSessionDuration).slice(-11) },
        { data: response.map(mapPageViews).slice(-11) },
        { data: response.map(mapSessions).slice(-11) },
      ];

      pd.activeUsers = [{ data: response.map(mapUsers) }];

      return pd;
    });
  }, [response]);

  const createDatesArr = (startDate, endDate) => {
    const datesArr = [];
    const diffTime = Math.abs(new Date(endDate) - new Date(startDate));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    for (let index = diffDays - 1; index >= -1; index--) {
      datesArr.push(
        new Date(
          new Date(endDate).getFullYear(),
          new Date(endDate).getMonth(),
          new Date(endDate).getDate() - index
        )
          .toDateString()
          .slice(4, 10)
      );
    }
    return datesArr.slice(-11);
  };

  const mapUsers = (data) => {
    return parseInt(data.metrics[0].values[0]);
  };
  const mapNewUsers = (data) => {
    return parseInt(data.metrics[0].values[1]);
  };
  const mapBounceRate = (data) => {
    return parseInt(data.metrics[0].values[2]);
  };
  const mapAvgVistTime = (data) => {
    return parseInt(data.metrics[0].values[3]);
  };
  const mapSessionDuration = (data) => {
    return Math.floor(parseInt(data.metrics[0].values[4]) / 60);
  };
  const mapPageViews = (data) => {
    return parseInt(data.metrics[0].values[5]);
  };
  const mapSessions = (data) => {
    return parseInt(data.metrics[0].values[6]);
  };
  const reducer = (a, b) => {
    return a + b;
  };
  const getDataAvg = (data) => {
    return data.reduce(reducer, 0) / data.length;
  };
  const getDailyChange = (data) => {
    if (data[data.length - 2] !== undefined) {
      return data[data.length - 2] - data[data.length - 1];
    } else {
      return data[data.length - 1];
    }
  };
  const convertToMinSecs = (seconds) => {
    const totalAvgMins = Math.floor(seconds / 60);
    const totalAvgSecs = Math.floor(seconds - totalAvgMins * 60);
    return `${totalAvgMins}m:${totalAvgSecs}s`;
  };

  return gaData;
}

export default useGAUserData;
