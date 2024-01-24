import { Title, Container, Button, DivButton } from './styled';

import { loginRequest } from '../../features/login/loginSlice';
import InputArea from '../../components/Input';
import Loader from '../../components/Loader';
import axios from '../../services/axios';
import HandleAlert from '../../utils/HandleAlert';

import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isEmail } from 'validator';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const isLogged = useSelector((state) => state.login.isLogged);
    const isLoggedRef = useRef(isLogged);
    const token = useSelector((state) => state.login.token);
    const tokenRef = useRef(token);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { state } = location;

    // Sincronize isLoggedRef.current com isLogged sempre que isLogged mudar.
    useEffect(() => {
        isLoggedRef.current = isLogged;
        tokenRef.current = token;
    }, [isLogged, token]);

    const handleSenha = (e) => {
        HandleAlert.removeAlert(e.target);
        if (e.target.value.length < 6 || e.target.value.length > 50) {
            HandleAlert.createAlert(
                e.target,
                'O campo senha deve ter entre 6 e 50 caracteres'
            );
        }
    };
    const handleEmail = (e) => {
        HandleAlert.removeAlert(e.target);
        if (!isEmail(e.target.value.trim())) {
            HandleAlert.createAlert(e.target, 'E-mail inválido');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let formError = false;
        const email = e.target.email.value.trim();
        const senha = e.target.senha.value;

        if (senha.length < 6 || senha.length > 50) {
            formError = true;
            toast.error('A senha deve ter entre 6 e 50 caracteres');
        }

        if (!isEmail(email)) {
            formError = true;
            toast.error('E-mail inválido');
        }

        if (formError) return;

        dispatch(loginRequest({ email, senha }));

        setLoading(true);

        setTimeout(() => {
            if (!isLoggedRef.current || !tokenRef.current) {
                return setLoading(false);
            }
            toast.success('Seja bem vindo');
            const redirectTo = state?.from || '/alunos';
            navigate(redirectTo, { replaceState: true });
            axios.defaults.headers.Authorization = `Bearer ${token}`;
            setLoading(false);
        }, 500);
    };

    return (
        <section>
            <Container>
                <Title>Login</Title>
                {loading && <Loader />}
                <form method="post" onSubmit={handleSubmit}>
                    <label htmlFor="email">E-mail:</label>
                    <InputArea
                        type="email"
                        placeholder="Digite o seu email"
                        name="email"
                        id="email"
                        onChange={(e) => handleEmail(e)}
                    />
                    <label htmlFor="senha">Senha:</label>
                    <InputArea
                        type="password"
                        placeholder="Digite a sua senha"
                        name="senha"
                        id="senha"
                        onChange={(e) => handleSenha(e)}
                    />
                    <DivButton>
                        <Button type="submit">Entrar</Button>
                    </DivButton>
                </form>
            </Container>
        </section>
    );
};

export default Login;
