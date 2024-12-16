import { useEffect, useState } from "react";
import { Container, Banner, CategoryMenu, ProductsContainer, CategoryButton } from "./styles";
import { ReturnButton } from "../../components/ReturnButton";
import { api } from "../../services/api";
import { formatPrice } from "../../utils/formatPrice";
import { CardProduct } from "../../components/CardProduct";
import { useLocation, useNavigate } from "react-router-dom";
import arrow from '../../assets/arrow.svg'



export function Menu() {
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [filteredProducts, setfilteredProducts] = useState([])

    const navigate = useNavigate()

    const { search } = useLocation()

    const queryParms = new URLSearchParams(search)


    const [activeCategory, setActiveCategory] = useState(() => {
        const categoryId = +queryParms.get('categoria')


        if (categoryId) {
            return categoryId
        }

        return 0
    })



    useEffect(() => {

        async function loadCategories() {
            const { data } = await api.get('/categories')

            const newCategories = [{ id: 0, name: "Todas" }, ...data]

            setCategories(newCategories)
        }

        async function loadProducts() {
            const { data } = await api.get('/products')

            const newProducts = data
                .map(product => ({
                    currencyValue: formatPrice(product.price),
                    ...product
                }))


            setProducts(newProducts)
        }

        loadCategories()
        loadProducts()

    }, [])

    useEffect(() => {

        if (activeCategory === 0) {
            setfilteredProducts(products)
        } else {
            const newFilteredProducts = products.filter(
                product => product.category_id == activeCategory
            )

            setfilteredProducts(newFilteredProducts)
        }

    }, [products, activeCategory])



    return (
        <Container>

            <Banner>

                <h1>
                    O MELHOR
                    <br />
                    HAMBURGUER
                    <br />
                    ESTÁ AQUI!
                    <span>Esse cardápio está irresistível!</span>
                </h1>

                <ReturnButton type="button" onClick={() => navigate('/')} >
                    <img src={arrow} alt="carrinho-de-compras" />
                </ReturnButton>
            </Banner>


            <CategoryMenu>



                {categories.map(category => (
                    <CategoryButton
                        key={category.id}
                        $isActiveCategory={category.id === activeCategory}
                        onClick={() => {
                            navigate(
                                {
                                    pathname: '/cardapio',
                                    search: `?categoria=${category.id}`
                                },
                                {
                                    replace: true
                                },
                            )
                            setActiveCategory(category.id)
                        }}

                    >{category.name}</CategoryButton>
                ))}
            </CategoryMenu>

            <ProductsContainer>
                {filteredProducts.map(product => (
                    <CardProduct key={product.id} product={product} />
                ))}
            </ProductsContainer>

        </Container>
    )
}