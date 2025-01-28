import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from 'react'
import {v4 as uuidv4} from 'uuid'
import { categories } from '../data/categories'
import type { Activity } from '../types'
import { activityActions, activityState , } from '../reducers/activity-reducer'

type FormProps = {
  dispatch: Dispatch<activityActions>,
  state : activityState
}

const initialState : Activity = {
  id : uuidv4(),
  category: 1,
  name: "",
  calories: 0,
}

export default function Form({dispatch, state}: FormProps) {
  const [activity, setActivity] = useState<Activity>(initialState)
  
  useEffect(()=>{
    if(state.activeId){
      const selectActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
      setActivity(selectActivity)
    }
  },[state.activeId])


  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const isNumberFiel = ["category", "calories"].includes(e.target.id);
    setActivity({
      ...activity,
      [e.target.id]: isNumberFiel ? +e.target.value : e.target.value,
    })
  }

  const isValidActivity = () => {
    const { name, calories } = activity
    return name.trim() !== "" && calories > 0
  }

  const handleSumit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch({type:'save-activity', payload :{newActivity : activity}})

    setActivity({
      ...initialState,
      id : uuidv4()
    })
  }

  return (
    <form
      className=" space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSumit}
    >
      <div className=" grid grid-cols-1 gap-3">
        <label htmlFor="category" className=" font-bold">
          Categorias:
        </label>
        <select
          className="border border-slate-500 p-2 rounded-lg min-w-full bg-slate-200 "
          id="category"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className=" grid grid-cols-1 gap-3">
        <label htmlFor="name" className=" font-bold">
          Actividad:
        </label>
        <input
          id="name"
          type="text"
          className="border border-slate-500 p-2 rounded-lg"
          placeholder="Ej. Comida, Cena, Desayuno, Gimnasio, Caminata, Saltos , etc..."
          value={activity.name}
          onChange={handleChange}
        />
      </div>

      <div className=" grid grid-cols-1 gap-3">
        <label htmlFor="calories" className=" font-bold">
          Calorias:
        </label>
        <input
          id="calories"
          type="number"
          className="border border-slate-500 p-2 rounded-lg"
          placeholder="Calorias. ej. 100 , 500, 800"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>
      <input
        type="submit"
        className=" bg-gray-800 hover:bg-gray900 w-full p-2 font-bold uppercase text-green-500 disabled:opacity-10"
        value={activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"}
        disabled={!isValidActivity()}
      />
    </form>
  )
}
