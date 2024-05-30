import React from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Login } from './components/Login';
import {SaleOrders} from "./components/SaleOrder";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from './components/NavBar';
import { PrivateRoute } from './components/PrivateRoute';
function App() {

  return (
    <ChakraProvider theme={theme}>
      <Nav/>
      <Box>
      </Box>
      <Box textAlign="center" fontSize="xl">
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/dashboard" element={<PrivateRoute Component={<SaleOrders/>}/>}/>
        </Routes>
      </Box>
    </ChakraProvider>
  );
}

export default App;
