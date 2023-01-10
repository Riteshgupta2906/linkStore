import React, { useContext, useEffect, useState } from "react";
import { Space, Table } from "antd";

const columns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Link",
    dataIndex: "link",
    key: "link",
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
  {
    key: "4",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
  {
    key: "5",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];
const TableH = () => {
  const [data1, setData1] = useState([]);
  async function fetchData() {
    const response = await fetch("http://localhost:8000/api/v1/entries");
    const res = await response.json();
    setData1(res.data);
  }
  useEffect(() => {
    fetchData();
  }, []);
  const fdata = data1.map((ele) => {
    return {
      key: ele._id,
      title: ele.title,
      link: ele.link,
      time: ele.time,
    };
  });
  console.log(fdata);

  return <Table columns={columns} dataSource={fdata} />;
};
export default TableH;
