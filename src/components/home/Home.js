import logo from '../../img/GOA.png';
import goaImage from '../../img/goaImage.png'
import delivery from '../../img/delivery-man.png'
import takeAway from '../../img/take-away.png'
import { Link } from "react-router-dom"


const Home = () => {
    return (
        <>
        <div className="home"> 
            <div className="home-content">
                <div className="home-logo">
                    <img src={goaImage} alt="Elephnat" />
                    <img src={logo} alt="Logo" />
                    <h2>Indian Fast-Food</h2>
                </div>
                <div className="home-order">
                    <h2>Commandez en ligne</h2>
                    <div className="home-order-content">
                        <Link to="/delivery">
                            <div className="home-order-type">
                                <div>
                                    <img src={delivery} alt="food delivery" /></div>
                                <p>Livraison</p>
                            </div>
                        </Link>
                        <Link to="/menu-list">
                            <div className="home-order-type">
                                <div><img src={takeAway} alt="food delivery" /></div>
                                <p>A emporter</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Home;