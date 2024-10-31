import React, { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CityProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeauthContext";
import ProtectedRoute from "./component/ProtectedRout";

import CityList from "./component/CityList";
import CountryList from "./component/CountryList";
import City from "./component/City";
import Form from "./component/Form";
import SpinnerFullPage from './component/SpinnerFullPage'
// Loading split packet
const HomePage = lazy(()=>import("./pages/HomePage"))
const Product = lazy(()=>import("./pages/Product"))
const Pricing = lazy(()=>import("./pages/Pricing"))
const AppLoyout = lazy(()=>import("./pages/AppLoyout"))
const Login = lazy(()=>import("./pages/Login"))
const NotFound = lazy(()=>import("./pages/NotFount"))


function App() {
  return (
    <div>
      <AuthProvider>
      <CityProvider>
        <BrowserRouter>
        {/* it will call spinner whin the packet is loading */}
       <Suspense fallback={<SpinnerFullPage/>}>
       <Routes>
            <Route index element={<HomePage />} />
            <Route path="Product" element={<Product />} />
            <Route path="Pricing" element={<Pricing />} />
            <Route path="Login" element={<Login />} />
            <Route path="AppLoyout" element={
              //this is for not allow the user to go the applayout using searchBar
             <ProtectedRoute> <AppLoyout/> </ProtectedRoute>    }>
              {/* <Route index  element={<CityList cities = {cities} isLoading = {isLoading}/>}/> */}
              <Route index element={<Navigate to="cities" replace />} />{" "}
              {/*replace is for go back,navigate is for get the componet */}
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="contries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
       </Suspense>
        </BrowserRouter>
      </CityProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
