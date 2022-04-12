import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlMovieTheaters } from "../../endpoints";
import DisplayErrors from "../../utils/DisplayErrors";
import { movieTheaterCreationDTO } from "../movieTheater.model.d";
import MovieTheaterForm from "../MovieTheaterForm";
export default function CreateMovieTheaters() {
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  async function create(movieTheater: movieTheaterCreationDTO) {
    try {
      await axios.post(urlMovieTheaters, movieTheater);
      navigate("/movietheaters");
    } catch (error) {
      if (error && error.response) {
        setErrors(error.response.data);
      }
    }
  }
  return (
    <>
      <DisplayErrors errors={errors} />
      <h3>建立影城</h3>
      <MovieTheaterForm
        model={{ name: "" }}
        onSubmit={async (values) => await create(values)}
      />
    </>
  );
}
