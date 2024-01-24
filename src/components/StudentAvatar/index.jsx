import { FaUserCircle } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { AvatarContainer, Image } from './styled';

const StudentAvatar = ({ imageUrl, altText, children, tamanho }) => {
    return (
        <>
            <AvatarContainer>
                {imageUrl ? (
                    <Image src={imageUrl} alt={altText} tamanho={tamanho} />
                ) : (
                    <FaUserCircle size={180} color="#ccc" />
                )}
                {children}
            </AvatarContainer>
        </>
    );
};

StudentAvatar.propTypes = {
    imageUrl: PropTypes.string,
    altText: PropTypes.string,
    id: PropTypes.string,
    children: PropTypes.node,
    tamanho: PropTypes.string,
};

export default StudentAvatar;
