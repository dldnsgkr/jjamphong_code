import '@style/web/common/header.scss';
import IconLogo from '@icon/logo/icon-logo.svg';
import IconSearch from '@icon/icon-search.svg';

const Header = () => {
  return (
    <header className="header">
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
  );
};

export default Header;
