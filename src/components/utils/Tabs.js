import React, { Component } from "react";

import styles from '../../styles/tabs.module.scss'
import { Content } from "./UseElements";

class Tabs extends Component {
  state = {
    selected: this.props.selected || 2
  };

  handleChange(index) {
    this.setState({ selected: index });
  }

  render() {

    let lastScrollTop = 0;

    const chageHeader = () => {

      let header = document.getElementById('tabs');

      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        header.style.top = '-100px'
      } else {
        header.style.top = '81px'
      }

      lastScrollTop = scrollTop;
    }

    window.addEventListener('scroll', chageHeader);
    
    return (
      <>

        <ul id='tabs' className={styles.links}>
          {this.props?.children?.map((elem, index) => {
            let style = index === this.state.selected ? styles.selected : "";
            return (
              <li 
                key={index}
                className={style}
                onClick={() => this.handleChange(index)}
                >
                  {elem.props.title}
              </li>
            );
          })}
        </ul>

        <Content className="margin140">
          {this.props.children == null ? null: (
            <div className={styles.tab}>{this.props.children[this.state.selected]}</div>
          )}
        </Content>

      </>
    );
  }
}

export default Tabs;
