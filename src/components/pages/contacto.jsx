import React, {useState, useEffect} from 'react';
import { getContent } from '../utils/httpClient';
import { Content } from '../utils/UseElements';

import styles from '../../styles/formsPage.module.scss';
import PostForm from '../form';

export default function Contacto(){

    const [content, setContent] = useState(null);

    useEffect(() => {
        getContent('contacto?populate=title1.show,title2.show,telefono,correo').then((data) => {
            setContent(data)
        })
    }, [])

    const info = content?.data?.attributes;

    // console.log(info)

    return(
        <>
            {/* <Loader/> */}
            <Content className='margin100'>
                {info?.title1.show ? (
                    <h1 className={`title h1-title ${info?.title1.color}`}>{info?.title1.titulo}</h1>
                ):null}
                {info?.title2.show ? (
                    <h2 className={`title h2-title ${info?.title2.color}`}>{info?.title2.titulo}</h2>
                ):null}
             </Content>
            <div className={styles.back}>
                <Content className={styles.section2}>
                    <div className={styles.info}>
                        <p>{info?.description}</p>
                        {info?.telefono.length >= 0 ? (
                            <div className={styles.first}>
                                <h2>Teléfono</h2>
                                <ul>
                                    {info?.telefono.map(numero => (
                                        <li className={`${numero.color} li`} key={numero.id}>{numero.elemento}</li>
                                    ))}
                                </ul>
                            </div>
                        ):null}
                        {info?.correo.length >= 0 ? (
                            <div>
                                <h2>Correo</h2>
                                <ul>
                                    {info?.correo.map(correo => (
                                        <li className={`${correo.color} li`} key={correo.id}>{correo.elemento}</li>
                                    ))}
                                </ul>
                            </div>
                        ):null}
                    </div>

                    {info?.showForm ? (
                        <PostForm/>
                    ):null}
                    
                </Content>
            </div>
        </>
    )

}