import React, { useState, useEffect } from "react";
import { CategoryCard } from "../utils/categoryCard";
import { getContent } from "../utils/httpClient";
import { CategoryContain, Content } from "../utils/UseElements";
import { OverlayLoader } from "./overlayLoading";

const Categoria = () => {

  const [content, setContent] = useState(null);
  const [categorias, setCategorias] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try{
      await getContent('categorias-page?populate=*').then((data) => {
        setContent(data)
        setLoading(false);
      })
      await getContent('categorias?populate=*').then((data) => {
        setCategorias(data)
        setLoading(false);
      })
    }catch (e){
      console.error(e)
    }finally{
      content && categorias && setLoading(false)
    }
  }

  const { data } = content || { data: null };
  const attributes = data?.attributes || {};

  const { Titulo, Descripcion } = attributes || {};

  const { data: dataCategorias } = categorias || { data: null };

  return (
    <>
      <OverlayLoader loading={loading} />
      {
        content && categorias &&
        <section className="back-final margin100">
        <Content>
          <h1 className={`${Titulo.Color} title h1-title`}>{Titulo.Titulo}</h1>
          <p>{Descripcion}</p>
          <CategoryContain>
            {dataCategorias.map((category) => (
              <CategoryCard key={category.id} category={category.attributes} />
            ))}
          </CategoryContain>
        </Content>
      </section>
      }
    </>
  );
};

export default Categoria;
