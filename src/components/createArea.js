import React, { useState } from "react";
import "./createArea.css";
import { PlusCircleOutlined } from "@ant-design/icons";
import formSubmit from "../Handlers/submitHandler";
import slugify from "slugify";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    description: "",
    link: "",
    group: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    note.group = slugify(note.group, { lower: true });
    formSubmit(note, "entries");
    props.change(false);
    setNote({
      title: "",
      description: "",
      link: "",
      group: "",
    });
    event.preventDefault();
  }

  return (
    <div className="createArea">
      <form>
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />
        <textarea
          onChange={handleChange}
          name="description"
          value={note.description}
          placeholder="Description"
          rows="3"
        />
        <input
          name="link"
          onChange={handleChange}
          value={note.link}
          placeholder="Link"
        />

        <input
          name="group"
          onChange={handleChange}
          value={note.group}
          placeholder="Group"
        />

        <button onClick={submitNote}>
          <PlusCircleOutlined />
        </button>
      </form>
    </div>
  );
}

export default CreateArea;
