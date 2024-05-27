import { Course } from '@/app/store/reducer'

import s from '@/features/ui/CourseItem/CourseItem.module.scss'

type Props = {
  course: Course
}
export const CourseItem = ({ course }: Props) => {
  return (
    <div className={s.cours}>
      <div className={s.image} style={{ background: course.bgColor }}>
        <img alt={'image'} src={course.image} />
      </div>
      <span className={s.titleCourse}>{course.name}</span>
    </div>
  )
}
