//to show a copyright message in a <p> with a dynamically updated year.
import React from "react"

function Footer(){
    let date = new Date();
    let year = date.getFullYear();

    return (
        <footer>
            <p>copyright © {year}</p>
        </footer>
    );
}

export default Footer;