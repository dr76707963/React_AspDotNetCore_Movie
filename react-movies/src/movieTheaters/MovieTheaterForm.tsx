import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import * as Yup from 'yup'
import { movieTheaterCreationDTO } from "./movieTheater.model.d";
import Button from "../utils/Button";
import TextField from "../utils/form/TextField";
import MapField from "../utils/form/MapField";
import coordinateDTO from "../utils/coordinates.d.model";
export default function MovieTheaterForm(props:movieTheaterFormProps) {
    function transformCoordinates(): coordinateDTO[] | undefined {
        if (props.model.latitude && props.model.longitude){
            const response: coordinateDTO = {lat: props.model.latitude,
            lng: props.model.longitude}
            return [response];
        }
        
        return undefined;
    }

    return (
        <Formik
            initialValues={props.model}
            onSubmit={props.onSubmit}
            validationSchema={Yup.object({
                name: Yup.string().required('此欄位必填').firstLetterUppercase()
            })}
        >
            {(formikProps) => (
                <Form>
                    <TextField displayName="影城名稱" field="name" />

                    <div style={{marginBottom: '1rem'}}>
                        <MapField latField="latitude" lngField="longitude" 
                         coordinates={transformCoordinates()}
                        />
                    </div>

                    <Button disabled={formikProps.isSubmitting} type="submit">
                        確定
                    </Button>
                    <Link className="btn btn-secondary" to="/movietheaters">取消</Link>
                </Form>
            )}
        </Formik>
    )
}
interface movieTheaterFormProps{
    model:movieTheaterCreationDTO
    onSubmit(values:movieTheaterCreationDTO,actions:FormikHelpers<movieTheaterCreationDTO>):void
}