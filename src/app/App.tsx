import { useCallback, useState } from 'react'

import { useFetchCourses } from '@/assets/hooks/UseFetchCourses'
import { useFilterCourses } from '@/assets/hooks/UseFilterCourses'
import { CourseTitle } from '@/components/CourseTitle'
import { Sidebar } from '@/components/Sidebar'
import clsx from 'clsx'

import s from './App.module.scss'

export type Cours = {
  bgColor: string
  id: string
  image: string
  name: string
  tags: string[]
}

export const coursesName = {
  all: 'Все темы',
  chess: 'Шахматы',
  countries: 'Страны и столицы',
  logic: 'Логика и мышление',
  mystery: 'Загадки',
  puzzles: 'Головоломки',
  world: 'Окружающий мир',
} as const

export type FilterType = (typeof coursesName)[keyof typeof coursesName]

export function App() {
  const [filterCourses, setFilterCourses] = useState<FilterType>(coursesName.all)

  const [isLoading, setIsLoading] = useState(true)

  const courses = useFetchCourses(setIsLoading)

  const filtredCourses = useFilterCourses(courses, filterCourses)

  const filterHandler = useCallback((nameCourse: FilterType) => {
    setFilterCourses(nameCourse)
  }, [])

  return (
    <div className={s.wrapper}>
      {isLoading && <Loader />}
      <Sidebar className={s.sidebar}>
        <CourseTitle
          className={`${s.courseTitle} ${filterCourses === coursesName.all && s.active}`}
          label={coursesName.all}
          onClickHandler={filterHandler}
        />
        <CourseTitle
          className={clsx(s.courseTitle, filterCourses === coursesName.logic && s.active)}
          label={coursesName.logic}
          onClickHandler={filterHandler}
        />
        <CourseTitle
          className={clsx(s.courseTitle, filterCourses === coursesName.mystery && s.active)}
          label={coursesName.mystery}
          onClickHandler={filterHandler}
        />
        <CourseTitle
          className={clsx(s.courseTitle, filterCourses === coursesName.puzzles && s.active)}
          label={coursesName.puzzles}
          onClickHandler={filterHandler}
        />
        <CourseTitle
          className={clsx(s.courseTitle, filterCourses === coursesName.world && s.active)}
          label={coursesName.world}
          onClickHandler={filterHandler}
        />
        <CourseTitle
          className={clsx(s.courseTitle, filterCourses === coursesName.chess && s.active)}
          label={coursesName.chess}
          onClickHandler={filterHandler}
        />
        <CourseTitle
          className={clsx(s.courseTitle, filterCourses === coursesName.countries && s.active)}
          label={coursesName.countries}
          onClickHandler={filterHandler}
        />
      </Sidebar>
      <div className={s.content}>{filtredCourses}</div>
    </div>
  )
}

export const Loader = () => {
  return <div className={s.loader}>Loading...</div>
}
