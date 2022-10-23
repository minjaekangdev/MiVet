import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Col, Row, Card } from "react-bootstrap";
import debug from "sabio-debug";
import netUserService from "services/userService";
import Swal from "sweetalert2";

const _logger = debug.extend("UserConfirm");

const Confirm = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const navigate = useNavigate();
  const [pararms] = useSearchParams();
  const token = pararms.get("token");

  useEffect(() => {
    setLoading(true);
    const onConfirmSuccess = () => {
      setLoading(false);
      setResponse("Sucess!");
      Swal.fire(
        "Success!",
        "You're account is confirmed. You may now log in.",
        "success"
      );
      navigate("/users/login");
    };
    const onConfirmError = (error) => {
      setLoading(false);
      setResponse("Your account could not be confirmed.");
      _logger(error);
    };
    netUserService
      .confirmUser(token)
      .then(onConfirmSuccess)
      .catch(onConfirmError);
  }, []);

  return (
    <Fragment>
      <Row className="align-items-center justify-content-center g-0 min-vh-100">
        <Col lg={5} md={5} className="py-8 py-xl-0">
          <Card>
            <Card.Body className="p-6">
              <div className="mb-4 justify-content-center">
                {loading ? (
                  <div className="row">
                    <h4 className="mb-1 fw-bold col-10">
                      Please wait while we confirm your account..
                    </h4>
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <h4 className="mb-1 fw-bold col-10">{response}</h4>
                    <Link to="/">Go home</Link>
                  </>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Confirm;
