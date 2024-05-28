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

function App() {

  return (
    <ChakraProvider theme={theme}>
      
      <Box textAlign="center" fontSize="xl">
        <ColorModeSwitcher justifySelf="flex-end" />
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/dashboard" element={<SaleOrders/>}/>
        </Routes>
      </Box>
    </ChakraProvider>
  );
}

export default App;
