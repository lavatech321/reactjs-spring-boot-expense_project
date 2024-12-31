import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import ExpenseService from '../service/ExpenseService';

const Edit = ({expenseInfo, setExpenseInfo}) => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: '',
        expense_name: '',
        expense_date: '',
        amount: '',
      });

  const [show, setShow] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    ExpenseService.viewExpense(id)
    .then((expense) => {
        setFormData(expense.data);
    })
    .catch((error) => {
        console.error(error);
    });
  }, [id]);

  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    handleClose();
  };

  const editExpense = (e) => {
    e.preventDefault();
        ExpenseService.updateExpense(id, formData)
        .then((response) => {
            alert("Expense updated successfully");
            navigate("/view");
        })
        .catch((error) => console.error(error));
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Popup Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Expense Name</Form.Label>
              <Form.Control
                type="text"
                name="expense_name"
                value={formData.expense_name}
                onChange={handleChange}
                placeholder="Enter expense name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDate">
              <Form.Label>Expense Date</Form.Label>
              <Form.Control
                type="date"
                name="expense_date"
                value={formData.expense_date}
                onChange={handleChange}
                placeholder="Enter expense date"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={formData.amount}
                onChange={ handleChange }
                rows={3}
                placeholder="Enter expense amount"
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={(e) => editExpense(e)}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default Edit;