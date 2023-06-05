import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserInput, CreateUserInput } from "app-backend/src/user/schema";
import { trpc } from "../../providers/trpc";

export default function CreateUserPage() {
  const {
    register,
    handleSubmit,
  } = useForm<CreateUserInput>({
    resolver: zodResolver(createUserInput),
  });

  const context = trpc.useContext();
  const mutation = trpc.users.create.useMutation({
    onSuccess: (response) => {
      context.users.find.invalidate({ email: response.email });
    }
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
