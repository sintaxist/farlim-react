import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getContent, urlAdmin } from '../utils/httpClient';
import { Content, ProductContain } from '../utils/UseElements';
import { ProductCard } from '../utils/productCard';

import styles from '../../styles/categoryDetails.module.scss';

export function CategoryDetail(){

    const { categoryId } = useParams();
    const [category, setCategory] = useState(null);

    useEffect(() => {
        getContent('categories/' + categoryId + '?populate=productos.image,productos,imageDescription,productos.size').then((data) => {
            setCategory(data)
        })
    }, [categoryId])

    if(!category){
        return null;
    }
    
    const info = category.data?.attributes;

    return(
        <div className='margin100'>
           <div className={styles.banner}>
               <img className={styles.imgBanner} src={urlAdmin + info?.imageDescription.data.attributes.url} alt="img-category" />
               <h1>{info?.nombre}</h1>
           </div>
           <Content>
               <p>{info?.description}</p>
               <div className={styles.content}>
                   <h2 className='title h1-title gradient'>Productos Relacionados...</h2>
                   <ProductContain>
                        {info?.productos.data.map(product => (
                            <ProductCard key={product.id} product={product}/>
                        ))}
                   </ProductContain>
               </div>
           </Content>
        </div>
    )
}