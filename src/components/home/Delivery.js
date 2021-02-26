import uberIcon from '../../img/uber-icon.png'
import deliverooIcon from '../../img/deliveroo-icon.png'
import { ExternalLink } from 'react-external-link';

const Delivery = () => {
    return (
        <div className="delivery" id="delivery">
            <div className="delivery-content">
                <div className="delivery-text">
                    <h2>N’attendez plus !  </h2>
                    <h3>UberEats et Delivroo vous livre à domicile</h3>
                    <p>20 mins de livraison <br /> 09 80 84 29 49<br />Rayon de 10 km autour de Grenoble</p>
                </div>
                <div className="delivery-partners">
                    <ExternalLink href="https://www.ubereats.com/grenoble/food-delivery/goa-indian-fast-food/68kvwm2KRsK0OSOZe2Rj1w">
                        <div className="delivery-partners_item">
                            <img src={uberIcon} alt="uber eats logo" />
                            <p>Commander via <br />UberEats</p>
                        </div>
                    </ExternalLink>
                    <ExternalLink href="https://deliveroo.fr/fr/menu/grenoble/grenoble-centre/goa-indian-fast-food">
                        <div className="delivery-partners_item deliveroo">
                            <img src={deliverooIcon} alt="deliveroo logo" className="deliveroo-icon" />
                            <p>Commander via <br />Deliveroo</p>
                        </div>
                    </ExternalLink>

                </div>
            </div>

        </div>
    );
}

export default Delivery;