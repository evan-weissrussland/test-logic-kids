import { useEffect, useState } from 'react'

import { Cours } from '@/app/App'

export const useFetchCourses = (setIsLoading: (v: boolean) => void) => {
  const [courses, setCourses] = useState<Cours[] | undefined>(undefined)

  useEffect(() => {
    fetch('https://logiclike.com/docs/courses.json')
      .then(response => {
        return response.json()
      })
      .then(data => {
        setCourses(data)
        setIsLoading(false)
      })
  }, [])

  return courses
}
