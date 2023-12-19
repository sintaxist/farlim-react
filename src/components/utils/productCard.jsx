import React from 'react';
import { Button, FlechaButton } from './UseElements';

import styles from '../../styles/Card.module.scss'

export function ProductCard({ product, id }) {

    const { Imagen, Nombre, Precio, Presentacion } = product

    return (
        <div className={styles.card}>
            <img src={Imagen.data.attributes.url} alt="product" />
            <div>
                <div className={styles.content}>
                    <h3>{Nombre}</h3>
                    <h4>${Precio}</h4>
                    <p>
                        {Presentacion.map(p => (
                            <span key={p.id}>{p.Elemento}</span>
                        ))}
                        &nbsp;litros
                    </p>
                </div>
                <Button className={`gradient fill`} to={"/producto/" + id}>
                    ver más
                    <FlechaButton />
                </Button>
            </div>
        </div>
    )
}