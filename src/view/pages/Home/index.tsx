import { useAuth } from "../../../app/hooks/useAuth";
import { Button } from "../../components/Button";

export const Home = () => {
  const { signOut } = useAuth();

  return (
    <>
      <h1>Home Page</h1>
      <Button onClick={signOut}>sair</Button>
    </>
  );
};
