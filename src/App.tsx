import { useEffect, useState } from 'react'

import clsx from 'clsx'

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
    <div className={s.wrapper}>
      <ul className={s.sidebar}>
        <li
          className={clsx(s.courseTitle, filterCourses === '' && s.active)}
          onClick={() => filterHandler('')}
        >
          Все темы
        </li>
        <li
          className={clsx(s.courseTitle, filterCourses === coursesName.logic && s.active)}
          onClick={() => filterHandler(coursesName.logic)}
        >
          Логика и мышление
        </li>
        <li
          className={clsx(s.courseTitle, filterCourses === coursesName.mystery && s.active)}
          onClick={() => filterHandler(coursesName.mystery)}
        >
          Загадки
        </li>
        <li
          className={clsx(s.courseTitle, filterCourses === coursesName.puzzles && s.active)}
          onClick={() => filterHandler(coursesName.puzzles)}
        >
          Головоломки
        </li>
        <li
          className={clsx(s.courseTitle, filterCourses === coursesName.world && s.active)}
          onClick={() => filterHandler(coursesName.world)}
        >
          Окружающий мир
        </li>
        <li
          className={clsx(s.courseTitle, filterCourses === coursesName.chess && s.active)}
          onClick={() => filterHandler(coursesName.chess)}
        >
          Шахматы
        </li>
        <li
          className={clsx(s.courseTitle, filterCourses === coursesName.countries && s.active)}
          onClick={() => filterHandler(coursesName.countries)}
        >
          Страны и столицы
        </li>
      </ul>
      <div className={s.content}>{mappedCourses}</div>
    </div>
  )
}
