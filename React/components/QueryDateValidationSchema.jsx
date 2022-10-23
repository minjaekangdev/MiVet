import * as Yup from "yup";

const today = new Date();

const validationSchema = () => {
  return Yup.object().shape({
    startDate: Yup.date("Must be a valid date; format yyyy-mm-dd")
      .min("2022-10-01", "No data prior to Oct 1st, 2022")
      .max(today, "Date is too far ahead.")
      .required("Must select a start date"),
    endDate: Yup.date()
      .min(Yup.ref("startDate"), "End date can't be before Start date")
      .max(today, "Cannot see into the future")
      .required(),
  });
};

export default validationSchema;
