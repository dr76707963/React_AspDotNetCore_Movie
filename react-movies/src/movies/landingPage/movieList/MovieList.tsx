import { nanoid } from "nanoid";
import IndividualMovie from "./IndividualMovie/IndividualMovie";
import { movieDTO } from "../../movies.model";
import css from "./MovieList.module.css";
import GenericList from "../../../utils/GenericList";

export default function MovieList(props: movieListProps) {
  return (
    <GenericList list={props.movies}>
      <div className={css.div}>
        {props.movies?.map((movie) => {
          return <IndividualMovie {...movie} key={nanoid()} />;
        })}
      </div>
    </GenericList>
  );
}
interface movieListProps {
  movies?: movieDTO[];
}