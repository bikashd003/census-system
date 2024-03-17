import CensusChart from "./Components/CensusChart";
import Main from "./Pages/Main";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./Components/Navbar";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Main />
      </>
    ),
  },
  {
    path: "/chart",
    element: (
      <>
        <Navbar />
        <CensusChart />
      </>
    ),
  },
]);
const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
