import '@style/web/components/header/mainHeader.scss';
import IconLogo from '@icon/logo/icon-logo.svg';
// import IconSearch from '@icon/icon-search.svg';

const Header = () => {
  return (
    <>
      <header className="Mainheader">
        <div className="headerContainer">
          <div className="headerContainer__titleContainer">
            <img src={IconLogo} alt="project logo" />
            <p className="logo">Compilation Of Data</p>
          </div>
          {/* <div className="headerContainer__searchContainer">
          <div className="searchInput__wrapper">
            <input type="text" />
          </div>
          <img src={IconSearch} alt="search-icon" />
        </div> */}
          <div className="headerContainer__memberContainer">
            <div className="signin__button">Sign in</div>
            <div className="login__button">Login</div>
          </div>
        </div>
      </header>
      <nav className="mainNav">
        <ul>
          <li>
            <a href="/code">CODE</a>
          </li>
          <li>
            <a href="/blog">BLOG</a>
          </li>
          <li>
            <a href="/comunity">COMUNITY</a>
          </li>
          <li>
            <a href="/findRestaurant">FIND RESTAURANT</a>
          </li>
          <li>
            <a href="/chatGPT">CHAT GPT</a>
          </li>
          <li>
            <a href="/shoppingMall">SHOPPING MALL</a>
          </li>
          <li>
            <a href="/onlineChat">ONLINE CHAT</a>
          </li>
          <li>
            <a href="/planer">PLANER</a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
