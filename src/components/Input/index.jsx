import { Input } from './styled';
import PropTypes from 'prop-types';
const InputArea = ({ type, placeholder, name, id, value, onChange }) => {
    const placeholderStr =
        typeof placeholder === 'number' ? placeholder.toString() : placeholder;
    const valueStr = typeof value === 'number' ? value.toString() : value;
    return (
        <Input
            type={type}
            placeholder={placeholderStr}
            name={name}
            id={id}
            value={valueStr}
            onChange={onChange}
        />
    );
};

InputArea.propTypes = {
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
export default InputArea;
