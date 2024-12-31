import React from 'react';
import '../index.css';
import { useEffect, useState } from 'react'; // Import useState for managing active tab
import ExpenseService from '../service/ExpenseService';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Use BrowserRouter instead of Router
import Create from './Create';
import View from './View';
import Header from './Header';
import Edit from './Edit';

const Main = () => {

      // eslint-disable-next-line
      const [expenseInfo, setExpenseInfo] = useState([]);

      useEffect(() => {
        ExpenseService.getAllExpenses()
        .then((response) => {
          setExpenseInfo(response.data);
          console.log(response.data);
        })
        .catch(err => {
          console.error(err);
        });
      }, []);

  return (
      <Router>
        <Header />
        <Routes>
          <Route path="/home" element={<Create expenseInfo={expenseInfo} setExpenseInfo={setExpenseInfo} />} />
          <Route path="/view" element={<View expenseInfo={expenseInfo} setExpenseInfo={setExpenseInfo} />} />
          <Route path="/expense/:id" element={<Edit expenseInfo={expenseInfo} setExpenseInfo={setExpenseInfo} />} />
        </Routes>
      </Router>
  )
}

export default Main
