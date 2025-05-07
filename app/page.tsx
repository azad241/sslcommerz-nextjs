"use client"
import { useState } from "react"

export default function Home() {

  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  const handlePurchase = async () => {
    try {
      setIsProcessingPayment(true)

      // Store form data in sessionStorage before redirecting
      sessionStorage.setItem(
        "membershipFormData",
        JSON.stringify({
          data1: "value1",
          data2: "value2",
        }),
      )

      const txnId = `a random umber`
      const url = `/api/payment-request?url=membership&txn=${txnId}&amount=100&product=name&c_phone=01XXXXXXXXX`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`Payment request failed: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error("Payment URL not received")
      }
    } catch (error) {
      console.error("Payment initiation failed:", error)
      alert("Payment processing failed. Please try again.")
    } finally {
      setIsProcessingPayment(false)
    }
  }

  return (
   <>
    <h1 className="text-3xl p-6">Payment Page</h1>
   <div className="flex justify-center">
   <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handlePurchase} disabled={isProcessingPayment}>
      {isProcessingPayment ? "Processing..." : "Make Payment"}
    </button>
   </div>
   </>
  );
}
