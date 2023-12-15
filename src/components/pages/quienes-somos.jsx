import React, { useEffect, useState } from "react";
import { getContent, urlAdmin } from "../utils/httpClient";
import { CategoryContain, Content } from "../utils/UseElements";

import styles from '../../styles/farlimPage.module.scss';

export default function QuienesSomos() {

    const [content, setContent] = useState(null);

    useEffect(() => {
        getContent('farlim-page?populate=titulo1.show,cards.title,,titulo2.show,valores.img').then((data) => {
            setContent(data)
        })
    }, [])

    const info = content?.data?.attributes;

    return (
        <>
            {info?.show ? (

                <>

                    <Content className={`${styles.content} unsetBot margin100`}>

                        {info?.titulo1.show ? (
                            <h1 className={`${info?.titulo1.color} title h1-title`}>{info?.titulo1.titulo}</h1>
                        ) : null}

                        <p>{info?.texto1}</p>

                        <p>{info?.texto2}</p>

                    </Content>

                    <section className="back-skew change">
                        <Content className={`${styles.content} secondPa`}>
                            <CategoryContain>
                                {info?.cards.map(card => (
                                    card.show ? (
                                        <div key={card.id} className={styles.card}>
                                            <h2 className={`${card.title.color} title h2-title title-before`}>{card.title.titulo}</h2>
                                            <p>{card.description}</p>
                                        </div>
                                    ) : null
                                ))}
                            </CategoryContain>

                            {info?.titulo2.show ? (
                                <h1 className={`${info?.titulo2.color} title h1-title`}>{info?.titulo2.titulo}</h1>
                            ) : null}

                            <CategoryContain>
                                {info?.valores.map(valor => (
                                    valor.show ? (
                                        <div key={valor.id} className={styles.valor}>
                                            <h3>{valor.title}</h3>
                                            <img src={urlAdmin + valor.img.data.attributes.url} alt={`valor-${valor.id}`} />
                                        </div>
                                    ) : null
                                ))}
                            </CategoryContain>
                        </Content>
                    </section>
                </>

            ) : <p>No info available</p>}
        </>
    )
} 