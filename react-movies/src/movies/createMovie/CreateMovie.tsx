import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlMovies } from "../../endpoints";
import { genreDTO } from "../../genres/genre.model.d";
import { movieTheaterDTO } from "../../movieTheaters/movieTheater.model.d";
import DisplayErrors from "../../utils/DisplayErrors";
import { convertMovieToFormData } from "../../utils/formDataUtils";
import Loading from "../../utils/Loading";
import MovieForm from "../MovieForm";
import { movieCreationDTO, moviesPostGetDTO } from "../movies.model";

export default function CreateMovie() {
  const navigate= useNavigate()
  const [nonSelectedGenres, setNonSelectedGenres] = useState<genreDTO[]>([]);
  const [nonSelectedMovieTheaters, setNonSelectedMovieTheaters] = useState<movieTheaterDTO[]>([]);
  const [errors,setErrors]=useState<string[]>()
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${urlMovies}/postget`)
      .then((response: AxiosResponse<moviesPostGetDTO>) => {
        setNonSelectedGenres(response.data.genres);
        setNonSelectedMovieTheaters(response.data.movieTheaters);
        setLoading(false);
      });
  },[]);
  
  async function create(movie:movieCreationDTO){
    try{
      const formData=convertMovieToFormData(movie)
      const response=await axios({
        method:'post',
        url:urlMovies,
        data:formData,
        headers:{"Content-Type":"multipart/form-data"}
      })
      navigate(`/movie/${response.data}`)
    }
    catch(error){
      setErrors(error.response.data)
    }
  }
  return (
    <>
      <h3>建立電影</h3>
      <DisplayErrors errors={errors}/>
      {loading ? (
        <Loading />
      ) : (
        <MovieForm
          model={{ title: "", inTheaters: false, trailer: "" }}
          onSubmit={async values => await create(values)}
          nonSelectedGenres={nonSelectedGenres}
          nonSelectedMovieTheaters={nonSelectedMovieTheaters}
          selectedMovieTheaters={[]}
          selectedGenres={[]}
          selectedActors={[]}
        />
      )}
    </>
  );
}
