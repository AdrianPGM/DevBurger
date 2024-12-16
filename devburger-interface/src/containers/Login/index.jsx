import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { api } from '../../services/api'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/UserContext";



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

export function Login() {
	const navigate = useNavigate()
	const { putUserData } = useUser()

	const schema = yup.object({
		email: yup.string().required('o e-mail é um campo obrigatorio')
			.email('digite um e-mail válido'),
		password: yup.string()
			.min(6, 'a senha deve ter pelo menos 6 caracteres')
			.required('digite uma senha'),
	}).required();

	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema)
	});

	const onSubmit = async (data) => {

		try {
			const { status, data: userData } = await api.post(
				'./session',
				{
					email: data.email,
					password: data.password
				},
				{
					validateStatus: () => true
				}
			)
			if (status === 200 || status === 201) {


				setTimeout(() => {

					if (userData?.admin) {
						navigate('/admin/pedidos')
					} else {
						navigate('/')
					}
				}, 2000);

				toast.success('Seja Bem-vindo(a)!')

				putUserData(userData)

				//localStorage.setItem('token', token)

			} else if (status === 401) {

				toast.error('Email ou senha incorretos.')

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
					Olá, seja bem vindo ao <span>Dev Burguer!</span>
					<br />
					Acesse com seu <span>Login e senha.</span>
				</Title>

				<Form onSubmit={handleSubmit(onSubmit)}>

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

					<Button type="submit" >Entrar</Button>

				</Form>
				<p>
					Não possui conta? <Link to="/cadastro">Clique aqui.</Link>
				</p>
			</RightContainer>
		</Container>
	);
}



