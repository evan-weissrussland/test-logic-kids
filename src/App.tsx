import { useEffect, useState } from 'react'

import s from './App.module.scss'

const useFilterCourses = (courses: Cours[] | undefined, filter: '' | FilterType) => {
  if (!filter) {
    return courses
  }

  return courses?.filter(cours => {
    if (cours.tags.includes(filter)) {
      return cours
    }
  })
}

type Cours = {
  bgColor: string
  id: string
  image: string
  name: string
  tags: string[]
}

const coursesName = {
  chess: 'Шахматы',
  countries: 'Страны и столицы',
  logic: 'Логика и мышление',
  mystery: 'Загадки',
  puzzles: 'Головоломки',
  world: 'Окружающий мир',
} as const

type FilterType = (typeof coursesName)[keyof typeof coursesName]

export function App() {
  const [courses, setCourses] = useState<Cours[] | undefined>(undefined)
  const [filterCourses, setFilterCourses] = useState<'' | FilterType>('')
  const [isLoading, setIsLoading] = useState(true)

  const filterHandler = (nameCourse: '' | FilterType) => {
    setFilterCourses(nameCourse)
  }

  const filtredCourses = useFilterCourses(courses, filterCourses)

  const mappedCourses = filtredCourses?.map(f => (
    <div className={s.cours} key={f.id}>
      <div className={s.image} style={{ background: f.bgColor }}>
        <img alt={'image'} src={f.image} />
      </div>
      <span className={s.titleCourse}>{f.name}</span>
    </div>
  ))

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

  if (isLoading) {
    return <div>Loader...</div>
  }

  return (
    <main className={s.main}>
      <aside className={s.sidebar}>
        <button
          onClick={() => filterHandler('')}
          style={{ background: filterCourses === '' ? 'blue' : '' }}
        >
          Все темы
        </button>
        <button
          onClick={() => filterHandler(coursesName.logic)}
          style={{ background: filterCourses === coursesName.logic ? 'blue' : '' }}
        >
          Логика и мышление
        </button>
        <button
          onClick={() => filterHandler(coursesName.mystery)}
          style={{ background: filterCourses === coursesName.mystery ? 'blue' : '' }}
        >
          Загадки
        </button>
        <button
          onClick={() => filterHandler(coursesName.puzzles)}
          style={{ background: filterCourses === coursesName.puzzles ? 'blue' : '' }}
        >
          Головоломки
        </button>
        <button
          onClick={() => filterHandler(coursesName.world)}
          style={{ background: filterCourses === coursesName.world ? 'blue' : '' }}
        >
          Окружающий мир
        </button>
        <button
          onClick={() => filterHandler(coursesName.chess)}
          style={{ background: filterCourses === coursesName.chess ? 'blue' : '' }}
        >
          Шахматы
        </button>
        <button
          onClick={() => filterHandler(coursesName.countries)}
          style={{ background: filterCourses === coursesName.countries ? 'blue' : '' }}
        >
          Страны и столицы
        </button>
      </aside>
      <div className={s.content}>{mappedCourses}</div>
    </main>
  )
}
