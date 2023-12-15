import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop(){
    const {pathname} = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0)

        const navbar = document.getElementById('header');

        if(pathname === '/'){
            navbar.classList.remove('other')
        }else{
            navbar.classList.add('other')
        }

    }, [pathname]);

    return null;
}