import { Dispatch, useEffect } from 'react'

import { GeneralActionType, getCourses, setError, setLoading } from '@/app/store/reducer'

export const useFetchCourses = (dispatch: Dispatch<GeneralActionType>) => {
  useEffect(() => {
    fetch('https://logiclike.com/docs/courses.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Что-то пошло не так!!!! Неуспешный запрос`)
        }

        return response.json()
      })
      .then(data => {
        dispatch(getCourses(data))
      })
      .catch((error: Error) => dispatch(setError(error.message)))
      .finally(() => dispatch(setLoading(false)))
  }, [])
}
