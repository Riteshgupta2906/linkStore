import countDown from "../components/popup";
const formSubmit = (note, where) => {
  const root = "http://localhost:8000";
  const url = `${root}/api/v1/${where}`;
  const data = JSON.stringify(note);
  console.log(data);
  (async () => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: data,
    });
    const d = { title: "succeess", content: "Link Added to the Group " };
    if (response.status === 201) countDown(d);
  })();
};
export default formSubmit;
