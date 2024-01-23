import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Home from '../pages/Home';
import Login from '../pages/Login';

import Page404 from '../pages/404/index';

import Foto from '../pages/Fotos';
import RegisterAluno from '../pages/RegisterAluno';
import Aluno from '../pages/Aluno';
import Alunos from '../pages/Alunos';

import RegisterUser from '../pages/RegisterUser';
import EditUser from '../pages/EditUser';
import EditAluno from '../pages/EditAluno';

export default function Routers() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterUser />}></Route>
            <Route
                path="/edit"
                element={
                    <PrivateRoute>
                        <EditUser />{' '}
                    </PrivateRoute>
                }
            ></Route>
            <Route
                path="/alunos"
                element={
                    <PrivateRoute>
                        <Alunos />
                    </PrivateRoute>
                }
            />
            <Route path="/aluno" element={<Aluno />} />
            <Route
                path="aluno/register"
                element={
                    <PrivateRoute>
                        <RegisterAluno />
                    </PrivateRoute>
                }
            ></Route>

            <Route
                path="/aluno/:id/edit"
                element={
                    <PrivateRoute>
                        <EditAluno />
                    </PrivateRoute>
                }
            />

            <Route
                path="/fotos/:id"
                element={
                    <PrivateRoute>
                        <Foto />
                    </PrivateRoute>
                }
            ></Route>
            <Route path="*" element={<Page404 />}></Route>
        </Routes>
    );
}
