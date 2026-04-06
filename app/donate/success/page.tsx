// "use client"

// import { Suspense, useEffect, useState } from "react"
// import { useSearchParams } from "next/navigation"
// import Link from "next/link"
// import { Navigation } from "@/components/navigation"
// import { Footer } from "@/components/footer"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { 
//   CheckCircle, Clock, Home, Heart, Download, Share2,
//   GraduationCap, Droplets, Users, Building2, Loader2
// } from "lucide-react"
// import { getCheckoutSession } from "@/app/actions/stripe"
// import { createClient } from "@/lib/supabase/client"

// const causeLabels: Record<string, { label: string; icon: React.ElementType }> = {
//   education: { label: "Children's Education", icon: GraduationCap },
//   water: { label: "Clean Water", icon: Droplets },
//   women: { label: "Women Empowerment", icon: Users },
//   community: { label: "Community Development", icon: Building2 },
// }

// const paymentMethodLabels: Record<string, string> = {
//   stripe: "Card Payment (International)",
// }

// function DonationSuccessContent() {
//   const searchParams = useSearchParams()
  
//   // Get params - could be from Stripe payment
//   const sessionId = searchParams.get("session_id") // Stripe
//   const donationId = searchParams.get("id")
//   const paramAmount = searchParams.get("amount")
//   const paramMethod = searchParams.get("method")
//   const paramCause = searchParams.get("cause")
  
//   const [isLoading, setIsLoading] = useState(!!sessionId)
//   const [paymentData, setPaymentData] = useState<{
//     amount: number
//     cause: string
//     email: string | null
//     donorName: string
//     method: string
//     currency: string
//   } | null>(null)
//   const [savedToDb, setSavedToDb] = useState(false)
  
//   // Fetch payment data from Stripe
//   useEffect(() => {
//     const fetchPaymentData = async () => {
//       // Handle Stripe session
//       if (sessionId) {
//         try {
//           const session = await getCheckoutSession(sessionId)
          
//           if (session.paymentStatus === "paid") {
//             setPaymentData({
//               amount: (session.amountTotal || 0) / 100,
//               cause: session.metadata?.cause || "general",
//               email: session.customerEmail || null,
//               donorName: session.metadata?.donor_name || "Anonymous",
//               method: "stripe",
//               currency: "USD",
//             })
            
//             // Save to database if not already saved
//             if (!savedToDb) {
//               const supabase = createClient()
//               const { data: { user } } = await supabase.auth.getUser()
              
//               await supabase.from("donations").insert({
//                 user_id: user?.id || null,
//                 donor_name: session.metadata?.donor_name || "Anonymous",
//                 donor_phone: session.metadata?.donor_phone || null,
//                 donor_email: session.customerEmail || null,
//                 amount: (session.amountTotal || 0) / 100,
//                 currency: "USD",
//                 payment_method: "stripe",
//                 transaction_id: sessionId,
//                 program: session.metadata?.cause || "general",
//                 payment_status: "completed",
//                 donation_type: "one-time",
//                 is_anonymous: false,
//               })
//               setSavedToDb(true)
//             }
//           }
//         } catch (error) {
//           console.error("[v0] Error fetching Stripe session:", error)
//         } finally {
//           setIsLoading(false)
//         }
//         return
//       }
      
//       setIsLoading(false)
//     }
    
//     fetchPaymentData()
//   }, [sessionId, savedToDb, paramCause])
  
//   // Determine values based on payment data
//   const amount = paymentData?.amount?.toString() || paramAmount
//   const method = paymentData?.method || paramMethod || "stripe"
//   const cause = paymentData?.cause || paramCause
//   const currency = "USD"
  
//   const causeInfo = cause ? causeLabels[cause] : null
//   const CauseIcon = causeInfo?.icon || Heart
  
//   if (isLoading) {
//     return (
//       <>
//         <Navigation />
//         <main className="min-h-screen bg-background flex items-center justify-center">
//           <div className="text-center">
//             <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
//             <p className="text-muted-foreground">Confirming your payment...</p>
//           </div>
//         </main>
//         <Footer />
//       </>
//     )
//   }

//   const handleShare = async () => {
//     const shareText = `I just donated ${amount} ${currency} to SHAPEthiopia for ${causeInfo?.label || "a good cause"}! Join me in making a difference.`
    
//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: "I donated to SHAPEthiopia!",
//           text: shareText,
//           url: "https://shapethiopia.org/donate",
//         })
//       } catch (err) {
//         // User cancelled or error
//       }
//     } else {
//       // Fallback to copying to clipboard
//       navigator.clipboard.writeText(shareText)
//     }
//   }

//   return (
//     <>
//       <Navigation />
//       <main className="min-h-screen bg-background">
//         {/* Hero Section */}
//         <section className="relative pt-24 pb-16 bg-primary text-primary-foreground">
//           <div className="container mx-auto px-4 pt-12">
//             <div className="max-w-3xl mx-auto text-center">
//               <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/20 flex items-center justify-center">
//                 {isPending ? (
//                   <Clock className="w-10 h-10" />
//                 ) : (
//                   <CheckCircle className="w-10 h-10" />
//                 )}
//               </div>
//               <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
//                 Thank You for Your Donation!
//               </h1>
//               <p className="opacity-90 text-lg max-w-xl mx-auto">
//                 Thank you for your donation of <strong>{amount} {currency}</strong>! 
//                 A confirmation email has been sent to your registered email address. Your generosity helps transform lives across Ethiopia.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* Receipt Section */}
//         <section className="py-12">
//           <div className="container mx-auto px-4">
//             <div className="max-w-lg mx-auto">
//               {/* Receipt Card */}
//               <Card className="border-0 shadow-xl">
//                 <CardContent className="p-6 md:p-8">
//                   <div className="text-center mb-6 pb-6 border-b border-border">
//                     <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
//                       <CauseIcon className="w-8 h-8 text-primary" />
//                     </div>
//                     <h2 className="font-serif text-2xl font-bold text-foreground">
//                       Donation Receipt
//                     </h2>
//                     <p className="text-muted-foreground mt-1">
//                       SHAPEthiopia Foundation
//                     </p>
//                   </div>

//                   <div className="space-y-4">
//                     {/* Amount */}
//                     <div className="text-center py-4 bg-secondary rounded-lg">
//                       <p className="text-sm text-muted-foreground mb-1">Donation Amount</p>
//                       <p className="text-4xl font-bold text-primary">
//                         ${amount}
//                       </p>
//                     </div>

