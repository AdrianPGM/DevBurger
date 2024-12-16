import { Elements } from "@stripe/react-stripe-js"
import { useLocation } from "react-router-dom"
import stripePromise from './../../config/stripeConfig';
import { CheckoutForm } from '../../components'


export function Checkout() {
    const { state: { clientSecret } } = useLocation()
    
    if(!clientSecret){
        return <div><h1>Erro, volte e tente novamente</h1></div>
    } 
    return (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm />
        </Elements>
    )
}