import React, { useEffect, useState } from 'react'

import { SButton } from '../../portal/button/basic/styled'
import Loading from '../../loading/form'

const CheckoutForm: React.FC = () => {

  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)


  return (
    <form id="payment-form">
     
       
    </form>
  )
}

export default CheckoutForm
