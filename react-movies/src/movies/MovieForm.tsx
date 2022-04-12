import { Form, Formik, FormikHelpers } from 'formik'
import { useState } from 'react'
import { movieCreationDTO } from './movies.model'
import * as Yup from 'yup'
import Button from '../utils/Button'
import { Link } from 'react-router-dom'
import TextField from '../utils/form/TextField'
import DateField from '../utils/form/DateField'
import ImageField from '../utils/form/ImageField'
import CheckBoxField from '../utils/form/CheckBoxField'
import MultipleSelector, { multipleSelectorModel } from '../utils/MultipleSelector'
import { genreDTO } from '../genres/genre.model.d'
import { movieTheaterDTO } from '../movieTheaters/movieTheater.model.d'
import TypeAheadActors from '../utils/TypeAheadActors'
import { actorMovieDTO } from '../actors/actor.model.d'
import MarkdownField from '../utils/form/MarkdownField'
export default function MovieForm(props:movieForm) {
    const [selectedGenres,setSelectedGenres]=useState(mapToModel(props.selectedGenres))
    const [nonSelectedGenres,setNonSelectedGenres]=useState(mapToModel(props.nonSelectedGenres))

    const [selectedMovieTheaters,setSelectedMovieTheaters]=useState(mapToModel(props.selectedMovieTheaters))
    const [nonSelectedMovieTheaters,setNonSelectedMovieTheaters]=useState(mapToModel(props.nonSelectedMovieTheaters))

    const [selectedActors,setSelectedActors]=useState(props.selectedActors)
    function mapToModel(items:{id:number,name:string}[]):multipleSelectorModel[]{
        return items.map(item=>{
            return {key:item.id,value:item.name}
        })
    }
  return (
      <Formik initialValues={props.model} onSubmit={(values,actions)=>{
          values.genresIds=selectedGenres.map(item=>item.key)
          values.movieTheatersIds=selectedMovieTheaters.map(item=>item.key)
          values.actors=selectedActors
        props.onSubmit(values,actions)}} validationSchema={Yup.object({
          title:Yup.string().required("此欄位必填").firstLetterUppercase()
      })}>
          {(formikProps)=>(
              <Form>
                  <TextField displayName='電影名稱' field='title'/>
                  <CheckBoxField displayName='上映中' field='inTheaters'/>
                  <TextField displayName='預告片' field='trailer'/>
                  <DateField displayName='上映日' field='releaseDate'/>
                  <ImageField displayName='電影海報' field='poster' imageURL={props.model.posterURL}/>
                  <MarkdownField displayName='大綱' field='summary'/>
                  <MultipleSelector displayName='電影類型' nonSelected={nonSelectedGenres} selected={selectedGenres} onChange={(selected,nonSelected)=>{setSelectedGenres(selected);setNonSelectedGenres(nonSelected)}}/>
                  <MultipleSelector displayName='上映影城' nonSelected={nonSelectedMovieTheaters} selected={selectedMovieTheaters} onChange={(selected,nonSelected)=>{setSelectedMovieTheaters(selected);setNonSelectedMovieTheaters(nonSelected)}}/>
                  <TypeAheadActors displayName='演員' actors={selectedActors} onAdd={actors=>{setSelectedActors(actors)}} listUI={(actor:actorMovieDTO)=><>{actor.name}/<input placeholder='角色名稱' type='text' value={actor.character} onChange={e=>{const index=selectedActors.findIndex(x=>x.id===actor.id); const actors=[...selectedActors]; actors[index].character=e.currentTarget.value; setSelectedActors(actors)}}/></>} onRemove={actor=>{const actors=selectedActors.filter(x=>x!==actor);setSelectedActors(actors)}}/>
                  <Button disabled={formikProps.isSubmitting} type={'submit'} children={"確定"}/>
                  <Link className='btn btn-secondary' to="/genres" children={"取消"}/>
              </Form>
          )}
      </Formik>
  )
}
interface movieForm{
    model: movieCreationDTO;
    onSubmit(values: movieCreationDTO, actions: FormikHelpers<movieCreationDTO>): void;
    selectedGenres: genreDTO[];
    nonSelectedGenres: genreDTO[];
    selectedMovieTheaters: movieTheaterDTO[];
    nonSelectedMovieTheaters: movieTheaterDTO[];
    selectedActors: actorMovieDTO[];
}