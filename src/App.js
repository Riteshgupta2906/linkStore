import { Routes, Route, Router } from "react-router-dom";
import { Layout } from "antd";
import Desktop from "./Desktop";
function App() {
  return (
    <Layout>
      <Routes>
        <Route exact path="/" element={<Desktop />} />
        {/* <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/recovery-password" element={<RecoveryPassword/>}/>
          <Route path="*" element={<NotFound/>}/> */}
      </Routes>
    </Layout>
  );
}

export default App;
