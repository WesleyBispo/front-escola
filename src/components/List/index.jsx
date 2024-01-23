import PropTypes from 'prop-types';
import { Ul } from './styled';

const List = ({ children }) => {
    return <Ul>{children}</Ul>;
};

export default List;

List.propTypes = {
    children: PropTypes.array.isRequired,
};
