import { useState, useEffect } from "react";
import debug from "sabio-debug";
const _logger = debug.extend("PagePathData");

function useGAPagePathData(response) {
  const [gaData, setGAData] = useState([]);

  useEffect(() => {
    _logger(response);
    setGAData(() => {
      const dataArr = response.map(mapper).slice(0, 6);

      return dataArr;
    });
  }, [response]);

  const mapper = (data, index) => {
    return {
      id: index + 1,
      link: data.dimensions[0],
      exits: data.metrics[0].values[1],
      views: data.metrics[0].values[0],
    };
  };

  return gaData;
}

export default useGAPagePathData;
