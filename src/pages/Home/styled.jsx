import styled from 'styled-components';

export const Title = styled.h1`
    font-size: 3rem;

    small {
        color: white;
        font-size: 20px;
        margin-left: 10px;
    }
`;
export const Paragrafo = styled.p`
    padding: 10px;
    font-size: 20px;
    margin-right: 10px;
`;

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    row-gap: 10px;
`;

export const ContainerHome = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-top: 10px;
    row-gap: 10px;
    justify-content: space-between;
    div {
        flex: 1;
    }
    div.container-form {
        display: flex;
        flex-direction: column;
        p {
            margin-top: 10px;
            a {
                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }

    div.container-user {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 5px;
        div {
            flex: 1;
        }
    }
`;
