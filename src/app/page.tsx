//Components
import PageHomeDashboard from "@/components/PageHomeDashboard";

//Lib
import { verifyLogin } from "@/lib/Server";

export default async function Home() {
  
  // Check the session
  const user = await verifyLogin()
  
  return (
    <>
      <PageHomeDashboard userLogged={user} />
    </>
  );
}
