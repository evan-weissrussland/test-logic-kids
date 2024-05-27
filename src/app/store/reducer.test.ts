import { appReducer } from '@/app/store/reducer'
import { expect, test } from 'vitest'

test('reducer should be return IsLoading true', () => {
  const action = {
    isLoading: true,
    type: 'APPREDUCER-SETLOADING' as const,
  }

  expect(appReducer(undefined, action).isLoading).toBe(true)
})

test('reducer should be return Error', () => {
  const action = {
    errorMessage: 'Error throwed',
    type: 'APPREDUCER-SETERRORMESSAGE' as const,
  }

  expect(appReducer(undefined, action).error).toBe('Error throwed')
})

test('reducer should be return courses', () => {
  const action = {
    courses: [
      {
        bgColor: '',
        id: 'course:1',
        image: '',
        name: 'Шахматы',
        tags: ['Головоломки'],
      },
    ],
    type: 'APPREDUCER-GETCOURSES' as const,
  }

  expect(appReducer(undefined, action).courses[0].name).toBe('Шахматы')
  expect(appReducer(undefined, action).courses.length).toBe(1)
})
