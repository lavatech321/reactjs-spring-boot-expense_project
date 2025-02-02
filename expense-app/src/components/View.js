import React from 'react';
import '../index.css';
import { Button , Container, Row, Col } from 'react-bootstrap';
import { format } from 'date-fns';
import ExpenseService from '../service/ExpenseService';
import { Link } from 'react-router-dom';
import { useEffect} from 'react';

function formatDate(dateString) {
    return format(new Date(dateString), "eee, dd MM yyyy"); // "Tue, 12 2024"
  }

const View = ({expenseInfo, setExpenseInfo}) => {

    useEffect(() => {
        ExpenseService.getAllExpenses()
          .then((response) => {
            setExpenseInfo(response.data);
          })
          .catch(err => console.error(err));
      }, [setExpenseInfo]); // Include setExpenseInfo

    const deleteExpense = (id) => {
        console.log("delete button clicked");
        ExpenseService.deleteExpense(id)
        .then((response) => {
            alert("Expense deleted successfully");
            setExpenseInfo(prevData => prevData.filter(expense => expense.id !== id));
        })
        .catch((error) => {
            console.error(error);
        });
    }

  return (
    <Container >
            <Row className="p-3 text-light custom-shape2">
            <Col>
            {
                expenseInfo.map(
                    expense =>
                            <div className="content py-2 mb-3">
                            <div className="d-flex justify-content-between px-3 py-3 ">
                                <div className="d-flex align-items-center justify-content-between">
                                    <Button variant="warning" className="d-flex align-items-center" as={Link} to={`/expense/${expense.id}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                                    </svg>
                                    </Button>
                                    <h5 className="mx-2">{formatDate(expense.expense_date)}</h5>
                                </div>
                                <Button variant="danger" className="d-flex align-items-center" onClick={() => deleteExpense(expense.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="mx-2" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                </svg>
                                </Button>
                            </div>
                            <div className="content-border d-flex justify-content-between align-items-center">
                                <h5>{expense.expense_name}</h5>
                                <h5>${expense.amount}</h5>
                            </div>
                            </div>
                        )}
            </Col>
            </Row>
    </Container>
  )
}

export default View
