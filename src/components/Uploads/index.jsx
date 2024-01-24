import { useDropzone } from 'react-dropzone';
import { Container, UploadMessage } from './styled';
import PropTypes from 'prop-types';

const Uploads = ({ onUpload }) => {
    const getUploadMessage = (isDragAccept, isDragReject) => {
        if (isDragAccept) {
            return (
                <UploadMessage $isDragAccept>
                    Solte a foto do aluno aqui
                </UploadMessage>
            );
        }
        if (isDragReject) {
            return (
                <UploadMessage $isDragReject>
                    Arquivo não suportado
                </UploadMessage>
            );
        }
        return (
            <UploadMessage default>
                Arraste a foto do aluno aqui...
            </UploadMessage>
        );
    };

    const { getRootProps, getInputProps, isDragAccept, isDragReject } =
        useDropzone({
            noClick: true,
            noKeyboard: true,
            maxFiles: 1,
            accept: { 'image/*': [] },
            onDropAccepted: onUpload,
        });

    return (
        <>
            <Container
                default
                {...getRootProps({
                    $isDragAccept: isDragAccept,
                    $isDragReject: isDragReject,
                })}
            >
                <input {...getInputProps()} />
                {getUploadMessage(isDragAccept, isDragReject)}
            </Container>
        </>
    );
};

Uploads.propTypes = {
    onUpload: PropTypes.func,
};

export default Uploads;
