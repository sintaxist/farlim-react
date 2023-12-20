import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
// import { Link } from 'react-router-dom';

import styles from '../../styles/colapseItems.module.scss'
import { getContent } from '../utils/httpClient';
import { Content } from '../utils/UseElements';
import { OverlayLoader } from './overlayLoading';

export default function Faqs() {

  const [selected, setSelected] = useState(null)
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true)

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null)
    }

    setSelected(i)
  }

  useEffect(() => {
    getContent('faq?populate=Titulo,faq').then((data) => {
      setContent(data)
      setLoading(false)
    })
  }, [])

  const { data } = content || { data: null };
  const attributes = data?.attributes || {};

  const { Titulo, Descripcion, faq } = attributes || {};



  return (
    <>
      <OverlayLoader loading={loading} />
      <div className='back-final margin100'>
        <Content>
          <h1 className={`title h1-title ${Titulo.Color}`}>{Titulo.Titulo}</h1>
          <ReactMarkdown className={styles.p}>{Descripcion}</ReactMarkdown>
          <div className={styles.accordion}>
            {
              faq.map((item, i) => {
                return (
                  <div className={styles.item} key={item.id}>

                    <div className={selected === i ? `${styles.active} ${styles.title}` : styles.title} onClick={() => toggle(i)}>

                      <h2 className={selected === i ? `${styles.activo} ${styles.titulo}` : styles.titulo}>
                        {item.Question}
                      </h2>

                      <span>{selected === i ? '-' : '+'}</span>
                    </div>

                    <div className={selected === i ? `${styles.content} ${styles.show}` : styles.content}>

                      <p>
                        {item.Answer}
                      </p>

                    </div>
                  </div>
                )
              })
            }
          </div>
        </Content>
      </div>
    </>
  )
}