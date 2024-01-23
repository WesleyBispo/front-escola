class HandleAlert {
    createAlert(campo, alert) {
        const div = document.createElement('div');
        div.textContent = alert;
        div.classList.add('alert-text');
        campo.insertAdjacentElement('afterend', div);
    }

    removeAlert(campo) {
        const mensagemAlertExistente = campo.nextElementSibling;

        if (
            mensagemAlertExistente &&
            mensagemAlertExistente.classList.contains('alert-text')
        ) {
            mensagemAlertExistente.remove();
        }
    }
}

export default new HandleAlert();
