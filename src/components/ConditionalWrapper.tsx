type WrapperProp = {
  condition: boolean
  wrapper: (children: React.ReactElement) => JSX.Element
  children: React.ReactElement
}

export const ConditionalWrapper: React.FC<WrapperProp> = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children
