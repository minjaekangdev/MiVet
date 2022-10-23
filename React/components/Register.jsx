import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Col, Row, Card, Button, Image } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import validationSchema from "./RegisterValidationSchema";
import debug from "sabio-debug";
import { netUserService } from "services/userService";
import Logo from "assets/images/logos/MiVet-Logo2.jpg";

const _logger = debug.extend("UserRegister");

const SignUp = () => {
  const navigate = useNavigate();

  const onSubmitClick = (values) => {
    const onNewUserSuccess = (response) => {
      _logger("Success", response);
      Swal.fire(
        "Success!",
        "Please check your email for a confirmation letter.",
        "success"
      );
      navigate("/users/login");
    };
    const onNewUserError = (error) => {
      _logger("Error", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    };

    netUserService.newUser(values).then(onNewUserSuccess).catch(onNewUserError);
    _logger("Submitting data", values);
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
                <h1 className="mb-1 fw-bold">Sign up</h1>
                <span>
                  Already have an account?{" "}
                  <Link to="/users/login" className="ms-1">
                    Sign in
                  </Link>
                </span>
              </div>
              {/* Form */}
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                  passwordConfirm: "",
                  firstName: "",
                  lastName: "",
                  mi: "",
                  title: "",
                  termsAgree: false,
                  avatarUrl: "",
                }}
                enableReinitialize={true}
                onSubmit={onSubmitClick}
                validationSchema={validationSchema}
              >
                <Form>
                  <Row>
                    <Col lg={12} md={12} className="mb-3">
                      {/* First Name */}
                      <label htmlFor="email">
                        First Name{" "}
                        <ErrorMessage
                          name="firstName"
                          component={"span"}
                          className="text-danger"
                        />
                      </label>
                      <Field
                        type="text"
                        name="firstName"
                        placeholder="Enter your first name"
                        className="form-control"
                        autoComplete="firstName"
                      />
                    </Col>
                    <Col lg={12} md={12} className="mb-3">
                      {/* Middle Name */}
                      <label htmlFor="mi">
                        Middle Name (Optional){" "}
                        <ErrorMessage
                          name="mi"
                          component={"span"}
                          className="text-danger"
                        />
                      </label>
                      <Field
                        type="text"
                        name="mi"
                        placeholder="Enter your middle name"
                        className="form-control"
                        autoComplete="mi"
                      />
                    </Col>
                    <Col lg={12} md={12} className="mb-3">
                      {/* Last Name */}
                      <label htmlFor="lastName">
                        Last Name{" "}
                        <ErrorMessage
                          name="lastName"
                          component={"span"}
                          className="text-danger"
                        />
                      </label>
                      <Field
                        type="text"
                        name="lastName"
                        placeholder="Enter your last name"
                        className="form-control"
                        autoComplete="lastName"
                      />
                    </Col>
                    <Col lg={12} md={12} className="mb-3">
                      {/* Title*/}
                      <label htmlFor="title">
                        Title (Optional){" "}
                        <ErrorMessage
                          name="title"
                          component={"span"}
                          className="text-danger"
                        />
                      </label>
                      <Field
                        type="text"
                        name="title"
                        placeholder="Dr."
                        className="form-control"
                        autoComplete="title"
                      />
                    </Col>
                    <Col lg={12} md={12} className="mb-3">
                      {/* Email */}
                      <label htmlFor="email">
                        Email{" "}
                        <ErrorMessage
                          name="email"
                          component={"span"}
                          className="text-danger"
                        />
                      </label>
                      <Field
                        type="text"
                        name="email"
                        placeholder="Enter your email"
                        className="form-control"
                        autoComplete="email"
                      />
                    </Col>
                    <Col lg={12} md={12} className="mb-3">
                      {/* Password */}
                      <label htmlFor="password">
                        Password{" "}
                        <ErrorMessage
                          name="password"
                          component={"span"}
                          className="text-danger"
                        />
                      </label>
                      <Field
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        className="form-control"
                        autoComplete="password"
                      />
                    </Col>
                    <Col lg={12} md={12} className="mb-3">
                      {/* Confirm Password */}
                      <label htmlFor="passwordConfirm">
                        Confirm Password{" "}
                        <ErrorMessage
                          name="passwordConfirm"
                          component={"span"}
                          className="text-danger"
                        />
                      </label>
                      <Field
                        type="password"
                        name="passwordConfirm"
                        placeholder="Confirm your password"
                        className="form-control"
                        autoComplete="lastName"
                      />
                    </Col>
                    <Col lg={12} md={12} className="mb-3">
                      {/* Avatar Url */}
                      <label htmlFor="avatarUrl">
                        Avatar Url (Optional){" "}
                        <ErrorMessage
                          name="avatarUrl"
                          component={"span"}
                          className="text-danger"
                        />
                      </label>
                      <Field
                        type="text"
                        name="avatarUrl"
                        placeholder="https://..."
                        className="form-control"
                        autoComplete="avatarUrl"
                      />
                    </Col>
                    <Col lg={12} md={12} className="mb-3">
                      {/* Checkbox */}

                      <Field type="checkbox" name="termsAgree" />
                      <label
                        htmlFor="termsAgree"
                        className="form-check-label mx-2"
                      >
                        I agree to the
                        <Link to="/pages/terms-and-conditions">
                          Terms of Service{" "}
                        </Link>{" "}
                        and{" "}
                        <Link to="/pages/terms-and-conditions">
                          Privacy Policy.
                        </Link>
                      </label>
                      <ErrorMessage
                        name="termsAgree"
                        component={"div"}
                        className="text-danger"
                      />
                    </Col>
                    <Col lg={12} md={12} className="mb-0 d-grid gap-2">
                      {/* Button */}
                      <Button variant="primary" type="submit">
                        Sign Up
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

export default SignUp;
