"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [signin, setSignin] = useState(false);
  const [user, setUser] = useState("");

  return (
    <>
      {signin === false ? (
        <div className="flex justify-center items-center text-black flex-col w-5/12 h bg-slate-300 rounded-lg">
          <h1 className="text-5xl md:text-3xl">Hello {user}</h1>
          <form
            className="flex flex-col justify-center items-center"
            onSubmit={(e) => {
              e.preventDefault();
              setUser(user);
              setSignin(true);
            }}>
            <input
              type="text"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              className="border border-black p-3 rounded-lg m-3 md:w-10/12 md:text-xl md:p-1"
              placeholder="Write your name"
            />
            <button
              type="submit"
              className="bg-red-400 p-2 mb-3 rounded-lg text-2xl w-60 md:w-20 md:text-xl md:p-1">
              Aceptar
            </button>
          </form>
        </div>
      ) : (
        <div className="flex justify-center items-center text-black flex-col md:w-10/12 w-6/12 h bg-slate-300 rounded-lg">
          <h1 className="text-7xl md:text-5xl">Hello {user}</h1>
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
              className="border border-black p-3 rounded-lg m-3 md:w-50 md:text-xl md:p-1"
              placeholder="Write something"
            />
            {loading ? (
              <button
                disabled
                type="submit"
                className="bg-red-400 p-2 mb-3 rounded-lg text-2xl w-60 md:w-20 md:text-xl md:p-1 opacity-40">
                Generating...
              </button>
            ) : (
              <button
                type="submit"
                className="bg-gray-400 p-2 mb-3 rounded-lg text-2xl w-60 md:w-20 md:text-xl md:p-1">
                Submit
              </button>
            )}
          </form>
          {image === "" && loading === false ? (
            <div className="box flex justify-center items-center">
              <p className="text-xl text-lime-800">Let&apos;s try, I&apos;m waiting for you</p>
            </div>
          ) : loading ? (
            <div className="box flex justify-center items-center">
              <p className="text-xl text-lime-800">generating your image...</p>
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
      )}
    </>
  );
}
