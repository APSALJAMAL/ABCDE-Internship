import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white ">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        
        {/* Brand or Copyright */}
        <div className="text-center md:text-left">
          <p className="text-sm">&copy; {new Date().getFullYear()} ABCDE Internship. All rights reserved.</p>
        </div>
        
        {/* Social Links */}
        <div className="flex space-x-6">
          <a
            href="https://github.com/APSALJAMAL"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition duration-300 flex items-center space-x-2"
          >
            <FaGithub size={20} />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/apsaljamal"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition duration-300 flex items-center space-x-2"
          >
            <FaLinkedin size={20} />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
