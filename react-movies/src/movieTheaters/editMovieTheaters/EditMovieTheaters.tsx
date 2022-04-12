import { urlMovieTheaters } from "../../endpoints";
import EditEntity from "../../utils/EditEntity";
import { movieTheaterCreationDTO, movieTheaterDTO } from "../movieTheater.model.d";
import MovieTheaterForm from "../MovieTheaterForm";

export default function EditMovieTheaters() {
  return (
    <>
    <EditEntity<movieTheaterCreationDTO,movieTheaterDTO> url={urlMovieTheaters} indexURL="/movietheaters" entityName="編輯影城">
      {(entity,edit)=><MovieTheaterForm model={entity} onSubmit={async values=>await edit(values)}></MovieTheaterForm>}
    </EditEntity>
    </>
  )
}
