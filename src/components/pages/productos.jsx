import React, { useState, useEffect } from "react";
import Tabs from "../utils/Tabs";
import Panel from "../utils/Panel";
import { ProductCard } from '../utils/productCard';
import { ProductContain } from "../utils/UseElements";
import { getContent } from "../utils/httpClient";
import { OverlayLoader } from "./overlayLoading";

const Productos = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getContent('categorias?populate=productos.Imagen,productos.Presentacion').then((data) => {
      setData(data);
      setLoading(false);
    });
  }, []);

  const { data: categorias } = data || { data: [] };

  return (
    <>
      <OverlayLoader loading={loading} />
      {data && (
        <div>
          <Tabs className='hidden'>
            {
              categorias.map((elem) =>
                <Panel key={elem.id} title={elem.attributes.Nombre}>
                  <h1 className="title h1-title gradient title-tabs">
                    {elem.attributes.nombre}
                  </h1>
                  <ProductContain>
                    {elem?.attributes?.productos?.data?.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product.attributes}
                      />
                    ))}
                  </ProductContain>
                </Panel>
              )}
          </Tabs>
        </div>
      )}
    </>
  );
};

export default Productos;
