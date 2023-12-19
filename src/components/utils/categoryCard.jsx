import React from 'react';
import { urlAdmin } from './httpClient';

import styles from '../../styles/category.module.scss'
import { Link } from 'react-router-dom';

export function CategoryCard({ category, id }) {

    const { Imagen, Nombre } = category

    return (
        <Link to={"/categoria/" + id} className={styles.category}>
            <img src={Imagen.data.attributes.url} alt="" />
            <h3>{Nombre}</h3>
        </Link>
    )
}