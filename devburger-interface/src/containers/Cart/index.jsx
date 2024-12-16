import Logo from '../../assets/logo.svg'
import { Banner, Container, Content, Title, ReturnHome } from './styles'
import { CartItems, CartResume } from '../../components'
import { useNavigate } from 'react-router-dom'
import { ReturnButton } from './../../components/ReturnButton';
import arrow from '../../assets/arrow.svg'


export function Cart() {
    const navigate = useNavigate()

    return (
        <Container>
            <Banner>
                <ReturnHome type="button" onClick={() => navigate('/')}>
                    <img src={Logo} alt="logo devburger" />
                </ReturnHome>
            </Banner>
            <ReturnButton type="button" onClick={() => navigate('/')} >
                    <img src={arrow} alt="carrinho-de-compras" />
                </ReturnButton>
        
            <Title>Checkout - Pedido</Title>
            <Content>
                <CartItems />
                <CartResume />
            </Content>
        </Container>
    )
}

