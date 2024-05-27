import { ComponentPropsWithoutRef, memo } from 'react'

type Props = ComponentPropsWithoutRef<'ul'>
export const Sidebar = memo((props: Props) => {
  return <ul {...props} />
})
