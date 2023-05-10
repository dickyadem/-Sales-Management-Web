import { useEffect } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { FaArrowLeft, FaPrint } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const POSPrintPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { productChoices, grandTotal, checkout } = location.state;

  useEffect(() => {
    if (productChoices && grandTotal && checkout) {
      window.print();
    }
  }, []);
  return (
    <Container>
      <Row>
        <Col>
          <Table>
            <tr>
              <th>Tanggal: {checkout.date}</th>
            </tr>
          </Table>
        </Col>
      </Row>
      <Row style={{ marginTop: "100px" }}>
        <Col>
          <Table bordered>
            <thead>
              <tr>
                <th>Product Title</th>
                <th>Product Price</th>
                <th>Product Quantity</th>
                <th>Product Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {productChoices.map((product) => (
                <tr>
                  <td>{product.title}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.subtotal}</td>
                </tr>
              ))}
              <tr>
                <td>Total</td>
                <td colSpan={3} style={{ textAlign: "right" }}>
                  {grandTotal}
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Button variant="secondary" onClick={() => navigate("/pos")}>
            <FaArrowLeft /> Back
          </Button>
          <Button onClick={() => window.print()} className="ms-2">
            <FaPrint /> Print
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default POSPrintPage;
