import {router} from './router/router'
import { RouterProvider } from "react-router-dom"

const App = () => {
    return <RouterProvider router={router}/>
}

export default App