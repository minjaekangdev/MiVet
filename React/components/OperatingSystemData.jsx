import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import Icon from "@mdi/react";
import { mdiSquareRounded } from "@mdi/js";
import debug from "sabio-debug";
const _logger = debug.extend("OSData");

const Labels = (props) => {
  return (
    <ListGroup.Item as="li" bsPrefix="list-inline-item mx-3">
      <h5 className="mb-0 d-flex align-items-center fs-5 lh-1">
        <Icon
          path={mdiSquareRounded}
          className={props.gaData.labelClass}
          size={0.6}
        />
        {props.gaData.operatingSystem}
      </h5>
    </ListGroup.Item>
  );
};

function useGAOperatingSystemData(response) {
  const [gaData, setGAData] = useState({
    data: [],
    labelClasses: [
      "text-danger fs-5 me-2",
      "text-success fs-5 me-2",
      "text-primary fs-5 me-2",
      "text-info fs-5 me-2",
    ],
  });
  const [chartConfig, setChartConfig] = useState({
    operatingSystemChartOptions: {},
    operatingSystemData: [
      {
        data: [],
      },
    ],
    components: [],
  });

  useEffect(() => {
    _logger(response);

    setGAData((prevState) => {
      const pd = { ...prevState };
      pd.data = response.map(mapper).slice(0, 3);

      const totalUsers = response.map(mapTotalUsers).reduce(reducer, 0);
      const dataArr = response.map(mapper);
      for (let index = 0; index < dataArr.length; index++) {
        dataArr[index].percentage =
          ((dataArr[index].usersByOS / totalUsers) * 100).toFixed(2) + "%";
      }
      setChartConfig((prevState) => {
        const pd = { ...prevState };
        pd.operatingSystemChartOptions = {
          labels: dataArr.map(mapOS),
          chart: { type: "polarArea", height: 350 },
          colors: ["#e53f3c", "#19cb98", "#754FFE", "#29BAF9"],
          legend: { show: !1 },
          stroke: { colors: ["#fff"] },
          fill: { opacity: 0.9 },
          responsive: [
            { breakpoint: 480, options: { chart: { height: 300 } } },
            { breakpoint: 1441, options: { chart: { height: 270 } } },
            { breakpoint: 1980, options: { chart: { height: 370 } } },
            { breakpoint: 2500, options: { chart: { height: 350 } } },
            { breakpoint: 3000, options: { chart: { height: 500 } } },
          ],
        };
        pd.operatingSystemData = [{ data: dataArr.map(mapUsers) }];
        pd.components = dataArr.map(mapComponents);

        return pd;
      });

      return pd;
    });
  }, [response]);

  const mapper = (data, index) => {
    return {
      operatingSystem: data.dimensions[0],
      usersByOS: data.metrics[0].values[0],
      percentage: "",
      labelClass: gaData.labelClasses[index],
    };
  };
  const mapUsers = (data) => {
    return parseInt(data.usersByOS);
  };
  const mapTotalUsers = (data) => {
    return parseInt(data.metrics[0].values[0]);
  };
  const mapOS = (data) => {
    return data.operatingSystem;
  };
  const reducer = (a, b) => {
    return a + b;
  };
  const mapComponents = (data) => {
    return <Labels key={data.operatingSystem} gaData={data} />;
  };

  return chartConfig;
}

export default useGAOperatingSystemData;

Labels.propTypes = {
  gaData: PropTypes.shape({
    operatingSystem: PropTypes.string,
    labelClass: PropTypes.string,
  }).isRequired,
};
