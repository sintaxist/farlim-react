import React, { useEffect, useState } from "react";
import { getContent } from "../utils/httpClient";
import { CategoryContain, Content } from "../utils/UseElements";

import styles from '../../styles/farlimPage.module.scss';
import { OverlayLoader } from "./overlayLoading";
import ReactMarkdown from "react-markdown";

export default function QuienesSomos() {

    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getContent('quienes-somo?populate=Titulo,Cards.Titulo,Titulo2,Valores.Imagen').then((data) => {
            setContent(data)
            setLoading(false);
        })
    }, [])

    const { data } = content || {};
    const attributes = data?.attributes || {};

    const { Titulo, Cards, Titulo2, Valores, Descripcion } = attributes || {};

    return (
        <>
            <OverlayLoader loading={loading} />

            {
                content &&
                <>
                    {
                        Titulo &&
                        <Content className={`${styles.content} unsetBot margin100`}>

                            <h1 className={`${Titulo.Color} title h1-title`}>{Titulo.Titulo}</h1>

                            <ReactMarkdown>{Descripcion}</ReactMarkdown>

                            {/* <p>{Descripcion}</p> */}

                        </Content>
                    }

                    <section className="back-skew change">
                        <Content className={`${styles.content} secondPa`}>
                            <CategoryContain>
                                {
                                    Cards.map(card =>
                                        <div key={card.id} className={styles.card}>
                                            <h2 className={`${card.Titulo.Color} title h2-title title-before`}>{card.Titulo.Titulo}</h2>
                                            <p>{card.Descripcion}</p>
                                        </div>
                                    )}
                            </CategoryContain>

                            {Titulo2 && <h1 className={`${Titulo2.Color} title h1-title`}>{Titulo2.Titulo}</h1>}

                            <CategoryContain>
                                {
                                    Valores.map(valor =>
                                        <div key={valor.id} className={styles.valor}>
                                            <h3>{valor.Titulo}</h3>
                                            <img src={valor.Imagen.data.attributes.url} alt={`valor-${valor.id}`} />
                                        </div>
                                    )}
                            </CategoryContain>
                        </Content>
                    </section>
                </>
            }
        </>
    )
} 