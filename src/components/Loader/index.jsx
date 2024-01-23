import { ThreeDots } from 'react-loader-spinner';
import { DivLoader } from './styled';
import { primaryColor } from '../../config/colors';

const Loader = () => {
    return (
        <DivLoader>
            <ThreeDots
                visible={true}
                height="80"
                width="80"
                color={primaryColor}
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </DivLoader>
    );
};
export default Loader;
