import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SignUpForm from "../user/SignUpForm";
import 'bootstrap/dist/css/bootstrap.min.css';
import './signup16.css';

const Registration = () => {
  return (
    <section className="ezy__signup16 light d-flex align-items-center justify-content-center">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <div className="ezy__signup16-card p-3">
              <div className="ezy__signup16-form-card p-4 p-lg-5">
                <h2 className="ezy__signup16-heading text-center">
                  REGISTRATION FORM
                </h2>

                <SignUpForm />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Registration;
