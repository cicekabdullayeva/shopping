import { Navbar as NavbarBs, Nav, Container, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useShoppingCart } from "../context/ShoppingCartContext";

export function Navbar() {
  const { cartQuantity, toggleCart } = useShoppingCart();
  return (
    <NavbarBs sticky="top" className="mb-3 bg-white shadow-lg">
      <Container>
        <Nav>
          <Nav.Link as={NavLink} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/store">
            Store
          </Nav.Link>
          <Nav.Link as={NavLink} to="/about">
            About
          </Nav.Link>
        </Nav>
        {cartQuantity > 0 && (
          <Button
            onClick={toggleCart}
            variant="outline-primary"
            style={{ position: "relative" }}
          >
            <FontAwesomeIcon icon={faShoppingBasket} size="lg" />
            <div
              style={{
                color: "white",
                position: "absolute",
                right: "-10px",
                top: "-10px",
                width: "1.5rem",
                height: "1.5rem",
              }}
              className="rounded-circle bg-danger d-flex justify-content-center align-items"
            >
              {cartQuantity}
            </div>
          </Button>
        )}
      </Container>
    </NavbarBs>
  );
}
