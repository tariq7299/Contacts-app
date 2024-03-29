import * as React from "react";
import * as ReactDOM from "react-dom/client";
import ErrorPage from "./error-page";
  import Contact, { loader as contactLoader, action as contactAction,} from "./routes/contact"
import Root, { loader as rootLoader, action as rootAction, } from "./routes/root";
import EditContact, {action as editAction,} from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";
import Index from "./routes/index";


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    action: rootAction,
    errorElement: <ErrorPage />,
    children: [
      {
        //  This a better way to handle (view) errors, as you can see way wraped all the children routes in a "pathless rout" of an error component "errorElement", this will make the error page only appear on the place of <Outlet> instead of taking the whole page ! (it replace the children components) 
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: "contacts/:contactId",
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: "contacts/:contactId/destroy",
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ],
      },
    ],
  },
]);



// This the old way to handle errors 
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//     errorElement: <ErrorPage />,
//     loader: rootLoader,
//     action: rootAction,
//     children: [
//       { index: true, element: <Index /> },
//       {
//         path: "contacts/:contactId",
//         element: <Contact />,
//         loader: contactLoader,
//         action: contactAction,
//       },
//       {
//         path: "contacts/:contactId/edit",
//         element: <EditContact />,
//         loader: contactLoader,
//         action: editAction,
//       },
//       {
//         path: "contacts/:contactId/destroy",
//         action: destroyAction, 
//         errorElement: <div>Oops! There was an error.</div>,
//       },
//     ],
//   },
// ]);


// JSX code instead of functional code in declaring routes


// import {
//   createRoutesFromElements,
//   createBrowserRouter,
//   Route,
// } from "react-router-dom";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route
//       path="/"
//       element={<Root />}
//       loader={rootLoader}
//       action={rootAction}
//       errorElement={<ErrorPage />}
//     >
//       <Route errorElement={<ErrorPage />}>
//         <Route index element={<Index />} />
//         <Route
//           path="contacts/:contactId"
//           element={<Contact />}
//           loader={contactLoader}
//           action={contactAction}
//         />
//         <Route
//           path="contacts/:contactId/edit"
//           element={<EditContact />}
//           loader={contactLoader}
//           action={editAction}
//         />
//         <Route
//           path="contacts/:contactId/destroy"
//           action={destroyAction}
//         />
//       </Route>
//     </Route>
//   )
// );

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);