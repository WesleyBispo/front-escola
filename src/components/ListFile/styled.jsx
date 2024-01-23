import styled from 'styled-components';

export const Container = styled.ul`
    margin-top: 20px;

    li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #444;

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
    div {
        display: flex;
        flex-direction: column;
        span {
            display: flex;
            align-items: center;
            font-size: 12px;
            color: #999;
            margin-top: 5px;
            button {
                border: 0;
                background: transparent;
                color: #ff1744;
                margin-left: 5px;
                cursor: pointer;

                &:hover {
                    opacity: 0.7;
                }
            }
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
