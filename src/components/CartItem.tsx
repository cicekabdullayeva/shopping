import { useEffect } from "react";
import { Button, Card, Stack } from "react-bootstrap";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";
type CartItemProps = {
  id: number;
  quantity: number;
};
export function CartItem({ id, quantity }: CartItemProps) {
  const item = storeItems.find((item) => +item?.id === +id);
  const {removeFromCart}=useShoppingCart()
  if (item == null) return null;

  return (
    <Stack direction="horizontal" className="d-flex align-items-center" gap={2}>
      <img
        src={item?.imgUrl}
        alt="product"
        style={{ width: "120px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div >
          {item?.name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: "10px" }}>
              x {quantity}
            </span>
          )}
        </div>
        <span className="text-muted " style={{ fontSize: "10px" }}>
          {formatCurrency(item?.price)}
        </span>
      </div>
      <div className="d-flex">
        {formatCurrency(item?.price * quantity)}
      </div>
      <Button variant="outline-danger" size="sm" onClick={()=>removeFromCart(id)}>&times;</Button>

    </Stack>
  );
}
