import { useCallback, useReducer } from 'react'

import { FilterType, coursesName } from '@/app/model/coursesName'
import { appReducer, initialState, setFilterCourses } from '@/app/store/reducer'
import { useFetchCourses } from '@/assets/hooks/UseFetchCourses'
import { useFilterCourses } from '@/assets/hooks/UseFilterCourses'
import { Content } from '@/components/Content/Content'
import { CourseTitle } from '@/components/CourseTitle/CourseTitle'
import { Error } from '@/components/Error/Error'
import { Loader } from '@/components/Loader/Loader'
import { Sidebar } from '@/components/Sidebar/Sidebar'
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
    return <Error error={state.error} />
  }

  return (
    <div className={s.wrapper}>
      {state.isLoading && <Loader />}
      <Sidebar className={s.sidebar}>
        <CourseTitle
          className={clsx(s.courseTitle, state.filterCourses === coursesName.all && s.active)}
          label={coursesName.all}
          onClickHandler={state.filterCourses !== coursesName.all ? filterHandler : () => {}}
        />
        <CourseTitle
          className={clsx(s.courseTitle, state.filterCourses === coursesName.logic && s.active)}
          label={coursesName.logic}
          onClickHandler={state.filterCourses !== coursesName.logic ? filterHandler : () => {}}
        />
        <CourseTitle
          className={clsx(s.courseTitle, state.filterCourses === coursesName.mystery && s.active)}
          label={coursesName.mystery}
          onClickHandler={state.filterCourses !== coursesName.mystery ? filterHandler : () => {}}
        />
        <CourseTitle
          className={clsx(s.courseTitle, state.filterCourses === coursesName.puzzles && s.active)}
          label={coursesName.puzzles}
          onClickHandler={state.filterCourses !== coursesName.puzzles ? filterHandler : () => {}}
        />
        <CourseTitle
          className={clsx(s.courseTitle, state.filterCourses === coursesName.world && s.active)}
          label={coursesName.world}
          onClickHandler={state.filterCourses !== coursesName.world ? filterHandler : () => {}}
        />
        <CourseTitle
          className={clsx(s.courseTitle, state.filterCourses === coursesName.chess && s.active)}
          label={coursesName.chess}
          onClickHandler={state.filterCourses !== coursesName.chess ? filterHandler : () => {}}
        />
        <CourseTitle
          className={clsx(s.courseTitle, state.filterCourses === coursesName.countries && s.active)}
          label={coursesName.countries}
          onClickHandler={state.filterCourses !== coursesName.countries ? filterHandler : () => {}}
        />
      </Sidebar>
      <Content className={s.content}>{filtredCourses} </Content>
    </div>
  )
}
