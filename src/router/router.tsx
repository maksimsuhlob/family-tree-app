import {createBrowserRouter} from "react-router-dom";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import PersonPage from "../pages/PersonPage";
import TreePage from "../pages/TreePage";
import PersonsPage from "../pages/PersonsPage";

export const routes={
    home: '/',
    persons: "persons",
    person: "person/:personId",
    tree: "tree",
}

export const getPersonUrl=(id:string)=>(`/person/${id}`)

const router = createBrowserRouter([
    {
        path: routes.home,
        element: <HomePage/>,
        errorElement: <ErrorPage/>,
        children:[
            {
                path: routes.persons,
                element: <PersonsPage/>,
            },
            {
                path: routes.person,
                element: <PersonPage/>,
            },
            {
                path: routes.tree,
                element: <TreePage/>
            },
        ]
    },

]);
export default router;