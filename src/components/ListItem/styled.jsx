import styled from 'styled-components';
import { primaryColor, warningColor } from '../../config/colors';

export const Li = styled.li`
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    width: 100%;
    height: 80px;
    margin: 8px 10px 0 0;
    gap: 10px;
    border-bottom: 2px solid black;

    div.container-info {
        padding: 10px;
        width: 100%;
        p {
            margin: 2px 0;
            font-size: 16px;
        }
    }

    div.container-foto {
        img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 1px solid ${primaryColor};
        }

        svg {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 1px solid ${primaryColor};
        }
    }

    div.container-icons {
        .icon-delete {
            color: ${primaryColor};
            cursor: pointer;
            &:hover {
                opacity: 0.7;
                transform: scale(1.1);
            }
        }
        .icon-edit {
            color: ${warningColor};
            cursor: pointer;
            &:hover {
                opacity: 0.7;
                transform: scale(1.1);
            }
        }
    }
`;
