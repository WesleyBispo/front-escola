import { Title, Container } from './styled';
import InputArea from '../../components/Input';
import Uploads from '../../components/Uploads';
import ListFile from '../../components/ListFile';
import { useSelector } from 'react-redux';
const Register = () => {
    const files = useSelector((state) => state.files.value);
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
                    />
                    <label htmlFor="sobrenome">Sobrenome:</label>
                    <InputArea
                        type="text"
                        placeholder="Digite o sobrenome do aluno"
                        name="sobrenome"
                        id="sobrenome"
                    />

                    <label htmlFor="email">E-mail:</label>
                    <InputArea
                        type="email"
                        placeholder="Digite o email do aluno"
                        name="email"
                        id="email"
                    />
                    <label htmlFor="idade">Idade:</label>
                    <InputArea
                        type="number"
                        placeholder="Digite o idade do aluno"
                        name="idade"
                        id="idade"
                    />
                    <label htmlFor="altura">Altura:</label>
                    <InputArea
                        type="number"
                        placeholder="Digite o altura do aluno"
                        name="altura"
                        id="altura"
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