//                     {/* Details */}
//                     <div className="space-y-3 text-sm">
//                       <div className="flex justify-between py-2 border-b border-border">
//                         <span className="text-muted-foreground">Reference ID</span>
//                         <span className="font-mono text-foreground">{donationId?.slice(0, 8) || "N/A"}</span>
//                       </div>
//                       <div className="flex justify-between py-2 border-b border-border">
//                         <span className="text-muted-foreground">Cause</span>
//                         <span className="font-medium text-foreground">{causeInfo?.label || "General"}</span>
//                       </div>
//                       <div className="flex justify-between py-2 border-b border-border">
//                         <span className="text-muted-foreground">Payment Method</span>
//                         <span className="font-medium text-foreground">
//                           {method ? paymentMethodLabels[method] || method : "N/A"}
//                         </span>
//                       </div>
//                       <div className="flex justify-between py-2 border-b border-border">
//                         <span className="text-muted-foreground">Status</span>
//                         <span className={`font-medium ${isPending ? "text-amber-600" : "text-green-600"}`}>
//                           {isPending ? "Pending Verification" : "Completed"}
//                         </span>
//                       </div>
//                       <div className="flex justify-between py-2">
//                         <span className="text-muted-foreground">Status</span>
//                         <span className="font-medium text-green-600">Completed</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Impact Message */}
//                   <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
//                     <p className="text-sm text-foreground text-center">
//                       <Heart className="w-4 h-4 inline-block mr-1 text-primary" />
//                       Your donation will help {causeInfo?.label?.toLowerCase() || "transform lives"} across Ethiopia. 
//                       Thank you for your generosity!
//                     </p>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Action Buttons */}
//               <div className="mt-6 flex flex-col sm:flex-row gap-3">
//                 <Button variant="outline" className="flex-1" onClick={handleShare}>
//                   <Share2 className="mr-2 h-4 w-4" />
//                   Share
//                 </Button>
//                 <Button variant="outline" className="flex-1" onClick={() => window.print()}>
//                   <Download className="mr-2 h-4 w-4" />
//                   Download Receipt
//                 </Button>
//               </div>

//               {/* Navigation */}
//               <div className="mt-8 flex flex-col sm:flex-row gap-3">
//                 <Button asChild className="flex-1">
//                   <Link href="/donate">
//                     <Heart className="mr-2 h-4 w-4" />
//                     Donate Again
//                   </Link>
//                 </Button>
//                 <Button variant="secondary" asChild className="flex-1">
//                   <Link href="/">
//                     <Home className="mr-2 h-4 w-4" />
//                     Back to Home
//                   </Link>
//                 </Button>
//               </div>

//               {/* Contact Info */}
//               <p className="mt-8 text-center text-sm text-muted-foreground">
//                 Questions about your donation?{" "}
//                 <Link href="/contact" className="text-primary hover:underline">
//                   Contact us
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </>
//   )
// }

// export default function DonationSuccessPage() {
//   return (
//     <Suspense fallback={
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <Loader2 className="w-8 h-8 animate-spin text-primary" />
//       </div>
//     }>
//       <DonationSuccessContent />
//     </Suspense>
//   )
// }






// "use client"

// import { Suspense, useEffect, useState } from "react"
// import { useSearchParams } from "next/navigation"
// import Link from "next/link"
// import { Navigation } from "@/components/navigation"
// import { Footer } from "@/components/footer"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { 
//   CheckCircle, Clock, Home, Heart, Download, Share2,
//   GraduationCap, Droplets, Users, Building2, Loader2, Mail
// } from "lucide-react"
// import { getCheckoutSession } from "@/app/actions/stripe"
// import { createClient } from "@/lib/supabase/client"

// const causeLabels: Record<string, { label: string; icon: React.ElementType }> = {
//   education: { label: "Children's Education", icon: GraduationCap },
//   water: { label: "Clean Water", icon: Droplets },
//   women: { label: "Women Empowerment", icon: Users },
//   community: { label: "Community Development", icon: Building2 },
// }

// const paymentMethodLabels: Record<string, string> = {
//   stripe: "Card Payment (International)",
//   paypal: "PayPal",
//   bank_transfer: "Bank Transfer",
//   mobile_money: "Mobile Money",
// }

// function DonationSuccessContent() {
//   const searchParams = useSearchParams()
  
//   // Get params - could be from Stripe payment or direct donation
//   const sessionId = searchParams.get("session_id") // Stripe
//   const donationId = searchParams.get("id")
//   const paramAmount = searchParams.get("amount")
//   const paramMethod = searchParams.get("method")
//   const paramCause = searchParams.get("cause")
//   const paramEmail = searchParams.get("email")
//   const paramName = searchParams.get("name")
//   const paramPhone = searchParams.get("phone")
//   const paramAddress = searchParams.get("address")
  
//   const [isLoading, setIsLoading] = useState(!!sessionId)
//   const [isSendingEmail, setIsSendingEmail] = useState(false)
//   const [emailSent, setEmailSent] = useState(false)
//   const [paymentData, setPaymentData] = useState<{
//     amount: number
//     cause: string
//     email: string | null
//     donorName: string
//     donorPhone: string | null
//     donorAddress: string | null
//     method: string
//     currency: string
//     transactionId: string
//   } | null>(null)
//   const [savedToDb, setSavedToDb] = useState(false)
  
//   // Save donation to Supabase
//   const saveDonationToDatabase = async (data: {
//     donorName: string
//     donorEmail: string | null
//     donorPhone: string | null
//     donorAddress: string | null
//     amount: number
//     currency: string
//     paymentMethod: string
//     transactionId: string
//     cause: string
//     paymentStatus: string
//   }) => {
//     try {
//       const supabase = createClient()
      
//       const { data: { user } } = await supabase.auth.getUser()
      
//       const { error } = await supabase.from("donations").insert({
//         user_id: user?.id || null,
//         donor_name: data.donorName,
//         donor_email: data.donorEmail,
//         donor_phone: data.donorPhone,
//         donor_address: data.donorAddress,
//         amount: data.amount,
//         currency: data.currency,
//         payment_method: data.paymentMethod,
//         transaction_id: data.transactionId,
//         program: data.cause,
//         payment_status: data.paymentStatus,
//         donation_type: "one-time",
//         is_anonymous: data.donorName === "Anonymous",
//         metadata: {
//           ip_address: window.location.hostname,
//           user_agent: navigator.userAgent,
//         }
//       })
      
//       if (error) {
//         console.error("Error saving to Supabase:", error)
//         return false
//       }
      
