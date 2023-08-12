import React, { useState } from "react";
import "./home.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [url, setUrl] = useState({
    originalUrl: "",
  });
  const [shorturl, setShortUrl] = useState();

  // notification
  const notifyFailed = () => {
    toast.error("Error please enter a valid URL.!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const notifySuccess = () => {
    toast.success("🦄 Congratulations !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (url.originalUrl === "") {
      notifyFailed();
      return;
    }

    console.log(JSON.stringify(url));

    let response = await fetch("http://localhost:5000/api/shorturl", {
      method: "POST",
      body: JSON.stringify(url),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let data = await response.json();
    setShortUrl(data);
    notifySuccess();
    console.log(data);
    setUrl((prev) => ({ originalUrl: "" }));
  };

  return (
    <div>
      <div className="formContainer">
        <h3>URL Shortener</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="http://yourlongurlexample.com"
            value={url.originalUrl}
            onChange={(e) =>
              setUrl((prev) => ({ originalUrl: e.target.value }))
            }
          />

          <button type="submit">post url</button>
        </form>
        <span className="guideName">
          Post your url here to Shorten the length{" "}
        </span>

        <p className="shortUrl">
          Short URL:
          <span>{shorturl}</span>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
