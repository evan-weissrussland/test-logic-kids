import { FilterType, coursesName } from '@/app/model/coursesName'

export const initialState = {
  courses: [] as Course[],
  error: '',
  filterCourses: coursesName.all as FilterType,
  isLoading: true,
}

export const appReducer = (
  state: InitialStateType = initialState,
  action: GeneralActionType
): InitialStateType => {
  switch (action.type) {
    case APPREDUCER_GETCOURSES:
      return { ...state, courses: action.courses }
    case APPREDUCER_SETLOADING:
      return { ...state, isLoading: action.isLoading }
    case APPREDUCER_SETFILTERCOURSES:
      return { ...state, filterCourses: action.filterCourses }
    case APPREDUCER_SETERRORMESSAGE:
      return { ...state, error: action.errorMessage }
    default:
      return state
  }
}

const APPREDUCER_GETCOURSES = 'APPREDUCER-GETCOURSES' as const
const APPREDUCER_SETLOADING = 'APPREDUCER-SETLOADING' as const
const APPREDUCER_SETFILTERCOURSES = 'APPREDUCER_SETFILTERCOURSES' as const
const APPREDUCER_SETERRORMESSAGE = 'APPREDUCER-SETERRORMESSAGE' as const

//ActionCreators
export const getCourses = (courses: Course[]) => {
  return { courses, type: APPREDUCER_GETCOURSES } as const
}

export const setLoading = (isLoading: boolean) => {
  return { isLoading, type: APPREDUCER_SETLOADING } as const
}

export const setFilterCourses = (filterCourses: FilterType) => {
  return { filterCourses, type: APPREDUCER_SETFILTERCOURSES } as const
}

export const setError = (errorMessage: string) => {
  return { errorMessage, type: APPREDUCER_SETERRORMESSAGE } as const
}

//types
export type Course = {
  bgColor: string
  id: string
  image: string
  name: string
  tags: string[]
}

type InitialStateType = typeof initialState

type GetCourses = ReturnType<typeof getCourses>
type SetLoading = ReturnType<typeof setLoading>
type SetFilterCourses = ReturnType<typeof setFilterCourses>
type SetError = ReturnType<typeof setError>

export type GeneralActionType = GetCourses | SetError | SetFilterCourses | SetLoading