//       console.log("Donation saved to Supabase successfully")
//       return true
//     } catch (error) {
//       console.error("Error in saveDonationToDatabase:", error)
//       return false
//     }
//   }
  
//   // Send thank you email
//   const sendThankYouEmail = async (data: {
//     email: string
//     name: string
//     amount: number
//     currency: string
//     cause: string
//     donationId: string
//     paymentMethod: string
//   }) => {
//     try {
//       const response = await fetch("/api/send-donation-email", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       })
      
//       if (response.ok) {
//         setEmailSent(true)
//         return true
//       } else {
//         console.error("Failed to send email")
//         return false
//       }
//     } catch (error) {
//       console.error("Error sending email:", error)
//       return false
//     }
//   }
  
//   // Fetch payment data from Stripe
//   useEffect(() => {
//     const fetchPaymentData = async () => {
//       // Handle Stripe session
//       if (sessionId) {
//         try {
//           const session = await getCheckoutSession(sessionId)
          
//           if (session.paymentStatus === "paid") {
//             const donorName = session.metadata?.donor_name || "Anonymous"
//             const donorEmail = session.customerEmail || null
//             const donorPhone = session.metadata?.donor_phone || null
//             const donorAddress = session.metadata?.donor_address || null
//             const amount = (session.amountTotal || 0) / 100
//             const cause = session.metadata?.cause || "general"
            
//             const newPaymentData = {
//               amount: amount,
//               cause: cause,
//               email: donorEmail,
//               donorName: donorName,
//               donorPhone: donorPhone,
//               donorAddress: donorAddress,
//               method: "stripe",
//               currency: "USD",
//               transactionId: sessionId,
//             }
            
//             setPaymentData(newPaymentData)
            
//             // Save to database if not already saved
//             if (!savedToDb) {
//               const saved = await saveDonationToDatabase({
//                 donorName: donorName,
//                 donorEmail: donorEmail,
//                 donorPhone: donorPhone,
//                 donorAddress: donorAddress,
//                 amount: amount,
//                 currency: "USD",
//                 paymentMethod: "stripe",
//                 transactionId: sessionId,
//                 cause: cause,
//                 paymentStatus: "completed",
//               })
              
//               if (saved) {
//                 setSavedToDb(true)
                
//                 // Send thank you email if email exists
//                 if (donorEmail) {
//                   setIsSendingEmail(true)
//                   await sendThankYouEmail({
//                     email: donorEmail,
//                     name: donorName,
//                     amount: amount,
//                     currency: "USD",
//                     cause: cause,
//                     donationId: sessionId.slice(0, 8),
//                     paymentMethod: "Credit Card",
//                   })
//                   setIsSendingEmail(false)
//                 }
//               }
//             }
//           }
//         } catch (error) {
//           console.error("Error fetching Stripe session:", error)
//         } finally {
//           setIsLoading(false)
//         }
//         return
//       }
      
//       // Handle direct donation (from the dynamic donation form)
//       if (donationId && paramAmount) {
//         const donorName = paramName || "Anonymous"
//         const donorEmail = paramEmail || null
//         const donorPhone = paramPhone || null
//         const donorAddress = paramAddress || null
//         const amount = parseFloat(paramAmount)
//         const cause = paramCause || "general"
//         const method = paramMethod || "bank_transfer"
        
//         const newPaymentData = {
//           amount: amount,
//           cause: cause,
//           email: donorEmail,
//           donorName: donorName,
//           donorPhone: donorPhone,
//           donorAddress: donorAddress,
//           method: method,
//           currency: "USD",
//           transactionId: donationId,
//         }
        
//         setPaymentData(newPaymentData)
        
//         // Save to database
//         if (!savedToDb) {
//           const saved = await saveDonationToDatabase({
//             donorName: donorName,
//             donorEmail: donorEmail,
//             donorPhone: donorPhone,
//             donorAddress: donorAddress,
//             amount: amount,
//             currency: "USD",
//             paymentMethod: paymentMethodLabels[method] || method,
//             transactionId: donationId,
//             cause: cause,
//             paymentStatus: "completed",
//           })
          
//           if (saved) {
//             setSavedToDb(true)
            
//             // Send thank you email if email exists
//             if (donorEmail) {
//               setIsSendingEmail(true)
//               await sendThankYouEmail({
//                 email: donorEmail,
//                 name: donorName,
//                 amount: amount,
//                 currency: "USD",
//                 cause: cause,
//                 donationId: donationId.slice(0, 8),
//                 paymentMethod: paymentMethodLabels[method] || method,
//               })
//               setIsSendingEmail(false)
//             }
//           }
//         }
//       }
      
//       setIsLoading(false)
//     }
    
//     fetchPaymentData()
//   }, [sessionId, savedToDb, paramCause, paramAmount, donationId, paramName, paramEmail, paramPhone, paramAddress, paramMethod])
  
//   // Determine values based on payment data
//   const amount = paymentData?.amount?.toString() || paramAmount
//   const method = paymentData?.method || paramMethod || "stripe"
//   const cause = paymentData?.cause || paramCause
//   const currency = paymentData?.currency || "USD"
//   const donorName = paymentData?.donorName || paramName || "Anonymous"
//   const transactionId = paymentData?.transactionId || donationId || "N/A"
  
//   const causeInfo = cause ? causeLabels[cause] : null
//   const CauseIcon = causeInfo?.icon || Heart
  
//   if (isLoading) {
//     return (
//       <>
//         <Navigation />
//         <main className="min-h-screen bg-background flex items-center justify-center">
//           <div className="text-center">
//             <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
//             <p className="text-muted-foreground">Confirming your payment...</p>
//           </div>
//         </main>
//         <Footer />
//       </>
//     )
//   }

//   const handleShare = async () => {
//     const shareText = `I just donated ${amount} ${currency} to SHAPEthiopia for ${causeInfo?.label || "a good cause"}! Join me in making a difference.`
    
//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: "I donated to SHAPEthiopia!",
//           text: shareText,
//           url: "https://shapethiopia.org/donate",
//         })
//       } catch (err) {
//         // User cancelled or error
//       }
//     } else {
//       // Fallback to copying to clipboard
//       navigator.clipboard.writeText(shareText)
//       alert("Share text copied to clipboard!")
//     }
//   }

//   const handleDownloadReceipt = () => {
//     const receiptContent = `
//       SHAPEthiopia Foundation - Donation Receipt
//       ===========================================
      
//       Donor Name: ${donorName}
//       Donation ID: ${transactionId}
//       Date: ${new Date().toLocaleDateString()}
      
