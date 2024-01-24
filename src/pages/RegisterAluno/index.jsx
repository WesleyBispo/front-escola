import { Title, Container } from './styled';
import InputArea from '../../components/Input';
import Uploads from '../../components/Uploads';
import ListFile from '../../components/ListFile';
import HandleAlert from '../../utils/HandleAlert';

import { useSelector } from 'react-redux';
import { useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import isValidFloat from '../../utils/isValidFloat';
const Register = () => {
    const files = useSelector((state) => state.files.value);
    const [student, setStudent] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent((prevStudent) => ({ ...prevStudent, [name]: value }));
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
        const email = e.target.value.trim();
        HandleAlert.removeAlert(e.target);
        if (!isEmail(email)) {
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

    const handleSubmit = (e) => {
        console.log(e);
        e.preventDefault();
        alert('Cadastro feito com sucesso');
        console.log(e.target.value);
    };

    return (
        <section>
            <Container>
                <Title>Registro</Title>
                <form method="post" onSubmit={handleSubmit}>
                    <label htmlFor="nome">Nome:</label>
                    <InputArea
                        type="text"
                        placeholder="Digite o nome do aluno"
                        name="nome"
                        id="nome"
                        value={student.nome || ''}
                        onChange={handleName}
                    />
                    <label htmlFor="sobrenome">Sobrenome:</label>
                    <InputArea
                        type="text"
                        placeholder="Digite o sobrenome do aluno"
                        name="sobrenome"
                        id="sobrenome"
                        value={student.sobrenome || ''}
                        onChange={handleSobrenome}
                    />

                    <label htmlFor="email">E-mail:</label>
                    <InputArea
                        type="email"
                        placeholder="Digite o email do aluno"
                        name="email"
                        id="email"
                        value={student.email || ''}
                        onChange={handleEmail}
                    />
                    <label htmlFor="idade">Idade:</label>
                    <InputArea
                        type="number"
                        placeholder="Digite o idade do aluno"
                        name="idade"
                        id="idade"
                        value={student.idade || ''}
                        onChange={handleIdade}
                    />
                    <label htmlFor="altura">Altura:</label>
                    <InputArea
                        type="number"
                        placeholder="Digite o altura do aluno"
                        name="altura"
                        id="altura"
                        value={student.altura || ''}
                        onChange={handleAltura}
                    />
                    <label htmlFor="foto">Foto:</label>
                    <Uploads />
                    {files && <ListFile files={files} />}
                    <div className="div-btn">
                        <button type="submit">Cadastrar</button>
                    </div>
                </form>
            </Container>
        </section>
    );
};

export default Register;
