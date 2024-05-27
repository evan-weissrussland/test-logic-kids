import { FilterType, coursesName } from '@/app/model/coursesName'
import { Course } from '@/app/store/reducer'
import { CourseItem } from '@/features/ui/CourseItem/CourseItem'

export const useFilterCourses = (courses: Course[], filter: FilterType) => {
  if (courses) {
    let filtredCourses: Course[] | undefined = courses

    if (filter !== coursesName.all) {
      filtredCourses = courses?.filter(course => {
        if (course.tags.includes(filter)) {
          return course
        }
      })
    }

    return filtredCourses?.map(course => <CourseItem course={course} key={course.id} />)
  }
}
