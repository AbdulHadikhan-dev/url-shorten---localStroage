"use client";
import React, { useEffect, useState } from "react";
import { FiCopy, FiLoader, FiLink } from "react-icons/fi";
import axios from "axios";

import { useRouter } from "next/navigation";

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
  const [copied, setCopied] = useState('');

  const router = useRouter();

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
                      onClick={() => router.push(`/${item.shorten}`)}
                    >
                      {item.shorten}
                    </Button>
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(`${location.host}/${item.shorten}`);
                        setCopied(item.shorten);
                        setTimeout(() => setCopied(''), 2000);
                      }}
                      className="ml-4 p-2 text-blue-600 hover:text-blue-700 focus:outline-none"
                      aria-label="Copy shortened URL"
                      variant={"ghost"}
                    >
                      <FiCopy size={20} />
                    </Button>
                  </div>
                  {copied === item.shorten && (
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
    </div>
  );
};

export default URLShortener;
