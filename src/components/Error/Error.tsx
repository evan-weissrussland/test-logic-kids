type Props = {
  error: string
}
export const Error = ({ error }: Props) => {
  return <div>{error}</div>
}
