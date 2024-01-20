import { FunctionComponent } from "react"
import { HiCheckBadge } from "react-icons/hi2"

const LoginSent: FunctionComponent = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <HiCheckBadge className="w-16 h-16 text-green-500"/>

      <p className="text-muted-foreground text-sm text-center">
        We have sent you an email with a link to login. Please check your inbox.
      </p>
    </div>
  )
}

export default LoginSent
