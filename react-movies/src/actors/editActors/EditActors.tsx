import { urlActors } from "../../endpoints";
import EditEntity from "../../utils/EditEntity";
import { convertActorToFormData } from "../../utils/formDataUtils";
import { actorCreationDTO,actorDTO } from "../actor.model.d";
import ActorForm from "../ActorForm";

export default function EditActors() {
  function transform(actor:actorDTO):actorCreationDTO{
    return{
      name:actor.name,
      pictureURL:actor.picture,
      biography:actor.biography,
      dateOfBirth:new Date(actor.dateOfBirth)
    }
  }
  return (
    <>
      <EditEntity<actorCreationDTO,actorDTO> url={urlActors} indexURL="/actors" entityName="編輯演員" transformFormData={convertActorToFormData} transform={transform}>
        {(entity,edit)=><ActorForm model={entity} onSubmit={async values=>await edit(values)}/>}
      </EditEntity>
    </>
  );
}
