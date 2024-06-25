import { getAll, remove, save, selectOne, update } from "./firestore.js"
let id = ''

document.getElementById('btnSave').addEventListener('click', () => {
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id)
    })
    if (document.querySelectorAll('.is-invalid').length == 0) {
        const persona = {
            rut: document.getElementById('rut').value,
            nombre: document.getElementById('nombre').value,
            peso: document.getElementById('peso').value,
            estatura: document.getElementById('estatura').value,
            direccion: document.getElementById('direccion').value,
            email: document.getElementById('email').value,
            telefono: document.getElementById('telefono').value,
            edad: document.getElementById('edad').value
        }
        if(id == ''){
            save(persona)
        }
        else{
            update(id,persona)
        }
        limpiar()
        id = ''        
    }
})

window.addEventListener('DOMContentLoaded', () => {
    getAll(datos => {
        let tabla = ''
        datos.forEach(doc => {
            const item = doc.data()
            tabla += `<tr>
                <td>${item.rut}</td>
                <td>${item.nombre}</td>
                <td>${item.peso}</td>
                <td>${item.estatura}</td>
                <td>${item.direccion}</td>
                <td>${item.email}</td>
                <td>${item.telefono}</td>
                <td>${item.edad}</td>
                <td nowrap>
                    <input type="button" class="btn btn-danger" value="Eliminar" 
                    id="${doc.id}">
                    <input type="button" class="btn btn-warning" value="Editar"
                        id="${doc.id}">
                </td>
            </tr>`
        })
        document.getElementById('contenido').innerHTML = tabla
        document.querySelectorAll('.btn-danger').forEach(btn => {
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Está seguro de eliminar el registro?",
                    text: "No podrá revertir los cambios",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        remove(btn.id)
                        Swal.fire({
                            title: "Eliminado!",
                            text: "Su registro ha sido eliminado",
                            icon: "success"
                        })
                    }
                })
            })
        })
        document.querySelectorAll('.btn-warning').forEach(btn => {
            btn.addEventListener('click',async()=>{
                const emp= await selectOne(btn.id)
                const e = emp.data()
                document.getElementById('rut').value = e.rut
                document.getElementById('nombre').value = e.nombre
                document.getElementById('peso').value = e.peso
                document.getElementById('estatura').value = e.estatura
                document.getElementById('direccion').value = e.direccion
                document.getElementById('email').value = e.email
                document.getElementById('telefono').value = e.telefono
                document.getElementById('edad').value = e.edad
                document.getElementById('rut').readOnly = true
                document.getElementById('btnSave').value = 'Editar'
                id = emp.id
            })
        })
    })
})
