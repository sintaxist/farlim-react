import React from 'react';
import { urlAdmin } from './httpClient';

import styles from '../../styles/category.module.scss'
import { Link } from 'react-router-dom';

export function CategoryCard({category}){
    return(
        <Link to={"/categoria/" + category.id} className={styles.category}>
            <img src={urlAdmin + category.attributes.image.data.attributes.url} alt="" />
            <h3>{category.attributes.nombre}</h3>
        </Link>
    )
}