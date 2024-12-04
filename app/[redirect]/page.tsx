"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

const Page = () => {
  const { redirect } = useParams();

  const redirectTo = async () => {
    const getData = await axios.post("/api/getShorten", { shortUrl: redirect });
    console.log(getData);
    
    if (getData.data.success) {
      window.location.href = getData.data.shorten.url;
      return;
    }
    window.location.href = "/";
    return;
  };

  useEffect(() => {
    redirectTo();
  }, []);
  return <div className="min-h-[60vh]">{redirect}</div>;
};

export default Page;
