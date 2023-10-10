import { Suspense, lazy, useEffect } from "react";
import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import CustomerLayout from "./layouts/CustomerSreen";
import { useDispatch } from "react-redux";
import { getCategory, getItems } from "./redux/api";
import Loadable from "./util/Loadable";
import AdminLayout from "./layouts/AdminScreen";


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

      <Routes>
        <Route path="/admin" element={ <AdminLayout /> }>
          <Route path="/admin" element={ <Admin /> } />
          <Route path="/admin/tour" element={ <TourManager /> } />
          <Route path="/admin/customer" element={ <CustomerManager /> } />
          <Route path="/admin/order" element={ <OrderManager /> } />
          <Route path="/admin/emp" element={ <EmpManager /> } />
          <Route path="/admin/hotel" element={ <HotelManager /> } />
          <Route path="/admin/tranpost" element={ <TranpostManager /> } />
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

const Admin = Loadable(
  lazy(() => import('./pages/AdminPage'))
);

const TourManager = Loadable(
  lazy(() => import('./pages/Admin/TourManager'))
);
const CustomerManager = Loadable(
  lazy(() => import('./pages/Admin/CustomerManager'))
); const EmpManager = Loadable(
  lazy(() => import('./pages/Admin/EmpManager'))
); const OrderManager = Loadable(
  lazy(() => import('./pages/Admin/OderManager'))
);
const TranpostManager = Loadable(
  lazy(() => import('./pages/Admin/TransportManager'))
);
const HotelManager = Loadable(
  lazy(() => import('./pages/Admin/HotelManager'))
);

export default App
