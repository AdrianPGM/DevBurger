import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { api } from '../../services/api'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


import Logo from "../../assets/logo.svg";
import {
	Container,
	Form,
	InputContainer,
	LeftContainer,
	RightContainer,
	Title,
	Link
} from "./styles";
import { Button } from '../../components/Button'

export function Register() {
	const navigate = useNavigate()

	const schema = yup.object({
		name: yup.string().required('O nome é Obrigatório'),

		email: yup.string().required('o e-mail é um campo obrigatorio')
			.email('digite um e-mail válido'),

		password: yup.string()
			.min(6, 'a senha deve ter pelo menos 6 caracteres')
			.required('digite uma senha'),

		confirmPassword: yup
			.string()
			.oneOf([yup.ref('password')], 'A senhas devem ser iguais')
			.required('Confirme sua senha')

	}).required();

	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema)
	});

	const onSubmit = async (data) => {


		try {
			const { status } =
				await api.post('./users', {
					name: data.name,
					email: data.email,
					password: data.password
				},
					{
						validateStatus: () => true,
					})
			if (status === 200 || status === 201) {
				setTimeout(() => {
					navigate('/login')
				}, 2000);
				toast.success('Conta criada com sucesso!')
			} else if (status === 409) {
				toast.error('Email já cadastrado! Faça o login para continuar')
			} else {
				throw new Error()
			}
		} catch (error) {
			toast.error('😭 Falha no Sistema! Tente novamente')
		}


	}

	return (
		<Container>
			<LeftContainer>
				<img src={Logo} alt="logo-devbuger" />
			</LeftContainer>
			<RightContainer>

				<Title>
					Criar Conta
				</Title>

				<Form onSubmit={handleSubmit(onSubmit)}>
					<InputContainer>
						<label>Nome</label>
						<input type="text" {...register("name")} />
						<p>{errors?.name?.message}</p>
					</InputContainer>

					<InputContainer>
						<label>Email</label>
						<input type="email" {...register("email")} />
						<p>{errors?.email?.message}</p>
					</InputContainer>

					<InputContainer>
						<label>Senha</label>
						<input type="password" {...register("password")} />
						<p>{errors?.password?.message}</p>
					</InputContainer>

					<InputContainer>
						<label>Confirmar senha</label>
						<input type="password" {...register("confirmPassword")} />
						<p>{errors?.confirmPassword?.message}</p>
					</InputContainer>

					<Button type="submit">Criar Conta</Button>

				</Form>
				<p>
					Já possui conta? <Link to="/login">Clique aqui.</Link>
				</p>
			</RightContainer>
		</Container>
	);
}



