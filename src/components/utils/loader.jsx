import React, {Component} from 'react';
import '../../styles/loader.scss';

export default class Loader extends Component{
    render(){
        return(
            <div className="loader">
                <span className='var--1'></span>
                <span className='var--2'></span>
                <span className='var--3'></span>
                <span className='var--4'></span>
                <span className='var--5'></span>
                <span className='var--6'></span>
                <span className='var--7'></span>
                <span className='var--8'></span>
                <span className='var--9'></span>
            </div>
        )
    }
}