import styled from 'styled-components';

export const AvatarContainer = styled.div`
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
`;

export const Image = styled.img`
    width: ${(props) => `${props.tamanho}px` || '180px'};
    height: ${(props) => `${props.tamanho}px` || '180px'};
    border-radius: 50%;
    object-fit: cover;
`;
