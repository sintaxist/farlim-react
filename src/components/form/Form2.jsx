import Axios from 'axios';
import React, { useState } from 'react'
import { API } from '../utils/httpClient';
import FormInput from './FormInput';
import Loader from '../utils/loader';


import styles from '../../styles/form.module.scss';
import { ButtonForm, FlechaButton } from '../utils/UseElements';

export default function CapacitateForm () {

    // Obtener la data de los inputs y agregarlas al estado

    const [data, setData] = useState({
       name: '',
       mail: '',
       numero: '',
       estado: '',
       comentarios: '',
    })

    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value;
        setData(newdata)
    }

    // Metodo POST con AXIOS

    const url = API + 'capacitate-forms';

    function submit(e) {

        e.preventDefault();

        Axios.post(url, {
            "data": {
                "name": data.name,
                "mail": data.mail,
                "numero": data.numero,
                "empresa": data.empresa,
                "comentarios": data.comentarios
            }
        })
        .then(res => {
            console.log(res.data)
            const span = document.getElementById('success');
            span.className = styles.success + ' ' + styles.valid;

            const loader = document.getElementById('loader');
            loader.className = styles.formLoader + ' ' + styles.valid;

            setTimeout(function(){
                loader.className = styles.formLoader;
            }, 3000)

            const form = document.getElementById('form-contacto');

            form.reset();
        })

    }

    function displaySuccess (e) {

        e.preventDefault()

        const span = document.getElementById('success');
        span.className = styles.success;

        const loader = document.getElementById('loader');
        loader.className = styles.formLoader;

    }

    const inputs = [
        {
            id: 1,
            name: "name",
            type: "text",
            errorMessage: "Ingresa un nombre valido",
            label: "Nombre",
            // pattern: '^[a-zA-ZÀ-ÿ\s]{1,40}$',
            required: true,
        },
        {
            id: 2,
            name: "mail",
            type: "email",
            errorMessage: "Ingresa un correo valido",
            pattern: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[a-zA-Z0-9-.]+$",
            label: "Correo electrónico",
            required: true,
        },
        {
            id: 4,
            name: "numero",
            type: "text",
            errorMessage: "Ingresa un número valido",
            label: "Télefono",
            pattern: `^(?=.*[0-9])[0-9!@#$%^&*]{10,20}$`,
            required: true,
        }
    ];

    return (

        <form 
        id='form-contacto'
        onSubmit={(e) => submit(e)} 
        className={styles.form}>

            <span id='success' className={styles.success}>
                Tu formulario se ha enviado con exito

                <ButtonForm onClick={displaySuccess} className='white fill'>
                    Volver a enviar
                    <FlechaButton/>
                </ButtonForm>
            </span>

            <div id='loader' className={styles.formLoader}>
                <Loader/>
            </div>

            <ul>

                {inputs.map((input) => (
                    <FormInput
                        key={input.id}
                        {...input}
                        value={data[input.name]}
                        onChange={(e) => handle(e)}
                    />
                ))}

                <li className={styles.formInput}>
                    <select onChange={(e) => handle(e)} value={data.estado} name="estado" id="estado" required>
                        <option value='Default' disabled>Selecciona un estado</option>
                        {Estados.map((estado) => (
                            <option key={estado.clave} value={estado.nombre}>{estado.nombre}</option>
                        ))}
                    </select>
                    <label className={`${styles.entry__label} ${styles.labelInput}`}  htmlFor="estado">Estado</label>
                    <span>Por favor selecciona un estado</span>
                </li>

                <li className={styles.area}>
                    <textarea name="comentarios" id="comentarios" cols="20" rows="2" onChange={(e) => handle(e)} value={data.comentarios}></textarea>
                    <label htmlFor="comentarios">Comentarios</label>
                </li>

            </ul>

            <ButtonForm className='purple fill'>
                Enviar
                <FlechaButton/>
            </ButtonForm>

        </form>
    )
}

const Estados = [
    { "clave": "AGS", "nombre": "AGUASCALIENTES" },
    { "clave": "BC",  "nombre": "BAJA CALIFORNIA" },
    { "clave": "BCS", "nombre": "BAJA CALIFORNIA SUR" },
    { "clave": "CHI", "nombre": "CHIHUAHUA" },
    { "clave": "CHS", "nombre": "CHIAPAS" },
    { "clave": "CMP", "nombre": "CAMPECHE" },
    { "clave": "CMX", "nombre": "CIUDAD DE MEXICO" },
    { "clave": "COA", "nombre": "COAHUILA" },
    { "clave": "COL", "nombre": "COLIMA" },
    { "clave": "DGO", "nombre": "DURANGO" },
    { "clave": "GRO", "nombre": "GUERRERO" },
    { "clave": "GTO", "nombre": "GUANAJUATO" },
    { "clave": "HGO", "nombre": "HIDALGO" },
    { "clave": "JAL", "nombre": "JALISCO" },
    { "clave": "MCH", "nombre": "MICHOACAN" },
    { "clave": "MEX", "nombre": "ESTADO DE MEXICO" },
    { "clave": "MOR", "nombre": "MORELOS" },
    { "clave": "NAY", "nombre": "NAYARIT" },
    { "clave": "NL",  "nombre": "NUEVO LEON" },
    { "clave": "OAX", "nombre": "OAXACA" },
    { "clave": "PUE", "nombre": "PUEBLA" },
    { "clave": "QR",  "nombre": "QUINTANA ROO" },
    { "clave": "QRO", "nombre": "QUERETARO" },
    { "clave": "SIN", "nombre": "SINALOA" },
    { "clave": "SLP", "nombre": "SAN LUIS POTOSI" },
    { "clave": "SON", "nombre": "SONORA" },
    { "clave": "TAB", "nombre": "TABASCO" },
    { "clave": "TLX", "nombre": "TLAXCALA" },
    { "clave": "TMS", "nombre": "TAMAULIPAS" },
    { "clave": "VER", "nombre": "VERACRUZ" },
    { "clave": "YUC", "nombre": "YUCATAN" },
    { "clave": "ZAC", "nombre": "ZACATECAS" } 
]