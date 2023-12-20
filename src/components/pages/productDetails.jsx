import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getContent } from '../utils/httpClient';
import { Button, Content, FlechaButton, Download } from '../utils/UseElements';

import styles from '../../styles/Details.module.scss';
import { OverlayLoader } from './overlayLoading';

export const ProductDetail = () => {

    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getContent('productos/' + productId + '?populate=Imagen,Presentacion,Ficha,Caracteristicas,Formula,Seguridad')
            .then((responseData) => {
                setProduct(responseData);
                setLoading(false);
            })
    }, [productId]);

    const { data } = product || { data: null };
    const attributes = data?.attributes || {};

    const { Imagen, Nombre, Caracteristicas, Ficha, Presentacion, Uso, Alamacenamiento, Formula, Seguridad } = attributes || {};

    const imageUrl = Imagen?.data?.attributes?.url || '';

    return (
        <>
            <OverlayLoader loading={loading} />
            {
                product &&
                <Content className="contain-wrapper product margin100">
                    <h1 className='title gradient h1-title'>{Nombre}</h1>
                    <div className={styles.firstPart}>
                        <img src={imageUrl} alt="product" />
                        <div className={styles.listContainer}>
                            <h2 className='title gradient'>Caraceterísticas del producto:</h2>
                            <ul className={styles.liStyled}>
                                {Caracteristicas.map(li => (
                                    <li key={li.id}>{li.Elemento}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className={styles.divCTA}>
                        <Button className='fill purple' to='/contacto'>
                            solicitar cotización
                            <FlechaButton />
                        </Button>
                        <Download className='outline purple' href={Ficha.data.attributes.url} download={Ficha.data.attributes.url}>
                            descargar ficha técnica
                            <FlechaButton />
                        </Download>
                    </div>
                    <div className={styles.description}>
                        <h3 className="title gradient">presentaciones:</h3>
                        <p className={styles.size}>
                            {Presentacion.map(p => (
                                <span key={p.id}>{p.elemento}</span>
                            ))}
                            &nbsp;litros
                        </p>
                        <h2 className='title gradient'>Modo de uso:</h2>
                        <p>{Uso}</p>
                    </div>
                    <div className={styles.specsF}>
                        <div className={`${styles.specs} white-div`}>
                            <h5 className='title purple'>Almacenamiento</h5>
                            <p>{Alamacenamiento}</p>
                        </div>
                        <div className={`${styles.specs} white-div`}>
                            <h5 className='title purple'>FORMULACIÓN</h5>
                            <ul className={styles.liStyled}>
                                {Formula.map(li => (
                                    <li key={li.id}>{li.Elemento}</li>
                                ))}
                            </ul>
                        </div>
                        <div className={`${styles.specs} white-div`}>
                            <h5 className='title purple'>Info. Seguridad</h5>
                            <ul className={styles.liStyled}>
                                {Seguridad.map(li => (
                                    <li key={li.id}>{li.Elemento}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Content>
            }
        </>
    )
}