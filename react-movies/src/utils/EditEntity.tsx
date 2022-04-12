import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import DisplayErrors from "./DisplayErrors";
import Loading from "./Loading";

export default function EditEntity<TCreation,TRead>(props:editEntityProps<TCreation,TRead>) {
  const  params  = useParams();
  const navigate=useNavigate()
  const [entity,setEntity]=useState<TCreation>();
  const [errors,setErrors]=useState<string[]>([])
  useEffect(()=>{
    axios.get(`${props.url}/${params.id}`).then((response:AxiosResponse<TRead>)=>{
        setEntity(props.transform(response.data));
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[params])
  async function edit(entityToEdit:TCreation){
    try{
      if(props.transformFormData){
        const formData=props.transformFormData(entityToEdit);
        await axios({
          method:'put',
          url:`${props.url}/${params.id}`,
          data:formData,
          headers:{"Content-Type":"multipart/form-data"}
        })
      }
      else{
        await axios.put(`${props.url}/${params.id}`,entityToEdit)
      }
      navigate(props.indexURL)
    }
    catch(error){
      if(error&&error.response){
        setErrors(error.response.data);
      }
    }
  }
  return (
    <>
    <h3>{props.entityName}</h3>
    <DisplayErrors errors={errors}/>
    {entity?props.children(entity,edit):<Loading/>}
  </>
  )
}
interface editEntityProps<TCreation, TRead> {
    url: string;
    entityName: string;
    indexURL: string;
    transform(entity: TRead): TCreation;
    transformFormData?(model: TCreation): FormData;
    children(entity: TCreation, edit: (entity: TCreation) => void): ReactElement;
}

EditEntity.defaultProps = {
    transform: (entity: any) => entity
}