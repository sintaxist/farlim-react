import React from 'react';
import { urlAdmin } from './httpClient';
import { Button, FlechaButton } from './UseElements';

import styles from '../../styles/Card.module.scss'

export function ProductCard({product}){

    // console.log()
    return(
        <div className={styles.card}>
            <img src={urlAdmin + product.attributes.image.data.attributes.url} alt="product" />
            <div>
                <h3>{product.attributes.name}</h3>
                <p>
                    {product.attributes.size.map(p => (
                        <span key={p.id}> {p.elemento}</span>
                    ))}
                    &nbsp;litros
                </p>
                <Button className={`${product.attributes.colorLink} ${product.attributes.styleLink}`} to={"/producto/" + product.id}>
                    ver más
                    <FlechaButton/>
                </Button>
            </div>
        </div>
    )
}