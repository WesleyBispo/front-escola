import './style.css';
import * as Ariakit from '@ariakit/react';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, title, children, onConfirm }) => {
    if (!isOpen) return null;
    return (
        <div className="dialog-overlay" onClick={onClose}>
            <Ariakit.Dialog
                open={isOpen}
                onClose={onClose}
                className="dialog"
                onClick={(e) => e.stopPropagation()}
            >
                <Ariakit.DialogHeading className="heading">
                    {title}
                </Ariakit.DialogHeading>
                <div className="description">{children}</div>
                <div className="dialog-actions">
                    <Ariakit.DialogDismiss className="button" onClick={onClose}>
                        Cancelar
                    </Ariakit.DialogDismiss>
                    <button className="button" onClick={onConfirm}>
                        Confirmar
                    </button>
                </div>
            </Ariakit.Dialog>
        </div>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    onConfirm: PropTypes.func.isRequired,
};

export default Modal;
