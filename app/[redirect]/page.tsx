"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";

interface Shorten {
  url: string;
  shorten: string;
}

const Page = () => {
  const { redirect } = useParams();

  const redirectTo = async () => {
    if (typeof redirect !== "string") return;
    const shorten = localStorage.getItem("shorten") as string;
    const params = redirect.replace(/%20/g, " ");
    const getData = JSON.parse(shorten).find((item: Shorten) => item.shorten === params);
    console.log(getData, redirect, params);

    if (getData) {
      window.location.href = getData.url;
      return;
    }
    // window.location.href = "/";
    return;
  };

  useEffect(() => {
    redirectTo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="min-h-[60vh]">{redirect}</div>;
};

export default Page;
