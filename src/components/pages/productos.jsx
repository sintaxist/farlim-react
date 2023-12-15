import React, { Component } from "react";

import Tabs from "../utils/Tabs";
import Panel from "../utils/Panel";

import { API } from "../utils/httpClient";
import { ProductCard } from '../utils/productCard';
import { ProductContain } from "../utils/UseElements";

class Productos extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], userId: 4, array: [5, 1, 3, 4, 6] };
  }

  componentDidMount() {
    fetch(API + 'categories?populate=productos.image,productos.size')
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            data: result,
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  render() {

    const { data } = this.state;

    return (
      <div>
        <Tabs className='hidden'>
          {data?.data?.map(elem => (

            <Panel key={elem.id} title={elem.attributes.nombre}>
              <h1 className="title h1-title gradient title-tabs">{elem.attributes.nombre}</h1>
              <ProductContain>
                {elem?.attributes?.productos?.data?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </ProductContain>
            </Panel>

          ))}
        </Tabs>
      </div>
    );
  }
}

export default Productos;
