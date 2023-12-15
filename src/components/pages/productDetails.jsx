import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getContent, urlAdmin } from '../utils/httpClient';
import { Button, Content, FlechaButton, Download } from '../utils/UseElements';

import styles from '../../styles/Details.module.scss';

export function ProductDetail(){

    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        getContent('productos/' + productId + '?populate=image,size,ficha,caracteristicas,formula,seguridad').then((data) => {
            setProduct(data)
        })
    }, [productId])

    if(!product){
        return null;
    }
    
    const info = product.data?.attributes;

    return(
        <Content className="contain-wrapper product margin100">
            <h1 className='title gradient h1-title'>{info?.name}</h1>
            <div className={styles.firstPart}>
                <img src={urlAdmin + info?.image.data?.attributes.url} alt="product"/>
                <div className={styles.listContainer}>
                    <h2 className='title gradient'>Caraceterísticas del producto:</h2>
                    <ul className={styles.liStyled}>
                        {info?.caracteristicas.map(li => (
                            <li key={li.id}>{li.elemento}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className={styles.divCTA}>
                <Button className='fill purple' to='/contacto'>
                    solicitar cotización
                    <FlechaButton/>
                </Button>
                <Download className='outline purple' href={urlAdmin + info?.ficha.data.attributes.url} download={urlAdmin + info?.ficha.data.attributes.url}>
                    descargar ficha técnica
                    <FlechaButton/>
                </Download>
            </div>
            <div className={styles.description}>
                <h3 className="title gradient">presentaciones:</h3>
                <p className={styles.size}>
                    {info?.size.map(p => (
                        <span key={p.id}>{p.elemento}</span>
                    ))}
                    &nbsp;litros
                </p>
                <h2 className='title gradient'>Modo de uso:</h2>
                <p>{info?.uso}</p>
            </div>
            <div className={styles.specsF}>
                <div className={`${styles.specs} white-div`}>
                    <h5 className='title purple'>Almacenamiento</h5>
                    <p>{info?.alamacenamiento}</p>
                </div>
                <div className={`${styles.specs} white-div`}>
                    <h5 className='title purple'>FORMULACIÓN</h5>
                    <ul className={styles.liStyled}>
                        {info?.formula.map(li => (
                            <li key={li.id}>{li.elemento}</li>
                        ))}
                    </ul>
                </div>
                <div className={`${styles.specs} white-div`}>
                    <h5 className='title purple'>Info. Seguridad</h5>
                    <ul className={styles.liStyled}>
                        {info?.seguridad.map(li => (
                            <li key={li.id}>{li.elemento}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </Content>
    )
}