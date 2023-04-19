import { Button, Card } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useShoppingCart } from "../context/ShoppingCartContext";

type ProductItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

export function ProductCard({ id, name, price, imgUrl }: ProductItemProps) {
  const {
    increaseCartQuantity,
    getItemQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  let quantity = getItemQuantity(id);
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        height="200px"
        src={imgUrl}
        style={{ objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-center">
          <span className="fs-4">{name}</span>
          <span className="text-muted ms-2">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button
              onClick={() => increaseCartQuantity(id)}
              className="w-100 mt-3"
            >
              + Add To Card{" "}
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column "
              style={{ gap: ".5rem" }}
            >
              <div className="d-flex align-items-center justify-content-between">
                <Button onClick={() => decreaseCartQuantity(id)}>
                  <FontAwesomeIcon icon={faMinus} size="sm" />
                </Button>
                <p className="mx-2 mb-0">
                  {" "}
                  <span className="fs-3">{quantity}</span> in cart
                </p>
                <Button onClick={() => increaseCartQuantity(id)}>
                  <FontAwesomeIcon icon={faPlus} size="sm" />
                </Button>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeFromCart(id)}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
