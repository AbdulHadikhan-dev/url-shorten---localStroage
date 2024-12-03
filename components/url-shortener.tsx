"use client";
import React, { useEffect, useState } from "react";
import { FiCopy, FiLoader, FiLink } from "react-icons/fi";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import axios from "axios";

import { Button } from "@/components/ui/button";

const URLShortener = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [shorten, setShorten] = useState([]);
  const [error, setError] = useState({
    url: "",
    shortUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const validateUrl = (input) => {
    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
    return urlPattern.test(input);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) {
      setError({ ...error, url: "Please enter a URL" });
      return;
    }
    if (!validateUrl(url)) {
      setError({ ...error, url: "Please enter a valid URL" });
      return;
    }
    if (shortUrl.length < 1) {
      return setError({ ...error, shortUrl: "Please enter a short URL" });
    }
    setLoading(true);
    setError({
      url: "",
      shortUrl: "",
    });
    const response = await axios.post("/api/createShorten", {
      url,
      shortUrl,
    });
    setLoading(false);
    alert(response.data.message);
  };

  async function fetchData() {
    try {
      const response = await axios.get("/api/getShorten");
      console.log(response.data);

      setShorten(response.data.result);
    } catch (error) {
      console.error(error);
    } finally {
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <img
                className="h-8 w-auto"
                src="images.unsplash.com/photo-1614332287897-cdc485fa562d?w=128&h=128&fit=crop"
                alt="Logo"
              />
              <span className="ml-2 text-xl font-bold text-gray-800">
                URLify
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Features
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Pricing
              </a>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                {isMenuOpen ? (
                  <RiCloseLine size={24} />
                ) : (
                  <RiMenu3Line size={24} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="#"
                className="block px-3 py-2 text-gray-600 hover:text-blue-600"
              >
                Home
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-gray-600 hover:text-blue-600"
              >
                Features
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-gray-600 hover:text-blue-600"
              >
                Pricing
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Main content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Transform Your Long URLs into Short Links
            </h1>
            <p className="text-xl text-gray-600">
              Make your links more manageable and trackable with our URL
              shortener
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <label htmlFor="url" className="sr-only">
                  Enter your URL
                </label>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLink className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="url"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                    error.url.length ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter your long URL here"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    setError({
                      url: "",
                      shortUrl: "",
                    });
                  }}
                  aria-label="URL input field"
                />
                {error && (
                  <p className="mt-2 text-sm text-red-600" role="alert">
                    {error.url}
                  </p>
                )}
              </div>
              <div className="relative">
                <label htmlFor="short-url" className="sr-only">
                  Enter your Shorten URL
                </label>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLink className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="short-url"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                    error.shortUrl.length ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter your short URL here"
                  value={shortUrl}
                  onChange={(e) => {
                    setShortUrl(e.target.value);
                    setError({
                      url: "",
                      shortUrl: "",
                    });
                  }}
                  aria-label="short-url input field"
                />
                {error && (
                  <p className="mt-2 text-sm text-red-600" role="alert">
                    {error.shortUrl}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                aria-label="Shorten URL button"
              >
                {loading ? (
                  <FiLoader className="animate-spin mx-auto" />
                ) : (
                  "Generate URL"
                )}
              </button>
            </form>

            {shorten.map((item) => {
              return (
                <div className="mt-8 p-4 bg-gray-50 rounded-lg" key={item._id}>
                  <div className="flex items-center justify-between">
                    <Button
                      className="text-blue-700 font-medium break-all"
                      variant={"link"}
                    >
                      {item.shorten}
                    </Button>
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(item.shorten);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="ml-4 p-2 text-blue-600 hover:text-blue-700 focus:outline-none"
                      aria-label="Copy shortened URL"
                      variant={"icon"}
                    >
                      <FiCopy size={20} />
                    </Button>
                  </div>
                  {copied && (
                    <p className="mt-2 text-sm text-green-600" role="alert">
                      Copied to clipboard!
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-gray-400">
                We provide fast and reliable URL shortening services for your
                needs.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaFacebook size={24} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaTwitter size={24} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaLinkedin size={24} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaInstagram size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>© {new Date().getFullYear()} URLify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default URLShortener;
