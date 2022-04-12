import { urlGenres } from "../../endpoints";
import EditEntity from "../../utils/EditEntity";
import { genreCreationDTO, genreDTO } from "../genre.model.d";
import GenresForm from "../GenreForm";

export default function EditGenres() {
  return (
    <>
      <EditEntity<genreCreationDTO,genreDTO> url={urlGenres} entityName="編輯電影類型" indexURL="/genres">
      {(entity,edit)=>
      <GenresForm model={entity}  onSubmit={async value =>await edit(value)}/>
       }
      </EditEntity>
    </>
  );
}
