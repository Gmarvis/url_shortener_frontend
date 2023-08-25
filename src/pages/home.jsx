import React, { useState } from "react";
import "./home.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const URL = process.env.REACT_APP_BACKEND_URL;

// url validator

const validateURL = (url) => {
  const regex = /^(https?:\/\/)?([a-zA-Z0-9\-_.]+\.[a-zA-Z]{2,})(\/.*)?$/;
  return regex.test(url);
};

const Home = () => {
  const [url, setUrl] = useState({
    originalUrl: "",
  });
  // const [isValid, setIsValid] = useState(false);
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

  const handleChange = (e) => {
    setUrl(() => ({ originalUrl: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(url.originalUrl);

    if (!validateURL(url.originalUrl)) {
      notifyFailed();
      return;
    }

    if (url.originalUrl === "") {
      notifyFailed();
      return;
    }

    // console.log(JSON.stringify(url));

    let response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(url),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let data = await response.json();
    setShortUrl(data);
    notifySuccess();
    // console.log(data);
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
            onChange={handleChange}
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
