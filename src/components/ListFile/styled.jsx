import styled from 'styled-components';

export const Container = styled.ul`
    margin-top: 20px;

    li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #444;
        margin-bottom: 20px;
        padding-bottom: 5px;
        border-bottom: 1px solid #ccc;

        & + li {
            margin-top: 15px;
        }

        div.div-icons {
            display: flex;
            align-items: center;
        }
    }
`;

export const FileInfo = styled.div`
    display: flex;
    align-items: center;
    div.icon-size {
        display: flex;
        align-items: center;
        span {
            display: flex;
            align-items: center;
            font-size: 12px;
            color: #999;
            margin-top: 5px;
        }
    }
`;
export const Preview = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 5px;
    background-image: url(${(props) => props.src});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
    margin-right: 10px;
`;
