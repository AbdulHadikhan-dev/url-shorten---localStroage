"use client";
import React, { useEffect, useState } from "react";
import { FiCopy, FiLoader, FiLink, FiTrash } from "react-icons/fi";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";

import { useToast } from "@/hooks/use-toast";

interface Shorten {
  url: string;
  shorten: string;
}

const URLShortener = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [shorten, setShorten] = useState<Shorten[]>([]);
  const [error, setError] = useState({
    url: "",
    shortUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState("");

  const router = useRouter();
  const { toast } = useToast();
  const validateUrl = (input: string) => {
    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
    return urlPattern.test(input);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const addMethod = shortUrl.replace(/\s{2,}/gi, " ").trim();
    console.log(addMethod);

    setShortUrl(addMethod);
    if (!url) {
      setError({ ...error, url: "Please enter a URL" });
      return;
    }
    if (!validateUrl(url)) {
      setError({ ...error, url: "Please enter a valid URL" });
      return;
    }
    if (addMethod === " " || addMethod.length < 1) {
      return setError({ ...error, shortUrl: "Please enter a short URL" });
    }
    setLoading(true);
    setError({
      url: "",
      shortUrl: "",
    });
    setLoading(false);
    const findShorten = shorten.find((item) => {
      return item.shorten.trim() === addMethod;
    });
    if (!findShorten) {
      localStorage.setItem(
        "shorten",
        JSON.stringify([...shorten, { url, shorten: addMethod }])
      );
      toast({
        title: "Shorten Create Successfully",
        description: "shorten created successfully. and saved in localStorage",
      });
      setUrl("");
      setShortUrl("");
      fetchData();
      return;
    }

    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "Shorten Already Exists!",
    });
  };

  async function fetchData() {
    const data = localStorage.getItem("shorten");
    if (data) {
      setShorten(JSON.parse(data));
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteShorten = (shortID) => {
    const Items = shorten.filter((data) => {
      return data.shorten !== shortID;
    });
    console.log(shortID, Items);
    localStorage.setItem("shorten", JSON.stringify(Items));
    fetchData();
  };

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
              <Toaster />
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
                <div
                  className="mt-8 p-4 bg-gray-50 rounded-lg"
                  key={item.shorten}
                >
                  <div className="flex items-center justify-between">
                    <Button
                      className="text-blue-700 font-medium break-all"
                      variant={"link"}
                      onClick={() => router.push(`/${item.shorten.trim()}`)}
                    >
                      {item.shorten}
                    </Button>
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `${location.host}/${item.shorten}`
                          );
                          setCopied(item.shorten);
                          setTimeout(() => setCopied(""), 2000);
                        }}
                        className="ml-4 p-2 text-blue-600 hover:text-blue-700 focus:outline-none"
                        aria-label="Copy shortened URL"
                        variant={"ghost"}
                      >
                        <FiCopy size={20} />
                      </Button>
                      <Button
                        onClick={() => {
                          handleDeleteShorten(item.shorten);
                        }}
                        className="p-2 text-red-500 hover:text-red-600 focus:outline-none"
                        aria-label="Delete shortened URL"
                        variant={"ghost"}
                      >
                        <FiTrash size={20} />
                      </Button>
                    </div>
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
