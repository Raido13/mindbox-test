import { Todos } from "../page/todos/todos"
import { Layout } from "../shared/ui/layout/layout"

export const App = () => {
  return (
    <Layout header={true} children={<Todos />} />
  )
}