//       Amount: ${amount} ${currency}
//       Cause: ${causeInfo?.label || "General Support"}
//       Payment Method: ${method ? paymentMethodLabels[method] || method : "N/A"}
//       Status: Completed
      
//       Thank you for your generous donation!
//       Your support helps transform lives across Ethiopia.
//     `
    
//     const blob = new Blob([receiptContent], { type: "text/plain" })
//     const url = URL.createObjectURL(blob)
//     const a = document.createElement("a")
//     a.href = url
//     a.download = `donation-receipt-${transactionId}.txt`
//     document.body.appendChild(a)
//     a.click()
//     document.body.removeChild(a)
//     URL.revokeObjectURL(url)
//   }

//   return (
//     <>
//       <Navigation />
//       <main className="min-h-screen bg-background">
//         {/* Hero Section */}
//         <section className="relative pt-24 pb-16 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
//           <div className="container mx-auto px-4 pt-12">
//             <div className="max-w-3xl mx-auto text-center">
//               <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/20 flex items-center justify-center">
//                 <CheckCircle className="w-10 h-10" />
//               </div>
//               <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
//                 Thank You for Your Donation! ❤️
//               </h1>
//               <p className="opacity-90 text-lg max-w-xl mx-auto">
//                 Your donation of <strong>{amount} {currency}</strong> has been received successfully. 
//                 We truly appreciate your support in helping communities and changing lives.
//               </p>
//               {isSendingEmail && (
//                 <div className="mt-4 flex items-center justify-center gap-2 text-sm bg-white/20 rounded-lg p-2">
//                   <Loader2 className="w-4 h-4 animate-spin" />
//                   <span>Sending confirmation email...</span>
//                 </div>
//               )}
//               {emailSent && (
//                 <div className="mt-4 flex items-center justify-center gap-2 text-sm bg-green-500/30 rounded-lg p-2">
//                   <Mail className="w-4 h-4" />
//                   <span>Confirmation email sent to {paymentData?.email || paramEmail}</span>
//                 </div>
//               )}
//             </div>
//           </div>
//         </section>

//         {/* Receipt Section */}
//         <section className="py-12">
//           <div className="container mx-auto px-4">
//             <div className="max-w-lg mx-auto">
//               {/* Receipt Card */}
//               <Card className="border-0 shadow-xl">
//                 <CardContent className="p-6 md:p-8">
//                   <div className="text-center mb-6 pb-6 border-b border-border">
//                     <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
//                       <CauseIcon className="w-8 h-8 text-primary" />
//                     </div>
//                     <h2 className="font-serif text-2xl font-bold text-foreground">
//                       Donation Receipt
//                     </h2>
//                     <p className="text-muted-foreground mt-1">
//                       SHAPEthiopia Foundation
//                     </p>
//                   </div>

//                   <div className="space-y-4">
//                     {/* Donor Information */}
//                     <div className="bg-secondary/50 rounded-lg p-4">
//                       <h3 className="font-semibold text-sm text-muted-foreground mb-3">Donor Information</h3>
//                       <div className="space-y-2 text-sm">
//                         <div className="flex justify-between">
//                           <span className="text-muted-foreground">Name</span>
//                           <span className="font-medium">{donorName}</span>
//                         </div>
//                         {paymentData?.email && (
//                           <div className="flex justify-between">
//                             <span className="text-muted-foreground">Email</span>
//                             <span className="font-medium">{paymentData.email}</span>
//                           </div>
//                         )}
//                         {paymentData?.donorPhone && (
//                           <div className="flex justify-between">
//                             <span className="text-muted-foreground">Phone</span>
//                             <span className="font-medium">{paymentData.donorPhone}</span>
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     {/* Amount */}
//                     <div className="text-center py-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
//                       <p className="text-sm text-muted-foreground mb-1">Donation Amount</p>
//                       <p className="text-4xl font-bold text-green-600">
//                         {amount} {currency}
//                       </p>
//                     </div>

//                     {/* Details */}
//                     <div className="space-y-3 text-sm">
//                       <div className="flex justify-between py-2 border-b border-border">
//                         <span className="text-muted-foreground">Reference ID</span>
//                         <span className="font-mono text-foreground">{transactionId.slice(0, 8)}</span>
//                       </div>
//                       <div className="flex justify-between py-2 border-b border-border">
//                         <span className="text-muted-foreground">Cause</span>
//                         <span className="font-medium text-foreground">{causeInfo?.label || "General Support"}</span>
//                       </div>
//                       <div className="flex justify-between py-2 border-b border-border">
//                         <span className="text-muted-foreground">Payment Method</span>
//                         <span className="font-medium text-foreground">
//                           {method ? paymentMethodLabels[method] || method : "N/A"}
//                         </span>
//                       </div>
//                       <div className="flex justify-between py-2">
//                         <span className="text-muted-foreground">Status</span>
//                         <span className="font-medium text-green-600">Completed</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Impact Message */}
//                   <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
//                     <p className="text-sm text-foreground text-center">
//                       <Heart className="w-4 h-4 inline-block mr-1 text-green-600" />
//                       Your donation will help {causeInfo?.label?.toLowerCase() || "transform lives"} across Ethiopia. 
//                       Thank you for your generosity!
//                     </p>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Action Buttons */}
//               <div className="mt-6 flex flex-col sm:flex-row gap-3">
//                 <Button variant="outline" className="flex-1" onClick={handleShare}>
//                   <Share2 className="mr-2 h-4 w-4" />
//                   Share
//                 </Button>
//                 <Button variant="outline" className="flex-1" onClick={handleDownloadReceipt}>
//                   <Download className="mr-2 h-4 w-4" />
//                   Download Receipt
//                 </Button>
//               </div>

//               {/* Navigation */}
//               <div className="mt-8 flex flex-col sm:flex-row gap-3">
//                 <Button asChild className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
//                   <Link href="/donate">
//                     <Heart className="mr-2 h-4 w-4" />
//                     Donate Again
//                   </Link>
//                 </Button>
//                 <Button variant="secondary" asChild className="flex-1">
//                   <Link href="/">
//                     <Home className="mr-2 h-4 w-4" />
//                     Back to Home
//                   </Link>
//                 </Button>
//               </div>

//               {/* Contact Info */}
//               <p className="mt-8 text-center text-sm text-muted-foreground">
//                 Questions about your donation?{" "}
//                 <Link href="/contact" className="text-green-600 hover:underline">
//                   Contact us
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </>
//   )
// }

// export default function DonationSuccessPage() {
//   return (
//     <Suspense fallback={
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <Loader2 className="w-8 h-8 animate-spin text-primary" />
//       </div>
//     }>
//       <DonationSuccessContent />
//     </Suspense>
//   )
// };




