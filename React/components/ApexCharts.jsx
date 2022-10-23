import React from "react";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";

const ApexCharts = (props) => {
  const { options, series, width, type, height } = props;
  return (
    <Chart
      options={options}
      series={series}
      type={type}
      width={width}
      height={height}
    />
  );
};

ApexCharts.propTypes = {
  options: PropTypes.shape({}).isRequired,
  series: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        data: PropTypes.arrayOf(PropTypes.number),
      }),
    ])
  ),
  type: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};

ApexCharts.defaultProps = {
  type: "line",
};

export default ApexCharts;
