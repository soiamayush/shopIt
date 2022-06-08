import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const CheckoutSteps = ({shipping, confirmOrder, payment}) => {
  return (
    <Fragment>
        <div className='checkout-progress d-flex justify-content-center mt-5'>
            {shipping ? <Link to="/shipping" className='float-right'>
                <div className='triangle2-active'></div>
                <div className='step active-step'>Shipping</div>
                <div className='triangle-active'></div>
            </Link> : 
            <Link to="#!" disabled>
                <div className='triangle2-incomplete'></div>
                <div className='step incomplete'>Shipping</div>
                <div className='triangle-incomplete'></div>
            </Link>
            }

{confirmOrder ? <Link to="/order/confirm" className='float-right'>
                <div className='triangle2-active'></div>
                <div className='step active-step'>Order confirm</div>
                <div className='triangle-active'></div>
            </Link> : 
            <Link to="#!" disabled>
                <div className='triangle2-incomplete'></div>
                <div className='step incomplete'>Order confirm</div>
                <div className='triangle-incomplete'></div>
            </Link>
            }

{payment ? <Link to="/shipping" className='float-right'>
                <div className='triangle2-active'></div>
                <div className='step active-step'>payment</div>
                <div className='triangle-active'></div>
            </Link> : 
            <Link to="#!" disabled>
                <div className='triangle2-incomplete'></div>
                <div className='step incomplete'>payment</div>
                <div className='triangle-incomplete'></div>
            </Link>
            }
        </div>
    </Fragment>
  )
}

export default CheckoutSteps