// "use client"

// import { Suspense, useEffect, useState } from "react"
// import { useSearchParams } from "next/navigation"
// import Link from "next/link"
// import { Navigation } from "@/components/navigation"
// import { Footer } from "@/components/footer"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { 
//   CheckCircle, Home, Heart, Download, Share2,
//   GraduationCap, Droplets, Users, Building2, Loader2, Mail, Calendar
// } from "lucide-react"
// import { getCheckoutSession } from "@/app/actions/stripe"
// import { createClient } from "@/lib/supabase/client"

// // Map program values to display labels and icons
// const programLabels: Record<string, { label: string; icon: React.ElementType; dbValue: string }> = {
//   children: { label: "Children's Education", icon: GraduationCap, dbValue: "children" },
//   "clean water": { label: "Clean Water", icon: Droplets, dbValue: "clean water" },
//   women: { label: "Women Empowerment", icon: Users, dbValue: "women" },
//   community: { label: "Community Development", icon: Building2, dbValue: "community" },
//   education: { label: "Children's Education", icon: GraduationCap, dbValue: "children" },
//   water: { label: "Clean Water", icon: Droplets, dbValue: "clean water" },
//   general: { label: "General Support", icon: Heart, dbValue: "community" },
// }

// const paymentMethodLabels: Record<string, string> = {
//   stripe: "Credit Card",
//   credit_card: "Credit Card",
//   paypal: "PayPal",
//   bank_transfer: "Bank Transfer",
//   mobile_money: "Mobile Money",
// }

// function DonationSuccessContent() {
//   const searchParams = useSearchParams()
  
//   // Get params from URL
//   const sessionId = searchParams.get("session_id")
//   const donationId = searchParams.get("id")
//   const paramAmount = searchParams.get("amount")
//   const paramMethod = searchParams.get("method")
//   const paramProgram = searchParams.get("cause") // program/cause from donation form
//   const paramEmail = searchParams.get("email")
//   const paramName = searchParams.get("name")
//   const paramPhone = searchParams.get("phone")
//   const paramAddress = searchParams.get("address")
//   const paramFrequency = searchParams.get("frequency") || "one-time"
  
//   const [isLoading, setIsLoading] = useState(!!sessionId)
//   const [isSendingEmail, setIsSendingEmail] = useState(false)
//   const [emailSent, setEmailSent] = useState(false)
//   const [paymentData, setPaymentData] = useState<{
//     amount: number
//     program: string
//     programLabel: string
//     email: string | null
//     donorName: string
//     donorPhone: string | null
//     donorAddress: string | null
//     method: string
//     currency: string
//     transactionId: string
//     frequency: string
//     date: string
//   } | null>(null)
//   const [savedToDb, setSavedToDb] = useState(false)
  
//   // Send thank you email
//   const sendThankYouEmail = async (data: {
//     email: string
//     name: string
//     amount: number
//     currency: string
//     program: string
//     donationId: string
//     paymentMethod: string
//     frequency: string
//   }) => {
//     try {
//       const response = await fetch("/api/send-donation-email", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       })
      
//       if (response.ok) {
//         setEmailSent(true)
//         return true
//       } else {
//         console.error("Failed to send email")
//         return false
//       }
//     } catch (error) {
//       console.error("Error sending email:", error)
//       return false
//     }
//   }
  
//   // Fetch payment data from Stripe
//   useEffect(() => {
//     const fetchPaymentData = async () => {
//       // Handle Stripe session
//       if (sessionId) {
//         try {
//           const session = await getCheckoutSession(sessionId)
          
//           if (session.paymentStatus === "paid") {
//             const donorName = session.metadata?.donor_name || "Anonymous"
//             const donorEmail = session.customerEmail || null
//             const donorPhone = session.metadata?.donor_phone || null
//             const donorAddress = session.metadata?.donor_address || null
//             const amount = (session.amountTotal || 0) / 100
//             const program = session.metadata?.cause || "community"
//             const programInfo = programLabels[program] || programLabels.community
//             const frequency = session.metadata?.frequency || "one-time"
            
//             const newPaymentData = {
//               amount: amount,
//               program: program,
//               programLabel: programInfo.label,
//               email: donorEmail,
//               donorName: donorName,
//               donorPhone: donorPhone,
//               donorAddress: donorAddress,
//               method: "credit_card",
//               currency: "USD",
//               transactionId: sessionId,
//               frequency: frequency,
//               date: new Date().toLocaleDateString(),
//             }
            
//             setPaymentData(newPaymentData)
            
//             // Send thank you email if email exists and not already sent
//             if (donorEmail && !emailSent && !savedToDb) {
//               setIsSendingEmail(true)
//               await sendThankYouEmail({
//                 email: donorEmail,
//                 name: donorName,
//                 amount: amount,
//                 currency: "USD",
//                 program: programInfo.label,
//                 donationId: sessionId.slice(0, 8),
//                 paymentMethod: "Credit Card",
//                 frequency: frequency,
//               })
//               setIsSendingEmail(false)
//             }
//             setSavedToDb(true)
//           }
//         } catch (error) {
//           console.error("Error fetching Stripe session:", error)
//         } finally {
//           setIsLoading(false)
//         }
//         return
//       }
      
//       // Handle direct donation (from the dynamic donation form)
//       if (donationId && paramAmount) {
//         const donorName = paramName || "Anonymous"
//         const donorEmail = paramEmail || null
//         const donorPhone = paramPhone || null
//         const donorAddress = paramAddress || null
//         const amount = parseFloat(paramAmount)
//         const program = paramProgram || "community"
//         const programInfo = programLabels[program] || programLabels.community
//         const method = paramMethod || "bank_transfer"
//         const frequency = paramFrequency || "one-time"
        
//         const newPaymentData = {
//           amount: amount,
//           program: program,
//           programLabel: programInfo.label,
//           email: donorEmail,
//           donorName: donorName,
//           donorPhone: donorPhone,
//           donorAddress: donorAddress,
//           method: method,
//           currency: "USD",
//           transactionId: donationId,
//           frequency: frequency,
//           date: new Date().toLocaleDateString(),
//         }
        
//         setPaymentData(newPaymentData)
        
//         // Send thank you email if email exists and not already sent
//         if (donorEmail && !emailSent && !savedToDb) {
//           setIsSendingEmail(true)
//           await sendThankYouEmail({
//             email: donorEmail,
//             name: donorName,
//             amount: amount,
//             currency: "USD",
//             program: programInfo.label,
//             donationId: donationId.slice(0, 8),
//             paymentMethod: paymentMethodLabels[method] || method,
//             frequency: frequency,
//           })
//           setIsSendingEmail(false)
//         }
//         setSavedToDb(true)
//       }
      
