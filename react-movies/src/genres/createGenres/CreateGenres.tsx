import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlGenres } from "../../endpoints";
import DisplayErrors from "../../utils/DisplayErrors";
import { genreCreationDTO } from "../genre.model.d";
import GenreForm from "../GenreForm";

export default function CreateGenres() {
  const navigate=useNavigate()
  const [errors,setErrors]=useState<string[]>([])
  async function create(genre:genreCreationDTO){
    try{
      await axios.post(urlGenres,genre)
      navigate("/genres")
    }
    catch(error){
        if(error&&error.response){
          setErrors(error.response.data)
        }
    }
  }
  return (
    <>
      <h3>建立電影類型</h3>
      <DisplayErrors errors={errors}/>
      <GenreForm model={{name:""}}  onSubmit={async value => {
        await create(value)
      }}/>
    </>
  );
}
