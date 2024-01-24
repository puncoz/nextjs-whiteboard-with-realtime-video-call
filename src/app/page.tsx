import { getUserSession } from "@/services/user.service"

const HomePage = async () => {
  const session = await getUserSession()

  console.log(session)

  return (
    <main className="">
      Welcome!
    </main>
  )
}

export default HomePage
