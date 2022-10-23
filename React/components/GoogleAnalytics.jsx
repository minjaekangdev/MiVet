import ReactGA from "react-ga";
const GA_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_GA_ID;

const GoogleAnalytics = () => {
  ReactGA.initialize(GA_ID);
  ReactGA.pageview(window.location.pathname + window.location.search);
};

export default GoogleAnalytics;
