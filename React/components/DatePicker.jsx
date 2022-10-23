import React, { useState } from "react";
import PropTypes from "prop-types";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import debug from "sabio-debug";
const _logger = debug.extend("DatePicker");

function DatePicker(props) {
  const [range, setRange] = useState([
    {
      startDate: props.form.initialValues.startDate,
      endDate: props.form.initialValues.endDate,
      key: "selection",
    },
  ]);
  const onChange = (item) => {
    props.form.setFieldValue("startDate", item.selection.startDate);
    props.form.setFieldValue("endDate", item.selection.endDate);
    _logger(item);

    setRange((prevState) => {
      const pd = [...prevState];
      const newValues = {
        startDate: item.selection.startDate,
        endDate: item.selection.endDate,
        key: "selection",
      };
      pd[0] = newValues;

      return pd;
    });
  };
  return (
    <DateRange
      className={props.className}
      editableDateInputs={false}
      moveRangeOnFirstSelection={false}
      ranges={range}
      onChange={onChange}
      maxDate={props.form.initialValues.maxDate}
      minDate={props.form.initialValues.minDate}
    />
  );
}

DatePicker.propTypes = {
  form: PropTypes.shape({
    setFieldValue: PropTypes.func,
    initialValues: PropTypes.shape({
      startDate: PropTypes.instanceOf(Date),
      endDate: PropTypes.instanceOf(Date),
      minDate: PropTypes.instanceOf(Date),
      maxDate: PropTypes.instanceOf(Date),
    }),
  }),
  className: PropTypes.string,
};

export default DatePicker;