//       setIsLoading(false)
//     }
    
//     fetchPaymentData()
//   }, [sessionId, paramAmount, donationId, paramName, paramEmail, paramPhone, paramAddress, paramMethod, paramProgram, paramFrequency, emailSent, savedToDb])
  
//   // Determine values based on payment data
//   const amount = paymentData?.amount?.toString() || paramAmount
//   const method = paymentData?.method || paramMethod || "bank_transfer"
//   const program = paymentData?.program || paramProgram || "community"
//   const currency = paymentData?.currency || "USD"
//   const donorName = paymentData?.donorName || paramName || "Anonymous"
//   const transactionId = paymentData?.transactionId || donationId || "N/A"
//   const frequency = paymentData?.frequency || paramFrequency || "one-time"
//   const donorEmail = paymentData?.email || paramEmail
//   const donorPhone = paymentData?.donorPhone || paramPhone
//   const donorAddress = paymentData?.donorAddress || paramAddress
//   const donationDate = paymentData?.date || new Date().toLocaleDateString()
  
//   const programInfo = programLabels[program] || programLabels.community
//   const ProgramIcon = programInfo.icon
  
//   if (isLoading) {
//     return (
//       <>
//         <Navigation />
//         <main className="min-h-screen bg-background flex items-center justify-center">
//           <div className="text-center">
//             <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
//             <p className="text-muted-foreground">Confirming your payment...</p>
//           </div>
//         </main>
//         <Footer />
//       </>
//     )
//   }

//   const handleShare = async () => {
//     const shareText = `I just donated ${amount} ${currency} to SHAPEthiopia for ${programInfo.label}! Join me in making a difference.`
    
//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: "I donated to SHAPEthiopia!",
//           text: shareText,
//           url: "https://shapethiopia.org/donate",
//         })
//       } catch (err) {
//         // User cancelled or error
//       }
//     } else {
//       navigator.clipboard.writeText(shareText)
//       alert("Share text copied to clipboard!")
//     }
//   }

//   const handleDownloadReceipt = () => {
//     const receiptContent = `
// ╔══════════════════════════════════════════════════════════════╗
// ║              SHAPEthiopia Foundation                         ║
// ║                    Donation Receipt                          ║
// ╚══════════════════════════════════════════════════════════════╝

// Donor Information:
// ------------------
// Name: ${donorName}
// ${donorEmail ? `Email: ${donorEmail}` : ''}
// ${donorPhone ? `Phone: ${donorPhone}` : ''}
// ${donorAddress ? `Address: ${donorAddress}` : ''}

// Donation Details:
// -----------------
// Transaction ID: ${transactionId}
// Date: ${donationDate}
// Amount: ${amount} ${currency}
// Program: ${programInfo.label}
// Payment Method: ${paymentMethodLabels[method] || method}
// Frequency: ${frequency === "monthly" ? "Monthly Recurring" : "One-time"}
// Status: Completed

// Tax Information:
// ----------------
// Organization: SHAPEthiopia Foundation
// Tax ID: SHAP-ETH-2024-001
// Address: Addis Ababa, Ethiopia

// Impact Statement:
// -----------------
// Your ${frequency === "monthly" ? "monthly " : ""}donation will directly support ${programInfo.label.toLowerCase()} programs,
// helping to create sustainable change in Ethiopian communities.

// Thank you for your generosity!

// For questions, contact: support@shapethiopia.org
// Visit us: www.shapethiopia.org

// ╔══════════════════════════════════════════════════════════════╗
// ║  "Together we can change lives, one donation at a time."    ║
// ╚══════════════════════════════════════════════════════════════╝
// `
    
//     const blob = new Blob([receiptContent], { type: "text/plain" })
//     const url = URL.createObjectURL(blob)
//     const a = document.createElement("a")
//     a.href = url
//     a.download = `donation-receipt-${transactionId.slice(0, 8)}.txt`
//     document.body.appendChild(a)
//     a.click()
//     document.body.removeChild(a)
//     URL.revokeObjectURL(url)
//   }

//   return (
//     <>
//       <Navigation />
//       <main className="min-h-screen bg-background">
//         {/* Hero Section */}
//         <section className="relative pt-24 pb-16 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
//           <div className="container mx-auto px-4 pt-12">
//             <div className="max-w-3xl mx-auto text-center">
//               <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/20 flex items-center justify-center">
//                 <CheckCircle className="w-10 h-10" />
//               </div>
//               <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
//                 Thank You for Your Donation! ❤️
//               </h1>
//               <p className="opacity-90 text-lg max-w-xl mx-auto">
//                 Your {frequency === "monthly" ? "monthly " : ""}donation of <strong>{amount} {currency}</strong> has been received successfully. 
//                 We truly appreciate your support in helping communities and changing lives.
//               </p>
//               {isSendingEmail && (
//                 <div className="mt-4 flex items-center justify-center gap-2 text-sm bg-white/20 rounded-lg p-2">
//                   <Loader2 className="w-4 h-4 animate-spin" />
//                   <span>Sending confirmation email...</span>
//                 </div>
//               )}
//               {emailSent && donorEmail && (
//                 <div className="mt-4 flex items-center justify-center gap-2 text-sm bg-green-500/30 rounded-lg p-2">
//                   <Mail className="w-4 h-4" />
//                   <span>Confirmation email sent to {donorEmail}</span>
//                 </div>
//               )}
//             </div>
//           </div>
//         </section>

//         {/* Receipt Section */}
//         <section className="py-12">
//           <div className="container mx-auto px-4">
//             <div className="max-w-lg mx-auto">
//               {/* Receipt Card */}
//               <Card className="border-0 shadow-xl">
//                 <CardContent className="p-6 md:p-8">
//                   <div className="text-center mb-6 pb-6 border-b border-border">
//                     <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
//                       <ProgramIcon className="w-8 h-8 text-primary" />
//                     </div>
//                     <h2 className="font-serif text-2xl font-bold text-foreground">
//                       Donation Receipt
//                     </h2>
//                     <p className="text-muted-foreground mt-1">
//                       SHAPEthiopia Foundation
//                     </p>
//                   </div>

