import instaIcon from '../../img/insta-icon.png'


const InstaFeed = () => {
    return (
        <div className="insta-feed">
            <div className="insta-feed-content">
                <div className="insta-feed-left">
                    <h3>Découvrez plus de photos de nos plats sur notre page Instagram</h3>
                    <a href="https://www.instagram.com/goaindianfastfood/?hl=fr" target="_blank" rel="noreferrer">
                        <img src={instaIcon} alt="Instagram logo" />
                    </a>
                </div>
                <div className="insta-feed-right">
                    {/* <Feed userName="goaindianfastfood" className="Feed" classNameLoading="Loading" limit="5" /> */}
                </div>
            </div>

        </div>
    );
}

export default InstaFeed;