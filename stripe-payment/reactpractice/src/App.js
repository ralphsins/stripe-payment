
import React from 'react';
import './App.css';
import Register from './components/Register';
import AddPayMethod from './components/AddPayMethod';
import StripeWrapper from './components/StripeWrapper';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 import PaymentForm from './components/PaymentForm';
import PaymentScreen from './components/PaymentScreen';

const App = () => {

  return (
    <StripeWrapper>
      <div className="h-screen w-full flex flex-col  gap-5">
        <Router>
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/add-payment' element={<AddPayMethod />} />
            <Route path="/make-payment" element={<PaymentScreen/>}/>
            <Route path='/form' element={<PaymentForm/>}/>
          </Routes>
        </Router>
      </div>
    </StripeWrapper>
  );
};

export default App;
