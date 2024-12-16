import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Image } from "@phosphor-icons/react"

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
        file: yup.mixed().test('required', 'Escolha um arquivo para continuar', value => {
            return value && value.length > 0
        }).test('fileSize', 'Carregue arquivos ate 5mb', value => {
            return value && value.length > 0 && value[0].size <= 50000
        }).test('type', 'Carregue imagens PNG ou JPEG', value => {
            return value && value.length > 0 && (value[0].type === 'image/jpeg' || 'image/png')
        }),
    })


export function NewProduct() {
    const [fileName, setFileName] = useState(null)
    const [categories, setCategories] = useState([])

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

        await toast.promise(api.post('/products', productFormData), {
            pending: 'Adicionando Produto',
            success: 'Produto Criado com Sucesso',
            error: 'Falha ao Adicionar o produto! Tente novamente'
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
                    <Input type="text" {...register("name")} />
                    <ErrorMenssage>{errors?.name?.message}</ErrorMenssage>
                </InputGroup>

                <InputGroup>
                    <Label>Preço</Label>
                    <Input type="number" {...register("price")} />
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
                            />
                        )} />
                    <ErrorMenssage>{errors?.category?.message}</ErrorMenssage>
                </InputGroup>
                <InputGroup>
                    <ContainerCheckbox>
                        <input type="checkbox"  {...register("offer")} />
                        <Label>Produto em Oferta?</Label>
                    </ContainerCheckbox>
                </InputGroup>


                <SubmitButton>Adicionar Produto</SubmitButton>
            </Form>
        </Container>
    )
}