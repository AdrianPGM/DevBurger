import styled from "styled-components";

export const Container = styled.div`
    background-color: ${props => props.theme.white};
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin-bottom: 20px;

    * {
        color: ${props => props.theme.secondBlack};
        font-weight: 500;
    }

    .container-top {
        display: grid;
        grid-gap: 10px 30%;

        grid-template-areas: 
        'title title'
        'products products-price'
        'delivery-tax delivery-tax-price';

        .title {
            grid-area: title;
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 20px;
            background-color: ${props => props.theme.secondBlack};
            color: ${props => props.theme.white};
            width: 100%;
            padding: 15px;
            text-align: center;
            border-top-right-radius: 20px;
            border-top-left-radius: 20px;

        }

        .products {
            grid-area: products;
            padding-left: 20px;
        }

        .products-price {
            grid-area: products-price;
            padding-right: 20px;
        }

        .delivery-tax {
            grid-area: delivery-tax;
            padding-left: 20px;
        }

        .delivery-tax-price {
            grid-area: delivery-tax-price;
            padding-right: 20px;
        }
    }

    .container-bottom{
        display: flex;
        justify-content: space-between;
        font-size: 20px;
        font-weight: 700;
        margin-top: 24px;
        padding: 20px;

        * {
        font-weight: 700;
    }
    }
`

