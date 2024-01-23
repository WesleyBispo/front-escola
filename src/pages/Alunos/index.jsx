import { toast } from 'react-toastify';
import axios from '../../services/axios';

import { Paragrafo, Title, Container } from './styled';
import { useEffect, useState } from 'react';

import ListItem from '../../components/ListItem';
import List from '../../components/List';

import { useSelector } from 'react-redux';
import useTokenHeader from '../../hooks/useTokenHeader';

const Alunos = () => {
    const [students, setStudents] = useState([]);
    const token = useSelector((state) => state.login.token);
    useTokenHeader(token);
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('/students');
                const { data } = response;
                setStudents(data.dataStudents);
            } catch (error) {
                toast.error('Erro ao buscar os dados de alunos');
            }
        };

        fetchStudents();
    }, [students]);
    return (
        <section>
            <Container>
                <Title>Alunos</Title>
                {students.length > 0 ? (
                    <List>
                        {students.map((student) => (
                            <ListItem
                                key={student.id}
                                id={student.id}
                                nome={student.nome}
                                email={student.email}
                                idade={student.idade}
                                fotos={student.Images}
                            />
                        ))}
                    </List>
                ) : (
                    <Paragrafo>Não há alunos cadastrados</Paragrafo>
                )}
            </Container>
        </section>
    );
};

export default Alunos;
