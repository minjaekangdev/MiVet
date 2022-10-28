import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { Col, Row, Card, Table } from "react-bootstrap";
import MostViewPages from "./charts/MostViewPagesChart";
import Browsers from "./charts/BrowsersChart";
import SocialMediaTraffic from "./charts/SocialMediaTrafficChart";
import useGAUserData from "./data/googleanalytics/UserData";
import useGACountryData from "./data/googleanalytics/CountryData";
import useGAOperatingSystemData from "./data/googleanalytics/OperatingSystemData";
import useGATrafficChannelData from "./data/googleanalytics/TrafficChannelData";
import useGABrowserData from "./data/googleanalytics/BrowserData";
import useSocialMediaData from "./data/googleanalytics/SocialMediaData";
import useGAPagePathData from "./data/googleanalytics/PagePathData";
import TrafficChannelsChart from "./charts/TrafficChannelsChart";
import CountriesChart from "./charts/CountriesChart";
import UsersChart from "./charts/UsersCharts";
import { Form, Formik, Field } from "formik";
import OperatingSystemsChart from "./charts/OperatingSystemsChart";
import SessionsChart from "./charts/SessionsChart";
import ActiveUsersChart from "./charts/ActiveUsersChart";
import DatePicker from "./DatePicker";
import "../analytics/analytics.css";
import useComponentVisible from "./InvisibleComponent";
import netGAService from "services/googleAnalyticsService";
import toastr from "toastr";
import debug from "sabio-debug";
const _logger = debug.extend("Analytics");

toastr.options = {
  toastClass: "analytics-toast-class",
  closeButton: false,
  debug: false,
  newestOnTop: true,
  progressBar: false,
  positionClass: "toast-top-right",
  preventDuplicates: true,
  onclick: null,
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};

