import { Paragrafo, Title, Container, ContainerHome } from './styled';
import InputArea from '../../components/Input';
import HandleAlert from '../../utils/HandleAlert';
import Loader from '../../components/Loader';
import { loginRequest } from '../../features/login/loginSlice';

import axios from '../../services/axios';
import { Link, useNavigate } from 'react-router-dom';
import { isEmail } from 'validator';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLogged = useSelector((state) => state.login.isLogged);
    const token = useSelector((state) => state.login.token);
    const user = useSelector((state) => state.login.user);
    const [loading, setLoading] = useState(false);
    const isLoggedRef = useRef(isLogged);
    const tokenRef = useRef(token);

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

        setLoading(true);
        dispatch(loginRequest({ email, senha }));

        setTimeout(() => {
            if (!isLoggedRef.current || !tokenRef.current) {
                return setLoading(false);
            }
            navigate('/alunos');
            axios.defaults.headers.Authorization = `Bearer ${token}`;
            toast.success('Seja bem vindo');
            setLoading(false);
        }, 500);
    };
    return (
        <section>
            <Container>
                <Title>Home</Title>
                {loading && <Loader />}
                <ContainerHome>
                    {(!isLogged && (
                        <>
                            <div>
                                <Paragrafo>
                                    Bem-vindo à Secretaria Escolar Digital.
                                </Paragrafo>
                            </div>
                            <div className="container-form">
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
                                    <button type="submit">Entrar</button>
                                </form>
                                <p>
                                    Não tem uma conta?{' '}
                                    <Link to="/register">Cadastre-se</Link>
                                </p>
                            </div>
                        </>
                    )) || (
                        <>
                            <div>
                                <Paragrafo>
                                    Bem-vindo à Secretaria Escolar Digital.
                                </Paragrafo>
                            </div>
                            <div className="container-user">
                                <div className="container-foto">
                                    <FaUserCircle size={40} />
                                </div>
                                <div className="container-infos">
                                    <p>
                                        <strong>Id: </strong> {user.id}
                                    </p>
                                    <p>
                                        <strong>User: </strong> {user.nome}
                                    </p>
                                    <p>
                                        <strong>E-mail:</strong> {user.email}
                                    </p>
                                </div>
                            </div>
                        </>
                    )}
                </ContainerHome>
            </Container>
        </section>
    );
};

export default Home;
