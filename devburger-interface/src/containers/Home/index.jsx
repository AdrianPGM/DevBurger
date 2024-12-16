import { CategoriesCarousel, OffersCarousel } from "../../components/";
import { Banner, Container, Main } from "./styles";

export function Home() {

    return (
        <Main>
            <Banner>
                <h1>Bem-vindo(a)!</h1>
            </Banner>
            <Container>
                <div>
                    <CategoriesCarousel />
                    <OffersCarousel />
                </div>
            </Container>
        </Main>
    )
}