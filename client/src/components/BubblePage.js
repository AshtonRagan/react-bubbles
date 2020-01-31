import React, { useState, useEffect } from "react";

import { axiosWithAuth } from "./Utils/AxiosWithAuth";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(() => {
    axiosWithAuth()
      .get("/api/colors")
      .then(res => {
        console.log("COLOR RES: ", res);

        setColorList(res.data);
      })
      .catch(err => console.log(err));
  }, [setColorList]);

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