const Analytics = () => {
  const [queryDates, setQueryDates] = useState({
    endDate: new Date(new Date().toLocaleDateString()).toJSON().slice(0, 10),
    startDate: new Date(
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() - 30
      ).toLocaleDateString()
    )
      .toJSON()
      .slice(0, 10),
  });
  const [data, setData] = useState({
    userData: [],
    trafficData: [],
    osData: [],
    countryData: [],
    browserData: [],
    socialData: [],
    pathData: [],
  });
  const [isFetching, setIsFetching] = useState(true);
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const trafficTypesData = useGATrafficChannelData(data.trafficData);
  const userData = useGAUserData(
    queryDates.startDate,
    queryDates.endDate,
    data.userData
  );
  const operatingSystemsData = useGAOperatingSystemData(data.osData);
  const countriesData = useGACountryData(data.countryData);
  const browserData = useGABrowserData(data.browserData);
  const socialData = useSocialMediaData(data.socialData);
  const pathData = useGAPagePathData(data.pathData);

  const onSubmit = (values) => {
    setIsComponentVisible((prevState) => {
      return !prevState;
    });
    if (isComponentVisible) {
      setQueryDates((prevState) => {
        const pd = { ...prevState };
        pd.startDate = values.startDate.toJSON().slice(0, 10);
        pd.endDate = values.endDate.toJSON().slice(0, 10);

        return pd;
      });
    }
    setIsFetching(true);
  };
  const onAllCallsSuccess = (response) => {
    if (response.length === 7) {
      _logger(response);
      setIsFetching(() => {
        toastr.clear();
        toastr.success("Successfully fetched all data");
        return false;
      });

      const userData = response[0].item.reports[0].data.rows;
      const trafficData = response[1].item.reports[0].data.rows;
      const osData = response[2].item.reports[0].data.rows;
      const countryData = response[3].item.reports[0].data.rows;
      const browserData = response[4].item.reports[0].data.rows;
      const socialData = response[5].item.reports[0].data.rows;
      const pathData = response[6].item.reports[0].data.rows;

      setData((prevState) => {
        const pd = { ...prevState };
        pd.userData = userData;
        pd.trafficData = trafficData;
        pd.osData = osData;
        pd.countryData = countryData;
        pd.browserData = browserData;
        pd.socialData = socialData;
        pd.pathData = pathData;

        return pd;
      });
    }
  };
  const onAllCallsError = (error) => {
    _logger("errors:", error);
    setIsFetching(() => {
      toastr.clear();
      toastr.error("Error", error.response.data.errors[0]);
      return false;
    });
  };

  useEffect(() => {
    if (new Date(queryDates.startDate) < new Date("2022-09-30")) {
      setQueryDates((prevState) => {
        const pd = { ...prevState };
        pd.startDate = new Date("2022-10-01").toJSON().slice(0, 10);

        return pd;
      });
    }

    if (isFetching) {
      toastr.clear();
      toastr.info("Please wait..");
    }
    const apiCalls = [
      netGAService.batchGet(queryDates.startDate, queryDates.endDate),
      netGAService.get(
        queryDates.startDate,
        queryDates.endDate,
        "ga:traffictype"
      ),
      netGAService.get(
        queryDates.startDate,
        queryDates.endDate,
        "ga:operatingSystem"
      ),
      netGAService.get(queryDates.startDate, queryDates.endDate, "ga:country"),
      netGAService.get(queryDates.startDate, queryDates.endDate, "ga:browser"),
      netGAService.get(
        queryDates.startDate,
        queryDates.endDate,
        "ga:socialnetwork"
      ),
      netGAService.batchGetPageViews(queryDates.startDate, queryDates.endDate),
    ];
    
    const fetchData = async () => {
     await Promise.all(apiCalls).then(onAllCallsSuccess).catch(onAllCallsError);  
    }
    fetchData(); 
  }, [queryDates]);

  return (
    <Fragment>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <div className="border-bottom pb-4 mb-4 d-md-flex justify-content-between align-items-center">
            <div className="mb-3 mb-md-0">
              <h1 className="mb-0 h2 fw-bold">Analytics</h1>
            </div>
            <Formik
              enableReinitialize={true}
              initialValues={{
                startDate: new Date(queryDates.startDate.replaceAll("-", "/")),
                endDate: new Date(queryDates.endDate.replaceAll("-", "/")),
                minDate: new Date("Oct 1 2022"),
                maxDate: new Date(
                  new Date().toLocaleString().slice(0, 10).replaceAll("-", "/")
                ),
              }}
              onSubmit={onSubmit}
            >
              <Form>
                <div className="d-flex" ref={ref}>
                  <div className="input-group me-3  ">
                    <span
                      className="input-group-text text-muted"
                      id="basic-addon2"
                    >
                      <i className="fe fe-calendar"></i>
                      {isComponentVisible && (
                        <Field
                          component={DatePicker}
                          className={
                            isComponentVisible
                              ? "analytics-date-picker"
                              : "d-none"
                          }
                        />
                      )}
                    </span>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    {isComponentVisible ? "Submit" : "Setting"}
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </Col>
      </Row>
      <UsersChart gaData={userData} />
      <Row>
        <SessionsChart gaData={userData} />
        <ActiveUsersChart gaData={userData} />
      </Row>

      <Row>
        <Col xl={4} lg={12} md={12} className="mb-4">
          <Card className="h-100">
            <Card.Header className="align-items-center card-header-height d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Users by Country</h4>
            </Card.Header>
            <Card.Body className="py-0">
              <Table borderless size="sm">
                <tbody>
                  <CountriesChart gaData={countriesData} />
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col xl={4} lg={12} md={12} className="mb-4">
          <Card className="h-100">
            <Card.Header className="align-items-center card-header-height d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Traffic Channel</h4>
            </Card.Header>
            <Card.Body className="p-1">
              <TrafficChannelsChart GATrafficTypes={trafficTypesData} />
            </Card.Body>
          </Card>
        </Col>

        <Col xl={4} lg={12} md={12} className="mb-4">
          <Card className="h-100">
            <Card.Header className="align-items-center card-header-height d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Operating System</h4>
            </Card.Header>
            <Card.Body>
              <OperatingSystemsChart
                GAOperatingSystems={operatingSystemsData}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xl={4} lg={12} md={12} className="mb-4">
          <Browsers title="Browsers" dataArr={browserData} />
        </Col>

        <Col xl={4} lg={12} md={12} className="mb-4">
          <SocialMediaTraffic
            title="Social Media Traffic"
            dataArr={socialData}
          />
        </Col>

        <Col xl={4} lg={12} md={12} className="mb-4">
          <MostViewPages title="Most View Pages" dataArr={pathData} />
        </Col>
      </Row>
    </Fragment>
  );
};

export default Analytics;
