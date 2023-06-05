import { useState } from "react";
import { trpc } from "../../providers/trpc";

export default function FindUserPage() {
  const [email, setEmail] = useState("");
  const { isLoading, isError, data, error } = trpc.users.find.useQuery({
    email,
  });

  return (
    <>
      <h1>Find User</h1>
      <div>Type UserId here</div>
      <input
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="User Id"
      />
      <br />

      {isLoading && <div>Loading...</div>}
      {isError && <div>Error: {error.message}</div>}
      {data && <div>User found!</div>}
    </>
  );
}
