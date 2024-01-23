import { Title, Container } from './styled';
import InputArea from '../../components/Input';
import HandleAlert from '../../utils/HandleAlert';

import { useState } from 'react';

import { isEmail } from 'validator';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import useTokenHeader from '../../hooks/useTokenHeader';

import Loader from '../../components/Loader';
import axios from '../../services/axios';

import { logout } from '../../features/login/loginSlice';
const EditUser = () => {
    const user = useSelector((state) => state.login.user);
    const [userActive, setUserActive] = useState(user);
    const token = useSelector((state) => state.login.token);
    useTokenHeader(token);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false); // Adicionando estado para controle do loader
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserActive({ ...userActive, [name]: value });
    };
    const handleName = (e) => {
        handleChange(e);
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
        handleChange(e);
        HandleAlert.removeAlert(e.target);
        if (!isEmail(e.target.value.trim())) {
            HandleAlert.createAlert(e.target, 'E-mail inválido');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nome = e.target.nome.value.trim();
        const email = e.target.email.value.trim();
        let formError = false;

        if (nome.length < 3 || nome.length > 255) {
            formError = true;
            toast.error('O nome deve ter entre 3 e 255 caracteres');
        }

        if (!isEmail(email)) {
            formError = true;
            toast.error('E-mail inválido');
        }

        if (formError) return;

        // Ativando o loader
        setLoading(true);

        setTimeout(async () => {
            const { nome, email } = userActive;
            try {
                await axios.put('/users', { nome, email });
                toast.success('Edição feita com sucesso');
                dispatch(logout());
                toast.warning('Após essa alteração você deve entrar novamente');
                navigate('/');
            } catch (error) {
                console.log(error);
                if (error.response.status === 400) {
                    const { errors } = error.response.data;
                    errors.forEach((message) => {
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
                <Title>Edite sua conta</Title>
                <form method="post" onSubmit={handleSubmit}>
                    <label htmlFor="nome">Nome:</label>
                    <InputArea
                        type="text"
                        value={userActive.nome || ''}
                        placeholder="Atualize o nome do seu user"
                        name="nome"
                        id="nome"
                        onChange={handleName}
                    />
                    <label htmlFor="email">E-mail:</label>
                    <InputArea
                        type="email"
                        placeholder="Atualize o seu email"
                        value={userActive.email || ''}
                        name="email"
                        id="email"
                        onChange={handleEmail}
                    />
                    <div className="div-btn">
                        <button type="submit">Editar</button>
                    </div>
                </form>
            </Container>
        </section>
    );
};

export default EditUser;
