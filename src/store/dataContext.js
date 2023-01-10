import React, { useState } from "react";

const DataContext = React.createContext({
  data: [],
  history: [],
  setHistory: (ele) => {},
  setData: (data) => {},
  deleteData: () => {},
});

export const DataContextProvider = (props) => {
  const [d, setD] = useState([]);
  const [h, setH] = useState([]);

  const setDataHandler = (ele) => {
    setD((prevData) => {
      return [...prevData, ele];
    });
  };
  const deleteDataHandler = (ele) => {
    setD([]);
  };
  const setHistoryHandler = (ele) => {
    setH((prevData) => {
      return [...prevData, ele];
    });
    console.log(h);
  };

  const contextValue = {
    data: d,
    history: h,
    setHistory: setHistoryHandler,
    setData: setDataHandler,
    deleteData: deleteDataHandler,
  };

  return (
    <DataContext.Provider value={contextValue}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContext;
