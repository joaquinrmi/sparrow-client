import React from "react";

import Button, { ButtonStyle } from "../../components/button/";

import "./welcome.scss";

const Welcome: React.FunctionComponent = () =>
{
    return <div className="welcome">
        <section className="home-body">
            <div className="blue-section"></div>

            <div className="welcome-message">
                <div className="message-content">
                    <div className="welcome-title">
                        <h1>
                            Lo que no está pasando
                        </h1>

                        <h2>
                            Únete a Sparrow hoy mismo.
                        </h2>
                    </div>

                    <div className="button-list">
                        <div className="button-container">
                            <Button stylePreset={ButtonStyle.Blue} to="/signup">
                                Registrarse
                            </Button>
                        </div>
                        
                        <div className="button-container">
                            <Button stylePreset={ButtonStyle.BlueTransparent} to="/login">
                                Iniciar sesión
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="home-footer">
            <a href="https://www.linkedin.com/in/joaquin-ruaimi-3381a1201/">
                Linkedin
            </a>

            <a href="https://joaquinrmi.github.io/porfolio/">
                Porfolio
            </a>

            <a href="https://github.com/joaquinrmi">
                Github
            </a>

            <a href="https://github.com/joaquinrmi/sparrow-client">
                Repositorio (cliente)
            </a>

            <a href="https://github.com/joaquinrmi/sparrow-server">
                Repositorio (servidor)
            </a>
        </section>
    </div>;
};

export default Welcome;