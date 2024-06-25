const verificar = (id) => {
    const input = document.getElementById(id)
    const div = document.getElementById('e-' + id)
    input.classList.remove('is-invalid')
    if (input.value.trim() == '') {
        input.classList.add('is-invalid')
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio.</span>'
    }
    else {
        input.classList.add('is-valid')
        div.innerHTML = ''
        if (id == 'edad') {
            if (input.value < 18) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">Debe ser mayor de edad</span>'
            }
        }
        // Validar Rut
        if (id == 'rut') {
            if (!validarRun(input.value)) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">El rut ingresado no es válido</span>'
            }
        }
        // Validar Email
        if (id == 'email') {
            if (!validarEmail(input.value)) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">El email no tiene el formato correcto</span>'
            }
        }
    }
}

const limpiar = () => {
    document.querySelector('form').reset()
    document.querySelectorAll('.form-control').forEach(item => {
        item.classList.remove('is-invalid')
        item.classList.remove('is-valid')
        document.getElementById('e-' + item.name).innerHTML = ''
    })
    document.getElementById('rut').readOnly = false
    document.getElementById('btnSave').value = 'Guardar'
}

const soloNumeros = (e) => {
    if (e.keyCode >= 48 && e.keyCode <= 57)
        return true
    return false
}

const validarEmail = (email) => {
    const formato = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
    if (!formato.test(email))
        return false
    return true
}

const validarRun = (run) => {
    const Fn = {
        validaRut: function (rutCompleto) {
            rutCompleto = rutCompleto.replace("‐", "-")
            if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
                return false
            const tmp = rutCompleto.split('-')
            const digv = tmp[1]
            const rut = tmp[0]
            if (digv == 'K') digv = 'k'

            return (Fn.dv(rut) == digv)
        },
        dv: function (T) {
            let M = 0, S = 1
            for (; T; T = Math.floor(T / 10))
                S = (S + T % 10 * (9 - M++ % 6)) % 11
            return S ? S - 1 : 'k'
        }
    }

    return Fn.validaRut(run)
}
