import { Cours, FilterType, coursesName } from '@/app/App'

import s from '@/app/App.module.scss'

export const useFilterCourses = (courses: Cours[] | undefined, filter: FilterType) => {
  if (courses) {
    let filtredCourses: Cours[] | undefined = courses

    if (filter !== coursesName.all) {
      filtredCourses = courses?.filter(cours => {
        if (cours.tags.includes(filter)) {
          return cours
        }
      })
    }

    return filtredCourses?.map(cours => (
      <div className={s.cours} key={cours.id}>
        <div className={s.image} style={{ background: cours.bgColor }}>
          <img alt={'image'} src={cours.image} />
        </div>
        <span className={s.titleCourse}>{cours.name}</span>
      </div>
    ))
  }
}
