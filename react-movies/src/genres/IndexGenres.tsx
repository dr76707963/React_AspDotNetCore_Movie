import { urlGenres } from "../endpoints";
import IndexEntity from "../utils/IndexEntity";
import { genreDTO } from "./genre.model.d";

export default function IndexGenres() {
  return (
    <>
      <IndexEntity<genreDTO>
        url={urlGenres}
        title="電影類型"
        createURL="/genres/create"
        entityName="創建"
      >
        {(genres, buttons) => (
          <>
            <thead>
              <tr>
                <th></th>
                <th>電影類型</th>
              </tr>
            </thead>
            <tbody>
              {genres?.map((genre) => (
                <tr key={genre.id}>
                  <td>{buttons(`/genres/edit/${genre.id}`, genre.id)}</td>
                  <td>{genre.name}</td>
                </tr>
              ))}
            </tbody>
          </>
        )}
      </IndexEntity>
    </>
  );
}
