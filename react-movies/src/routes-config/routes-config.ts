import CreateActors from "../actors/createActors/CreateActors";
import EditActors from "../actors/editActors/EditActors";
import IndexActors from "../actors/IndexActors";
import CreateGenres from "../genres/createGenres/CreateGenres";
import EditGenres from "../genres/editGenres/EditGenres";
import IndexGenres from "../genres/IndexGenres";
import CreateMovies from "../movies/createMovie/CreateMovie";
import EditMovies from "../movies/editMovie/EditMovie";
import FilterMovies from "../movies/filterMovies/FilterMovies";
import LandingPage from "../movies/landingPage/LandingPage";
import MovieDetails from "../movies/MovieDetails";
import CreateMovieTheaters from "../movieTheaters/createMovieTheaters/CreateMovieTheaters";
import EditMovieTheaters from "../movieTheaters/editMovieTheaters/EditMovieTheaters";
import IndexMovieTheaters from "../movieTheaters/IndexMovieTheaters";

const routes = [
  {
    path: "/genres/*",
    components: IndexGenres,
  },
  {
    path: "*",
    components: LandingPage,
  },
  {
    path: "/genres/edit/:id",
    components: EditGenres,
  },
  {
    path: "/genres/create",
    components: CreateGenres,
  },
  {
    path: "/movies/filter",
    components: FilterMovies,
  },
  {
    path: "/movies/:id",
    components: MovieDetails,
  },
  {
    path: "/movies/edit/:id",
    components: EditMovies,
  },
  {
    path: "/movies/create",
    components: CreateMovies,
  },
  {
    path: "/actors/*",
    components: IndexActors,
  },
  {
    path: "/actors/edit/:id",
    components: EditActors,
  },
  {
    path: "/actors/create",
    components: CreateActors,
  },
  {
    path: "/movietheaters/*",
    components: IndexMovieTheaters,
  },
  {
    path: "/movietheaters/edit/:id",
    components: EditMovieTheaters,
  },
  {
    path: "/movietheaters/create",
    components: CreateMovieTheaters,
  },
];
export default routes;
