import { useEffect } from "react"

import { useSelector, useDispatch } from "react-redux"
import { getCartTotal } from "../redux/features/cart/cartSlice"

/**
 *  retrive total count , total amount with useCart hook
 * @returns {Number []}
 */


export const useCart = () => {
    const { products, totalAmount, totalCount, status, errors } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCartTotal)
    }, [products, dispatch])

    return [totalAmount, totalCount, products, status, errors]
}