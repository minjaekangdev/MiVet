import * as Yup from "yup";

const validationSchema = () => {
  return Yup.object().shape({
    email: Yup.string().email().min(2).max(255).required("Required"),
    password: Yup.string()
      .min(8)
      .max(100)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      )
      .required("Required"),
    passwordConfirm: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
    firstName: Yup.string().min(1).max(100).required("Required"),
    lastName: Yup.string().min(1).max(100).required("Required"),
    mi: Yup.string().min(0).max(2),
    title: Yup.string().min(0).max(10),
    termsAgree: Yup.boolean().oneOf(
      [true],
      "You must agree to the terms and conditions."
    ),
  });
};

export default validationSchema;
