import { useState } from "react";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import LayoutWidget from "../widgets/commons/LayoutWidget";

const LoginPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [show, setShow] = useState(false);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser((values) => ({ ...values, [name]: value }));
  };

  const handleAuthServiceLogin = () => {
    AuthService.login(user)
      .then((response) => {
        setShow(true);
        let token = response.data.token;
        AuthService.saveToken(token);
        setTimeout(() => {
          navigate("/pos");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <LayoutWidget sizeColum={5}>
      <Card className="shadow">
        <Card.Img variant="top" src="https://picsum.photos/500/150" />
        <Card.Body>
          <Card.Title>Login</Card.Title>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              isInvalid={!user.username}
              isValid={user.username}
              value={user.username || ""}
              onChange={handleInput}
              type="text"
            />
          </Form.Group>
          <Form.Group className="my-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              isInvalid={!user.password}
              isValid={user.password}
              value={user.password || ""}
              onChange={handleInput}
              type="password"
            />
          </Form.Group>
          <Button onClick={handleAuthServiceLogin} className="w-100">
            {show && <Spinner size="sm" />} Login
          </Button>
        </Card.Body>
      </Card>
    </LayoutWidget>
  );
};

export default LoginPage;
