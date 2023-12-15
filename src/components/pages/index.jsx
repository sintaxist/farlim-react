import React from 'react';
import { urlAdmin } from '../utils/httpClient';

import styles from '../../styles/Home.module.scss';
import { Button, CategoryContain, Content, FlechaButton, ProductContain } from '../utils/UseElements';

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import OwlCarousel from 'react-owl-carousel';
import { ProductCard } from '../utils/productCard';
import { CategoryCard } from '../utils/categoryCard';
import PostForm from '../form';

export default class Home extends React.Component {

  state = {
    datos: [],
    error: null,
  };

 
  componentDidMount = async () => {

    const parseJSON = resp => (resp.json ? resp.json() : resp);

    const checkStatus = resp => {
      if (resp.status >= 200 && resp.status < 300) {
        return resp;
      }
      return parseJSON(resp).then(resp => {
        throw resp;
      });
    };
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const datos = await fetch(urlAdmin + '/api/homepage?populate=banner,banner.imgMobile,banner.imgTablet,banner.imageDesk,banner.link,numeralia,numeralia.title,numeralia.numero.image,testimonials.image,testimonials.review.image,testimonials.title,productos,productos.title,productos.productos.image,productos.link,productos.productos.size,categorias.titulo,categorias.categories,categorias.link,categorias.categories.image,cards,cards.title,cards.link,section,section.img,section.img.img,section.title,section.titlePoints,section.points' ,{
        method: 'GET',
        headers: headers,
      })
        .then(checkStatus)
        .then(parseJSON);
      this.setState({ datos });
    } catch (error) {
      this.setState({ error });
    }
  };

  render() {
    const { error, datos } = this.state;


    if (error) {
      return <div>An error occured: {error.message - {datos}}</div>;
    }

    const info = this.state.datos.data?.attributes;

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
      dots:false,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplaySpeed: 3000,
      autoplayHoverPause: false,
      responsive:{
        960:{
          items: 4,
          margin: 60,
        },
        550:{
          items: 3,
          margin: 60,
        },
        0:{
          items: 1,
          margin: 30,
        }
      }
    };

    return (
      <>
        {
          info?.banner.show ? (
            <section id={styles.firstSection}>

              <div className={styles.svgDg}>

                <img className={styles.bannerDesk} src={urlAdmin + info?.banner.imageDesk.data.attributes.url} alt="banner-desk" />

                <img className={styles.bannerTablet} src={urlAdmin + info?.banner.imgTablet.data.attributes.url} alt="banner-tablet" />

                <img className={styles.bannerMobile} src={urlAdmin + info?.banner.imgMobile.data.attributes.url} alt="banner-mobile" />

              </div>

              <article className={styles.firstText}>

                <h1>{info?.banner.titulo}</h1>
                <p>{info?.banner.description}</p>

                {
                info?.banner.link.show ?
                  <Button className={`${info?.banner.link.color} ${info?.banner.link.style}`} to={info?.banner.link.pathLink}>
                  {info?.banner.link.titleLink}
                    <FlechaButton/>
                  </Button> : null
                }

              </article>

              <div className={styles.scrollDowns}>
                <div className={styles.mousey}>
                  <div className={styles.scroller}></div>
                </div>
              </div>

            </section>
          ): null
        }

        {
          info?.numeralia.show ? (
            <section className={styles.firstSection}>

              <Content>

                <h1 className={info?.numeralia.title.color + ' title h1-title'}>{info?.numeralia.title.titulo}</h1>

                <div className={`${styles.row1} ${styles.statsbar}`}>
                  {info?.numeralia.numero.map(number => (
                    <article className={`white-div stat${number.id}`} key={number.id}>
                      <img src={urlAdmin + number.image.data.attributes.url} alt="" />
                      <div>
                        <h1>{number.number}</h1>
                        <p>{number.description}</p>
                      </div>
                    </article>
                  ))}
                </div>

                {
                  info?.testimonials.show ? (

                    <div className={`${styles.sliderContain} white-div`}>
                      <div className={styles.imgCont}>
                        <img className="product-img" src={urlAdmin + info?.testimonials.image.data.attributes.url} alt="imagen testimonials" />
                      </div>

                      <div id='testimonials' className={styles.testimonials}>

                        <h2 className={`title ${info?.testimonials.title.color}`}>{info?.testimonials.title.titulo}</h2>

                        <OwlCarousel className='owl-carousel owl-theme' {...options}>
                          {info?.testimonials.review.map(testimonio => (
                            <div className={styles.slide} key={testimonio.id}>
                              <q>{testimonio.description}</q>
                              <span>{testimonio.nombre}, {testimonio.edad} años</span>
                              <p>{testimonio.puesto}</p>
                            </div>
                          ))}
                        </OwlCarousel>
                      </div>
                    </div>

                  ) : null
                }

              </Content>

            </section>
          ) : info?.testimonials.show ? (
              <div className={`${styles.sliderContain} white-div`}>
                <div className={styles.imgCont}>
                  <img className="product-img" src={urlAdmin + info?.testimonials.image.data.attributes.url} alt="imagen testimonials" />
                </div>

                <div id='testimonials' className={styles.testimonials}>

                  <h2 className={`title ${info?.testimonials.title.color}`}>{info?.testimonials.title.titulo}</h2>

                  <OwlCarousel className='owl-carousel owl-theme' {...options}>
                    {info?.testimonials.review.map(testimonio => (
                      <div className={styles.slide} key={testimonio.id}>
                        <q>{testimonio.description}</q>
                        <span>{testimonio.nombre}, {testimonio.edad} años</span>
                        <p>{testimonio.puesto}</p>
                      </div>
                    ))}
                  </OwlCarousel>

                </div>
              </div>
          ) : null
        }

        { info?.productos.show ?
          (<section className={`${styles.productosDestacados} back-skew`}>
            <Content>
              <h1 className={info?.productos.title.color + ' title h1-title'}>{info?.productos.title.titulo}</h1>
              <ProductContain>
                {info?.productos.productos.data.map(product => (
                  <ProductCard key={product.id} product={product}/>
                ))}
              </ProductContain>
              {info.productos.link.show ? (
                <Button className={`${info?.productos.link.style} ${info?.productos.link.color} linkProd`} to={info?.productos.link.pathLink}>
                {info?.productos.link.titleLink}
                <FlechaButton />
              </Button>
              ):null}
            </Content>
          </section>) :null
        }

        { info?.categorias.show ?
          (<section className={styles.categorias}>
            <Content className='unsetPa'>
              <h1 className={info.categorias.titulo.color + ' title h1-title'}>{info.categorias.titulo.titulo}</h1>
              <CategoryContain>
                  {info?.categorias.categories.data.map(category => (
                    <CategoryCard key={category.id} category={category}/>
                  ))}
              </CategoryContain>
            </Content>
            {info?.categorias.link.show ? (
              <Button className={`${info?.categorias.link.style} ${info?.categorias.link.color} linkHome`} to={info?.categorias.link.pathLink}>
                {info?.categorias.link.titleLink}
                <FlechaButton />
              </Button>
            ):null}
          </section>
          ) : null
        }

        {
          info?.section.show ?
            <section className='back-skew margin30 back-top'>
              <Content className='unsetPa'>
                <h1 className={`${info?.section.title.color} title h1-title title-section`}>{info?.section.title.titulo}</h1>
              </Content>
              <OwlCarousel className={`${styles.clientes} owl-carousel owl-theme`} {...options2}>
                {info?.section.img.map(img => (
                  img.show ? (
                    <img key={img.id} src={urlAdmin + img.img.data.attributes.url} alt={`img-${img.id}`}/>
                  ) : null
                ))}
              </OwlCarousel>
              <Content className={styles.listForm}>
                <PostForm/>
                <div>
                  <h2 className={`${info?.section.titlePoints.color} title ${styles.titlePoint}`}>{info?.section.titlePoints.titulo}</h2>
                  <ul className={styles.liStyled}>
                    {info?.section.points.map(li => (
                      <li key={li.id} className={`${li.color} li`}>{li.elemento}</li>
                    ))}
                  </ul>
                </div>
              </Content>
            </section> 
          : null
        }
        
        <Content>
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
        </Content>

      </>
    );
  }
}

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