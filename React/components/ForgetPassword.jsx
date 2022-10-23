import React from "react";
import { Link } from "react-router-dom";
import { Col, Row, Card, Form, Button, Image } from "react-bootstrap";
import Logo from "assets/images/logos/MiVet-Logo-Wordmark.png";
import { Formik } from "formik";
import { forgetPasswordSchema } from "schemas/forgetPasswordSchema";
import netUserService from "services/userService";
import debug from "sabio-debug";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const _logger = debug.extend("ForgetPassword");

const ForgetPassword = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
  };

  const onSubmit = (values) => {
    netUserService
      .sendResetPasswordEmail(values.email)
      .then(onSendResetPasswordEmailSuccess)
      .catch(onSendResetPasswordEmailError);
  };

  const onSendResetPasswordEmailSuccess = (response) => {
    _logger(response);
    Swal.fire("Success!", "Reset Password Email Sent", "success");
    navigate("/users/login");
  };

  const onSendResetPasswordEmailError = (error) => {
    _logger(error);
    Swal.fire("Success!", "Reset Password Email Sent", "success");
    navigate("/users/login");
  };
  return (
    <React.Fragment>
      <div className="d-flex flex-column container">
        <Row className="align-items-center justify-content-center g-0 min-vh-100">
          <Col lg={5} md={5} className="py-8 py-xl-0">
            <Card>
              <Card.Body className="p-6">
                <div className="mb-4">
                  <Link to="/">
                    <Image
                      src={Logo}
                      className="mb-4"
                      alt="logo"
                      style={{ width: "100px" }}
                    />
                  </Link>
                  <h1 className="mb-1 fw-bold">Forgot Password</h1>
                  <span>Fill the form to reset your password.</span>
                </div>
                <Formik
                  validationSchema={forgetPasswordSchema}
                  onSubmit={onSubmit}
                  initialValues={initialValues}
                >
                  {({
                    handleSubmit,
                    handleChange,
                    values,
                    touched,
                    errors,
                  }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                      <Row>
                        <Col lg={12} md={12} className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            isInvalid={touched.email && !!errors.email}
                            placeholder="Enter your email"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.email}
                          </Form.Control.Feedback>
                        </Col>
                        <Col lg={12} md={12} className="mb-3 d-grid gap-2">
                          <Button type="submit">Send Reset Link</Button>
                        </Col>
                      </Row>
                      <span>
                        Return to <Link to="/users/login">Sign in</Link>
                      </span>
                    </Form>
                  )}
                </Formik>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default ForgetPassword;
