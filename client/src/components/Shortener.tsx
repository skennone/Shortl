import { Button } from "./ui/button";
import React, { useState } from "react";
import { useMutation, useMutationState } from "@tanstack/react-query";
import { createShortURL } from "./fetchShortURL";

const Shortener = () => {
  const [longURL, setLongUrl] = useState("");
  const [userID, setUserID] = useState("");
  const mutationKey = ["shortURL"];
  const [copied, setCopied] = useState(false);

  const mutation = useMutation({
    mutationKey,
    mutationFn: ({ longURL, userID }: { longURL: string; userID: string }) =>
      createShortURL(longURL, userID),
  });
  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    mutation.mutate({ longURL: longURL, userID: userID });
  }

  const data = useMutationState({
    // this mutation key needs to match the mutation key of the given mutation (see above)
    filters: { mutationKey },
    select: (mutation) => mutation.state.data,
  });

  const copyTextToClipboard = async (text: string) => {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    }
  };
  const handleClick = (text: string) => {
    copyTextToClipboard(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const shortURL = data[data.length - 1] as string;
  return (
    <div className="flex items-center justify-center min-w-full min-h-screen">
      <form className="flex flex-col md:w-1/5" onSubmit={handleSubmit}>
        <div className="text-3xl font-bold text-center">
          <span>URL Shortner</span>
        </div>
        <input
          type="text"
          placeholder="Long URL"
          className="p-3 mt-8 rounded-md border-2 border-gray-400 focus:outline-none focus:border-blue-300"
          value={longURL}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <input
          type="text"
          placeholder="UserID"
          className="p-3 mt-4 rounded-md border-2 border-grey focus:outline-none focus:border-blue-300"
          value={userID}
          onChange={(e) => setUserID(e.target.value)}
        ></input>
        <Button
          className="p-3 mt-6 rounded-md font-bold text-white"
          onClick={handleSubmit}
        >
          Shorten URL
        </Button>
        <div className="mt-2 flex items-center">
          {mutation.isSuccess ? (
            <div className="flex items-end">
              <input
                className="p-3 mt-4 rounded-md border-2 border-grey focus:outline-none focus:border-blue-300"
                type="text"
                value={shortURL}
                readOnly
              />
              <Button className="m-2 p-5" onClick={() => handleClick(shortURL)}>
                <span>{copied ? "Copied!" : "Copy"}</span>
              </Button>
            </div>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default Shortener;
