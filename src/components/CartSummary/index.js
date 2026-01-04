// Write your code here
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const totalAmt = cartList.reduce(
        (sum, each) => sum + each.price * each.quantity,
        0,
      )

      return (
        <div className="total-amt-outter-container">
          <div className="total-amt-container">
            <h1 className="amt-para">
              Order Total:<span className="amt">Rs {totalAmt}/-</span>
            </h1>
            <p>{cartList.length} Items in cart</p>
            <button type="button" className="Checkout-btn">
              Checkout
            </button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
