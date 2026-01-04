// Write your code here
import {useState} from 'react'
import Popup from 'reactjs-popup'
import CartContext from '../../context/CartContext'

import 'reactjs-popup/dist/index.css'
import './index.css'

const CartSummary = () => {
  const [paymentMethod, setPaymentMethod] = useState('')
  const [isOrderPlaced, setIsOrderPlaced] = useState(false)

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value

        const totalAmt = cartList.reduce(
          (sum, each) => sum + each.price * each.quantity,
          0,
        )

        const onConfirmOrder = () => {
          setIsOrderPlaced(true)
        }

        return (
          <div className="total-amt-outter-container">
            <div className="total-amt-container">
              <h1 className="amt-para">
                Order Total: <span className="amt">Rs {totalAmt}/-</span>
              </h1>
              <p>{cartList.length} Items in cart</p>

              <Popup
                modal
                trigger={
                  <button className="button" type="button">
                    Checkout
                  </button>
                }
              >
                {close => (
                  <div className="popup-content">
                    {!isOrderPlaced ? (
                      <>
                        <h1>Payment Method</h1>

                        <div className="payment-options">
                          <label>
                            <input type="radio" disabled />
                            Card
                          </label>
                          <label>
                            <input type="radio" disabled />
                            Net Banking
                          </label>
                          <label>
                            <input type="radio" disabled />
                            UPI
                          </label>
                          <label>
                            <input type="radio" disabled />
                            Wallet
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="payment"
                              value="COD"
                              onChange={e => setPaymentMethod(e.target.value)}
                            />
                            Cash on Delivery
                          </label>
                        </div>

                        <p className="summary">
                          {cartList.length} Items | Rs {totalAmt}/-
                        </p>

                        <button
                          type="button"
                          className="confirm-btn"
                          disabled={paymentMethod !== 'COD'}
                          onClick={onConfirmOrder}
                        >
                          Confirm Order
                        </button>
                      </>
                    ) : (
                      <>
                        <p className="success-msg">
                          Your order has been placed successfully
                        </p>
                        <button
                          type="button"
                          className="button"
                          onClick={close}
                        >
                          Close
                        </button>
                      </>
                    )}
                  </div>
                )}
              </Popup>
            </div>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartSummary
