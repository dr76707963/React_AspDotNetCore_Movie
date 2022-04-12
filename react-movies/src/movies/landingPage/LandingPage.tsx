import MovieList from "./movieList/MovieList";
import { landingPageDTO } from "../movies.model";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { urlMovies } from "../../endpoints";
import AlertContext from "../../utils/AlertContext";
export default function LandingPage() {
  const [movies, setMovies] = useState<landingPageDTO>({});
  useEffect(() => {
    loadData()
  },[]);
  function loadData(){
    axios.get(urlMovies).then((response:AxiosResponse<landingPageDTO>)=>{
      setMovies(response.data)
    })
  }
  return (
    <>
    <AlertContext.Provider value={()=>{loadData()}}>
      <h3>現正熱映</h3>
      <MovieList movies={movies.inTheaters} />
      <h3>即將上映</h3>
      <MovieList movies={movies.upcomingReleases} />
    </AlertContext.Provider>
    </>
  );
}