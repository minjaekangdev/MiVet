import React, { useState, useEffect } from "react";
import Icon from "@mdi/react";
import { mdiSquareRounded } from "@mdi/js";
import PropTypes from "prop-types";

const DataTable = (props) => {
  return (
    <tr>
      <td className="text-dark fw-medium py-1">
        <Icon
          path={mdiSquareRounded}
          className={props.data.labelClass}
          size={0.6}
        />
        {props.data.source}
      </td>
      <td className="text-end fw-semi-bold py-1 text-dark">
        {props.data.usersFromSource}
      </td>
      <td className="text-end  py-1">{props.data.percentage}</td>
    </tr>
  );
};

function useGATrafficChannelData(response) {
  const [data, setData] = useState({
    channelTrafficData: [{ data: [] }],
    channelTrafficChartOptions: {},
    componenets: [],
    labelClasses: [
      "text-primary fs-5 me-2",
      "text-success fs-5 me-2",
      "text-danger fs-5 me-2",
      "text-info fs-5 me-2",
    ],
  });

  useEffect(() => {
    const totalUsers = response.map(mapTotalUsers).reduce(reducer, 0);
    const dataArr = response.map(mapper).slice(0, 3);
    const labels = dataArr.map(mapSource);
    for (let index = 0; index < dataArr.length; index++) {
      dataArr[index].percentage =
        ((dataArr[index].usersFromSource / totalUsers) * 100).toFixed(2) + "%";
    }
    setData((prevState) => {
      const pd = { ...prevState };
      pd.channelTrafficChartOptions = {
        labels: labels,
        colors: ["#754FFE", "#19cb98", "#e53f3c", "#ffaa46"],
        chart: { type: "donut" },
        legend: { show: !1 },
        dataLabels: { enabled: !1 },
        plotOptions: { pie: { donut: { size: "50%" } } },
        stroke: { width: 2 },
        responsive: [
          { breakpoint: 480, options: { chart: { height: 300 } } },
          { breakpoint: 1441, options: { chart: { height: 200 } } },
          { breakpoint: 1980, options: { chart: { height: 300 } } },
          { breakpoint: 2000, options: { chart: { height: 270 } } },
          { breakpoint: 2500, options: { chart: { height: 350 } } },
          { breakpoint: 3000, options: { chart: { height: 500 } } },
        ],
      };
      pd.channelTrafficData = [{ data: dataArr.map(mapUsers) }];
      pd.componenets = dataArr.map(mapComponents);

      return pd;
    });
  }, [response]);

  const mapper = (gaData, index) => {
    return {
      source: gaData.dimensions[0],
      usersFromSource: gaData.metrics[0].values[0],
      percentage: "",
      labelClass: data.labelClasses[index],
    };
  };
  const mapUsers = (data) => {
    return parseInt(data.usersFromSource);
  };
  const mapTotalUsers = (data) => {
    return parseInt(data.metrics[0].values[0]);
  };
  const mapSource = (data) => {
    return data.source;
  };
  const reducer = (a, b) => {
    return a + b;
  };

  const mapComponents = (data) => {
    return <DataTable key={data.source} data={data} />;
  };

  return data;
}

export default useGATrafficChannelData;

DataTable.propTypes = {
  data: PropTypes.shape({
    source: PropTypes.string.isRequired,
    usersFromSource: PropTypes.string.isRequired,
    percentage: PropTypes.string.isRequired,
    labelClass: PropTypes.string.isRequired,
  }),
};
