import '@style/web/components/header/codeHeader.scss';

const CodeHeader = () => {
  return (
    <header className="codeHeader">
      <div className="wrapper">
        <div className="codeHeader__container">
          <div className="logo">CODE COLLECTOR</div>
          <nav className="navBar">
            <ul>
              <li>
                <p>CSS</p>
              </li>
              <li>
                <p>JAVA</p>
              </li>
              <li>
                <p>JAVASCRIPT</p>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default CodeHeader;
