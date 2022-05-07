import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const history = useNavigate();
  const [user, setUser] = useState({
    fname: "",
    mname: "",
    lname: "",
    erNo: "",
    branch: "",
    semester: "",
    email: "",
    number: "",
    password: "",
    cPassword: "",
  });
  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };
  const PostData = async (e) => {
    e.preventDefault();
    const {
      fname,
      mname,
      lname,
      erNo,
      branch,
      semester,
      email,
      number,
      password,
      cPassword,
    } = user;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fname,
        mname,
        lname,
        erNo,
        branch,
        semester,
        email,
        number,
        password,
        cPassword,
      })
    });
    const data = await res.json();
    if(res.status === 422 || !data){
      window.alert("Invalid Registration");
      console.log("Invalid registration");
    }else{
      window.alert("Registration Successfull");
      console.log(" registration done");

      history("/dashboard")

    }
  };
  return (
    <Container>
      <section>
        <Form method="POST">
          <Row>
            <Col>
              <Form.Group
                className="mb-3 mt-3 font-size signup-form"
                controlId="firstName"
              >
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="Text"
                  name="fname"
                  value={user.fname}
                  onChange={handleInputs}
                  placeholder=" Enter First Name"
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3 mt-3" controlId="middleName">
                <Form.Label>Middle Name</Form.Label>
                <Form.Control
                  type="Text"
                  name="mname"
                  value={user.mname}
                  onChange={handleInputs}
                  placeholder=" Enter Middle Name"
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3 mt-3" controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="Text"
                  name="lname"
                  value={user.lname}
                  onChange={handleInputs}
                  placeholder=" Enter Last Name"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="enrollmentNumber">
            <Form.Label>Enrollment Number</Form.Label>
            <Form.Control
              type="number"
              name="erNo"
              value={user.erNo}
              onChange={handleInputs}
              placeholder="Enter Enrollment Number"
              required
            />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="branch">
                <Form.Label>Branch</Form.Label>
                <Form.Control
                  type="text"
                  name="branch"
                  value={user.branch}
                  onChange={handleInputs}
                  placeholder="Enter Branch Name"
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="semester">
                <Form.Label>Semester</Form.Label>
                <Form.Control
                  type="text"
                  name="semester"
                  value={user.semester}
                  onChange={handleInputs}
                  placeholder="Enter Semester"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputs}
              placeholder="Enter Email Address"
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPoints">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="number"
              name="number"
              value={user.number}
              onChange={handleInputs}
              maxLength={10}
              placeholder="Enter Mobile Number"
              required
            />
          </Form.Group>

          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleInputs}
                  placeholder="Password"
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="rePassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="cPassword"
                  value={user.cPassword}
                  onChange={handleInputs}
                  placeholder="Confirm Password"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Button
            className=""
            variant="primary"
            value="register"
            onClick={PostData}
            type="submit"
          >
            Register
          </Button>
        </Form>
      </section>
    </Container>
  );
};

export default Register;
