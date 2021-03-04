import logo from "../../img/GOA.png";
import goaImage from "../../img/goaImage.png";
import delivery from "../../img/delivery-man.png";
import takeAway from "../../img/take-away.png";
import { Link } from "react-scroll";

const Home = () => {
  return (
    <>
      <div className="home">
        <div className="home-content">
          <div className="home-logo">
            <img src={goaImage} alt="Elephnat" />
            <img src={logo} alt="Logo" />
            <h2 className="text-black">Indian Fast-Food</h2>
          </div>
          <div className="home-order">
            <h2 className="text-black">Commandez en ligne</h2>
            <div className="home-order-content">
              <Link
                activeClass="active"
                spy={true}
                smooth={true}
                to="delivery"
                style={{ cursor: "pointer" }}
                offset={-122}
              >
                <div className="home-order-type">
                  <div>
                    <img src={delivery} alt="food delivery" />
                  </div>
                  <p className="text-black">Livraison</p>
                </div>
              </Link>
              <Link
                activeClass="active"
                spy={true}
                smooth={true}
                to="menu-list"
                style={{ cursor: "pointer" }}
                offset={-122}
              >
                <div className="home-order-type">
                  <div>
                    <img src={takeAway} alt="food delivery" />
                  </div>
                  <p className="text-black">A emporter</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
