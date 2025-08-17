function Header() {

    return (
        <header className="flex flex-wrap items-center justify-between px-8 py-4 bg-gray-900 text-white shadow-lg">
            <h1 className="text-2xl font-bold tracking-wide">
                My Website
            </h1>
            <nav>
                    <ul className="flex space-x-6">
                        <li>
                            <a
                            href="#"
                            className="hover:text-blue-400 transition-colors duration-200"
                            >
                            Home
                            </a>
                        </li>
                        <li>
                            <a
                            href="#"
                            className="hover:text-blue-400 transition-colors duration-200"
                            >
                            About
                            </a>
                        </li>
                        <li>
                            <a
                            href="#"
                            className="hover:text-blue-400 transition-colors duration-200"
                            >
                            Services
                            </a>
                        </li>
                        <li>
                            <a
                            href="#"
                            className="hover:text-blue-400 transition-colors duration-200"
                            >
                            Contact
                            </a>
                        </li>
                    </ul>
            </nav>
        </header>
    )
}

export default Header;