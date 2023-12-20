import React, { useState, useEffect } from 'react';
import { getContent } from '../utils/httpClient';
import { Content } from '../utils/UseElements';

import styles from '../../styles/formsPage.module.scss';
import CapacitateForm from '../form/Form2';
import { OverlayLoader } from './overlayLoading';

export default function Capacitate() {

    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getContent('capacitate?populate=Titulo,Titulo2,Descipcion,medios_contactos').then((data) => {
            setContent(data)
            setLoading(false);
        })
    }, [])

    const { data } = content || { data: null };
    const attributes = data?.attributes || {};

    const { Titulo, Titulo2, Descipcion, medios_contactos } = attributes || {};

    const telefonos = medios_contactos?.data.filter(numero => numero.attributes.Tipo === "telefono")
    const correos = medios_contactos?.data.filter(correo => correo.attributes.Tipo === "correo")

    return (
        <>
            <OverlayLoader loading={loading} />
            {
                content &&
                <>
                    <Content className='margin100'>
                        <h1 className={`title h1-title ${Titulo.Color}`}>{Titulo.Titulo}</h1>
                        <h2 className={`title h2-title ${Titulo2.Color}`}>{Titulo2.Titulo}</h2>
                    </Content>
                    <div className={styles.back}>
                        <Content className={styles.section}>
                            <div className={styles.info}>
                                <p>{Descipcion}</p>
                                {telefonos.length >= 0 &&
                                    <div className={styles.first}>
                                        <h2>Teléfono</h2>
                                        <ul>
                                            {telefonos.map(numero => (
                                                <li className={`white li`} key={numero.id}>{numero.attributes.InfoContacto}</li>
                                            ))}
                                        </ul>
                                    </div>
                                }
                                {correos.length >= 0 &&
                                    <div>
                                        <h2>Correo</h2>
                                        <ul>
                                            {correos.map(correo => (
                                                <li className={`white li`} key={correo.id}>{correo.attributes.InfoContacto}</li>
                                            ))}
                                        </ul>
                                    </div>
                                }
                            </div>
                            <CapacitateForm />
                        </Content>
                    </div>
                </>
            }
        </>
    )

}