import { urlMovieTheaters } from "../endpoints";
import IndexEntity from "../utils/IndexEntity";
import { movieTheaterDTO } from "./movieTheater.model.d";

export default function IndexMovieTheaters() {
  return (
    <>
      <IndexEntity<movieTheaterDTO> url={urlMovieTheaters} createURL="/movietheaters/create" title="影城" entityName="建立">
      {(entities,buttons)=>
      <>
      <thead>
        <tr>
          <th></th>
          <th>影城</th>
        </tr>
      </thead>
      <tbody>
        {entities?.map(entity=><tr key={entity.id}>
          <td>
            {buttons(`/movietheaters/edit/${entity.id}`,entity.id)}
          </td>
          <td>
            {entity.name}
          </td>
        </tr>)}
      </tbody>
      </>}
      </IndexEntity>
    </>
  )
}
