import { useCallback, useReducer } from 'react'

import { FilterType, coursesName } from '@/app/model/coursesName'
import { appReducer, initialState, setFilterCourses } from '@/app/store/reducer'
import { useFetchCourses } from '@/assets/hooks/UseFetchCourses'
import { useFilterCourses } from '@/assets/hooks/UseFilterCourses'
import { Content } from '@/features/ui/Content/Content'
import { CourseTitle } from '@/features/ui/CourseTitle/CourseTitle'
import { Sidebar } from '@/features/ui/Sidebar/Sidebar'
import { ErrorMessage } from '@/shared/ui/ErrorMessage/ErrorMessage'
import { Loader } from '@/shared/ui/Loader/Loader'
import clsx from 'clsx'

import s from './App.module.scss'

export function App() {
  const [state, dispatch] = useReducer(appReducer, initialState)

  useFetchCourses(dispatch)

  const filtredCourses = useFilterCourses(state.courses, state.filterCourses)

  const filterHandler = useCallback((nameCourse: FilterType) => {
    dispatch(setFilterCourses(nameCourse))
  }, [])

  if (state.error) {
    return <ErrorMessage error={state.error} />
  }

  const compareFilterCoursWithCoursesName = {
    all: state.filterCourses === coursesName.all,
    chess: state.filterCourses === coursesName.chess,
    countries: state.filterCourses === coursesName.countries,
    logic: state.filterCourses === coursesName.logic,
    mystery: state.filterCourses === coursesName.mystery,
    puzzles: state.filterCourses === coursesName.puzzles,
    world: state.filterCourses === coursesName.world,
  }

  return (
    <div className={s.wrapper}>
      {state.isLoading && <Loader />}
      <Sidebar className={s.sidebar}>
        <CourseTitle
          className={clsx(s.courseTitle, compareFilterCoursWithCoursesName.all && s.active)}
          label={coursesName.all}
          onClickHandler={!compareFilterCoursWithCoursesName.all ? filterHandler : () => {}}
        />
        <CourseTitle
          className={clsx(s.courseTitle, compareFilterCoursWithCoursesName.logic && s.active)}
          label={coursesName.logic}
          onClickHandler={!compareFilterCoursWithCoursesName.logic ? filterHandler : () => {}}
        />
        <CourseTitle
          className={clsx(s.courseTitle, compareFilterCoursWithCoursesName.mystery && s.active)}
          label={coursesName.mystery}
          onClickHandler={!compareFilterCoursWithCoursesName.mystery ? filterHandler : () => {}}
        />
        <CourseTitle
          className={clsx(s.courseTitle, compareFilterCoursWithCoursesName.puzzles && s.active)}
          label={coursesName.puzzles}
          onClickHandler={!compareFilterCoursWithCoursesName.puzzles ? filterHandler : () => {}}
        />
        <CourseTitle
          className={clsx(s.courseTitle, compareFilterCoursWithCoursesName.world && s.active)}
          label={coursesName.world}
          onClickHandler={!compareFilterCoursWithCoursesName.world ? filterHandler : () => {}}
        />
        <CourseTitle
          className={clsx(s.courseTitle, compareFilterCoursWithCoursesName.chess && s.active)}
          label={coursesName.chess}
          onClickHandler={!compareFilterCoursWithCoursesName.chess ? filterHandler : () => {}}
        />
        <CourseTitle
          className={clsx(s.courseTitle, compareFilterCoursWithCoursesName.countries && s.active)}
          label={coursesName.countries}
          onClickHandler={!compareFilterCoursWithCoursesName.countries ? filterHandler : () => {}}
        />
      </Sidebar>
      <Content className={s.content}>{filtredCourses} </Content>
    </div>
  )
}
