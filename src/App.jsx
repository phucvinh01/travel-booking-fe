import { Suspense, lazy, useEffect } from "react";
import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import CustomerLayout from "./layouts/CustomerSreen";
import { useDispatch } from "react-redux";
import { getCategory, getItems } from "./redux/api";
import Loadable from "./util/Loadable";


function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    getItems(dispatch)
    getCategory(dispatch)
  }, [])

  return (
    <>

      {/* router customer */ }
      <Routes>
        <Route path="/" element={ <CustomerLayout /> }>
          <Route path="/" element={ <Home /> } />
          <Route path="/about" element={ <About /> } />
          <Route path="/tours" element={ <Tour /> } />
          <Route path="/tours:id" element={ <TourDetail /> } />
        </Route>
      </Routes>

    </>
  )
}


const TourDetail = Loadable(
  lazy(() => import("./pages/TourDetail")),
);
const About = Loadable(
  lazy(() => import("./pages/About")),
);
const Home = Loadable(
  lazy(() => import("./pages/Home")),
);
const Tour = Loadable(
  lazy(() => import("./pages/Tours")),
);

export default App
