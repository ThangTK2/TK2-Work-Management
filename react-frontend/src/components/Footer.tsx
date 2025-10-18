const Footer = () => {
  return (
    <footer className="z-10 py-4 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 shadow-[0_-2px_4px_rgba(0,0,0,0.1)]">
      <div className="container mx-auto px-6 text-center text-sm">
        <span>© {new Date().getFullYear()} TK2</span>
      </div>
    </footer>
  );
};

export default Footer;
