import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlActors } from "../../endpoints";
import DisplayErrors from "../../utils/DisplayErrors";
import { convertActorToFormData } from "../../utils/formDataUtils";
import { actorCreationDTO } from "../actor.model.d";
import ActorForm from "../ActorForm";

export default function CreateActors() {
  const navigate=useNavigate()
  const [errors,setErrors]=useState<string[]>([])
  async function create(actor:actorCreationDTO){
    try{
      const formData = convertActorToFormData(actor);

      await axios({
          method: 'post',
          url: urlActors,
          data: formData,
          headers: {'Content-Type': 'multipart/form-data'}
      });
      navigate('/actors')
    }
    catch(error){
      if(error&&error.response){
        setErrors(error.response.data)
      }
    }
  }
  return (
    <>
      <h3>建立演員</h3>
      <DisplayErrors errors={errors}/>
      <ActorForm model={{name:'Abe',dateOfBirth:new Date("1998-07-26T00:00:00")}} onSubmit={async values=>await create(values)}></ActorForm>
    </>
  )
}
