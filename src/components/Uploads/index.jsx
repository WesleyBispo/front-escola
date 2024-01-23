import { useDropzone } from 'react-dropzone';
import { Container, UploadMessage } from './styled';
import { uniqueId } from 'lodash';
import { filesize } from 'filesize';
import { useDispatch } from 'react-redux';
import { addFile } from '../../features/uploads/uploadsSlice';

const Uploads = () => {
    const dispatch = useDispatch();
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

    const onUpload = (files) => {
        const [file] = files;
        console.log(file);
        const fileSchema = {
            id: uniqueId(),
            name: file.name,
            readableSize: filesize(file.size),
            preview: URL.createObjectURL(file),
            progress: 0,
            uploaded: false,
            error: false,
            url: null,
        };
        dispatch(addFile(fileSchema));
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

export default Uploads;
