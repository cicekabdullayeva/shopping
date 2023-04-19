import { Col, Container, Row } from "react-bootstrap";
import storeItems from "../data/items.json";
import { ProductCard } from "../components/ProductCard";
const Store = () => {
  return (
    <Container>
      <h1>Store</h1>
      <Row  className="g-3">
        {storeItems.map((item) => (
          <Col sm={12} md={6} lg={4}  key={item?.id}>
            <ProductCard {...item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
export default Store;
