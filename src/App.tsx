import { useReducer , useEffect, useMemo} from 'react'
import Form from './components/Form'
import { activityReducer, initialState } from './reducers/activity-reducer'
import ActivityList from './components/ActivityList';
import CalorieTraker from './components/CalorieTraker';

function App() {
  const [state, dispatch] = useReducer(activityReducer ,initialState)

  useEffect(()=>{
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  const canRestarApp = () => useMemo(()=> state.activities.length , [state.activities])

  return (
    < >
      <section className=' bg-lime-600'>
      <header className="bg-gray-800 py-5">
        <div className="max-w-5xl mx-auto flex justify-between">
          <h1 className="text-center text-lg font-bold text-white uppercase">
            Contador de Calorias
          </h1>

          <button className='bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm      disabled:opacity-10'
          disabled= {!canRestarApp()}
          onClick={()=> dispatch({type : 'restar-app'})}
          >
           Reiniciar APP
          </button>

        </div>
      </header>
      <section className="px-5 py-10 ">
        <div className="max-w-5xl mx-auto">
          <Form 
          dispatch={dispatch} 
          state = {state}/>
        </div>
      </section>

      <section className='bg-gray-800 py-10'>
        <div className="max-w-5xl mx-auto">
          <CalorieTraker 
          activities = {state.activities}
         />
        </div>
      </section>

      <section className='p-10 mx-auto max-w-4xl'>
        <ActivityList
        activities = {state.activities}
        dispatch = {dispatch}
        />
      </section>
      </section>
    </>
  );
}

export default App;
