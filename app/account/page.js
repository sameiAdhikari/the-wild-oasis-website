import { auth } from "../_lib/Auth";

export const metadata = {
  title: "account",
};

async function Page() {
  const session = await auth();

  const firstName = session.user.name.split(" ").at(0);

  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      welcome , {firstName} !
    </h2>
  );
}

export default Page;
