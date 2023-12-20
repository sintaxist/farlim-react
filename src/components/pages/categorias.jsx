import React, { useState, useEffect } from "react";
import { CategoryCard } from "../utils/categoryCard";
import { getContent } from "../utils/httpClient";
import { CategoryContain, Content } from "../utils/UseElements";
import { OverlayLoader } from "./overlayLoading";

const Categoria = () => {
  const [content, setContent] = useState(null);
  const [categorias, setCategorias] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contentData = await getContent('categorias-page?populate=*');
        const categoriasData = await getContent('categorias?populate=*');

        setContent(contentData);
        setCategorias(categoriasData);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <OverlayLoader loading={loading} />;
  }

  const { data: contentData } = content || { data: null };
  const attributes = contentData?.attributes || {};
  const { Titulo, Descripcion } = attributes;

  const { data: categoriasData } = categorias || { data: null };

  return (
    <section className="back-final margin100">
      <Content>
        <h1 className={`${Titulo?.Color} title h1-title`}>{Titulo?.Titulo}</h1>
        <p>{Descripcion}</p>
        <CategoryContain>
          {categoriasData.map((category) => (
            <CategoryCard key={category.id} category={category.attributes} id={category.id} />
          ))}
        </CategoryContain>
      </Content>
    </section>
  );
};

export default Categoria;
