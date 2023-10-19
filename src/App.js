import React from 'react';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Login from './Login'
import CustomerList from './CustomerList';
import CreateCustomer from './CreateCustomer';

function App() {
  return (
    <BrowserRouter>
    <Routes>
        
        <Route path='/' element={<Login />} />
        <Route path='/customer-details' element={<CustomerList/> } />
        <Route path='/create-customer' element={ <CreateCustomer/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
