import React from 'react';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import CustomerList from './CustomerList';

function App() {
  return (
    <div className="App">

        <Container>
            <Row>
                <h2 style={{ margin: '20px auto 10px' }}>Customer Rewards Data</h2>
            </Row>
            <Row style={{ margin: 0 }}>
                <p style={{ margin: '0 auto 20px' }}>
                    Click the 'info' links to reveal rewards data details per customer per month.
                </p>
            </Row>
            {/*<Row style={{ borderBottom: '1px solid #ccc' }}/>*/}
            <Row style={{ paddingTop: '20px' }}>
                <Col style={{ padding: 0 }}>

                    <CustomerList/>

                </Col>
            </Row>
        </Container>

    </div>
  );
}

export default App;
