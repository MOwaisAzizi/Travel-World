import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFount";
import AppLoyout from "./pages/AppLoyout";
import Login from "./pages/Login";
import CityList from "./component/CityList";
import CountryList from "./component/CountryList";
import City from './component/City'
import Form  from './component/Form';
import { CityProvider } from "./contexts/CitiesContext";

function App(){



return(
  <div>
    <CityProvider>
  <BrowserRouter>
  <Routes>
    <Route index element={<HomePage/>}/>
    <Route path="Product" element={<Product/>}/>
    <Route path="Pricing" element={<Pricing/>}/>
    <Route path="Login" element={<Login/>}/>
    <Route path="AppLoyout" element={<AppLoyout/>}>
      {/* <Route index  element={<CityList cities = {cities} isLoading = {isLoading}/>}/> */}
      
      <Route index element={<Navigate to='cities' replace/>}/>  {/*replace is for go back,navigate is for get the componet */}
      <Route path="cities" element={<CityList  />}/>
      <Route  path="cities/:id" element={<City/>}/>
      <Route path="contries" element={<CountryList  />}/>
      <Route path="form" element={<Form/>}/>
  </Route>
    <Route path="*" element={<NotFound/>}/>
  </Routes>
  </BrowserRouter>
  </CityProvider>
  </div>
)

 
}

export default App