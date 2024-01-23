import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

PrivateRoute.defaultProps = {
    isClosed: true,
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
    isClosed: PropTypes.bool,
};

export default function PrivateRoute({ children, isClosed }) {
    const location = useLocation();
    const locationCurrent = location.pathname;
    const isLogged = useSelector((state) => state.login.isLogged);

    if (isClosed && !isLogged) {
        return <Navigate to={'/login'} state={{ from: locationCurrent }} />;
    }

    return children;
}
