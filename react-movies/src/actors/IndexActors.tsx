import { urlActors } from "../endpoints";
import IndexEntity from "../utils/IndexEntity";
import {actorDTO} from './actor.model.d'
export default function IndexActors() {
  return (
    <>
      <IndexEntity<actorDTO> url={urlActors} createURL={"/actors/create"} title="演員" entityName="建立">
        {(actors,buttons)=>
        <>
          <thead>
            <tr>
              <td></td>
              <td>演員</td>
            </tr>
          </thead>
          <tbody>
              {actors?.map(actor=><tr key={actor.id}>
                <td>
                  {buttons(`/actors/edit/${actor.id}`,actor.id)}
                </td>
                <td>
                  {actor.name}
                </td>
              </tr>)}
          </tbody>
        </>}
      </IndexEntity>
    </>
  );
}
