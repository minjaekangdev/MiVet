import { useState, useEffect } from "react";
import debug from "sabio-debug";
const _logger = debug.extend("CountryData");

function useGACountryData(response) {
  const [gaData, setGAData] = useState([]);

  useEffect(() => {
    _logger(response);
    setGAData(() => {
      const totalUsers = response.map(mapTotalUsers).reduce(reducer, 0);
      const dataArr = response.map(mapper).slice(0, 10);
      for (let index = 0; index < dataArr.length; index++) {
        dataArr[index].percentage =
          ((dataArr[index].usersByCountry / totalUsers) * 100).toFixed(2) + "%";
      }
      return dataArr;
    });
  }, [response]);

  const mapper = (data) => {
    return {
      country: data.dimensions[0],
      usersByCountry: data.metrics[0].values[0],
      percentage: "",
    };
  };
  const mapTotalUsers = (data) => {
    return parseInt(data.metrics[0].values[0]);
  };
  const reducer = (a, b) => {
    return a + b;
  };

  return gaData;
}

export default useGACountryData;
