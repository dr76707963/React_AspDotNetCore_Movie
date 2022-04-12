import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import Button from "../utils/Button";
import TextField from "../utils/form/TextField";
import { actorCreationDTO } from "./actor.model.d";
import * as Yup from 'yup'
import DateField from "../utils/form/DateField";
import ImageField from "../utils/form/ImageField";
import MarkdownField from "../utils/form/MarkdownField";
export default function ActorForm(props: actorFormProps) {
  return (
      <Formik
          initialValues={props.model}
          onSubmit={props.onSubmit}
          validationSchema={Yup.object({
              name: Yup.string().required('此欄位必填').firstLetterUppercase(),
              dateOfBirth: Yup.date().nullable().required('此欄位必填')
          })}
      >
          {(formikProps) => (
              <Form>
                  <TextField displayName="名字" field="name" />
                  <DateField displayName="生日" field="dateOfBirth" />
                  <ImageField displayName="照片" field="picture" 
                  imageURL={props.model.pictureURL} />
                  <MarkdownField displayName="介紹" field="biography" />

                  <Button disabled={formikProps.isSubmitting}
                      type="submit"
                  >確定</Button>
                  <Link to="/actors" className="btn btn-secondary">取消</Link>
              </Form>
          )}
      </Formik>
  )
}

interface actorFormProps {
  model: actorCreationDTO;
  onSubmit(values: actorCreationDTO, action: FormikHelpers<actorCreationDTO>): void;
}