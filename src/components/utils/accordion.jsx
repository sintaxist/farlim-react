import React from 'react';
import '../../styles/accordion.scss';

export const Accordion = ({title, active, setActive}) => {
    return(
        <div className='accordion'>
            <div className='accordionHeading'>
                <div className='container'>
                    <h2>{title}</h2>
                    <span onClick={() => setActive(title)}>
                        {active === title ? "X" : "lll"}
                    </span>
                </div>
            </div>

            <div className={(active === title ? "show" : "") + " accordionContent"}>
                <div className='container'>
                    <h2>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere nemo ducimus sit commodi ipsum illum deserunt possimus laudantium vero odio aspernatur quo eos consequatur reprehenderit, illo qui excepturi blanditiis hic?</h2>
                </div>
            </div>
        </div>
    )
}