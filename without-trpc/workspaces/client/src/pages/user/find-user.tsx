import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function useFindUserQuery(email: string) {
  return useQuery({
    queryKey: ["email", email],
    enabled: !!email,
    queryFn: async () => {
      const response = await window.fetch(
        `http://localhost:3000/user?email=${email}`
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const result = await response.json();
      if (!result) {
        throw new Error("Error parsing into JSON");
      }
      return result;
    },
  });
}

export default function FindUserPage() {
  const [email, setEmail] = useState("");
  const { isLoading, isError, data, error } = useFindUserQuery(email);

  return (
    <>
      <h1>Find User</h1>
      <div>Type Email here</div>
      <input
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <br />

      {isLoading && <div>Loading...</div>}
      {isError && <div>Error: {error.message}</div>}
      {data && <div>User found!</div>}
    </>
  );
}
