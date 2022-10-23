import { useState, useEffect } from "react";
import {
  mdiFacebook,
  mdiInstagram,
  mdiTwitter,
  mdiLinkedin,
  mdiGithub,
  mdiYoutube,
  mdiDirections,
} from "@mdi/js";
const progressbarvariants = ["primary", "success", "danger", "warning", "info"];

function useSocialMediaData(response) {
  const [gaData, setGAData] = useState([]);

  useEffect(() => {
    setGAData(() => {
      const totalUsers = response.map(mapTotalUsers).reduce(reducer, 0);
      const dataArr = response.map(mapper).slice(0, 6);
      for (let index = 0; index < dataArr.length; index++) {
        dataArr[index].percent = (
          (dataArr[index].counter / totalUsers) *
          100
        ).toFixed(2);
      }

      return dataArr;
    });
  }, [response]);

  const mapper = (data, index) => {
    let icon;
    let media;
    if (data.dimensions[0] === "Facebook") {
      media = "Facebook";
      icon = mdiFacebook;
    } else if (data.dimensions[0] === "Instagram") {
      media = "Instagram";
      icon = mdiInstagram;
    } else if (data.dimensions[0] === "Twitter") {
      media = "Twitter";
      icon = mdiTwitter;
    } else if (data.dimensions[0] === "Linkedin") {
      media = "LinkedIn";
      icon = mdiLinkedin;
    } else if (data.dimensions[0] === "Github") {
      media = "GitHub";
      icon = mdiGithub;
    } else if (data.dimensions[0] === "Youtube") {
      media = "YouTube";
      icon = mdiYoutube;
    } else {
      media = "Direct";
      icon = mdiDirections;
    }

    return {
      id: index + 1,
      media: media,
      counter: data.metrics[0].values[0],
      icon: icon,
      percent: "",
      progressbarvariant: progressbarvariants[index],
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

export default useSocialMediaData;
