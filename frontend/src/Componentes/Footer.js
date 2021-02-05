import React from 'react';

class Footer extends React.Component{
    render (){
        return(
            <div>
                   <div class="container">
            <div class="col-aboutus">
                <h2>Sobre nos</h2>
               
             </div>
             <div class="col-links">
                 <h2>Links</h2>
                 <ul>
                     <li><a href="#">ola</a></li>
                     <li><a href="#">faq</a></li>
                     <li><a href="#">politica privacidade</a></li>
                     <li><a href="#">ajuda</a></li>
                     <li><a href="#">temos e condicoes</a></li>
                 </ul>
             </div>
             <div class="contactos">
                 <h2>Contactos</h2>
                <ul>
                    <li><span>123 rua Viseu Portugal</span></li>
                    <li><span>2322222234</span></li>
                    <li><span>ola@gmail.com</span></li>

                </ul>

             </div>



           </div>

                
            </div>
        )
    }
}

export default Footer;