//                   <div className="space-y-4">
//                     {/* Donor Information */}
//                     <div className="bg-secondary/50 rounded-lg p-4">
//                       <h3 className="font-semibold text-sm text-muted-foreground mb-3">Donor Information</h3>
//                       <div className="space-y-2 text-sm">
//                         <div className="flex justify-between">
//                           <span className="text-muted-foreground">Name</span>
//                           <span className="font-medium">{donorName}</span>
//                         </div>
//                         {donorEmail && (
//                           <div className="flex justify-between">
//                             <span className="text-muted-foreground">Email</span>
//                             <span className="font-medium">{donorEmail}</span>
//                           </div>
//                         )}
//                         {donorPhone && (
//                           <div className="flex justify-between">
//                             <span className="text-muted-foreground">Phone</span>
//                             <span className="font-medium">{donorPhone}</span>
//                           </div>
//                         )}
//                         {donorAddress && (
//                           <div className="flex justify-between">
//                             <span className="text-muted-foreground">Address</span>
//                             <span className="font-medium text-right">{donorAddress}</span>
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     {/* Amount */}
//                     <div className="text-center py-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
//                       <p className="text-sm text-muted-foreground mb-1">Donation Amount</p>
//                       <p className="text-4xl font-bold text-green-600">
//                         {amount} {currency}
//                       </p>
//                       {frequency === "monthly" && (
//                         <p className="text-xs text-muted-foreground mt-2 flex items-center justify-center gap-1">
//                           <Calendar className="w-3 h-3" />
//                           Monthly Recurring Donation
//                         </p>
//                       )}
//                     </div>

//                     {/* Details */}
//                     <div className="space-y-3 text-sm">
//                       <div className="flex justify-between py-2 border-b border-border">
//                         <span className="text-muted-foreground">Reference ID</span>
//                         <span className="font-mono text-foreground">{transactionId.slice(0, 8)}</span>
//                       </div>
//                       <div className="flex justify-between py-2 border-b border-border">
//                         <span className="text-muted-foreground">Program</span>
//                         <span className="font-medium text-foreground">{programInfo.label}</span>
//                       </div>
//                       <div className="flex justify-between py-2 border-b border-border">
//                         <span className="text-muted-foreground">Payment Method</span>
//                         <span className="font-medium text-foreground">
//                           {paymentMethodLabels[method] || method}
//                         </span>
//                       </div>
//                       <div className="flex justify-between py-2 border-b border-border">
//                         <span className="text-muted-foreground">Date</span>
//                         <span className="font-medium text-foreground">{donationDate}</span>
//                       </div>
//                       <div className="flex justify-between py-2">
//                         <span className="text-muted-foreground">Status</span>
//                         <span className="font-medium text-green-600">Completed</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Impact Message */}
//                   <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
//                     <p className="text-sm text-foreground text-center">
//                       <Heart className="w-4 h-4 inline-block mr-1 text-green-600" />
//                       Your {frequency === "monthly" ? "monthly " : ""}donation will help {programInfo.label.toLowerCase()} programs across Ethiopia. 
//                       Thank you for your generosity!
//                     </p>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Action Buttons */}
//               <div className="mt-6 flex flex-col sm:flex-row gap-3">
//                 <Button variant="outline" className="flex-1" onClick={handleShare}>
//                   <Share2 className="mr-2 h-4 w-4" />
//                   Share
//                 </Button>
//                 <Button variant="outline" className="flex-1" onClick={handleDownloadReceipt}>
//                   <Download className="mr-2 h-4 w-4" />
//                   Download Receipt
//                 </Button>
//               </div>

//               {/* Navigation */}
//               <div className="mt-8 flex flex-col sm:flex-row gap-3">
//                 <Button asChild className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
//                   <Link href="/donate">
//                     <Heart className="mr-2 h-4 w-4" />
//                     Donate Again
//                   </Link>
//                 </Button>
//                 <Button variant="secondary" asChild className="flex-1">
//                   <Link href="/">
//                     <Home className="mr-2 h-4 w-4" />
//                     Back to Home
//                   </Link>
//                 </Button>
//               </div>

//               {/* Contact Info */}
//               <p className="mt-8 text-center text-sm text-muted-foreground">
//                 Questions about your donation?{" "}
//                 <Link href="/contact" className="text-green-600 hover:underline">
//                   Contact us
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </>
//   )
// }

// export default function DonationSuccessPage() {
//   return (
//     <Suspense fallback={
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <Loader2 className="w-8 h-8 animate-spin text-primary" />
//       </div>
//     }>
//       <DonationSuccessContent />
//     </Suspense>
//   )
// };




"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  CheckCircle, Home, Heart, Download, Share2,
  GraduationCap, Droplets, Users, Building2, Loader2, Mail, Calendar
} from "lucide-react"

// Match your database program values exactly
const programLabels: Record<string, { label: string; icon: React.ElementType }> = {
  children: { label: "Children's Education", icon: GraduationCap },
  "clean water": { label: "Clean Water", icon: Droplets },
  women: { label: "Women Empowerment", icon: Users },
  community: { label: "Community Development", icon: Building2 },
}

const paymentMethodLabels: Record<string, string> = {
  credit_card: "Credit Card",
  paypal: "PayPal",
  bank_transfer: "Bank Transfer",
  mobile_money: "Mobile Money",
  stripe: "Credit Card",
}

