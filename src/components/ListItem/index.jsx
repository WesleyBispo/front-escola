import PropTypes from 'prop-types';
import { Li } from '../ListItem/styled';
import { FaUserCircle, FaEdit, FaWindowClose } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import axios from '../../services/axios';
import { toast, Flip } from 'react-toastify';

import Modal from '../Modal';
import Loader from '../Loader';

const ListItem = ({ id, nome, email, idade, fotos }) => {
    const toastWarnId = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const ultimaFotoAdicionada = fotos.length > 0 ? fotos[0] : null;

    const handleDeleteAsk = (e) => {
        e.preventDefault();
        toastWarnId.current = toast.warning('Cuidado!!! Você irá excluir', {
            autoClose: false,
        });
        setIsModalOpen(true);
    };

    const handleDeleteConfirm = (id) => {
        setIsModalOpen(false);
        setLoading(true);
        setTimeout(async () => {
            try {
                await axios.delete(`/students/${id}`);
                toast.update(toastWarnId.current, {
                    render: 'Aluno Removido com sucesso',
                    type: toast.TYPE.SUCCESS,
                    transition: Flip,
                    autoClose: 2000,
                });
            } catch (error) {
                const { errors } = error.response.data;
                errors.forEach((err) =>
                    toast.update(toastWarnId.current, {
                        render: err,
                        type: toast.TYPE.ERROR,
                        transition: Flip,
                        autoClose: 2000,
                    })
                );
            } finally {
                setLoading(false);
            }
        }, 2000);
    };
    return (
        <Li key={id}>
            {loading && <Loader />}
            <div className="container-icons">
                <Link onClick={handleDeleteAsk}>
                    <FaWindowClose className="icon-delete" />
                </Link>
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        toast.update(toastWarnId.current, {
                            render: 'Operação cancelada',
                            type: toast.TYPE.INFO,
                            transition: Flip,
                            autoClose: 2000,
                        });
                    }}
                    title="Confirmar Exclusão"
                    onConfirm={() => handleDeleteConfirm(id)}
                    type="delete"
                >
                    Tem certeza que deseja excluir o aluno {nome}?
                </Modal>
                <Link to={`/aluno/${id}/edit`}>
                    <FaEdit className="icon-edit" />
                </Link>
            </div>
            <div className="container-info">
                <p>
                    <strong>Nome:</strong> {nome}
                </p>
                <p>
                    <strong>E-mail:</strong> {email}
                </p>
                <p>
                    <strong>Idade:</strong> {idade}
                </p>
            </div>
            <div className="container-foto">
                {ultimaFotoAdicionada ? (
                    <img src={ultimaFotoAdicionada.url} alt={nome} />
                ) : (
                    <FaUserCircle />
                )}
            </div>
        </Li>
    );
};

export default ListItem;

ListItem.propTypes = {
    id: PropTypes.number.isRequired,
    nome: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    idade: PropTypes.number.isRequired,
    fotos: PropTypes.array,
};
