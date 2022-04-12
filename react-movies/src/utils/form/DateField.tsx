import { useFormikContext } from "formik";

export default function DateField(props: dateFieldProps) {
  const { values, validateForm, touched, errors } = useFormikContext<any>();
  return (
    <div className="mb-3">
      <label htmlFor={props.field}>
        {props.displayName}
        <input
          type="date"
          className="form-control"
          id={props.field}
          name={props.field}
          defaultValue={values[props.field]?.toLocaleDateString("en-CA")}
          onChange={(e) => {
            const date = new Date(e.currentTarget.value + "T00:00:00");
            values[props.field] = date;
            validateForm();
          }}
        />
        {touched[props.field] && errors[props.field] ? (
          <div className="text-daanger">{errors[props.field]?.toString()}</div>
        ) : null}
      </label>
    </div>
  );
}
interface dateFieldProps {
  field: string;
  displayName: string;
}
