import {createBrowserRouter} from "react-router-dom";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import TreesPage from "../pages/TreesPage";

export const routes={
    home: '/',
    trees: "tree",
    tree: "tree/:treeId",
}

export const getTreeUrl = (id: string) => (`/tree/${id}`)
export const getPersonUrl = (id: string) => (`person/${id}`)

const router = createBrowserRouter([
    {
        path: routes.home,
        element: <HomePage/>,
        errorElement: <ErrorPage/>,
        children:[
            {
                path: routes.trees,
                element: <TreesPage/>
            },
            {
                path: routes.tree,
                element: <TreesPage/>
            },
        ]
    },

]);
export default router;