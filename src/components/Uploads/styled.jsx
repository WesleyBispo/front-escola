import styled from 'styled-components';

const getColor = (props) => {
    if (props.$isDragAccept) {
        return '#00e676';
    }
    if (props.$isDragReject) {
        return '#ff1744';
    }
    if (props.default) {
        return '#cdcaca';
    }
};

export const UploadMessage = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px 0;
    color: ${(props) => getColor(props)};
`;

export const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-width: 2px;
    border-radius: 2px;
    border-color: ${(props) => getColor(props)};
    border-style: dashed;
    background-color: #fafafa;
    outline: none;
    transition: border 0.24s ease-in-out;
    margin: 10px 0;
`;
// Aceitar props transitórias
Container.defaultProps = {
    $isDragAccept: false,
    $isDragReject: false,
};
