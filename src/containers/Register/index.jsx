
import { Container, Form, InputContainer, LeftContainer, RightContainer, Title, Link } from "./styles"
import Logo from "../../assets/logo.svg"

import { Button } from "../../components/Button"
import { api } from "../../services/api"
import { useNavigate } from "react-router-dom"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { toast } from "react-toastify"




export function Register() {

    const navigate = useNavigate();
    const schema = yup.object({
        name: yup.string().required("O nome é obrigatório."),
        email: yup.string().email("Digite um e-mail válido.").required("O e-mail é obrigatório."),
        password: yup.string().min(6, "A senha deve ter pelo menos 6 caracteres.").required("Digite um senha."),
        confirmPassword: yup.string().oneOf([yup.ref("password")], "As senhas devem ser idênticas!").required("Confirme sua senha."),
    })
        .required();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    console.log(errors)


    const onSubmit = async (data) => {
    try {
        const response = await api.post("/users",
            {
                name: data.name,
                email: data.email,
                password: data.password,
            },
            {
                validateStatus: () => true,
            },
        );

        const { status, data: responseData } = response;

        if (status === 200 || status === 201) {
            setTimeout(() => {
                navigate("/login");
            }, 2000);
            toast.success("Conta criada com sucesso!");
        } else if (
            status === 400 &&
            responseData?.error?.toLowerCase().includes("user already exists")
        ) {
            toast.error("Email já cadastrado! Faça o login para continuar.");
        } else {
            toast.error("Erro inesperado. Verifique os dados e tente novamente.");
        }

    } catch (error) {
        console.log("Erro capturado no catch:", error.response?.data || error.message);
        toast.error("😭 Falha no Sistema! Tente novamente!");
    }
};

    return (
        <Container>
            <LeftContainer>
                <img src={Logo} alt="logo-devburguer" />
            </LeftContainer>
            <RightContainer>
                <Title>Criar Conta</Title>
                <Form onSubmit={handleSubmit(onSubmit)}>

                    <InputContainer>
                        <label>Name</label>
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
                        <label>Confirmar Senha</label>
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
    )
}