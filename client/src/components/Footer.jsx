import logo from "../img/logo.png";

const Footer = () => {
  return (
    <footer>
      <div className="logo">
        <img src={logo} alt="" />
        <span>Ayblog</span>
      </div>
      <span>
        Made with ❤ and <b>React.js</b>.
      </span>
    </footer>
  );
};

export default Footer;
