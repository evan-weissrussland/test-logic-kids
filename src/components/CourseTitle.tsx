import { ComponentPropsWithoutRef, memo } from 'react'

import { FilterType } from '@/app/App'

type Props = {
  label: FilterType
  onClickHandler: (nameCourse: FilterType) => void
} & ComponentPropsWithoutRef<'li'>
export const CourseTitle = memo(({ label, onClickHandler, ...rest }: Props) => {
  return (
    <li {...rest} onClick={() => onClickHandler(label)}>
      {label}
    </li>
  )
})
