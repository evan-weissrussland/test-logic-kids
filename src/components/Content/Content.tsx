import { ComponentPropsWithoutRef } from 'react'

type Props = ComponentPropsWithoutRef<'div'>
export const Content = (props: Props) => {
  return <div {...props}>{props.children}</div>
}
