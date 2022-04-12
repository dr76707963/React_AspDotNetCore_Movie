import * as Yup from 'yup'
import { Form, Formik, FormikHelpers } from 'formik';
import { Link } from 'react-router-dom';
import Button from '../utils/Button';
import TextField from '../utils/form/TextField';
import {genreCreationDTO} from './genre.model.d';

export default function GenresForm(props:GenresFromProps) {
  return (
    <Formik
    initialValues={props.model}
    onSubmit={props.onSubmit}
    validationSchema={Yup.object({
      name:Yup.string().required("此欄位必填").max(50,'最大長度為50').firstLetterUppercase()
    })}
  >
    {(formikProps)=>(
    <Form>
      <TextField field="name" displayName="電影類型"/>
      <Button disabled={formikProps.isSubmitting} type="submit" children={"確定"}/>
      <Link
        className="btn btn-secondary"
        to="/genres"  
        children={"取消"}
      />
    </Form>
    )}
  </Formik>
  )
}
interface GenresFromProps{
    model:genreCreationDTO
    onSubmit(values:genreCreationDTO,action:FormikHelpers<genreCreationDTO>):void
}