function DonationSuccessContent() {
  const searchParams = useSearchParams()
  
  // Get params from URL
  const donationId = searchParams.get("id")
  const paramAmount = searchParams.get("amount")
  const paramMethod = searchParams.get("method")
  const paramProgram = searchParams.get("program")
  const paramEmail = searchParams.get("email")
  const paramName = searchParams.get("name")
  const paramPhone = searchParams.get("phone")
  const paramAddress = searchParams.get("address")
  const paramFrequency = searchParams.get("frequency") || "one-time"
  
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  
  // Send thank you email
  const sendThankYouEmail = async () => {
    if (!paramEmail) return
    
    setIsSendingEmail(true)
    try {
      const programInfo = programLabels[paramProgram || "community"] || programLabels.community
      const response = await fetch("/api/send-donation-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: paramEmail,
          name: paramName || "Anonymous",
          amount: parseFloat(paramAmount || "0"),
          currency: "USD",
          program: programInfo.label,
          donationId: donationId?.slice(0, 8) || "N/A",
          paymentMethod: paymentMethodLabels[paramMethod || "bank_transfer"] || paramMethod,
          frequency: paramFrequency,
        }),
      })
      
      if (response.ok) {
        setEmailSent(true)
      }
    } catch (error) {
      console.error("Error sending email:", error)
    } finally {
      setIsSendingEmail(false)
    }
  }
  
  // Send email on page load if email exists
  useEffect(() => {
    if (paramEmail && !emailSent && !isSendingEmail) {
      sendThankYouEmail()
    }
  }, [paramEmail])
  
  // Determine values
  const amount = paramAmount
  const method = paramMethod || "bank_transfer"
  const program = paramProgram || "community"
  const currency = "USD"
  const donorName = paramName || "Anonymous"
  const transactionId = donationId || "N/A"
  const frequency = paramFrequency || "one-time"
  const donorEmail = paramEmail
  const donorPhone = paramPhone
  const donorAddress = paramAddress
  const donationDate = new Date().toLocaleDateString()
  
  const programInfo = programLabels[program] || programLabels.community
  const ProgramIcon = programInfo.icon

  const handleShare = async () => {
    const shareText = `I just donated ${amount} ${currency} to SHAPEthiopia for ${programInfo.label}! Join me in making a difference.`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "I donated to SHAPEthiopia!",
          text: shareText,
          url: "https://shapethiopia.org/donate",
        })
      } catch (err) {
        // User cancelled or error
      }
    } else {
      navigator.clipboard.writeText(shareText)
      alert("Share text copied to clipboard!")
    }
  }

  const handleDownloadReceipt = () => {
    const receiptContent = `
╔══════════════════════════════════════════════════════════════╗
║              SHAPEthiopia Foundation                         ║
║                    Donation Receipt                          ║
╚══════════════════════════════════════════════════════════════╝

Donor Information:
------------------
Name: ${donorName}
${donorEmail ? `Email: ${donorEmail}` : ''}
${donorPhone ? `Phone: ${donorPhone}` : ''}
${donorAddress ? `Address: ${donorAddress}` : ''}

Donation Details:
-----------------
Transaction ID: ${transactionId}
Date: ${donationDate}
Amount: ${amount} ${currency}
Program: ${programInfo.label}
Payment Method: ${paymentMethodLabels[method] || method}
Frequency: ${frequency === "monthly" ? "Monthly Recurring" : "One-time"}
Status: Completed

Tax Information:
----------------
Organization: SHAPEthiopia Foundation
Tax ID: SHAP-ETH-2024-001
Address: Addis Ababa, Ethiopia

Impact Statement:
-----------------
Your ${frequency === "monthly" ? "monthly " : ""}donation will directly support ${programInfo.label.toLowerCase()} programs,
helping to create sustainable change in Ethiopian communities.

Thank you for your generosity!

For questions, contact: support@shapethiopia.org
Visit us: www.shapethiopia.org

╔══════════════════════════════════════════════════════════════╗
║  "Together we can change lives, one donation at a time."    ║
╚══════════════════════════════════════════════════════════════╝
`
    
    const blob = new Blob([receiptContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `donation-receipt-${transactionId.slice(0, 8)}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
          <div className="container mx-auto px-4 pt-12">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/20 flex items-center justify-center">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Thank You for Your Donation! ❤️
              </h1>
              <p className="opacity-90 text-lg max-w-xl mx-auto">
                Your {frequency === "monthly" ? "monthly " : ""}donation of <strong>{amount} {currency}</strong> has been received successfully. 
                We truly appreciate your support in helping communities and changing lives.
              </p>
              {isSendingEmail && (
                <div className="mt-4 flex items-center justify-center gap-2 text-sm bg-white/20 rounded-lg p-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending confirmation email...</span>
                </div>
              )}
              {emailSent && donorEmail && (
                <div className="mt-4 flex items-center justify-center gap-2 text-sm bg-green-500/30 rounded-lg p-2">
                  <Mail className="w-4 h-4" />
                  <span>Confirmation email sent to {donorEmail}</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Receipt Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto">
              {/* Receipt Card */}
              <Card className="border-0 shadow-xl">
                <CardContent className="p-6 md:p-8">
                  <div className="text-center mb-6 pb-6 border-b border-border">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <ProgramIcon className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="font-serif text-2xl font-bold text-foreground">
                      Donation Receipt
                    </h2>
                    <p className="text-muted-foreground mt-1">
                      SHAPEthiopia Foundation
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Donor Information */}
                    <div className="bg-secondary/50 rounded-lg p-4">
                      <h3 className="font-semibold text-sm text-muted-foreground mb-3">Donor Information</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Name</span>
                          <span className="font-medium">{donorName}</span>
                        </div>
                        {donorEmail && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Email</span>
                            <span className="font-medium">{donorEmail}</span>
                          </div>
                        )}
                        {donorPhone && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Phone</span>
                            <span className="font-medium">{donorPhone}</span>
                          </div>
                        )}
                        {donorAddress && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Address</span>
                            <span className="font-medium text-right">{donorAddress}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="text-center py-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Donation Amount</p>
                      <p className="text-4xl font-bold text-green-600">
                        {amount} {currency}
                      </p>
                      {frequency === "monthly" && (
                        <p className="text-xs text-muted-foreground mt-2 flex items-center justify-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Monthly Recurring Donation
                        </p>
                      )}
                    </div>

                    {/* Details */}
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Reference ID</span>
                        <span className="font-mono text-foreground">{transactionId.slice(0, 8)}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Program</span>
                        <span className="font-medium text-foreground">{programInfo.label}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Payment Method</span>
                        <span className="font-medium text-foreground">
                          {paymentMethodLabels[method] || method}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Date</span>
                        <span className="font-medium text-foreground">{donationDate}</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-muted-foreground">Status</span>
                        <span className="font-medium text-green-600">Completed</span>
                      </div>
                    </div>
                  </div>

                  {/* Impact Message */}
                  <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-foreground text-center">
                      <Heart className="w-4 h-4 inline-block mr-1 text-green-600" />
                      Your {frequency === "monthly" ? "monthly " : ""}donation will help {programInfo.label.toLowerCase()} programs across Ethiopia. 
                      Thank you for your generosity!
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button variant="outline" className="flex-1" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button variant="outline" className="flex-1" onClick={handleDownloadReceipt}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Receipt
                </Button>
              </div>

              {/* Navigation */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button asChild className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                  <Link href="/donate">
                    <Heart className="mr-2 h-4 w-4" />
                    Donate Again
                  </Link>
                </Button>
                <Button variant="secondary" asChild className="flex-1">
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Back to Home
                  </Link>
                </Button>
              </div>

              {/* Contact Info */}
              <p className="mt-8 text-center text-sm text-muted-foreground">
                Questions about your donation?{" "}
                <Link href="/contact" className="text-green-600 hover:underline">
                  Contact us
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default function DonationSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    }>
      <DonationSuccessContent />
    </Suspense>
  )
};