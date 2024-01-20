import Link from "next/link"
import { FunctionComponent } from "react"
import { HiArrowPath, HiExclamationCircle } from "react-icons/hi2"

import { Button } from "@/components/ui/button"

interface Props {
  error: string
}

const LoginFailed: FunctionComponent<Props> = ({ error }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <HiExclamationCircle className="w-16 h-16 text-destructive"/>

      <p className="text-muted-foreground text-sm text-center">
        {error}
      </p>

      <Button variant="outline"
              size="sm"
              className="bg-transparent border-destructive text-destructive"
              asChild>
        <Link href="/">
          <HiArrowPath className="w-4 h-4 mr-2"/>
          Reload
        </Link>
      </Button>
    </div>
  )
}

export default LoginFailed
