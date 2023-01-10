import React, { useContext } from "react";
import { Checkbox } from "antd";
import DataContext from "../store/dataContext";

const Check = (props) => {
  const dataCtx = useContext(DataContext);
  const onChange = (e) => {
    const id = e.target.value;
    dataCtx.setData(id);
  };

  return <Checkbox value={props.forId} onChange={onChange}></Checkbox>;
};
export default Check;
