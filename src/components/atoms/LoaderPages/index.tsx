"use client";

//React and modules
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false })

export default function LoaderPages() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
	const [,setRoutingNumber] = useState(0)

  useEffect(() => {
    setRoutingNumber((prev) => prev + 1);
    NProgress.start()
    const timer = setTimeout(() => {
      NProgress.done()
    }, 2*1000)

    return () => {
      clearTimeout(timer)
    }
  }, [pathname, searchParams])

  return <></>
}
