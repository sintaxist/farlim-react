import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as CgIcons from 'react-icons/cg';
import {IoIosArrowUp,IoIosArrowDown} from 'react-icons/io';
import {IoSchoolOutline,IoNewspaperOutline} from 'react-icons/io5';
import * as FiIcons from 'react-icons/fi';
import * as MdIcons from 'react-icons/md';

export const MenuData = [
    {
        title: 'Conoce INEDLA',
        path: '',
        icon: <MdIcons.MdScreenSearchDesktop/>,
        cName:  'dropdown-link',
        iconClosed: <IoIosArrowDown/>,
        iconOpen: <IoIosArrowUp/>,
        subNav:[
            {
                title:'¿Por qué estudiar en INEDLA?',
                path: '/estudia-podologia',
                icon: <FaIcons.FaQuestion/>,
                cName: 'dropdown-link'
            },
            {
                title:'Equipo Docente',
                path: '/equipo-docente',
                icon: <FaIcons.FaChalkboardTeacher/>,
                cName: 'dropdown-link'
            },
            {
                title:'Plantel',
                path: '/plantel',
                icon: <FaIcons.FaSchool/>,
                cName: 'dropdown-link'
            },
            {
                title:'Plan de Estudios',
                path: '/plan-de-estudios',
                icon: <IoSchoolOutline/>,
                cName: 'dropdown-link'
            }
        ]
    },
    {
        title: 'Admisiones',
        path: '/admsiones',
        icon: <CgIcons.CgFileDocument/>,
        cName: 'dropdown-link',
    },
    {
        title: 'Comunidad',
        path: '/comunidad',
        icon: <MdIcons.MdPeopleOutline/>,
        cName: 'dropdown-link',
        subNav:[
            {
                title:'Plan de Estudios',
                path: '/plan-de-estudios',
                icon: <IoNewspaperOutline/>,
                cName: 'dropdown-link'
            }
        ]
    },
    {
        title: 'Contacto',
        path: '/contacto',
        icon: <FiIcons.FiPhoneCall/>,
        cName: 'dropdown-link',
    }
]
export const MenuItems = [
    {
        title:'¿Por qué estudiar en INEDLA?',
        path: '/estudia-podologia',
        cName: 'dropdown-link'
    },
    {
        title:'Equipo Docente',
        path: '/equipo-docente',
        cName: 'dropdown-link'
    },
    {
        title:'Plantel',
        path: '/plantel',
        cName: 'dropdown-link'
    },
    {
        title:'Plan de Estudios',
        path: '/plan-de-estudios',
        cName: 'dropdown-link'
    }
]

export const SecondMenuItems = [
    {
        title:'Noticias',
        path: '/noticias',
        cName: 'dropdown-link'
    }
]