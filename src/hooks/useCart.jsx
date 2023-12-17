import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getCartTotal } from "@/redux/features/cart/cartSlice";

/**
 *  retrive total count , total amount with useCart hook
 * @returns {Array []}
 */

export const useCart = () => {
  // const product = useSelector((state) => state.cart.store);
  const   products  = useSelector((state) => state.cart.products)
  const { totalAmount , totalCount} = useSelector((state) => state.cart)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartTotal());
  }, [dispatch]);

  return [products, totalAmount, totalCount];
};
