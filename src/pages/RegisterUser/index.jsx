import { Title, Container } from './styled';
import InputArea from '../../components/Input';
import HandleAlert from '../../utils/HandleAlert';

import { useState } from 'react';

import { isEmail } from 'validator';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import axios from '../../services/axios';
const Register = () => {
    const [loading, setLoading] = useState(false); // Adicionando estado para controle do loader
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();
    const handleName = (e) => {
        const nome = e.target.value.trim();
        HandleAlert.removeAlert(e.target);
        if (nome.length < 3 || nome.length > 255) {
            HandleAlert.createAlert(
                e.target,
                'O nome deve ter entre 3 e 255 caracteres'
            );
        }
    };

    const handleEmail = (e) => {
        HandleAlert.removeAlert(e.target);
        if (!isEmail(e.target.value.trim())) {
            HandleAlert.createAlert(e.target, 'E-mail inválido');
        }
    };

    const handleSenha = (e) => {
        HandleAlert.removeAlert(e.target);
        if (e.target.value.length < 6 || e.target.value.length > 50) {
            HandleAlert.createAlert(
                e.target,
                'A senha senha deve ter entre 6 e 50 caracteres'
            );
        }

        setSenha(e.target.value);
    };

    const handleSenhaConfirm = (e) => {
        HandleAlert.removeAlert(e.target);
        if (e.target.value !== senha) {
            HandleAlert.createAlert(e.target, 'As senhas devem corresponderem');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nome = e.target.nome.value.trim();
        const email = e.target.email.value.trim();
        const senha = e.target.senha.value;
        const senhaConfirm = e.target.senhaConfirm.value;
        let formError = false;

        if (nome.length < 3 || nome.length > 255) {
            formError = true;
            toast.error('O nome deve ter entre 3 e 255 caracteres');
        }

        if (!isEmail(email)) {
            formError = true;
            toast.error('E-mail inválido');
        }

        if (senha.length < 6 || senha.length > 50) {
            formError = true;
            toast.error('A senha deve ter entre 6 e 50 caracteres');
        }

        if (senhaConfirm !== senha) {
            formError = true;
            toast.error('As duas senhas não coincidem');
        }

        if (formError) return;

        // Ativando o loader
        setLoading(true);

        setTimeout(async () => {
            try {
                await axios.post('/users', { nome, password: senha, email });
                toast.success('Cadastro feito com sucesso');
                navigate('/login');
            } catch (error) {
                // Como minha api faz validação se email existe no DB
                // eu exibo uma mensagem mais informativa para meu user
                if (error.response.status === 400) {
                    const { errors } = error.response.data;
                    const arrayMessagesError = errors[1];
                    arrayMessagesError.forEach((message) => {
                        toast.error(message);
                    });
                } else {
                    toast.error('Erro ao cadastrar, Tente novamente');
                }
            } finally {
                setLoading(false);
            }
        }, 2000);
    };

    return (
        <section>
            {/* Renderize o loader se o estado de loading for verdadeiro */}
            {loading && <Loader />}
            <Container>
                <Title>Crie sua conta</Title>
                <form method="post" onSubmit={handleSubmit}>
                    <label htmlFor="nome">Nome:</label>
                    <InputArea
                        type="text"
                        placeholder="Digite seu nome"
                        name="nome"
                        id="nome"
                        onChange={handleName}
                    />
                    <label htmlFor="email">E-mail:</label>
                    <InputArea
                        type="email"
                        placeholder="Digite seu e-mail"
                        name="email"
                        id="email"
                        onChange={handleEmail}
                    />
                    <label htmlFor="senha">Senha:</label>
                    <InputArea
                        type="password"
                        placeholder="Digite a sua senha"
                        name="senha"
                        id="senha"
                        onChange={handleSenha}
                    />
                    <label htmlFor="confirm-senha">Confirme sua senha:</label>
                    <InputArea
                        type="password"
                        placeholder="Digite novamente sua senha"
                        name="senhaConfirm"
                        id="confirm-senha"
                        onChange={handleSenhaConfirm}
                    />
                    <div className="div-btn">
                        <button type="submit">Cadastrar</button>
                    </div>
                </form>
            </Container>
        </section>
    );
};

export default Register;
