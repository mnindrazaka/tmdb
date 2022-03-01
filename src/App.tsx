import React from "react";
import { usersApi, User } from "@/utils/fetcher";
import HomePage from "@/pages/HomePage";
import { Heading } from "@chakra-ui/react";
import "@/index.css";

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
      <HomePage />
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
      <button className="btn layout">Submit</button>
    </div>
  );
};

export default App;
