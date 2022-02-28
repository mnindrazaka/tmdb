import React from "react";
import Image from "./asset/resource/logo.png";
import { usersApi, User } from "../utils/fetcher";
import "./app.css";
import { Heading, HStack, Text } from "@chakra-ui/react";

const App = () => {
  const [loading, setLoading] = React.useState(false);
  const [users, setUsers] = React.useState<User[]>([]);

  React.useEffect(() => {
    setLoading(true);
    usersApi.getUsers().then((users) => {
      setUsers(users);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {loading ? (
        <p>loading...</p>
      ) : (
        users.map((user) => (
          <Heading as={"h1"} key={user.id}>
            {user.name}
          </Heading>
        ))
      )}
      <h1>hello world</h1>
      <img src={Image} alt="react logo" />
      <button className="btn layout">Submit</button>
    </div>
  );
};

export default App;
