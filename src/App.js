import React, { useState, useEffect } from "react";
import config from "react-global-configuration";
import "./config/config.js";
import "./App.css";
import axios from "axios";
import Iframe from "react-iframe";
var apiRoot = config.get("apiRoot");

function App() {
  const [bannerdirectories, setBannerdirectories] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      await axios.get(apiRoot + "/directorylist.json").then((res) => {
        setBannerdirectories(res.data.bannerdirectory);
      });
    }
    fetchData();
  }, []);

  useEffect(() => {
    window.onload = (function () {
      setLoaded(true);
    })();
  }, []);

  function RenderBanners() {
    if (bannerdirectories.length > 0 && loaded === true) {
      return bannerdirectories.map((dir, index) => (
        <Iframe
          title={dir}
          key={index}
          url={apiRoot + "/" + dir + "/930x180/index.html"}
          width="930px"
          height="180px"
          frameBorder="0"
          className={loaded ? "loaded" : "unloaded"}
        />
      ));
    } else {
      return <h3>Banners are loading</h3>;
    }
  }

  return (
    <div className="App">
      <RenderBanners></RenderBanners>
    </div>
  );
}

export default App;
