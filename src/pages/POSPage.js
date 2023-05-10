import { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  ListGroup,
  Row,
} from "react-bootstrap";
import {
  helperDuplicatedInArrayObject,
  helperReadableCurrency,
} from "../utils/helpers";
import { FaCartPlus, FaTrash } from "react-icons/fa";
import ProductService from "../services/ProductService";
import AuthService from "../services/AuthService";
import CheckoutService from "../services/CheckoutService";
import { useNavigate } from "react-router-dom";

const PPN = 0.11;

const POSPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [productChoices, setProductChoices] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [checkout, setCheckout] = useState({
    userId: 5,
    date: "2023-02-03",
    products: [],
  });

  useEffect(() => {
    ProductService.list().then((response) => {
      setProducts(response.data);
    });

    if (productChoices.length > 0) {
      let sum = 0;
      productChoices.map((product) => {
        sum = sum + product.subtotal;
      });
      sum = sum * PPN + sum;
      setGrandTotal(sum);
    }
  }, [productChoices]);

  const handleCheckoutServiceCreate = () => {
    setCheckout((values) => {
      let temp = { ...values };
      temp.userId = AuthService.getUserFromToken().sub;
      temp.products = [];
      for (const p of productChoices) {
        temp.products.push({
          productId: p.id,
          quantity: p.quantity,
        });
      }

      let nowDate = new Date();
      temp.date = nowDate.toISOString().split("T")[0];
      return temp;
    });

    CheckoutService.create(checkout)
      .then((response) => {
        setProductChoices([]);
        setGrandTotal(0);
        let isPrint = window.confirm("Checkout berhasil, mau di print?");
        if (isPrint) {
          navigate("/pos/print", {
            state: {
              productChoices,
              grandTotal,
              checkout,
            },
          });
        }
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  };

  const handleAddProduct = (product) => {
    let isDuplicate = helperDuplicatedInArrayObject(
      product,
      "id",
      productChoices
    );
    if (isDuplicate) {
      alert("Produk sudah ada.");
    } else {
      product.quantity = 1;
      product.subtotal = 1 * product.price;
      setProductChoices((values) => [...values, product]);
    }
  };

  const handleDeleteProduct = (product) => {
    setProductChoices((values) => {
      let temp = [...values];
      let index = temp.indexOf(product);
      temp.splice(index, 1);
      return temp;
    });
  };

  const handleInputProductChoices = (e, i) => {
    setProductChoices((values) => {
      let temp = [...values];
      temp[i][e.target.name] = e.target.value;
      temp[i].subtotal = parseInt(e.target.value) * temp[i].price;
      return temp;
    });
  };

  const inlineTransaction = () => {
    return (
      <Card>
        <Card.Header>Transaksi</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            {helperReadableCurrency(grandTotal)}
            <Button onClick={handleCheckoutServiceCreate}>
              <FaCartPlus />
            </Button>
          </ListGroup.Item>

          {productChoices.map((product, index) => (
            <div key={index}>
              <ListGroup.Item className="">
                <p className="text-truncate">
                  {product.title} <br />
                  {helperReadableCurrency(product.price)} x {product.quantity}{" "}
                  <br />
                  <Badge>{helperReadableCurrency(product.subtotal)}</Badge>
                </p>
                <InputGroup className="mb-3 mt-2">
                  <Form.Control
                    type="number"
                    name="quantity"
                    isInvalid={!product.quantity || product.quantity === 0}
                    onChange={(e) => handleInputProductChoices(e, index)}
                    value={product.quantity || ""}
                  />
                  <Button
                    onClick={() => handleDeleteProduct(product)}
                    variant="outline-danger"
                    size="sm">
                    <FaTrash />
                  </Button>
                </InputGroup>
              </ListGroup.Item>
            </div>
          ))}
        </ListGroup>
      </Card>
    );
  };

  const inlineCard = (product) => {
    const { id, price, title } = product;
    return (
      <Col key={id} md={4} className="mb-3">
        <Card
          style={{ cursor: "pointer" }}
          onClick={() => handleAddProduct(product)}>
          <Card.Img
            variant="top"
            src={`https://picsum.photos/1024/400?random=${product.id}`}
          />
          <Card.Body>
            <Card.Title className="text-truncate">{title}</Card.Title>
            <p>
              <Badge>{helperReadableCurrency(price)}</Badge>
            </p>
            <p className="text-truncate">{product.description}</p>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  return (
    <>
      <Container className="mt-4">
        <Row>
          <Col md={8}>
            <Row>{products.map((product) => inlineCard(product))}</Row>
          </Col>
          <Col md={4}>{inlineTransaction()}</Col>
        </Row>
      </Container>
    </>
  );
};

export default POSPage;
