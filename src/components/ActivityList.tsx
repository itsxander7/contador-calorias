import { Dispatch, useMemo } from "react"
import type { Activity } from "../types"
import { categories } from "../data/categories"
import { PencilSquareIcon, XCircleIcon} from '@heroicons/react/24/outline'
import { activityActions } from "../reducers/activity-reducer"

type ActivityListProps = {
  activities : Activity[],
  dispatch : Dispatch<activityActions>
}

export default function Activity({activities, dispatch} : ActivityListProps) {
 
  const categoryName = useMemo(()=> (category: Activity['category'])=> 
    categories.map(cat => cat.id === category ? cat.name : '')
    ,[activities])
   const isEmptyActivities = useMemo(()=> activities.length === 0 , [activities])
  return (
    
    <>
    <h2 className="text-4xl font-bold  text-gray-700 text-center py-3"> Comida y Actividades
    </h2>
    { isEmptyActivities ? <p className="text-center my-5">Aun no hay actividades... </p> :     
      activities.map(activity =>( 
      <div key={activity.id} className="px-5 py-10 bg-white flex justify-between shadow">
          <div className=" space-y-2 relative">
            <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${activity.category === 1 ? 'bg-orange-400' : 'bg-lemon-500'}`}>
              {categoryName (+activity.category)}</p>
            <p className="text-2xl font-bold pt-5">{activity.name}</p>
            <p className= {`font-black text-4xl ${activity.category === 1 ? 'text-orange-400' : ' text-lime-500'}`}> {activity.calories}
              {' '}
              <span>Calorias</span>
            </p>
          </div>

          <div className="flex gap-5 items-center">
            <button 
            onClick={()=> dispatch({type : "set-activeId", payload : {id : activity.id }})}
            >
              <PencilSquareIcon
              className="h-8 w-8 text-gray-800"/>

            </button>
            <button
            onClick={()=> dispatch({type : "delete-activy", payload : {id : activity.id }})}
            >
              <XCircleIcon
              className="h-8 w-8 text-red-800"/>
            </button>

          </div>
      </div>
    ) )}
    </>
  )
}
