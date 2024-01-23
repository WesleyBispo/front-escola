import styled from 'styled-components';
import { primaryColor } from '../../config/colors';

export const Nav = styled.nav`
    background-color: ${primaryColor};
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    div.icons-center {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    a {
        color: #fff;
        margin: 0 10px 0;
        font-weight: bold;
        text-decoration: none;

        &.active {
            transform: scale(1.4);
            border-bottom: 1px solid #fff; // Cor quando o link estiver ativo
        }
    }

    .dropdown {
        position: relative;
        cursor: pointer;
        width: 9%;

        .dropdown-toggle {
            display: flex;
            align-items: center;
            padding: 5px;
            color: #fff;
            width: 100%;

            svg {
                margin-left: 5px;
            }
        }

        .dropdown-options {
            position: absolute;
            top: 100%;
            left: 0;
            display: ${({ open }) => (open ? 'block' : 'none')};
            background-color: #212529;
            border: 1px solid #fff;
            border-top: none;
            padding: 10px;
            box-shadow: 0 2px 4px rgba(85, 85, 85, 0.1);
            border-radius: 5px;

            a {
                width: 100%;
                color: #adb5bd;
                margin: 5px 0;
                text-decoration: none;
                display: block;

                &:hover {
                    color: #fff;
                    text-decoration: underline;
                }
            }
        }
    }
`;

export const Separator = styled.div`
    width: 100%;
    height: 1px;
    background-color: #fff;
`;
