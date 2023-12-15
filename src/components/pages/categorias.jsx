import React from "react";
import { CategoryCard } from "../utils/categoryCard";
import { urlAdmin } from "../utils/httpClient";
import { CategoryContain, Content } from "../utils/UseElements";

export default class Categoria extends React.Component {

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
      const datos = await fetch(urlAdmin + '/api/categoria?populate=title,categories.image', {
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
      return <div>An error occured: {error.message - { datos }}</div>;
    }

    const info = this.state.datos.data?.attributes;

    return (
      <section className="back-final margin100">
        <Content>
          <h1 className={`${info?.title.color} title h1-title`}>{info?.title.titulo}</h1>
          <p>{info?.description}</p>
          <CategoryContain>
            {info?.categories.data.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </CategoryContain>
        </Content>
      </section>
    );
  }
}