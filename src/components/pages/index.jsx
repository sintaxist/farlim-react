import React, { useEffect, useState } from 'react';
import { getContent, urlAdmin } from '../utils/httpClient';

import styles from '../../styles/Home.module.scss';
import { Button, CategoryContain, Content, FlechaButton, ProductContain } from '../utils/UseElements';

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import OwlCarousel from 'react-owl-carousel';
import { ProductCard } from '../utils/productCard';
import { CategoryCard } from '../utils/categoryCard';
import PostForm from '../form';

const Home = () => {
  const [data, setData] = useState(null);

  let queryBanner = "Banner,Banner.Desktop,Banner.Tablet,Banner.Mobile,Banner.Button,"
  let queryNumeralia = "Numeralia,Numeralia.Titulo,Numeralia.Numero.Imagen,"
  let queryTestimonios = "Testimonios.Imagen,Testimonios.Testimonio,Testimonios.Titulo,"
  let queryProductos = "Destacados,Destacados.Titulo,Destacados.productos,Destacados.productos.Imagen,Destacados.productos.Presentacion,Destacados.Button,"
  let queryCategorias = "Categorias.Titulo,Categorias.Button,Categorias.categorias.Imagen,"
  let queryCarrusel = "Carrusel.Titulo,Carrusel.Imagenes,"

  useEffect(() => {
    !data && getContent(`homepage?populate=${
      queryBanner +
      queryNumeralia +
      queryTestimonios +
      queryProductos +
      queryCategorias +
      queryCarrusel
      }cards,cards.title,cards.link,section,section.img,section.img.img,section.title,section.titlePoints,section.points`)
      .then((data) => {
        setData({ data });
      });
  }, [])

  const info = data?.data?.data?.attributes;

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
      {
        info?.Banner?.Show &&
        <section id={styles.firstSection}>

          <div className={styles.svgDg}>

            <img className={styles.bannerDesk} src={info?.Banner?.Desktop?.data?.attributes?.url} alt="banner-desk" />

            <img className={styles.bannerTablet} src={info?.Banner?.Tablet?.data?.attributes?.url} alt="banner-tablet" />

            <img className={styles.bannerMobile} src={info?.Banner?.Mobile?.data?.attributes?.url} alt="banner-mobile" />

          </div>

          <article className={styles.firstText}>

            <h1>{info?.Banner?.Titulo}</h1>
            <p>{info?.Banner?.Descripcion}</p>

            {
              info?.Banner?.Button &&
              <Button className={`${info?.Banner?.Button?.Color} ${info?.Banner?.Button?.Style}`} to={info?.Banner?.Button?.Path}>
                {info?.Banner?.Button?.Titulo}
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
        info?.Numeralia?.Show &&
        <section className={styles.firstSection}>

          <Content>

            <h1 className={info?.Numeralia?.Titulo?.Color + ' title h1-title'}>{info?.Numeralia?.Titulo?.Titulo}</h1>

            <div className={`${styles.row1} ${styles.statsbar}`}>
              {info?.Numeralia?.Numero.filter(card => card.Show).map(numero => (
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
        info?.Testimonios.Show &&
        <div className={`${styles.sliderContain} white-div`}>
          <div className={styles.imgCont}>
            <img src={info?.Testimonios?.Imagen.data.attributes.url} alt="Imagen Testimonios" />
          </div>

          <div id='testimonials' className={styles.testimonials}>

            <h2 className={`title ${info?.Testimonios.Titulo.Color}`}>{info?.Testimonios.Titulo.Titulo}</h2>

            <OwlCarousel className='owl-carousel owl-theme' {...options}>
              {info?.Testimonios.Testimonio.filter(child => child.Show).map(testimonio => (
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

      {info?.Destacados.Show &&
        (<section className={`${styles.productosDestacados} back-skew`}>
          <Content>
            <h1 className={info?.Destacados.Titulo.Color + ' title h1-title'}>{info?.Destacados.Titulo.Titulo}</h1>
            <ProductContain>
              {info?.Destacados?.productos?.data.map(product => (
                <ProductCard key={product.id} product={product?.attributes} id={product.id}/>
              ))}
            </ProductContain>
            {info.Destacados.Button &&
              <Button className={`${info?.Destacados.Button.Style} ${info?.Destacados.Button.Color} linkProd`} to={info?.Destacados.Button.Path}>
                {info?.Destacados.Button.Titulo}
                <FlechaButton />
              </Button>
            }
          </Content>
        </section>)
      }

      {info?.Categorias.Show &&
        <section className={styles.categorias}>
          <Content className='unsetPa'>
            <h1 className={info.Categorias.Titulo.Color + ' title h1-title'}>{info.Categorias.Titulo.Titulo}</h1>
            <CategoryContain>
              {info?.Categorias?.categorias?.data.map(category => (
                <CategoryCard key={category.id} category={category.attributes} id={category.id}/>
              ))}
            </CategoryContain>
          </Content>
            <Button className={`${info?.Categorias.Button.Style} ${info?.Categorias.Button.Color} linkHome`} to={info?.Categorias.Button.Path}>
              {info?.Categorias.Button.Titulo}
              <FlechaButton />
            </Button>
        </section>
      }

      <section className='back-skew margin30 back-top'>
        {
          info?.Carrusel.Show &&
          <>
            <Content className='unsetPa'>
              <h1 className={`${info?.Carrusel.Titulo.Color} title h1-title title-section`}>{info?.Carrusel.Titulo.Titulo}</h1>
            </Content>
            <OwlCarousel className={`${styles.clientes} owl-carousel owl-theme`} {...options2}>
              {info?.Carrusel?.Imagenes?.data.map(img => 
                <img key={img.id} src={img.attributes.url} alt={`img-${img.id}`} />
              )}
            </OwlCarousel>
          </>
        }
        {/* <Content className={styles.listForm}>
          <PostForm />
          <div>
            <h2 className={`${info?.section.titlePoints.color} title ${styles.titlePoint}`}>{info?.section.titlePoints.titulo}</h2>
            <ul className={styles.liStyled}>
              {info?.section.points.map(li => (
                <li key={li.id} className={`${li.color} li`}>{li.elemento}</li>
              ))}
            </ul>
          </div>
        </Content> */}
      </section>

      {/* <Content>
        <CategoryContain>
          {info?.cards.map(card => (
            card.show ? (
              <div key={card.id} className={styles.cardHome}>
                <h2 className={`${card.title.color} title`}>{card.title.titulo}</h2>
                <p>{card.description}</p>
                {card.link.show ? (
                  <Button className={`${card.link.style} ${card.link.color}`} to={card.link.pathLink}>
                    {card.link.titleLink}
                    <FlechaButton />
                  </Button>
                ) : null}
              </div>
            ) : null
          ))
          }
        </CategoryContain>
      </Content> */}

    </>
  );
};

export default Home;


// Acceder a todas las sucategorias o hijos del objeto
// http://localhost:1337/api/datos?populate=imgNumber,componentName
// http://localhost:1337/api/datos?populate=*

// Obtener unicamnete la categoria o nombre que se esta pidiendo en la url
// http://localhost:1337/api/datos?fields=name

// Llamar unicamente los datos que necesito
// http://localhost:1337/api/datos?fields=name,publisehdAt&populate=imgNumber

//Llamar una sola categoria
// http://localhost:1337/api/categories/1?fields=name&populate=restaurants

//Cambiar el orden???
// http://localhost:1337/api/categories?fields=name&sort=name


//Filtrar por Numeros
// http://localhost:1337/api/restaurants?filters=[avgPrice][$lte]=30 equal
// http://localhost:1337/api/restaurants?filters=[avgPrice][$lt]=30 less
// https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest/filtering-locale-publication.html#filtering

// /api/homepage?populate=body.numero.image