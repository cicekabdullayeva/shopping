import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import { useEffect, useState } from "react";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";

type ShoppingCartProps = { slideCart: boolean };
export function ShoppingCart({ slideCart }: ShoppingCartProps) {
  const { toggleCart, cartQuantity ,cartItems} = useShoppingCart();
  const [total, setTotal] = useState<number>(0)
  useEffect(()=>{
   let totalSum= cartItems.reduce((total,cartItem)=>{
        let product=storeItems.find(item=>item?.id===cartItem?.id);
        return total + (product?.price||0) *cartItem?.quantity
    },0)
    setTotal(totalSum)
 
  },[cartQuantity])
  return (
    <Offcanvas show={slideCart} onHide={toggleCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title> Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {cartQuantity === 0 && <p>Cart is empty!</p>}
        <Stack gap={3}>
        {cartItems.map(item=>{
            return <CartItem key={item?.id} {...item}/>
        })}
        <div className="ms-auto fw-bold fs-t"> Total: {formatCurrency(total)}</div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
