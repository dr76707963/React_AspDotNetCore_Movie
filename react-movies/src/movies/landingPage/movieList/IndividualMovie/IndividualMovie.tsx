import axios from "axios";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { urlMovies } from "../../../../endpoints";
import AlertContext from "../../../../utils/AlertContext";
import Button from "../../../../utils/Button";
import customConfirm from "../../../../utils/customConfirm";
import { movieDTO } from "../../../movies.model";
import css from "./IndividualMovie.module.css";
export default function IndividualMovie(props: movieDTO) {
  const buildLink = () => `/movies/${props.id}`;
  const customAlert=useContext(AlertContext);
  function deleteMovie(){
    axios.delete(`${urlMovies}/${props.id}`)
    .then(()=>{
      customAlert()
    })
  }
  return (
    <div className={css.div}>
      <Link to={buildLink()}>
        <img alt="Poster" src={props.poster} />
      </Link>
      <p>
        <Link to={buildLink()}>{props.title}</Link>
      </p>
      <div>
        <Link style={{marginRight:'1rem'}} className='btn btn-info' to={`/movies/edit/${props.id}`}>編輯</Link>
        <Button className="btn btn-danger" onClick={()=>customConfirm(()=>deleteMovie())} children="刪除"/>
      </div>
    </div>
  );
}