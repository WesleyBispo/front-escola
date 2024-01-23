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
    font-size: 20px;
`;

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    row-gap: 10px;
`;

export const Button = styled.button`
    width: 50%;
    margin: auto;
`;

export const DivButton = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
`;
