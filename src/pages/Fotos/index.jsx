import { useParams } from 'react-router-dom';
import { Paragrafo, Title, Container, DivButton } from './styled';
import { useEffect, useState, useRef } from 'react';
import axios from '../../services/axios';
import StudentAvatar from '../../components/StudentAvatar';
import Loader from '../../components/Loader';
import Uploads from '../../components/Uploads';
import ListFile from '../../components/ListFile';
import useTokenHeader from '../../hooks/useTokenHeader';
import { useSelector } from 'react-redux';
import { uniqueId } from 'lodash';
import { filesize } from 'filesize';
import { toast, Flip } from 'react-toastify';

const Foto = () => {
    const { id } = useParams();
    const [foto, setFoto] = useState(null);
    const [nome, setNome] = useState('');
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState([]);
    const toastWarnId = useRef();
    const token = useSelector((state) => state.login.token);

    useTokenHeader(token);

    useEffect(() => {
        setLoading(true);
        const fetchImageById = async () => {
            try {
                const response = await axios.get(`/students/${id}`);
                const { nome, images } = response.data;
                setNome(nome);
                const ultimaFotoAdicionada =
                    images.length > 0 ? images[0] : null;
                setFoto(ultimaFotoAdicionada);
            } catch (error) {
                toast.error('Erro ao buscar imagem.');
            } finally {
                setLoading(false);
            }
        };

        fetchImageById();
    }, [id]);

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
        if (files.length > 0) {
            toast.dismiss();
            toastWarnId.current = toast.warning(
                'Cuidado, ao adicionar mais de uma foto somente última será a usada',
                { autoClose: false }
            );
        }
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
                if (files.length > 1) {
                    toast.update(toastWarnId.current, {
                        render: 'A última foto enviada foi inserida com sucesso',
                        type: toast.TYPE.SUCCESS,
                        transition: Flip,
                        autoClose: 2000,
                    });
                } else {
                    toast.success(`Imagem alterada com sucesso`);
                }
                setFoto(response.data);
                setLoading(false);
                setTimeout(() => {
                    setFiles([]);
                }, 2000);
            })
            .catch((error) => {
                console.error('Erro ao enviar imagem:', error);
                if (files.length > 1) {
                    toast.update(toastWarnId.current, {
                        render: 'Erro ao enviar a última foto adicionada',
                        type: toast.TYPE.SUCCESS,
                        transition: Flip,
                        autoClose: 2000,
                    });
                } else {
                    toast.error(`Erro ao enviar imagem ${file.name}.`);
                }
                updateFileUploadStatus(file.id, false);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (files.length > 0) {
            uploadImage(files[files.length - 1], id);
        } else {
            toast.error('Nenhum arquivo selecionado.');
        }
    };

    return (
        <section>
            <Container>
                {loading && <Loader />}
                <Title>Edite a Foto do Aluno</Title>
                <Paragrafo>{nome}</Paragrafo>
                <StudentAvatar
                    imageUrl={foto ? foto.url : null}
                    alt={'foto do aluno'}
                    tamanho={'150'}
                />
                <form onSubmit={handleSubmit}>
                    <Uploads onUpload={onUpload} />
                    {files && <ListFile files={files} onRemove={removeFile} />}
                    <DivButton>
                        <button type="submit">Alterar foto</button>
                    </DivButton>
                </form>
            </Container>
        </section>
    );
};

export default Foto;
