import { useState, useEffect } from 'react';
import { uniqueId } from 'lodash';
import { filesize } from 'filesize';
import isEmail from 'validator/lib/isEmail';
import isValidFloat from '../../utils/isValidFloat';
import { toast } from 'react-toastify';
import axios from '../../services/axios';
import { useSelector } from 'react-redux';

// Componentes e estilos
import { Title, Container } from './styled';
import InputArea from '../../components/Input';
import Uploads from '../../components/Uploads';
import ListFile from '../../components/ListFile';
import Loader from '../../components/Loader';
import HandleAlert from '../../utils/HandleAlert';
import useTokenHeader from '../../hooks/useTokenHeader';
const Register = () => {
    const token = useSelector((state) => state.login.token);
    const [student, setStudent] = useState({});
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    // Atualizar o cabeçalho de autenticação com o token
    useTokenHeader(token);

    // Função chamada quando os arquivos são selecionados/descartados
    const onUpload = (acceptedFiles) => {
        const newFiles = acceptedFiles.map((file) => ({
            id: uniqueId(),
            file: file,
            name: file.name,
            readableSize: filesize(file.size),
            preview: URL.createObjectURL(file),
            progress: 0,
            uploaded: false,
            error: false,
            url: null,
        }));
        setFiles((currentFiles) => [...currentFiles, ...newFiles]);
    };

    // Função para remover arquivo do estado
    const removeFile = (id) => {
        const fileToRemove = files.find((file) => file.id === id);
        if (fileToRemove) URL.revokeObjectURL(fileToRemove.preview);

        setFiles((currentFiles) =>
            currentFiles.filter((file) => file.id !== id)
        );
    };

    // Atualizar o progresso de upload de um arquivo
    const updateFileProgress = (id, progress) => {
        setFiles((currentFiles) =>
            currentFiles.map((file) => {
                return file.id === id ? { ...file, progress } : file;
            })
        );
    };

    // Atualizar o status de upload de um arquivo
    const updateFileUploadStatus = (id, uploaded, url = null) => {
        setFiles((currentFiles) =>
            currentFiles.map((file) => {
                return file.id === id ? { ...file, uploaded, url } : file;
            })
        );
    };

    // Função para enviar imagem para o backend
    const uploadImage = (file, idAluno) => {
        const formData = new FormData();
        formData.append('image', file.file);
        formData.append('id', idAluno);

        axios
            .post('/images', formData, {
                onUploadProgress: (progressEvent) => {
                    const progress = parseInt(
                        Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        )
                    );
                    updateFileProgress(file.id, progress);
                },
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            .then((response) => {
                updateFileUploadStatus(file.id, true, response.data.url);
                toast.success(`Aluno cadastrado com sucesso`);
                setLoading(false);
                setTimeout(() => {
                    setStudent({});
                    setFiles([]);
                }, 2000);
            })
            .catch((error) => {
                console.error('Erro ao enviar imagem:', error);
                toast.error(`Erro ao enviar imagem ${file.name}.`);
                updateFileUploadStatus(file.id, false);
            });
    };

    // Limpando os recursos ao desmontar o componente
    useEffect(() => {
        return () => {
            files.forEach((file) => URL.revokeObjectURL(file.preview));
        };
    }, [files]);
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
    const handlePeso = (e) => {
        handleChange(e);
        const peso = e.target.value;
        if (peso.length < 1) {
            HandleAlert.createAlert(
                e.target,
                'Peso inválido. Insira um número válido (ex: 80).'
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
        const peso = e.target.peso.value.trim();
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

        if (peso < 1) {
            formError = true;
            toast.error('Peso inválido.');
        }

        if (formError) return;

        setLoading(true);

        setTimeout(async () => {
            try {
                const response = await axios.post('/students/', {
                    nome,
                    sobrenome,
                    email,
                    altura,
                    idade,
                    peso,
                });

                const { id } = response.data;
                if (files.length > 0) {
                    files.forEach((file) => uploadImage(file, id));
                } else {
                    toast.success('Aluno cadastrado com sucesso!');
                    setStudent({});
                    setFiles([]);
                }
            } catch (error) {
                console.error(error);
                const { errors } = error.response.data;
                errors.forEach((err) => toast.error(err));
            } finally {
                setLoading(false);
            }
        }, 1000);
    };

    return (
        <section>
            <Container>
                {loading && <Loader />}
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
                    <label htmlFor="peso">Peso:</label>
                    <InputArea
                        type="number"
                        placeholder="Digite o o peso do aluno"
                        name="peso"
                        id="peso"
                        value={student.peso || ''}
                        onChange={handlePeso}
                    />
                    <label htmlFor="foto">Foto:</label>
                    <Uploads onUpload={onUpload} />
                    {files && <ListFile files={files} onRemove={removeFile} />}
                    <div className="div-btn">
                        <button type="submit">Cadastrar</button>
                    </div>
                </form>
            </Container>
        </section>
    );
};

export default Register;
