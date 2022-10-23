import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Row, Card, Button, Image } from "react-bootstrap";
import { Formik, Field, Form } from "formik";
import debug from "sabio-debug";
import Swal from "sweetalert2";
import { netUserService } from "services/userService";
import PropTypes from "prop-types";
import Logo from "assets/images/logos/MiVet-Logo2.jpg";
import vetProfilesService from "components/vetProfiles/vetProfilesService";

const _logger = debug.extend("UserLogin");

const SignIn = (props) => {
  const navigate = useNavigate();

  const onSwalOkClick = () => {
    netUserService
      .getCurrentUser()
      .then(onGetUserSuccess)
      .catch(onGetUserError);
  };

  const onGetUserSuccess = (response) => {
    if (response.item.roles.includes("Admin")) {
      navigate("/dashboard");
    } else if (response.item.roles.includes("Vet")) {
      vetProfilesService
        .checkIfVetHasProfile()
        .then(onVetCheckProfileSuccess)
        .catch(onVetCheckProfileError);
    } else {
      navigate("/");
    }
  };
  const onGetUserError = (error) => {
    _logger(error);
  };

  const onSubmit = (values) => {
    const onLoginSuccess = (response) => {
      _logger("Success", response);
      Swal.fire("Success!", "You are now logged in", "success").then(
        onSwalOkClick
      );
      props.setLoginState((prevState) => {
        return !prevState;
      });
    };

    const onLoginError = (error) => {
      _logger("Error", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.errors[0],
      });
    };

    netUserService.userLogin(values).then(onLoginSuccess).catch(onLoginError);
    _logger("Submitting data", values);
  };

  const onVetCheckProfileSuccess = (response) => {
    if (response.item === false) {
      navigate(`/vet/initial/setup/add`);
    } else {
      navigate("/");
    }
  };
  const onVetCheckProfileError = (err) => {
    _logger(err);
  };
  return (
    <Fragment>
      <Row className="align-items-center justify-content-center g-0 min-vh-100">
        <Col lg={5} md={5} className="py-8 py-xl-0">
          <Card>
            <Card.Body className="p-6">
              <div className="mb-4">
                <Link to="/">
                  <Image src={Logo} className="mb-4" alt="" />
                </Link>
                <h1 className="mb-1 fw-bold">Sign in</h1>
                <span>
                  Don’t have an account?{" "}
                  <Link to="/users/register" className="ms-1">
                    Sign up
                  </Link>
                </span>
              </div>
              {/* Form */}
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                  rememberMe: false,
                }}
                enableReinitialize={true}
                onSubmit={onSubmit}
              >
                <Form>
                  <Row>
                    <Col lg={12} md={12} className="mb-3">
                      {/* Username or email */}
                      <label htmlFor="email">Email</label>
                      <Field
                        type="email"
                        placeholder="Email address here"
                        className="form-control"
                        name="email"
                      />
                    </Col>
                    <Col lg={12} md={12} className="mb-3">
                      {/* Password */}
                      <label htmlFor="password">Password</label>
                      <Field
                        type="password"
                        name="password"
                        placeholder="**************"
                        className="form-control"
                      />
                    </Col>
                    <Col lg={12} md={12} className="mb-3">
                      {/* Checkbox */}
                      <div className="d-md-flex justify-content-between align-items-center">
                        <div className="mb-3 mb-md-0">
                          <Field
                            type="checkbox"
                            name="rememberMe"
                            label="Remember me"
                            className="form-check-input"
                          />
                          <label
                            htmlFor="rememberMe"
                            className="form-check-label mx-2"
                          >
                            Remember me
                          </label>
                        </div>
                        <Link to="/authentication/forget-password">
                          Forgot your password?
                        </Link>
                      </div>
                    </Col>
                    <Col lg={12} md={12} className="mb-0 d-grid gap-2">
                      {/* Button */}
                      <Button variant="primary" type="submit">
                        Sign in
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Formik>
              <hr className="my-4" />
              <div className="mt-4 text-center">
                {/* Facebook */}
                <Link
                  to="#"
                  className="btn-social btn-social-outline btn-facebook"
                >
                  <i className="fab fa-facebook"></i>
                </Link>{" "}
                {/* Twitter */}
                <Link
                  to="#"
                  className="btn-social btn-social-outline btn-twitter"
                >
                  <i className="fab fa-twitter"></i>
                </Link>{" "}
                {/* LinkedIn */}
                <Link
                  to="#"
                  className="btn-social btn-social-outline btn-linkedin"
                >
                  <i className="fab fa-linkedin"></i>
                </Link>{" "}
                {/* GitHub */}
                <Link
                  to="#"
                  className="btn-social btn-social-outline btn-github"
                >
                  <i className="fab fa-github"></i>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default SignIn;

SignIn.propTypes = {
  setLoginState: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.number,
  }),
};
