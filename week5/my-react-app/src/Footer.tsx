function Footer() {
    return(
        <footer className="fixed font-bold bottom-0 w-full bg-gray-900 text-white py-3 shadow-inner text-center">
            <p>
                &copy; {new Date().getFullYear()} Powered by MH2425
            </p>
        </footer>
    );
}

export default Footer;