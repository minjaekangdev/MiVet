import React from "react";
import PropTypes from "prop-types";
import { Card, Row, Col } from "react-bootstrap";
import ApexCharts from "./ApexCharts";

import {
  UserChartSeries,
  UserChartOptions,
  VisitorChartSeries,
  VisitorChartOptions,
  BounceChartSeries,
  BounceChartOptions,
  AverageVisitTimeChartSeries,
  AverageVisitTimeChartOptions,
} from "components/dashboard/analytics/ChartData";

function ShowChart(chartName, chartOptions, chartSeries) {
  switch (chartName) {
    case "UserChart":
      return (
        <ApexCharts
          options={UserChartOptions}
          series={UserChartSeries}
          height={60}
          type="area"
        />
      );
    case "VisitorChart":
      return (
        <ApexCharts
          options={VisitorChartOptions}
          series={VisitorChartSeries}
          height={60}
          type="area"
        />
      );
    case "BounceChart":
      return (
        <ApexCharts
          options={BounceChartOptions}
          series={BounceChartSeries}
          height={60}
          type="line"
        />
      );
    case "AverageVisitTimeChart":
      return (
        <ApexCharts
          options={AverageVisitTimeChartOptions}
          series={AverageVisitTimeChartSeries}
          height={60}
          type="area"
        />
      );
    case "Custom":
      return (
        <ApexCharts
          options={chartOptions}
          series={chartSeries}
          height={60}
          type="area"
        />
      );
    default:
      return chartName + " chart is undefiend";
  }
}

const StatRightChart = (props) => {
  const {
    title,
    value,
    summaryValue,
    summaryIcon,
    isSummaryIconShown,
    classValue,
    chartName,
    chartOptions,
    chartSeries,
  } = props;

  return (
    <Card border="light" className={`${classValue}`}>
      <Card.Body>
        <Row>
          <Col md={12} lg={12} xl={12} sm={12}>
            <span className="fw-semi-bold text-uppercase fs-6">{title}</span>
          </Col>
          <Col md={6} lg={6} xl={6} sm={6}>
            <h1 className="fw-bold mt-2 mb-0 h2">{value}</h1>
            <p
              className={`text-${
                summaryIcon === "up" ? "success" : "danger"
              } fw-semi-bold mb-0`}
            >
              {isSummaryIconShown ? (
                <i className={`fe fe-trending-${summaryIcon} me-1`}></i>
              ) : (
                ""
              )}{" "}
              {summaryValue}
            </p>
          </Col>
          <Col
            md={6}
            lg={6}
            xl={6}
            sm={6}
            className="d-flex align-items-center"
          >
            {ShowChart(chartName, chartOptions, chartSeries)}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

StatRightChart.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  summaryValue: PropTypes.string,
  summaryIcon: PropTypes.string,
  isSummaryIconShown: PropTypes.bool,
  classValue: PropTypes.string,
  chartName: PropTypes.string,
  chartOptions: PropTypes.shape({
    chart: PropTypes.shape({
      height: PropTypes.number.isRequired
    }),
    dataLabels: PropTypes.shape({
      isEnabled: PropTypes.bool
    }), 
    stroke: PropTypes.shape({
      curve: PropTypes.string.isRequired
    }),
    fill: PropTypes.shape({
      type: PropTypes.string.isRequired, 
      gradient: PropTypes.shape({
        stops: PropTypes.arrayOf(PropTypes.number).isRequired
      })
    }),
    xaxis: PropTypes.shape({
      labels: PropTypes.shape({
        show: PropTypes.bool
      }).isRequired
    }), 
    yaxis: PropTypes.arrayOf(PropTypes.shape({
      y: PropTypes.number
    }
    )).isRequired
  }),
  tooltip: PropTypes.shape({
    x: PropTypes.shape({
      show: PropTypes.number
    }).isRequired
  }),
  chartSeries: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.number),
    })
  ),
};

export default StatRightChart;
