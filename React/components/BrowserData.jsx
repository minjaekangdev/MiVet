import { useState, useEffect } from "react";
import debug from "sabio-debug";
const _logger = debug.extend("BrowserData");

function useGABrowserData(response) {
  const [gaData, setGAData] = useState([]);

  useEffect(() => {
    _logger(response);
    setGAData(() => {
      const totalUsers = response.map(mapTotalUsers).reduce(reducer, 0);
      const dataArr = response.map(mapper).slice(0, 6);
      for (let index = 0; index < dataArr.length; index++) {
        dataArr[index].percent =
          ((dataArr[index].usersByBrowser / totalUsers) * 100).toFixed(2) + "%";
      }

      return dataArr;
    });
  }, [response]);

  const mapper = (data, index) => {
    return {
      id: index + 1,
      browser: data.dimensions[0],
      usersByBrowser: data.metrics[0].values[0],
      percent: "",
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

export default useGABrowserData;
