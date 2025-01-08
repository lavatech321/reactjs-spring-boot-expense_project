import React from 'react';
import '../index.css';
import { Button , Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {useState} from 'react';
import ExpenseService from '../service/ExpenseService';

const Create = ({expenseInfo, setExpenseInfo}) => {

  const [ expense, setExpense] = useState({
      expense_name: '',
      expense_date: '',
      amount: ''
    });

  const handleit = (e) => {
    const {name, value} = e.target;
    setExpense(prevData => ({...prevData, [name]: value}))
  }

  const createExpense = (e) => {
    e.preventDefault();
  
    // Validation checks
    if (!expense.expense_name.trim()) {
      alert("Expense name is required");
      return;
    }
    if (!expense.amount || isNaN(expense.amount) || Number(expense.amount) <= 0) {
      alert("Valid expense amount is required");
      return;
    }
    if (!expense.expense_date) {
      alert("Expense date is required");
      return;
    }
    ExpenseService.createExpense(expense)
      .then((response) => {
        alert("Expense created successfully!");
        setExpenseInfo((prevData) => [...prevData, response.data]);
        setExpense({
          expense_name: '',
          expense_date: '',
          amount: '',
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Container >
        <Row className="p-3 text-light custom-shape2">
            <Col>
            <InputGroup hasValidation className="mt-3">
            <InputGroup.Text>Expense Name/Type</InputGroup.Text>
            <Form.Control type="text" name="expense_name" value={expense.expense_name} onChange={handleit} />
            </InputGroup>

            <InputGroup className="mt-3">
            <InputGroup.Text>Expense Amount</InputGroup.Text>
            <Form.Control type="number" name="amount" value={expense.amount} onChange={handleit} />
            </InputGroup>
            
            <InputGroup className="mt-3">
            <InputGroup.Text>Expense Date</InputGroup.Text>
            <Form.Control type="date" name="expense_date" value={expense.expense_date} onChange={handleit} />
            </InputGroup>

            <Button className="mt-4" onClick={(e) => createExpense(e)}>
                Submit Report
            </Button>

            </Col>
        </Row>
    </Container>
  );

}

export default Create