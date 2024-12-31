import { Container, Row, Col } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import '../index.css';
import { Link, useLocation } from 'react-router-dom'; // Use BrowserRouter instead of Router
import { useEffect, useState } from 'react'; // Import useState for managing active tab
import ExpenseService from '../service/ExpenseService';

function Header() {
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

  // Set active tab
  const location = useLocation();
  const name = location.pathname.split('/').pop(); // Extract `location` from URL
  const [activeKey, setActiveKey] = useState("/"+name); // State to track the active tab
  const handleSelect = (selectedKey) => {
    setActiveKey(selectedKey); // Update the active tab
  };

  return (
      <Container className="mt-5">
        {/* Header Section */}
        <Row className="bg-dark p-3 text-light text-center shadow mb-5">
          <Col>
            <h1>Conncur Expense Report Submit</h1>
          </Col>
        </Row>

        {/* Navigation Section */}
        <Row className="bgcolor px-2 py-2 custom-shape">
          <Nav
            justify
            variant="tabs"
            activeKey={activeKey}
            onSelect={handleSelect} // Add onSelect handler
          >
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/home"
                eventKey="/home"
                className={activeKey === '/home' ? 'text-primary font-weight-bold' : 'text-muted'}
              >
              <h5>Create Expense Report</h5>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/view"
                eventKey="/view"
                className={activeKey === '/view' ? 'text-primary font-weight-bold' : 'text-muted'}>
                <h5>View Expense Report</h5>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Row>
      </Container>
  );
}

export default Header;
