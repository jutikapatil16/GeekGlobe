import SignInBts from "@/components/SignInBts";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function SignIn() {

  const session = await getServerSession(authOptions);


  if(session){
    redirect('/dashboard');
  }

  return (
    <div><SignInBts/></div>
  )
}
