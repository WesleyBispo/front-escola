import { Link, NavLink } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { Nav, Separator } from './styled';
import { useState } from 'react';
import {
    FaHome,
    FaSignInAlt,
    FaUserAlt,
    FaUserCog,
    FaAngleDown,
    FaAngleUp,
    FaPlus,
} from 'react-icons/fa';
import { PiStudentBold } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/login/loginSlice';
import axios from '../../services/axios';

export default function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const isLogged = useSelector((state) => state.login.isLogged);
    const dispatch = useDispatch();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    const handleLogout = () => {
        closeDropdown();
        axios.defaults.headers.Authorization = undefined;
        dispatch(logout());
    };

    return (
        <Nav open={isDropdownOpen}>
            <div className="icons-center">
                <NavLink
                    to="/"
                    className="nav-link"
                    data-tooltip-id="home"
                    data-tooltip-content="Home"
                    data-tooltip-place="top-end"
                >
                    <Tooltip id="home" />
                    <FaHome size="26px" />
                </NavLink>
                {!isLogged && (
                    <NavLink
                        to="/register"
                        className="nav-link"
                        data-tooltip-id="cadastro"
                        data-tooltip-content="Cadastre-se"
                        data-tooltip-place="top-left"
                    >
                        <Tooltip id="cadastro" />
                        <FaUserAlt size="26px" />
                    </NavLink>
                )}
                {isLogged && (
                    <>
                        <NavLink
                            to="/alunos"
                            className="nav-link"
                            data-tooltip-id="alunos"
                            data-tooltip-content="Alunos"
                            data-tooltip-place="top-left"
                        >
                            <Tooltip id="alunos" />
                            <PiStudentBold size="26px" />
                        </NavLink>
                        <NavLink
                            to="/aluno/register"
                            className="nav-link"
                            data-tooltip-id="criar"
                            data-tooltip-content="Cadastrar alunos"
                            data-tooltip-place="top-left"
                        >
                            <Tooltip id="criar" />
                            <PiStudentBold size="26px" />
                            <FaPlus size={10} />
                        </NavLink>
                    </>
                )}
            </div>
            <div className="dropdown" onClick={toggleDropdown}>
                <div
                    className="dropdown-toggle"
                    data-tooltip-id="dica"
                    data-tooltip-content="Opções"
                    data-tooltip-place="top-left"
                >
                    <Tooltip id="dica" />
                    {(isLogged && <FaUserCog size="26px" />) || (
                        <FaSignInAlt size="26px" />
                    )}
                    {(isDropdownOpen && <FaAngleUp />) || <FaAngleDown />}
                </div>
                {isDropdownOpen && (
                    <div className="dropdown-options" onClick={closeDropdown}>
                        {isLogged ? (
                            <>
                                <Link to="/edit" className="nav-link">
                                    Editar Perfil
                                </Link>
                                <Separator />
                                <Link
                                    to="/"
                                    className="nav-link"
                                    onClick={handleLogout}
                                >
                                    Sair
                                </Link>
                            </>
                        ) : (
                            <Link to="/login" className="nav-link">
                                Login
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </Nav>
    );
}
