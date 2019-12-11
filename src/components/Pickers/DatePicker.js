import React from 'react';
import PropTypes from 'prop-types';
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import  DateFnsUtils  from "@date-io/date-fns";

function CustomDatePicker(props) {
  const { field, form, ...rest } = props;
  const error = form.touched[field.name] && form.errors[field.name];
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} >
    <DatePicker
      {...field}
      onChange={(e) => form.setFieldValue(field.name, e)}
      {...rest}
      error={error}
      helperText={error}
    />
   </MuiPickersUtilsProvider>
  );
}

DatePicker.propTypes = {
  field: PropTypes.objectOf({
    name: PropTypes.string,
  }).isRequired,
  form: PropTypes.objectOf({
    touched: PropTypes.instanceOf(Array),
    errors: PropTypes.instanceOf(Array),
  }).isRequired,
};

export default CustomDatePicker;