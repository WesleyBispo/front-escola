import { Container, FileInfo, Preview } from './styled';
import { CircularProgressbar } from 'react-circular-progressbar';
import { MdCheckCircle, MdError, MdLink, MdDelete } from 'react-icons/md'; // Importar MdDelete para o ícone de remoção
import PropTypes from 'prop-types';

const ListFile = ({ files, onRemove }) => {
    return (
        <Container>
            {files.map((file) => (
                <li key={file.id}>
                    <FileInfo>
                        <Preview src={file.preview} />
                        <div>
                            <strong>{file.name}</strong>
                            <div className="icon-size">
                                <span>{file.readableSize}</span>

                                {!file.uploaded && (
                                    <MdDelete
                                        size={20}
                                        color="#ff1744"
                                        onClick={() => onRemove(file.id)}
                                    />
                                )}
                            </div>
                        </div>
                    </FileInfo>
                    <div className="div-icons">
                        {file.preview && (
                            <a
                                href={file.preview} // Deve ser file.url para apontar para a imagem carregada no servidor
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ marginLeft: 10 }}
                            >
                                <MdLink
                                    style={{ marginRight: 8 }}
                                    size={24}
                                    color="#222"
                                />
                            </a>
                        )}
                        {!file.uploaded && !file.error && (
                            <>
                                <CircularProgressbar
                                    styles={{
                                        root: { width: 24 },
                                        path: { stroke: '#7159c1' },
                                    }}
                                    strokeWidth={10}
                                    value={file.progress}
                                />
                            </>
                        )}

                        {file.uploaded && (
                            <MdCheckCircle size={24} color="#00e676" />
                        )}
                        {file.error && <MdError size={24} color="#ff1744" />}
                    </div>
                </li>
            ))}
        </Container>
    );
};

ListFile.propTypes = {
    files: PropTypes.array.isRequired,
    onRemove: PropTypes.func.isRequired,
};

export default ListFile;
