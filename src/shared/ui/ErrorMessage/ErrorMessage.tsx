type Props = {
  error: string
}
export const ErrorMessage = ({ error }: Props) => {
  return <div>{error}</div>
}
