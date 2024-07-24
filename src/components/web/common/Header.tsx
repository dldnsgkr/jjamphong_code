import '@style/web/components/common/header.scss';
import IconLogo from '@icon/logo/icon-logo.svg';
import IconSearch from '@icon/icon-search.svg';

const Header = () => {
  return (
    <>
      <header>
        <div className="headerContainer__titleContainer">
          <img src={IconLogo} alt="project logo" />
          <p>Compilation Of Data</p>
        </div>
        <div className="headerContainer__searchContainer">
          <div className="searchInput__wrapper">
            <input type="text" />
          </div>
          <img src={IconSearch} alt="search-icon" />
        </div>
        <div className="headerContainer__memberContainer">
          <div className="signin__button">Sign in</div>
          <div className="login__button">Login</div>
        </div>
      </header>
      <nav>
        <ul>
          <li>
            <a href="asd">Home</a>
          </li>
          <li>
            <a href="as">About</a>
          </li>
          <li>
            <a href="asd">Gallery</a>
          </li>
          <li>
            <a href="s">Notes</a>
          </li>
          <li>
            <a href="s">Contact</a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
