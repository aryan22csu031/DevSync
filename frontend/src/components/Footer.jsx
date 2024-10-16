const Footer = () => {
  return (
    <footer className="footer footer-center bg-base-200 text-base-content rounded p-10">
      <nav className="grid grid-flow-col gap-4">
        <a href="https://www.linkedin.com/in/aryan-arora-064082208/" target="_blank" className="link link-hover">Github</a>
        <a href="https://github.com/aryan22csu031" target="_blank" className="link link-hover">Linkedin</a>
      </nav>
      <aside>
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
    </footer>
  );
};

export default Footer;
