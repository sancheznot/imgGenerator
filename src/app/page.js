"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");

  return (
    <>
      {/* {user === "" ? (
      <div className="flex justify-center items-center text-black flex-col w-5/12 h bg-slate-300 rounded-lg">
        <h1 className="text-7xl">Hello</h1>
        <form
          onSubmit={async (e) => {
           
    ):( */}
      <div className="flex justify-center items-center text-black flex-col w-5/12 h bg-slate-300 rounded-lg">
        <h1 className="text-7xl">Hello</h1>
        <form
          onSubmit={async (e) => {
            try {
              e.preventDefault();
              setLoading(true);
              const res = await fetch("/api/generate", {
                method: "POST",
                body: JSON.stringify({ prompt }),
                headers: {
                  "Content-Type": "application/json",
                },
              });
              const data = await res.json();
              setImage(data.url);
            } catch (error) {
              console.log(error);
            }
            setLoading(false);
            setPrompt("");
          }}
          className="flex flex-col justify-center items-center">
          <input
            type="text"
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
            className="border border-black p-3 rounded-lg m-3"
          />
          <button
            type="submit"
            className="bg-gray-400 p-2 rounded-lg text-2xl w-60 ">
            Submit
          </button>
        </form>
        {image === "" && loading === false ? (
          <div className="box flex justify-center items-center">
            <p className="">Let&apos;s try, I&apos;m waiting for you</p>
          </div>
        ) : loading ? (
          <div className="box flex justify-center items-center">
            <p>generating your image</p>
          </div>
        ) : (
          <div className="box flex justify-center items-center rounded-xl">
            <Image
              src={image}
              width={350}
              height={350}
              alt="Generated Image"
              className="rounded-lg border border-gray-400"
            />
          </div>
        )}
      </div>
      )
    </>
  );
}
