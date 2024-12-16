import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Image } from "@phosphor-icons/react"
import { useLocation, useNavigate } from "react-router-dom"

import {
    Container,
    InputGroup,
    Form,
    Label,
    Input,
    LabelUpload,
    Select,
    SubmitButton,
    ErrorMenssage,
    ContainerCheckbox
} from './styles'
import { useEffect, useState } from "react"
import { api } from './../../../services/api';
import { toast } from "react-toastify"

const schema = yup
    .object({
        name: yup.string().required('Digite o nome do produto!'),
        price: yup.number('O preço tem que ser um numero!').positive('O preço tem que ser um numero maior que 0!').required('Digite o preço do produto!').typeError('Digite o preço do produto!'),
        category: yup.object().required('escolha uma categoria!'),
        offer: yup.bool(),
    })


export function EditProducts() {
    const [fileName, setFileName] = useState(null)
    const [categories, setCategories] = useState([])
    const { state: { product } } = useLocation()
    const navigate = useNavigate()



    useEffect(() => {
        async function loadCategories() {
            const { data } = await api.get('/categories')
            setCategories(data)
        }
        loadCategories()
    }, [])



    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })
    const onSubmit = async (data) => {
        const productFormData = new FormData()

        productFormData.append('name', data.name)
        productFormData.append('price', data.price * 100)
        productFormData.append('category_id', data.category.id)
        productFormData.append('file', data.file[0])
        productFormData.append('offer', data.offer)


        await toast.promise(api.put(`/products/${product.id}`, productFormData), {
            pending: 'Editando Produto',
            success: 'Produto Editado com Sucesso',
            error: 'Falha ao Editadar o produto! Tente novamente'
        })

        setTimeout(() => {
            navigate('/admin/produtos')
        }, 2000);
    }

    return (

        <Container>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <InputGroup>
                    <Label>Nome</Label>
                    <Input type="text" {...register("name")} defaultValue={product.name} />
                    <ErrorMenssage>{errors?.name?.message}</ErrorMenssage>
                </InputGroup>

                <InputGroup>
                    <Label>Preço</Label>
                    <Input type="number" {...register("price")} defaultValue={product.price / 100} />
                    <ErrorMenssage>{errors?.price?.message}</ErrorMenssage>
                </InputGroup>

                <InputGroup>
                    <LabelUpload>
                        <Image />
                        <input
                            type="file"
                            {...register("file")}
                            accept="image/png, image/jpeg"
                            onChange={value => {
                                setFileName(value.target.files[0]?.name)
                                register('file').onChange(value)
                            }}
                        />
                        {fileName || 'Upload do Produto'}
                    </LabelUpload>
                    <ErrorMenssage>{errors?.file?.message}</ErrorMenssage>
                </InputGroup>

                <InputGroup>
                    <Label>Categoria</Label>
                    <Controller
                        defaultValue={product.category}
                        name="category"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={categories}
                                getOptionLabel={category => category.name}
                                getOptionValue={category => category.id}
                                placeholder='Categorias'
                                menuPortalTarget={document.body}
                                defaultValue={product.category}
                            />
                        )} />
                    <ErrorMenssage>{errors?.category?.message}</ErrorMenssage>
                </InputGroup>

                <InputGroup>
                    <ContainerCheckbox>
                        <input type="checkbox" defaultChecked={product.offer} {...register("offer")} />
                        <Label>Produto em Oferta?</Label>
                    </ContainerCheckbox>
                </InputGroup>

                <SubmitButton>Editar Produto</SubmitButton>
            </Form>
        </Container>
    )
}