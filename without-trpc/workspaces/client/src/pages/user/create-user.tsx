import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserInput, CreateUserInput } from "app-backend/src/user/schema";

export default function CreateUserPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserInput>({
    resolver: zodResolver(createUserInput),
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (input: CreateUserInput) => {
      const response = await window.fetch(`http://localhost:3000/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const result = await response.json();
      if (!result) {
        throw new Error("Error parsing into JSON");
      }

      queryClient.invalidateQueries({
        queryKey: ["email", result.email as string],
      });
      return result;
    },
  });

  return (
    <>
      <h1>Create new user</h1>
      <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
        <input type="text" placeholder="email" {...register("email")} />
        <input type="text" placeholder="name" {...register("name")} />
        <button type="submit">Submit!</button>

        {mutation.isSuccess && <div>Successfully created new user!</div>}
        {mutation.isError && <div>Error creating new user</div>}
      </form>
    </>
  );
}
