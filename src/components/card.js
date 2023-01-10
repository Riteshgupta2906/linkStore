import "./card.css";
import Check from "./Check";
import Model from "./Modal";

const Card = (props) => {
  const youtube_parser = (url) => {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
  };
  const id = youtube_parser(props.content.link);
  const src = `https://img.youtube.com/vi/${id}/0.jpg`;

  return (
    <div className="card">
      <div className="card-body">
        <div className="title">
          <h1>{props.content.title}</h1>
        </div>
        {id && <img className="Image" src={src} alt=""></img>}

        <p>{props.content.description}</p>
        <Model cnt={props.content} />
        <Check forId={props.content._id} />
      </div>
    </div>
  );
};
export default Card;
