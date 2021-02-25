import React from 'react';

class Footer extends React.Component {
    render() {
        return (
            <div>
                <section className="footerContainer">

                    <div class="container">

                        <div class="col-aboutus">
                            <h2>Sobre nós</h2>

                        </div>
                        <div class="col-links">
                            <h2>Links</h2>
                            <ul>

                                <li>FAQ</li>
                                <li>Política de privacidade</li>
                                <li>Ajuda</li>
                                <li>Termos e condições</li>
                            </ul>
                        </div>
                        <div class="contactos">
                            <h2>Contactos</h2>
                            <ul>
                                <li><span>R. Dom José 33, 3511-078 Viseu, Portugal</span></li>
                                <li><span>+351 232675983</span></li>
                                <li><span>lojatdw@gmail.com</span></li>

                            </ul>

                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Footer;