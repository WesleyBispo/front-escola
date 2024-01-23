import { Container, FileInfo, Preview } from './styled';
import { CircularProgressbar } from 'react-circular-progressbar';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';
import PropTypes from 'prop-types';

const ListFile = ({ files }) => {
    return (
        <Container>
            {files.map((file) => (
                <li key={file.id}>
                    <FileInfo>
                        <Preview src={file.preview} />
                        <div>
                            <strong>{file.name}</strong>
                            <span>
                                {file.readableSize}
                                {!!file.url && (
                                    <button
                                        onClick={() => {
                                            alert('EXCLUIR MSG');
                                        }}
                                        id="btn-delete"
                                    >
                                        Excluir
                                    </button>
                                )}
                            </span>
                        </div>
                    </FileInfo>
                    <div className="div-icons">
                        {!file.uploaded && !file.error && (
                            <CircularProgressbar
                                styles={{
                                    root: { width: 24 },
                                    path: { stroke: '#7159c1' },
                                }}
                                strokeWidth={10}
                                value={file.progress}
                            />
                        )}

                        {file.url && (
                            <a
                                href={file.preview}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <MdLink
                                    style={{ marginRight: 8 }}
                                    size={24}
                                    color="#222"
                                />
                            </a>
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
    files: PropTypes.array,
};

export default ListFile;
