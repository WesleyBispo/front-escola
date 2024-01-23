import { Title, Container } from './styled';
import InputArea from '../../components/Input';

import HandleAlert from '../../utils/HandleAlert';
import isValidFloat from '../../utils/isValidFloat';

import { useEffect, useState } from 'react';

import { isEmail } from 'validator';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';
import useTokenHeader from '../../hooks/useTokenHeader';

import Loader from '../../components/Loader';
import axios from '../../services/axios';

const EditAluno = () => {
    const token = useSelector((state) => state.login.token);
    useTokenHeader(token);
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [student, setStudent] = useState({});

    useEffect(() => {
        const fetchStudent = async () => {
            const response = await axios.get(`/students/${id}`);
            const { nome, sobrenome, email, idade, altura, images } =
                response.data;
            setStudent({ nome, sobrenome, email, idade, altura, images });
        };
        fetchStudent();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent((prevStudent) => ({
            ...prevStudent,
            [name]: value,
        }));
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
    const handleSobrenome = (e) => {
        handleChange(e);
        const sobrenome = e.target.value.trim();
        HandleAlert.removeAlert(e.target);
        if (sobrenome.length < 3 || sobrenome.length > 255) {
            HandleAlert.createAlert(
                e.target,
                'O sobrenome deve ter entre 3 e 255 caracteres'
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
    const handleIdade = (e) => {
        handleChange(e);
        HandleAlert.removeAlert(e.target);
        if (e.target.value.length < 1) {
            HandleAlert.createAlert(e.target, 'Idade inválida');
        }
    };
    const handleAltura = (e) => {
        handleChange(e);
        const altura = e.target.value;
        if (!isValidFloat(altura)) {
            HandleAlert.createAlert(
                e.target,
                'Altura inválida. Insira um número válido (ex: 1.75).'
            );
        } else {
            HandleAlert.removeAlert(e.target);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nome = e.target.nome.value.trim();
        const email = e.target.email.value.trim();
        const sobrenome = e.target.sobrenome.value.trim();
        const idade = e.target.idade.value;
        const altura = e.target.altura.value.trim();
        let formError = false;

        if (nome.length < 3 || nome.length > 255) {
            formError = true;
            toast.error('O nome deve ter entre 3 e 255 caracteres');
        }

        if (!isEmail(email)) {
            formError = true;
            toast.error('E-mail inválido');
        }

        if (sobrenome.length < 3 || sobrenome.length > 255) {
            formError = true;
            toast.error('O sobrenome deve ter entre 3 e 255 caracteres');
        }

        if (idade < 1) {
            formError = true;
            toast.error('Idade inválida');
        }

        if (!isValidFloat(altura)) {
            formError = true;
            toast.error('Altura inválida.');
        }

        if (formError) return;

        setLoading(true);

        setTimeout(async () => {
            try {
                await axios.put(`/students/${id}`, {
                    nome,
                    sobrenome,
                    email,
                    altura,
                    idade,
                });
                toast.success('Edição feita com sucesso');
            } catch (error) {
                console.log(error);
                if (error.response.status === 400) {
                    const { errors } = error.response.data;
                    errors.forEach((message) => {
                        toast.error(message);
                    });
                } else {
                    toast.error('Erro ao atualizar o aluno, Tente novamente');
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
                {student && (
                    <>
                        <Title>Edite o aluno</Title>
                        <form method="post" onSubmit={handleSubmit}>
                            <label htmlFor="nome">Nome:</label>
                            <InputArea
                                type="text"
                                name="nome"
                                id="nome"
                                placeholder="Altere o nome do aluno"
                                value={student.nome || ''}
                                onChange={handleName}
                            />
                            <label htmlFor="sobrenome">Sobrenome:</label>
                            <InputArea
                                type="text"
                                name="sobrenome"
                                id="sobrenome"
                                value={student.sobrenome || ''}
                                placeholder="Altere o sobrenome do aluno"
                                onChange={handleSobrenome}
                            />
                            <label htmlFor="email">E-mail:</label>
                            <InputArea
                                type="email"
                                placeholder="Altere o email do aluno"
                                value={student.email || ''}
                                name="email"
                                id="email"
                                onChange={handleEmail}
                            />
                            <label htmlFor="idade">Idade:</label>
                            <InputArea
                                type="number"
                                placeholder="Altere a idade do aluno"
                                value={student.idade || ''}
                                name="idade"
                                id="idade"
                                onChange={handleIdade}
                            />
                            <label htmlFor="altura">Altura:</label>
                            <InputArea
                                type="text"
                                name="altura"
                                id="altura"
                                placeholder="Altura (ex: 1.75)"
                                value={student.altura || ''}
                                onChange={handleAltura}
                            />
                            <div className="div-btn">
                                <button type="submit">Editar</button>
                            </div>
                        </form>
                    </>
                )}
            </Container>
        </section>
    );
};

export default EditAluno;
