"use client"
import { useSearchParams } from "next/navigation"

function Page() {
 const params = useSearchParams()
 const txn = params.get('txn')
 const status = params.get('status')

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Membership Page</h1>
      <p>Transaction ID: {txn}</p>
      <p>Status: {status}</p>
    </div>
  )
}

export default Page

