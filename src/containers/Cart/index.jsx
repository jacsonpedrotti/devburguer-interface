import { Banner, Container, Content, Title } from "./styles";
import Logo from "../../assets/logo.svg"
import { CartItems, CartResume } from "../../components";

export function Cart() {
    return (
        <Container>
            <Banner>
                <img src={Logo} alt="Logo devburguer" />
            </Banner>
            <Title>Checkout - Pedido </Title>
            <Content>
                <CartItems />
                <CartResume />
            </Content>
        </Container>
    );
}