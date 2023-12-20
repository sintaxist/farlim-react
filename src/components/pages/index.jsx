import React, { useEffect, useState } from 'react';
import { getContent } from '../utils/httpClient';

import styles from '../../styles/Home.module.scss';
import { Button, CategoryContain, Content, FlechaButton, ProductContain } from '../utils/UseElements';

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import OwlCarousel from 'react-owl-carousel';
import { ProductCard } from '../utils/productCard';
import { CategoryCard } from '../utils/categoryCard';
import PostForm from '../form';
import { OverlayLoader } from './overlayLoading';

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true)

  const sections = [
    "Banner",
    "Numeralia",
    "Testimonios",
    "Destacados",
    "Categorias",
    "Carrusel",
    "Formulario",
    "Cards",
  ];
  
  const properties = {
    Banner: ["Desktop", "Tablet", "Mobile", "Button"],
    Numeralia: ["Titulo", "Numero.Imagen"],
    Testimonios: ["Imagen", "Testimonio", "Titulo"],
    Destacados: ["Titulo", "productos", "productos.Imagen", "productos.Presentacion", "Button"],
    Categorias: ["Titulo", "Button", "categorias.Imagen"],
    Carrusel: ["Titulo", "Imagenes"],
    Formulario: ["Titulo", "Points"],
    Cards: ["Titulo", "Button"],
  };
  
  const buildQuery = (section, properties) => {
    const sectionProperties = properties[section].map(property => `${section}.${property}`);
    return `${section},${sectionProperties.join(",")},`;
  };
  
  const queries = sections.map(section => buildQuery(section, properties));
  
  const fullUrlQuery = `homepage?populate=${queries.join("")}`;

  useEffect(() => {
    if (!data) {
      getContent(fullUrlQuery)
        .then((responseData) => {
          setData(responseData);
          setLoading(false);
        });
    }
  }, [data, fullUrlQuery]);

  const { data: responseData } = data || {};
  const attributes = responseData?.attributes || {};

  const {
    Banner,
    Numeralia,
    Testimonios,
    Destacados,
    Categorias,
    Carrusel,
    Formulario,
    Cards,
  } = attributes || {};

  const options = {
    loop: true,
    items: 1,
    margin: 0,
    autoplay: true,
    dots: true,
    autoplayTimeout: 3500,
    smartSpeed: 1000,
  };

  const options2 = {
    loop: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplaySpeed: 3000,
    autoplayHoverPause: false,
    responsive: {
      960: {
        items: 4,
        margin: 60,
      },
      550: {
        items: 3,
        margin: 60,
      },
      0: {
        items: 1,
        margin: 30,
      }
    }
  };

  return (
    <>
      <OverlayLoader loading={loading}/>
      {
        Banner && Banner.Show &&
        <section id={styles.firstSection}>

          <div className={styles.svgDg}>

            <img className={styles.bannerDesk} src={Banner.Desktop.data.attributes.url} alt="banner-desk" />

            <img className={styles.bannerTablet} src={Banner.Tablet.data.attributes.url} alt="banner-tablet" />

            <img className={styles.bannerMobile} src={Banner.Mobile.data.attributes.url} alt="banner-mobile" />

          </div>

          <article className={styles.firstText}>

            <h1>{Banner.Titulo}</h1>
            <p>{Banner.Descripcion}</p>

            {
              Banner.Button &&
              <Button className={`${Banner.Button.Color} ${Banner.Button.Style}`} to={Banner.Button.Path}>
                {Banner.Button.Titulo}
                <FlechaButton />
              </Button>
            }

          </article>

          <div className={styles.scrollDowns}>
            <div className={styles.mousey}>
              <div className={styles.scroller}></div>
            </div>
          </div>

        </section>
      }

      {
        Numeralia && Numeralia.Show &&
        <section className={styles.firstSection}>

          <Content>

            <h1 className={Numeralia.Titulo.Color + ' title h1-title'}>{Numeralia.Titulo.Titulo}</h1>

            <div className={`${styles.row1} ${styles.statsbar}`}>
              {Numeralia.Numero.filter(card => card.Show).map(numero => (
                <article className={`white-div stat${numero.id}`} key={numero.id}>
                  <img src={numero.Imagen.data.attributes.url} alt="" />
                  <div>
                    <h1>{numero.Titulo}</h1>
                    <p>{numero.Descripcion}</p>
                  </div>
                </article>
              ))}
            </div>

          </Content>

        </section>
      }

      {
        Testimonios && Testimonios.Show &&
        <div className={`${styles.sliderContain} white-div`}>
          <div className={styles.imgCont}>
            <img src={Testimonios.Imagen.data.attributes.url} alt="Imagen Testimonios" />
          </div>

          <div id='testimonials' className={styles.testimonials}>

            <h2 className={`title ${Testimonios.Titulo.Color}`}>{Testimonios.Titulo.Titulo}</h2>

            <OwlCarousel className='owl-carousel owl-theme' {...options}>
              {Testimonios.Testimonio.filter(child => child.Show).map(testimonio => (
                <div className={styles.slide} key={testimonio.id}>
                  <q>{testimonio.Descripcion}</q>
                  <span>{testimonio.Nombre}, {testimonio.Edad} años</span>
                  {testimonio.Puesto && <p>{testimonio.Puesto}</p>}
                </div>
              ))}
            </OwlCarousel>

          </div>
        </div>
      }

      {
        Destacados && Destacados.Show &&
        (<section className={`${styles.productosDestacados} back-skew`}>
          <Content>
            <h1 className={Destacados.Titulo.Color + ' title h1-title'}>{Destacados.Titulo.Titulo}</h1>
            <ProductContain>
              {Destacados.productos.data.map(product => (
                <ProductCard key={product.id} product={product.attributes} id={product.id} />
              ))}
            </ProductContain>
            {Destacados.Button &&
              <Button className={`${Destacados.Button.Style} ${Destacados.Button.Color} linkProd`} to={Destacados.Button.Path}>
                {Destacados.Button.Titulo}
                <FlechaButton />
              </Button>
            }
          </Content>
        </section>)
      }

      {
        Categorias && Categorias.Show &&
        <section className={styles.categorias}>
          <Content className='unsetPa'>
            <h1 className={Categorias.Titulo.Color + ' title h1-title'}>{Categorias.Titulo.Titulo}</h1>
            <CategoryContain>
              {Categorias.categorias.data.map(category => (
                <CategoryCard key={category.id} category={category.attributes} id={category.id} />
              ))}
            </CategoryContain>
          </Content>
          <Button className={`${Categorias.Button.Style} ${Categorias.Button.Color} linkHome`} to={Categorias.Button.Path}>
            {Categorias.Button.Titulo}
            <FlechaButton />
          </Button>
        </section>
      }

      <section className='back-skew margin30 back-top'>
        {
          Carrusel && Carrusel.Show &&
          <>
            <Content className='unsetPa'>
              <h1 className={`${Carrusel.Titulo.Color} title h1-title title-section`}>{Carrusel.Titulo.Titulo}</h1>
            </Content>
            <OwlCarousel className={`${styles.clientes} owl-carousel owl-theme`} {...options2}>
              {Carrusel.Imagenes.data.map((img) => (
                <img
                  key={img.id}
                  src={img.attributes.url}
                  alt={`img-${img.id}`}
                />
              ))}
            </OwlCarousel>
          </>
        }
        {
          Formulario &&
          <Content className={styles.listForm}>
            {Formulario.ShowForm && <PostForm />}
            <div>
              <h2 className={`${Formulario.Titulo.Color} title ${styles.titlePoint}`}>{Formulario.Titulo.Titulo}</h2>
              <ul className={styles.liStyled}>
                {Formulario.Points.map(li => (
                  <li key={li.id} className={`white li`}>{li.Elemento}</li>
                ))}
              </ul>
            </div>
          </Content>
        }
      </section>

      <Content>
        <CategoryContain>
          {
            Cards && Cards.map(card =>
            <div key={card.id} className={styles.cardHome}>
              <h2 className={`${card.Titulo.Color} title`}>{card.Titulo.Titulo}</h2>
              <p>{card.Descripcion}</p>
              <Button className={`${card.Button.Style} ${card.Button.Color}`} to={card.Button.Path}>
                {card.Button.Titulo}
                <FlechaButton />
              </Button>
            </div>
          )}
        </CategoryContain>
      </Content>

    </>
  );
};

export default Home;


// Acceder a todas las sucategorias o hijos del objeto
// http://localhost:1337/api/datospopulate=imgNumber,componentName
// http://localhost:1337/api/datospopulate=*

// Obtener unicamnete la categoria o nombre que se esta pidiendo en la url
// http://localhost:1337/api/datosfields=name

// Llamar unicamente los datos que necesito
// http://localhost:1337/api/datosfields=name,publisehdAt&populate=imgNumber

//Llamar una sola categoria
// http://localhost:1337/api/categories/1fields=name&populate=restaurants

//Cambiar el orden
// http://localhost:1337/api/categoriesfields=name&sort=name


//Filtrar por Numeros
// http://localhost:1337/api/restaurantsfilters=[avgPrice][$lte]=30 equal
// http://localhost:1337/api/restaurantsfilters=[avgPrice][$lt]=30 less
// https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest/filtering-locale-publication.html#filtering

// /api/homepagepopulate=body.numero.image