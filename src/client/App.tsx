import React from "react";
import axios from "axios";
import Image from "./asset/resource/logo.png";
import "./app.css";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

const App = () => {
  const [loading, setLoading] = React.useState(false);
  const [users, setUsers] = React.useState<User[]>([]);

  React.useEffect(() => {
    setLoading(true);
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      setUsers(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {loading ? (
        <p>loading...</p>
      ) : (
        users.map((user) => <h1 key={user.id}>{user.name}</h1>)
      )}

      <h1>hello world</h1>
      <img src={Image} alt="react logo" />
      <button className="btn layout">Submit</button>
    </div>
  );
};

export default App;
