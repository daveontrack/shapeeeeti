// "use client"

// import { useState } from "react"
// import { Card, CardContent } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Badge } from "@/components/ui/badge"
// import { ArrowLeft, ArrowRight, CheckCircle, CreditCard, Building2, Globe, MapPin, Smartphone } from "lucide-react"

// interface DonationFormData {
//   paymentType: string
//   paymentMethod: string

//   fullName: string
//   phoneNumber: string
//   email: string

//   streetAddress: string
//   city: string
//   country: string
//   postalCode: string
//   bankName: string
//   bankAddress: string
//   accountNumber: string
//   swiftCode: string
//   paymentAmount: string
//   currency: string
//   purposeOfPayment: string
//   companyName: string
//   taxId: string
//   intermediaryBank: string

//   accountHolderName: string
//   mobileWalletProvider: string
//   registeredPhoneNumber: string

//   cardNumber: string
//   expirationDate: string
//   cvv: string
//   paypalEmail: string
// }

// export default function DonatePage() {
//   const [currentStep, setCurrentStep] = useState(1)
//   const [formData, setFormData] = useState<DonationFormData>({
//     paymentType: "",
//     paymentMethod: "",
//     fullName: "",
//     phoneNumber: "",
//     email: "",
//     streetAddress: "",
//     city: "",
//     country: "",
//     postalCode: "",
//     bankName: "",
//     bankAddress: "",
//     accountNumber: "",
//     swiftCode: "",
//     paymentAmount: "",
//     currency: "USD",
//     purposeOfPayment: "",
//     companyName: "",
//     taxId: "",
//     intermediaryBank: "",
//     accountHolderName: "",
//     mobileWalletProvider: "",
//     registeredPhoneNumber: "",
//     cardNumber: "",
//     expirationDate: "",
//     cvv: "",
//     paypalEmail: "",
//   })

//   const paymentTypes = [
//     { value: "international", label: "International Payments", description: "For donors outside Ethiopia", icon: Globe },
//     { value: "ethiopian", label: "Ethiopian Payments", description: "For donors in Ethiopia", icon: MapPin },
//   ]

//   const getPaymentMethods = () => {
//     if (formData.paymentType === "international") {
//       return [
//         { value: "credit_card", label: "Credit Card", icon: CreditCard },
//         { value: "paypal", label: "PayPal", icon: Building2 },
//         { value: "bank_transfer", label: "Bank Transfer", icon: Building2 },
//       ]
//     }

//     if (formData.paymentType === "ethiopian") {
//       return [
//         { value: "bank_transfer", label: "Bank Transfer", icon: Building2 },
//         { value: "mobile_money", label: "Mobile Money", icon: Smartphone },
//       ]
//     }
    

//     return []
//   }

//   const updateForm = (field: keyof DonationFormData, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }))
//   }

//   const goNext = () => {
//     if (currentStep === 1 && !formData.paymentType) return
//     if (currentStep === 1 && !formData.paymentMethod) return
//     if (currentStep === 2) {
//       if (formData.paymentType === "international" && (!formData.fullName || !formData.email || !formData.phoneNumber)) return
//       if (formData.paymentType === "ethiopian" && (!formData.fullName || !formData.phoneNumber)) return
//     }
//     setCurrentStep(prev => Math.min(prev + 1, 3))
//   }

//   const goBack = () => setCurrentStep(prev => Math.max(prev - 1, 1))

//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault()
//     console.log("Donation form submitted", formData)
//     alert("Donation submitted! Check console for data.")
//   }

//   const renderStep1 = () => (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-2xl font-bold">Select Payment Method</h2>
//         <p className="text-sm text-muted-foreground">Choose how you would like to make your donation</p>
//       </div>

//       <div className="space-y-4">
//         <Label className="font-medium">Payment Type</Label>
//         <RadioGroup value={formData.paymentType} onValueChange={(value) => updateForm("paymentType", value)}>
//           <div className="grid gap-3">
//             {paymentTypes.map((type) => (
//               <div key={type.value}>
//                 <RadioGroupItem value={type.value} id={type.value} className="peer sr-only" />
//                 <Label
//                   htmlFor={type.value}
//                   className="flex p-4 border rounded-lg cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
//                 >
//                   <type.icon className="h-6 w-6" />
//                   <div className="ml-3">
//                     <p className="font-medium">{type.label}</p>
//                     <p className="text-sm text-muted-foreground">{type.description}</p>
//                   </div>
//                 </Label>
//               </div>
//             ))}
//           </div>
//         </RadioGroup>
//       </div>

//       {formData.paymentType && (
//         <div className="space-y-4">
//           <Label className="font-medium">Payment Method</Label>
//           <Select value={formData.paymentMethod} onValueChange={(value) => updateForm("paymentMethod", value)}>
//             <SelectTrigger>
//               <SelectValue placeholder="Select method" />
//             </SelectTrigger>
//             <SelectContent>
//               {getPaymentMethods().map((method) => (
//                 <SelectItem key={method.value} value={method.value}>
//                   {method.label}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//       )}

//       <div className="flex justify-end gap-3">
//         <Button onClick={goNext} size="lg" disabled={!formData.paymentType || !formData.paymentMethod}>
//           Next <ArrowRight className="ml-2 w-4 h-4" />
//         </Button>
//       </div>
//     </div>
//   )

//   const renderStep2 = () => (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-2xl font-bold">Donation Details</h2>
//         <p className="text-sm text-muted-foreground">
//           Provide your donor information based on the selected payment type and method.
//         </p>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//         <div className="rounded-lg border border-border bg-secondary p-3">
//           <p className="text-xs uppercase text-muted-foreground">Payment Type</p>
//           <p className="font-semibold">{formData.paymentType || "Not selected"}</p>
//         </div>
//         <div className="rounded-lg border border-border bg-secondary p-3">
//           <p className="text-xs uppercase text-muted-foreground">Payment Method</p>
//           <p className="font-semibold">{formData.paymentMethod || "Not selected"}</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <Label>Full Name {formData.paymentType === "international" ? "(as on bank account)" : "(as registered on bank/mobile account)"}</Label>
//           <Input
//             value={formData.fullName}
//             onChange={(e) => updateForm("fullName", e.target.value)}
//             placeholder="John Doe"
//           />
//         </div>
//         <div className="space-y-2">
//           <Label>Phone Number</Label>
//           <Input
//             value={formData.phoneNumber}
//             onChange={(e) => updateForm("phoneNumber", e.target.value)}
//             placeholder={formData.paymentType === "ethiopian" ? "+251911234567" : "+1 555 123 4567"}
//           />
//         </div>
//       </div>

//       {formData.paymentType === "international" && (
//         <>
//           <div className="space-y-2">
//             <Label>Email Address</Label>
//             <Input
//               type="email"
//               value={formData.email}
//               onChange={(e) => updateForm("email", e.target.value)}
//               placeholder="your@email.com"
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label>Street</Label>
//               <Input
//                 value={formData.streetAddress}
//                 onChange={(e) => updateForm("streetAddress", e.target.value)}
//                 placeholder="123 Main St"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>City</Label>
//               <Input
//                 value={formData.city}
//                 onChange={(e) => updateForm("city", e.target.value)}
//                 placeholder="New York"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>Country</Label>
//               <Input
//                 value={formData.country}
//                 onChange={(e) => updateForm("country", e.target.value)}
//                 placeholder="USA"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>Postal Code</Label>
//               <Input
//                 value={formData.postalCode}
//                 onChange={(e) => updateForm("postalCode", e.target.value)}
//                 placeholder="10001"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label>Bank Name</Label>
//               <Input
//                 value={formData.bankName}
//                 onChange={(e) => updateForm("bankName", e.target.value)}
//                 placeholder="Bank of America"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>Account Number / IBAN</Label>
//               <Input
//                 value={formData.accountNumber}
//                 onChange={(e) => updateForm("accountNumber", e.target.value)}
//                 placeholder="GB29NWBK60161331926819"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label>SWIFT/BIC Code</Label>
//               <Input
//                 value={formData.swiftCode}
//                 onChange={(e) => updateForm("swiftCode", e.target.value)}
//                 placeholder="NWBKGB2L"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>Bank Address (Optional)</Label>
//               <Input
//                 value={formData.bankAddress}
//                 onChange={(e) => updateForm("bankAddress", e.target.value)}
//                 placeholder="123 Bank St"
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label>Purpose of Payment</Label>
//             <Input
//               value={formData.purposeOfPayment}
//               onChange={(e) => updateForm("purposeOfPayment", e.target.value)}
//               placeholder="Donation for education program"
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label>Company Name (Optional)</Label>
//               <Input
//                 value={formData.companyName}
//                 onChange={(e) => updateForm("companyName", e.target.value)}
//                 placeholder="Company, LLC"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>Tax ID / National ID (Optional)</Label>
//               <Input
//                 value={formData.taxId}
//                 onChange={(e) => updateForm("taxId", e.target.value)}
//                 placeholder="123456789"
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label>Intermediary Bank Details (Optional)</Label>
//             <Textarea
//               value={formData.intermediaryBank}
//               onChange={(e) => updateForm("intermediaryBank", e.target.value)}
//               placeholder="JP Morgan Chase"
//               rows={3}
//             />
//           </div>
//         </>
//       )}

//       {formData.paymentType === "ethiopian" && formData.paymentMethod === "bank_transfer" && (
//         <>
//           <div className="space-y-2">
//             <Label>Account Holder Name (must match Full Name)</Label>
//             <Input
//               value={formData.accountHolderName}
//               onChange={(e) => updateForm("accountHolderName", e.target.value)}
//               placeholder="John Doe"
//             />
//           </div>
//           <div className="space-y-2">
//             <Label>Bank Name</Label>
//             <Input
//               value={formData.bankName}
//               onChange={(e) => updateForm("bankName", e.target.value)}
//               placeholder="CBE"
//             />
//           </div>
//           <div className="space-y-2">
//             <Label>Account Number</Label>
//             <Input
//               value={formData.accountNumber}
//               onChange={(e) => updateForm("accountNumber", e.target.value)}
//               placeholder="1000123456789"
//             />
//           </div>
//         </>
//       )}

//       {formData.paymentType === "ethiopian" && formData.paymentMethod === "mobile_money" && (
//         <>
//           <div className="space-y-2">
//             <Label>Mobile Wallet Provider</Label>
//             <Select value={formData.mobileWalletProvider} onValueChange={(value) => updateForm("mobileWalletProvider", value)}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select provider" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="telebirr">Telebirr</SelectItem>
//                 <SelectItem value="cbe_mobile">CBE Mobile</SelectItem>
//                 <SelectItem value="other">Other"</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="space-y-2">
//             <Label>Registered Phone Number</Label>
//             <Input
//               value={formData.registeredPhoneNumber}
//               onChange={(e) => updateForm("registeredPhoneNumber", e.target.value)}
//               placeholder="+251911234567"
//             />
//           </div>
//         </>
//       )}

//       <div className="flex justify-between gap-3">
//         <Button variant="outline" onClick={goBack}>
//           <ArrowLeft className="mr-2 w-4 h-4" /> Back
//         </Button>
//         <Button onClick={goNext}>Next <ArrowRight className="ml-2 w-4 h-4" /></Button>
//       </div>
//     </div>
//   )

//   const renderStep3 = () => (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-2xl font-bold">Payment Details</h2>
//         <p className="text-sm text-muted-foreground">Enter payment-specific fields according to selected method</p>
//       </div>

//       <div className="space-y-4">
//         <div className="space-y-2">
//           <Label>Payment Amount</Label>
//           <Input
//             type="number"
//             value={formData.paymentAmount}
//             onChange={(e) => updateForm("paymentAmount", e.target.value)}
//             placeholder="100.00"
//           />
//         </div>

//         <div className="space-y-2">
//           <Label>Currency</Label>
//           <Select value={formData.currency} onValueChange={(value) => updateForm("currency", value)}>
//             <SelectTrigger>
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="USD">USD</SelectItem>
//               <SelectItem value="EUR">EUR</SelectItem>
//               <SelectItem value="ETB">ETB</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       {formData.paymentMethod === "credit_card" && (
//         <div className="space-y-4">
//           <p className="text-sm text-muted-foreground">Enter your card details. Card must be in donor name.</p>
//           <div className="space-y-2">
//             <Label>Card Number</Label>
//             <Input
//               value={formData.cardNumber}
//               onChange={(e) => updateForm("cardNumber", e.target.value)}
//               placeholder="1234 5678 9012 3456"
//               maxLength={19}
//             />
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label>Expiration Date</Label>
//               <Input
//                 value={formData.expirationDate}
//                 onChange={(e) => updateForm("expirationDate", e.target.value)}
//                 placeholder="MM/YY"
//                 maxLength={5}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>CVV</Label>
//               <Input
//                 value={formData.cvv}
//                 onChange={(e) => updateForm("cvv", e.target.value)}
//                 placeholder="123"
//                 maxLength={4}
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       {formData.paymentMethod === "paypal" && (
//         <div className="space-y-4">
//           <p className="text-sm text-muted-foreground">Enter your PayPal account details to receive payment instructions.</p>
//           <div className="space-y-2">
//             <Label>PayPal Email</Label>
//             <Input
//               type="email"
//               value={formData.paypalEmail}
//               onChange={(e) => updateForm("paypalEmail", e.target.value)}
//               placeholder="your@email.com"
//             />
//           </div>
//         </div>
//       )}

//       {(formData.paymentMethod === "bank_transfer" || formData.paymentMethod === "mobile_money") && (
//         <div className="space-y-4">
//           <p className="text-sm text-muted-foreground">
//             For bank/mobile transfer, ensure details match registered account and phone.
//           </p>

//           {formData.paymentMethod === "bank_transfer" && (
//             <> 
//               <div className="space-y-2">
//                 <Label>Bank Name</Label>
//                 <Input
//                   value={formData.bankName}
//                   onChange={(e) => updateForm("bankName", e.target.value)}
//                   placeholder="CBE"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label>Account Number</Label>
//                 <Input
//                   value={formData.accountNumber}
//                   onChange={(e) => updateForm("accountNumber", e.target.value)}
//                   placeholder="1000123456789"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label>Account Holder Name (must match Full Name)</Label>
//                 <Input
//                   value={formData.accountHolderName}
//                   onChange={(e) => updateForm("accountHolderName", e.target.value)}
//                   placeholder="John Doe"
//                 />
//               </div>
//             </>
//           )}

//           {formData.paymentMethod === "mobile_money" && (
//             <>
//               <div className="space-y-2">
//                 <Label>Mobile Wallet Provider</Label>
//                 <Input
//                   value={formData.mobileWalletProvider}
//                   onChange={(e) => updateForm("mobileWalletProvider", e.target.value)}
//                   placeholder="Telebirr"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label>Registered Phone Number</Label>
//                 <Input
//                   value={formData.registeredPhoneNumber}
//                   onChange={(e) => updateForm("registeredPhoneNumber", e.target.value)}
//                   placeholder="+251911234567"
//                 />
//               </div>
//             </>
//           )}
//         </div>
//       )}

//       <div className="flex justify-between gap-3">
//         <Button variant="outline" onClick={goBack}>
//           <ArrowLeft className="mr-2 w-4 h-4" /> Back
//         </Button>
//         <Button type="submit" onClick={handleSubmit}>
//           <CheckCircle className="mr-2 w-4 h-4" /> Submit Donation
//         </Button>
//       </div>
//     </div>
//   )

//   return (
//     <main
//       className="min-h-screen p-6"
//       style={{
//         backgroundImage: "radial-gradient(circle at 15% 15%, rgba(96,165,250,0.25), transparent 40%), radial-gradient(circle at 90% 30%, rgba(14,165,233,0.2), transparent 50%), linear-gradient(to bottom, #eef2ff, #f9fafb), url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJ8ArAMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAAEBQIDBgEHAAj/xAA8EAACAQIEAwQHBwMFAAMAAAABAgMAEQQSITEFQVETImFxBjKBkaGxwRQjQlJi0fAVcuEkM0OC8Qeisv/EABgBAAMBAQAAAAAAAAAAAAAAAAECAwAE/8QAIBEAAwACAwEAAwEAAAAAAAAAAAECESEDEjFBE1FhBP/aAAwDAQACEQMRAD8AbRQsBG5AMr/7Yj2Rb6FfE6WvbbNrYU3TDw8NhMkwTNYgst/aqk8urbk39nMGnZo2NxdszDTa4B0089QOgueeguabiOJTIEVn/wBhT6qqB65/SLi3UkdQa41o6nhklWbH4wXzK7964uvZpfViOR5KN+v4hTGYxwxCLCKqJGlkHQ7D2k2qMUcOAjKxFmsLyzNYM5A9Y9B0Gw5WFcwy/aG7eUMI0tkDrlLHmSp1G+gOu55iziei7GKHxywkt2cNzYcrWA0/6sR0JBq+LDiQK1jfJdUUHu+7nqN+utAYiYScRV43usiOxJ2ILaH26/CnMBBhkZct3YKL+ROtKvRnoHdLgQ7Ju4Gx6/t5Uvxy552zG4i2HK+4/nl0pniSV7S2W5sDl02ufqPdS51yIynWSVAzHoL6fH6+FKwyyOGw4klCn1V3+J/f30dJljSy/wDlQwgDYlwN7Amuvmkn02v8qwX6D5P9VhI/1lvYAfqaPmYKCzbAZjVOFjVsdI6/hiAHhcmquJ4hsphizPK/qgC/t8qU307w6ISMmIfM0rA949CTTRnAYD8KixobBR9mvhGuX3af5qUptofM06eEBrLAsdiCARfUnfqahw3DtK5mfYbChJ5C0jN+U2XzOv1NOsOnZJGg2A+NItsd6QUEsgqtqmX+79tVM1VbJYIzN3aoGtcne5t0rqnX2UocFjaqB0qSrpUIY3kayI7X6LemMfDsSUByW82rIAj4liVxjtGcz4VHsVJu0rG1l8SxI02tb8wpth8NHgomJVBipQDPKovffu33sL2H+TQvC8EYY0xOIuGIPYxvuoP42/Wbk+GviKliJZJsQMPh1PaH8WndGuvnodD0J5UyA96OENjMT2SEBU70l9b9F9upPhpzvVfG51yiIXEQBzH8wG49pOo86MSKHh8Bhw4BdtXY3Jv5nUnQa/S1s3xHEtN2/ZWHaHs0t12v5Zm9w8a1PQZWz7CZnzYicEFhexIuotoPE6/OnmAv2ObkHuPYv7mlWHGeJFt7B1J0uKbYm2EwuUuS7cug/gH81pU/oWwSdjLKsK/8htfop/wDVYcs8kp7pLWUdL6X93zNVI4swuA7SFHP5bAMf54CrcBG00gZhaNfV8evwt4bUr9GS0GRR9lFcaFhmI9mg9380qq3dJ6mrJnLXy89TUdEQO2h8dv5+1ZsyOxf7uIboqj5/vUcBHnEmI/FIbD+0fubn3VFRI2FYjR8S3dHO21/dR6RiNMierYKvhyFZbM2Rg1MuhPq7edV4nh+NkiLRwSNfddifDWjg8eBTNJ65+VVn0jhBy9KOV9Mpr1CZOEcREsAbCtlDBmfTe+p3pwcDib/AO1y/MKsXj0bfiqxeNx/mrLqvoa7P1FX9Nxbstwq+Zq4cKf8cyr/ANSa43GY6j/V1psyL1ZbHwXDhryvI5PU2FFR4LCQ/wDEunUX+dAniq0NPxRNe/WdSbo2OZcTBAozZQo5bUon9I4o5CqbCkuN4hE1/vOVJ5cVAXJzVGuRl44v2a7HziJSzMWJ2A3J5W8TsBVIdOH4QyOR2snedlNzy2PO5FvKw5VzCwtM/wBrxahQoskd/U8D+o8zyGg53V8T4hHJIZnkyQobA/mbWwAG/gOZ2FhrZvGzmlZ0Qxc02KOSSVoA3/FEQSw/uIv7redBx3kxnZoAIsPqygaA2sqW6WN/AlareXFzkJBhmw6tvJOvet+mME36d4gDaisIn2fDBFN7m7M3rSPrv7TfQWvpsBSFfA/ha/eLc3Aa5bqALj5VPGSu0cjNzYEeV6lw1CqSM2uRCPMk/tf3iuY4WhXwNN8J/QBSWkZuZzn25iPoKa4cBMPHHz/F5Db96TYYd+M9Qf8A9n96bhvu83QW+JpRsFpZQcuuumYc/Ch2UYqTszdYl33s3+P51qeUhSRuRU8BD22HZn9Rm1bw3t8qUKRZAkuJlSQRMsaKREDbvcr+751fjMVDw+K7G7291B8W4/hsBEywZb2tXnXGfSWWbENdtDtW7fEWjhb2zQcZ49nzXbTlWWxHGTnNm15UoxWPkY360rxEz5sw3GulaYyWdKVo0w47Mn4qsT0klXTNWbSQTJpsd/CowAvio4vxFwPjTOF9E75PQOGcTmxAHe3pzFi5FFjtQPo7whlgDZaZYzD9itR2hqw2Qk4hlBpXj+JNl9aq8ZMqXpLjMUutbbClKOYnGyMzHNS6TiMoa2aoTz0vlkXOarMISrwe1cZxrZRg8OeyCjvZdwDy/uJ+vUUowcYxDiZrBY7rARfUbFh57A72vyNU4m+Kl7BmIDXkxJVrXHMX6fh8s35aZ4UCOMkFUBFlS1rDkLctPdei3k58YR8qph0OeOJVJuEjiyAnrub/AOasgw7zygW7x19W+X4j5jn0NURdpJNnfUA9zTnTiGNoYxGh+9fV2vsPPx/m5rJC09EniWGNYRoW7z25AddP57KW8RnXIlthcn5/491E4mRMOCiEs25vv/5ak+Jdmtc2LtpfTTck/wA6dKZglEoWLTIOYsPbfX501zZo4wOSLb40rwCdrmdQQuW1/D+H+WNMmJB5ZtAANlpWxvWXrlCEz3WO3eI5+FZv0h9KVib7NhrKijQDaj/SHEthsKwz2VRXkXGMfmxLm+bWkUuno6lM8a7MbcQ4xJiJCc1IsZissgZt70G2LZtctDFmle9dE8SRK/8ARnwaNibpm60HNiL3qod3SvjTpEnbaJRTtFKGAuK1nolgxxLjMTg/dxLmc/L+eFZBVZ3VEVmZjYBdyfCvW/RzhC+jno8ZcRlGJkGaTlZuS+z5361PmamR+FtvBsY8bgcDhFTtVDDkN6zvFuLQkMytpWE4rxVziHZW50tm4hI6+tUFFUXbmWOeIcTV2bK3Ok+Ixt9KCklZzrtUI4Z8S+SCN5HOlkW5+FWmEiN8jZOTEsarzX1O9aPhHofPiD2nE3+zx20Re85+g+Psp7H6HcJK6jEueplt8hTdpRJJs0HDMNIwMkqAuxzSWPdzDZF/Svz160zMSAAzNnvsCbL5DrUoYCVEcCAW012XqBfQkUdhoIxeRgbHQXvdh4ne3htU0jUynCRBSZygyJoqkWzH5/zrV08n2aEguDK3eZt7DrXzyGWRcqlUUgabUvxmafEiO9lJzMfLQe6xPupvBPQeZiVMkyfdgkhQbljfbx159RbYagT55pmzjMdMy+HICi8XKHcBRdEPcHI25fIe2ocOgbO0r6i+h6trr9fcNqmUDoMuHjEf5bkjq1tT7Nq79qSENNI/djB25mq5SCclu7ufGmvCfR37RlxHE1+6BvHhmA18WH09/SiodPQVUztmA4xgeL+kCnEIrQYRicjHeT+3w8TSCX0VeG+dCW5s3OvfcZFh0izYjIE2uxsLk2A9psKzuLwwxgeVsPkg1EYZCJC3l18NNufK34nK0I+fs9ni83A8n4L+FAYjhCi+UhG6bivUuI8MWMk9mVv1FZ3H4Fbnu0nZpjYlnnuIhkgNpEIHIjY1Th4psVihDhleR5DZVQXJrWS4OSWb7PHH2hkNgtr3/atJw7CYP0XwwXDiMYtx99MfHkOgp3ypIy4XT14V+i3ozB6PQf1Pi4EmNy3WPlF+7eP03B9JOPSYyQoH+75LVXGONtiAy9tm8qzM8oKlnqKVW8su+vGsI7KbsWoaSeNdEGdunShppnlOX1V/L1rsSV0KcHO7yN+DwrO+acBh+U1suHskcYWIBAOSi3yrJ8LOUCtFhpO8Kjb2OvB+kt0AqxsRY2pfDLpXxn1qYxtoXLRAQgBCNJH535qPxUQwHZrEBa+4B5VyIlRbKt7C55jw+lWqmXvdasjmZW+VY7DkKUO10kkBu7OEH6b6H4a01xBGTXa9Z/FMP6YxHrM3zBt9KWxpK4ryZWF1V1Bt0QC49p9Y/wDUdaapFkVIY0JYiwRdSSdf2HsoXBBWxwRSAcxALGwBubfIe6tpgsBHw2MNYyzkav0H0H88jE9g3XUF4bwmPAhJ8cvaYn8Ea6hT4dT48vjToG6BrAfp6UDHPlkMjrmY6Xtqo225eXLz0oxXWRA6bGx9hFdSlI5nWQOXBPiMcZQ98OgBjjW410uG66jfxtpY5oxYd0xTtIFNgQr+BtoANAKOJqstRFEfF8EsqEisLxiHK/ZxAGTYC2l9/ly3r0Dik0rlYMIt3kuO1AJQEHUXGx31+e1ZniBSCVYwCW0M8trlFtvfTN5+FSufpaLfgo4bwVlV5e0WAgZWnkW9v0qARc9ToOVZL0qklgxBjeZZF2R0W2YeI5e+nfpD6RK69jAoSJVsqDkP5rWH4li2xLfeNoNq55WXk7+3WcAzsDqdhvQU8pdtB3RsKvB7UhW25VXMiofWq60zmt5RUH/AE1cm4qoVdENRRZJMaYJsgFOcNLtWfhfIRTPDvYZutSpFpY7jl0qXbUvjm7p8q529SY+T2JLJEmfpf361x8TGug3oXGvdljXYVRksL1RvBz4O4hr4eZuqn5Ut4kFXBORsrH32NMJRmwzjqDQHEgpwgue72pL/qAA0916Rjz6dhjWUYpX9V84Plcj6mkael3H/QvFrBxDNxThV7KXa0kY/Sxvt0N/MU94crRlsxzaWZvE6n3sW+FSxuBjxuHeKRA4cG4Ow/n700U52ap7aND6OekfAvSRe14TOvbCzSYdhkkXzXp4jTTwrQXr81cZ4PNwvHmfhbSIIXujxkh4yBrYjXmK1Xov/wDK+NwgTD+kMLYyIafaYbCVfMaBvgfOumbTIVxtHtDNrrQHEftUojjwmRVY5ZWJsyqR+Ha3n8OlPC+NcP4zhFxfDsVFPCd2Q6qejDcHwNjS70i4u+CH2bChxiHHr5TZB4dTTkyrG8SwfBR9mwkImnY3mN7W33PXw5e4UHicZFj8NLJhwc4FiCuxPK/MUv4VwyXiEoN37IG7vzv0HU1m/Tr0xhiRuC+jrKEjus2JjPPmqHn4t/7S1jA05yYPic+KjxEmHmkTNG2UtHqLjxoK5GrNmvX2WxAy7HpXbUhZts4TXK7auAa1gMkKsQ1CpqKwAqI6jzo6N9KXRmiEekaHTDzJ3K522lDl+6KrLa0MFEz25jmmJ9tS3qMNliaRja/PwqK4mN1zI2axtUxME17xdfEUtlGfCFTyZSfbpTKAWmI/MKBcZhiIxyDW+BrBn05gWLQX5tlPttc/Or5p/s0EjsLlQRagcBJmDqPw3t7dR8NPfRHEbdlGv5pFv7CKA30VnCCZSsq3EcZZz4m+nvJ+FYP0h4F2MxfD6XGZh1vXpgUfZZUTnIq//UfuazHF7PNLbbNYeVFPDDhNHn/DeIY7hWNXEYDES4XELpmjNifAg6EeBr0rgH/yVhMfAML6U4ZFY6DExISjea7qfEXrG8S4UZEM8aWbmeppEyGNircqvN5IXGPTfem/p1HiMJ/SPRximCKZZsQoKmRfyqCLgdTz8t8Hh4WZrWvbny1qESZ3p3gML3aFUGIF7YOhmhZGNaeTC9yTypdLh96VUO5ExWuZKYth6raGnyI0BW1qQFWtFUOztWMSWrkNU2qYGlBhLHeoEX1qJNHYWG8INBhR7XhsLJiyHxStFhgbrEdC/i3QVVxHLHiDkFgyg2HI3NNJHvSjFNnxl/y2H1+tI1gCeWEKRFG0j/gW1LcPLnkdnSxsb+A1/f3jwqziUuVUjFhc5mzeGw8ufsNCTyDC4EIAM7WZg21ye6D8z4A0jGRDBADENl5G3usfqaJxkh/0qjfMSPYpNU4ODs7XDM55Nux399z7yakw7TGNZsxiUKtubG2vyNZDE8XJ2eHJXULnfz6fC3vrL4wF5ircm731+prRcTkCxiOMXJYKo5WGv7/CkTIGZipucvrfH5fOgwonHg1bAgtszH4afOszxbhQN2Rdjet4saJFYclsPC38+dKuIwr6nXWinh5C0mYzB8PYXp7hcNbKvWjDg1UqvXWjEhWCLMF77j4Vm8mSwKsSvcy9TQTQU1kTM5Yfh0FVPFYUMmEJi77VUyW1pm8ViT1NCzJTqgNC7sszE1B4qYCKyk9apZKbIuAIJUSLmiZBl0qhhTCYK41zSZfGmgOVQOgoLBp3zRlBjSe3SkKCTsBelarmIdjYk5yfCr8fKMqxEXDb+Q/zQuOcpEFsLsDceA5e24pKYEimO2Jxpkk0Qd9vADYfI+09KFl/1GMBZbrHdyPO49+g9jVN37LCu73Ysc7gfiJ2Hx+PhXcKn charge too much...')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       <div className="mx-auto max-w-4xl">
//         <Card className="shadow-2xl border border-blue-200/70 bg-white/90 backdrop-blur-sm rounded-3xl">
//           <CardContent className="space-y-6 p-8 rounded-3xl ring-1 ring-blue-100/30">            <div className="space-y-2">
//             <div className="flex items-center gap-2">
//               {[1,2,3].map((step) => (
//                 <Badge
//                   key={step}
//                   variant={currentStep === step ? "secondary" : "outline"}
//                   className="px-3 py-1"
//                 >
//                   Step {step}
//                 </Badge>
//               ))}
//             </div>
//             <div className="space-y-1">
//               <p className="text-xs uppercase tracking-wide text-muted-foreground">Step {currentStep} of 3</p>
//               <h1 className="text-3xl font-bold">Dynamic Donation Form</h1>
//               <p className="text-muted-foreground">Step-by-step form for all payment types and methods.</p>
//             </div>
//           </div>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {currentStep === 1 && renderStep1()}
//               {currentStep === 2 && renderStep2()}
//               {currentStep === 3 && renderStep3()}
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </main>
//   )
// }






// "use client"

// import { useState } from "react"
// import { Card, CardContent } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Badge } from "@/components/ui/badge"
// import { ArrowLeft, ArrowRight, CheckCircle, CreditCard, Building2, Globe, MapPin, Smartphone, Heart, RotateCcw } from "lucide-react"

// interface DonationFormData {
//   paymentType: string
//   paymentMethod: string

//   fullName: string
//   phoneNumber: string
//   email: string

//   streetAddress: string
//   city: string
//   country: string
//   postalCode: string
//   bankName: string
//   bankAddress: string
//   accountNumber: string
//   swiftCode: string
//   paymentAmount: string
//   currency: string
//   purposeOfPayment: string
//   companyName: string
//   taxId: string
//   intermediaryBank: string

//   accountHolderName: string
//   mobileWalletProvider: string
//   registeredPhoneNumber: string

//   cardNumber: string
//   expirationDate: string
//   cvv: string
//   paypalEmail: string
// }

// export default function DonatePage() {
//   const [currentStep, setCurrentStep] = useState(1)
//   const [isSubmitted, setIsSubmitted] = useState(false)
//   const [formData, setFormData] = useState<DonationFormData>({
//     paymentType: "",
//     paymentMethod: "",
//     fullName: "",
//     phoneNumber: "",
//     email: "",
//     streetAddress: "",
//     city: "",
//     country: "",
//     postalCode: "",
//     bankName: "",
//     bankAddress: "",
//     accountNumber: "",
//     swiftCode: "",
//     paymentAmount: "",
//     currency: "USD",
//     purposeOfPayment: "",
//     companyName: "",
//     taxId: "",
//     intermediaryBank: "",
//     accountHolderName: "",
//     mobileWalletProvider: "",
//     registeredPhoneNumber: "",
//     cardNumber: "",
//     expirationDate: "",
//     cvv: "",
//     paypalEmail: "",
//   })

//   const paymentTypes = [
//     { value: "international", label: "International Payments", description: "For donors outside Ethiopia", icon: Globe },
//     { value: "ethiopian", label: "Ethiopian Payments", description: "For donors in Ethiopia", icon: MapPin },
//   ]

//   const getPaymentMethods = () => {
//     if (formData.paymentType === "international") {
//       return [
//         { value: "credit_card", label: "Credit Card", icon: CreditCard },
//         { value: "paypal", label: "PayPal", icon: Building2 },
//         { value: "bank_transfer", label: "Bank Transfer", icon: Building2 },
//       ]
//     }

//     if (formData.paymentType === "ethiopian") {
//       return [
//         { value: "bank_transfer", label: "Bank Transfer", icon: Building2 },
//         { value: "mobile_money", label: "Mobile Money", icon: Smartphone },
//       ]
//     }
    

//     return []
//   }

//   const updateForm = (field: keyof DonationFormData, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }))
//   }

//   const resetForm = () => {
//     setFormData({
//       paymentType: "",
//       paymentMethod: "",
//       fullName: "",
//       phoneNumber: "",
//       email: "",
//       streetAddress: "",
//       city: "",
//       country: "",
//       postalCode: "",
//       bankName: "",
//       bankAddress: "",
//       accountNumber: "",
//       swiftCode: "",
//       paymentAmount: "",
//       currency: "USD",
//       purposeOfPayment: "",
//       companyName: "",
//       taxId: "",
//       intermediaryBank: "",
//       accountHolderName: "",
//       mobileWalletProvider: "",
//       registeredPhoneNumber: "",
//       cardNumber: "",
//       expirationDate: "",
//       cvv: "",
//       paypalEmail: "",
//     })
//     setCurrentStep(1)
//     setIsSubmitted(false)
//   }

//   const goNext = () => {
//     if (currentStep === 1 && !formData.paymentType) return
//     if (currentStep === 1 && !formData.paymentMethod) return
//     if (currentStep === 2) {
//       if (formData.paymentType === "international" && (!formData.fullName || !formData.email || !formData.phoneNumber)) return
//       if (formData.paymentType === "ethiopian" && (!formData.fullName || !formData.phoneNumber)) return
//     }
//     setCurrentStep(prev => Math.min(prev + 1, 3))
//   }

//   const goBack = () => setCurrentStep(prev => Math.max(prev - 1, 1))

//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault()
//     console.log("Donation form submitted", formData)
//     setIsSubmitted(true)
//   }

//   const renderStep1 = () => (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-2xl font-bold">Select Payment Method</h2>
//         <p className="text-sm text-muted-foreground">Choose how you would like to make your donation</p>
//       </div>

//       <div className="space-y-4">
//         <Label className="font-medium">Payment Type</Label>
//         <RadioGroup value={formData.paymentType} onValueChange={(value) => updateForm("paymentType", value)}>
//           <div className="grid gap-3">
//             {paymentTypes.map((type) => (
//               <div key={type.value}>
//                 <RadioGroupItem value={type.value} id={type.value} className="peer sr-only" />
//                 <Label
//                   htmlFor={type.value}
//                   className="flex p-4 border rounded-lg cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
//                 >
//                   <type.icon className="h-6 w-6" />
//                   <div className="ml-3">
//                     <p className="font-medium">{type.label}</p>
//                     <p className="text-sm text-muted-foreground">{type.description}</p>
//                   </div>
//                 </Label>
//               </div>
//             ))}
//           </div>
//         </RadioGroup>
//       </div>

//       {formData.paymentType && (
//         <div className="space-y-4">
//           <Label className="font-medium">Payment Method</Label>
//           <Select value={formData.paymentMethod} onValueChange={(value) => updateForm("paymentMethod", value)}>
//             <SelectTrigger>
//               <SelectValue placeholder="Select method" />
//             </SelectTrigger>
//             <SelectContent>
//               {getPaymentMethods().map((method) => (
//                 <SelectItem key={method.value} value={method.value}>
//                   {method.label}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//       )}

//       <div className="flex justify-end gap-3">
//         <Button onClick={goNext} size="lg" disabled={!formData.paymentType || !formData.paymentMethod}>
//           Next <ArrowRight className="ml-2 w-4 h-4" />
//         </Button>
//       </div>
//     </div>
//   )

//   const renderStep2 = () => (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-2xl font-bold">Donation Details</h2>
//         <p className="text-sm text-muted-foreground">
//           Provide your donor information based on the selected payment type and method.
//         </p>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//         <div className="rounded-lg border border-border bg-secondary p-3">
//           <p className="text-xs uppercase text-muted-foreground">Payment Type</p>
//           <p className="font-semibold">{formData.paymentType || "Not selected"}</p>
//         </div>
//         <div className="rounded-lg border border-border bg-secondary p-3">
//           <p className="text-xs uppercase text-muted-foreground">Payment Method</p>
//           <p className="font-semibold">{formData.paymentMethod || "Not selected"}</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <Label>Full Name {formData.paymentType === "international" ? "(as on bank account)" : "(as registered on bank/mobile account)"}</Label>
//           <Input
//             value={formData.fullName}
//             onChange={(e) => updateForm("fullName", e.target.value)}
//             placeholder="John Doe"
//           />
//         </div>
//         <div className="space-y-2">
//           <Label>Phone Number</Label>
//           <Input
//             value={formData.phoneNumber}
//             onChange={(e) => updateForm("phoneNumber", e.target.value)}
//             placeholder={formData.paymentType === "ethiopian" ? "+251911234567" : "+1 555 123 4567"}
//           />
//         </div>
//       </div>

//       {formData.paymentType === "international" && (
//         <>
//           <div className="space-y-2">
//             <Label>Email Address</Label>
//             <Input
//               type="email"
//               value={formData.email}
//               onChange={(e) => updateForm("email", e.target.value)}
//               placeholder="your@email.com"
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label>Street</Label>
//               <Input
//                 value={formData.streetAddress}
//                 onChange={(e) => updateForm("streetAddress", e.target.value)}
//                 placeholder="123 Main St"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>City</Label>
//               <Input
//                 value={formData.city}
//                 onChange={(e) => updateForm("city", e.target.value)}
//                 placeholder="New York"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>Country</Label>
//               <Input
//                 value={formData.country}
//                 onChange={(e) => updateForm("country", e.target.value)}
//                 placeholder="USA"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>Postal Code</Label>
//               <Input
//                 value={formData.postalCode}
//                 onChange={(e) => updateForm("postalCode", e.target.value)}
//                 placeholder="10001"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label>Bank Name</Label>
//               <Input
//                 value={formData.bankName}
//                 onChange={(e) => updateForm("bankName", e.target.value)}
//                 placeholder="Bank of America"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>Account Number / IBAN</Label>
//               <Input
//                 value={formData.accountNumber}
//                 onChange={(e) => updateForm("accountNumber", e.target.value)}
//                 placeholder="GB29NWBK60161331926819"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label>SWIFT/BIC Code</Label>
//               <Input
//                 value={formData.swiftCode}
//                 onChange={(e) => updateForm("swiftCode", e.target.value)}
//                 placeholder="NWBKGB2L"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>Bank Address (Optional)</Label>
//               <Input
//                 value={formData.bankAddress}
//                 onChange={(e) => updateForm("bankAddress", e.target.value)}
//                 placeholder="123 Bank St"
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label>Purpose of Payment</Label>
//             <Input
//               value={formData.purposeOfPayment}
//               onChange={(e) => updateForm("purposeOfPayment", e.target.value)}
//               placeholder="Donation for education program"
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label>Company Name (Optional)</Label>
//               <Input
//                 value={formData.companyName}
//                 onChange={(e) => updateForm("companyName", e.target.value)}
//                 placeholder="Company, LLC"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>Tax ID / National ID (Optional)</Label>
//               <Input
//                 value={formData.taxId}
//                 onChange={(e) => updateForm("taxId", e.target.value)}
//                 placeholder="123456789"
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label>Intermediary Bank Details (Optional)</Label>
//             <Textarea
//               value={formData.intermediaryBank}
//               onChange={(e) => updateForm("intermediaryBank", e.target.value)}
//               placeholder="JP Morgan Chase"
//               rows={3}
//             />
//           </div>
//         </>
//       )}

//       {formData.paymentType === "ethiopian" && formData.paymentMethod === "bank_transfer" && (
//         <>
//           <div className="space-y-2">
//             <Label>Account Holder Name (must match Full Name)</Label>
//             <Input
//               value={formData.accountHolderName}
//               onChange={(e) => updateForm("accountHolderName", e.target.value)}
//               placeholder="John Doe"
//             />
//           </div>
//           <div className="space-y-2">
//             <Label>Bank Name</Label>
//             <Input
//               value={formData.bankName}
//               onChange={(e) => updateForm("bankName", e.target.value)}
//               placeholder="CBE"
//             />
//           </div>
//           <div className="space-y-2">
//             <Label>Account Number</Label>
//             <Input
//               value={formData.accountNumber}
//               onChange={(e) => updateForm("accountNumber", e.target.value)}
//               placeholder="1000123456789"
//             />
//           </div>
//         </>
//       )}

//       {formData.paymentType === "ethiopian" && formData.paymentMethod === "mobile_money" && (
//         <>
//           <div className="space-y-2">
//             <Label>Mobile Wallet Provider</Label>
//             <Select value={formData.mobileWalletProvider} onValueChange={(value) => updateForm("mobileWalletProvider", value)}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select provider" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="telebirr">Telebirr</SelectItem>
//                 <SelectItem value="cbe_mobile">CBE Mobile</SelectItem>
//                 <SelectItem value="other">Other"</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="space-y-2">
//             <Label>Registered Phone Number</Label>
//             <Input
//               value={formData.registeredPhoneNumber}
//               onChange={(e) => updateForm("registeredPhoneNumber", e.target.value)}
//               placeholder="+251911234567"
//             />
//           </div>
//         </>
//       )}

//       <div className="flex justify-between gap-3">
//         <Button variant="outline" onClick={goBack}>
//           <ArrowLeft className="mr-2 w-4 h-4" /> Back
//         </Button>
//         <Button onClick={goNext}>Next <ArrowRight className="ml-2 w-4 h-4" /></Button>
//       </div>
//     </div>
//   )

//   const renderStep3 = () => (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-2xl font-bold">Payment Details</h2>
//         <p className="text-sm text-muted-foreground">Enter payment-specific fields according to selected method</p>
//       </div>

//       <div className="space-y-4">
//         <div className="space-y-2">
//           <Label>Payment Amount</Label>
//           <Input
//             type="number"
//             value={formData.paymentAmount}
//             onChange={(e) => updateForm("paymentAmount", e.target.value)}
//             placeholder="100.00"
//           />
//         </div>

//         <div className="space-y-2">
//           <Label>Currency</Label>
//           <Select value={formData.currency} onValueChange={(value) => updateForm("currency", value)}>
//             <SelectTrigger>
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="USD">USD</SelectItem>
//               <SelectItem value="EUR">EUR</SelectItem>
//               <SelectItem value="ETB">ETB</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       {formData.paymentMethod === "credit_card" && (
//         <div className="space-y-4">
//           <p className="text-sm text-muted-foreground">Enter your card details. Card must be in donor name.</p>
//           <div className="space-y-2">
//             <Label>Card Number</Label>
//             <Input
//               value={formData.cardNumber}
//               onChange={(e) => updateForm("cardNumber", e.target.value)}
//               placeholder="1234 5678 9012 3456"
//               maxLength={19}
//             />
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label>Expiration Date</Label>
//               <Input
//                 value={formData.expirationDate}
//                 onChange={(e) => updateForm("expirationDate", e.target.value)}
//                 placeholder="MM/YY"
//                 maxLength={5}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>CVV</Label>
//               <Input
//                 value={formData.cvv}
//                 onChange={(e) => updateForm("cvv", e.target.value)}
//                 placeholder="123"
//                 maxLength={4}
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       {formData.paymentMethod === "paypal" && (
//         <div className="space-y-4">
//           <p className="text-sm text-muted-foreground">Enter your PayPal account details to receive payment instructions.</p>
//           <div className="space-y-2">
//             <Label>PayPal Email</Label>
//             <Input
//               type="email"
//               value={formData.paypalEmail}
//               onChange={(e) => updateForm("paypalEmail", e.target.value)}
//               placeholder="your@email.com"
//             />
//           </div>
//         </div>
//       )}

//       {(formData.paymentMethod === "bank_transfer" || formData.paymentMethod === "mobile_money") && (
//         <div className="space-y-4">
//           <p className="text-sm text-muted-foreground">
//             For bank/mobile transfer, ensure details match registered account and phone.
//           </p>

//           {formData.paymentMethod === "bank_transfer" && (
//             <> 
//               <div className="space-y-2">
//                 <Label>Bank Name</Label>
//                 <Input
//                   value={formData.bankName}
//                   onChange={(e) => updateForm("bankName", e.target.value)}
//                   placeholder="CBE"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label>Account Number</Label>
//                 <Input
//                   value={formData.accountNumber}
//                   onChange={(e) => updateForm("accountNumber", e.target.value)}
//                   placeholder="1000123456789"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label>Account Holder Name (must match Full Name)</Label>
//                 <Input
//                   value={formData.accountHolderName}
//                   onChange={(e) => updateForm("accountHolderName", e.target.value)}
//                   placeholder="John Doe"
//                 />
//               </div>
//             </>
//           )}

//           {formData.paymentMethod === "mobile_money" && (
//             <>
//               <div className="space-y-2">
//                 <Label>Mobile Wallet Provider</Label>
//                 <Input
//                   value={formData.mobileWalletProvider}
//                   onChange={(e) => updateForm("mobileWalletProvider", e.target.value)}
//                   placeholder="Telebirr"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label>Registered Phone Number</Label>
//                 <Input
//                   value={formData.registeredPhoneNumber}
//                   onChange={(e) => updateForm("registeredPhoneNumber", e.target.value)}
//                   placeholder="+251911234567"
//                 />
//               </div>
//             </>
//           )}
//         </div>
//       )}

//       <div className="flex justify-between gap-3">
//         <Button variant="outline" onClick={goBack}>
//           <ArrowLeft className="mr-2 w-4 h-4" /> Back
//         </Button>
//         <Button type="submit" onClick={handleSubmit}>
//           <CheckCircle className="mr-2 w-4 h-4" /> Submit Donation
//         </Button>
//       </div>
//     </div>
//   )

//   const renderThankYou = () => (
//     <div className="space-y-8 text-center py-8">
//       <div className="flex justify-center">
//         <div className="bg-green-100 p-4 rounded-full">
//           <CheckCircle className="w-16 h-16 text-green-600" />
//         </div>
//       </div>
//       <div className="space-y-3">
//         <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
//           Thank You for Your Donation ❤️
//         </h2>
//         <p className="text-lg text-muted-foreground">
//           Your donation has been received successfully. We truly appreciate your support in helping communities and changing lives.
//         </p>
//       </div>
//       <div className="pt-4">
//         <Button onClick={resetForm} size="lg" variant="outline" className="gap-2">
//           <RotateCcw className="w-4 h-4" />
//           Make Another Donation
//         </Button>
//       </div>
//     </div>
//   )

//   if (isSubmitted) {
//     return (
//       <main
//         className="min-h-screen p-6"
//         style={{
//           backgroundImage: "radial-gradient(circle at 15% 15%, rgba(96,165,250,0.25), transparent 40%), radial-gradient(circle at 90% 30%, rgba(14,165,233,0.2), transparent 50%), linear-gradient(to bottom, #eef2ff, #f9fafb)",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//         }}
//       >
//         <div className="mx-auto max-w-4xl">
//           <Card className="shadow-2xl border border-blue-200/70 bg-white/90 backdrop-blur-sm rounded-3xl">
//             <CardContent className="p-8 rounded-3xl ring-1 ring-blue-100/30">
//               {renderThankYou()}
//             </CardContent>
//           </Card>
//         </div>
//       </main>
//     )
//   }

//   return (
//     <main
//       className="min-h-screen p-6"
//       style={{
//         backgroundImage: "radial-gradient(circle at 15% 15%, rgba(96,165,250,0.25), transparent 40%), radial-gradient(circle at 90% 30%, rgba(14,165,233,0.2), transparent 50%), linear-gradient(to bottom, #eef2ff, #f9fafb)",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       <div className="mx-auto max-w-4xl">
//         <Card className="shadow-2xl border border-blue-200/70 bg-white/90 backdrop-blur-sm rounded-3xl">
//           <CardContent className="space-y-6 p-8 rounded-3xl ring-1 ring-blue-100/30">
//             <div className="space-y-2">
//               <div className="flex items-center gap-2">
//                 {[1,2,3].map((step) => (
//                   <Badge
//                     key={step}
//                     variant={currentStep === step ? "secondary" : "outline"}
//                     className="px-3 py-1"
//                   >
//                     Step {step}
//                   </Badge>
//                 ))}
//               </div>
//               <div className="space-y-1">
//                 <p className="text-xs uppercase tracking-wide text-muted-foreground">Step {currentStep} of 3</p>
//                 <h1 className="text-3xl font-bold">Dynamic Donation Form</h1>
//                 <p className="text-muted-foreground">Step-by-step form for all payment types and methods.</p>
//               </div>
//             </div>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {currentStep === 1 && renderStep1()}
//               {currentStep === 2 && renderStep2()}
//               {currentStep === 3 && renderStep3()}
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </main>
//   )
// };

















// "use client"

// import { useState } from "react"
// import { Card, CardContent } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Badge } from "@/components/ui/badge"
// import { ArrowLeft, ArrowRight, CheckCircle, CreditCard, Building2, Globe, MapPin, Smartphone, Heart, RotateCcw, AlertCircle } from "lucide-react"

// interface DonationFormData {
//   paymentType: string
//   paymentMethod: string

//   fullName: string
//   phoneNumber: string
//   email: string

//   streetAddress: string
//   city: string
//   country: string
//   postalCode: string
//   bankName: string
//   bankAddress: string
//   accountNumber: string
//   swiftCode: string
//   paymentAmount: string
//   currency: string
//   purposeOfPayment: string
//   companyName: string
//   taxId: string
//   intermediaryBank: string

//   accountHolderName: string
//   mobileWalletProvider: string
//   registeredPhoneNumber: string

//   cardNumber: string
//   expirationDate: string
//   cvv: string
//   paypalEmail: string
// }

// export default function DonatePage() {
//   const [currentStep, setCurrentStep] = useState(1)
//   const [isSubmitted, setIsSubmitted] = useState(false)
//   const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set())
//   const [formData, setFormData] = useState<DonationFormData>({
//     paymentType: "",
//     paymentMethod: "",
//     fullName: "",
//     phoneNumber: "",
//     email: "",
//     streetAddress: "",
//     city: "",
//     country: "",
//     postalCode: "",
//     bankName: "",
//     bankAddress: "",
//     accountNumber: "",
//     swiftCode: "",
//     paymentAmount: "",
//     currency: "USD",
//     purposeOfPayment: "",
//     companyName: "",
//     taxId: "",
//     intermediaryBank: "",
//     accountHolderName: "",
//     mobileWalletProvider: "",
//     registeredPhoneNumber: "",
//     cardNumber: "",
//     expirationDate: "",
//     cvv: "",
//     paypalEmail: "",
//   })

//   const paymentTypes = [
//     { value: "international", label: "International Payments", description: "For donors outside Ethiopia", icon: Globe },
//     { value: "ethiopian", label: "Ethiopian Payments", description: "For donors in Ethiopia", icon: MapPin },
//   ]

//   const getPaymentMethods = () => {
//     if (formData.paymentType === "international") {
//       return [
//         { value: "credit_card", label: "Credit Card", icon: CreditCard },
//         { value: "paypal", label: "PayPal", icon: Building2 },
//         { value: "bank_transfer", label: "Bank Transfer", icon: Building2 },
//       ]
//     }

//     if (formData.paymentType === "ethiopian") {
//       return [
//         { value: "bank_transfer", label: "Bank Transfer", icon: Building2 },
//         { value: "mobile_money", label: "Mobile Money", icon: Smartphone },
//       ]
//     }
    

//     return []
//   }

//   const updateForm = (field: keyof DonationFormData, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }))
//     // Mark field as touched when user interacts
//     setTouchedFields(prev => new Set(prev).add(field))
//   }

//   const markFieldTouched = (field: keyof DonationFormData) => {
//     setTouchedFields(prev => new Set(prev).add(field))
//   }

//   const resetForm = () => {
//     setFormData({
//       paymentType: "",
//       paymentMethod: "",
//       fullName: "",
//       phoneNumber: "",
//       email: "",
//       streetAddress: "",
//       city: "",
//       country: "",
//       postalCode: "",
//       bankName: "",
//       bankAddress: "",
//       accountNumber: "",
//       swiftCode: "",
//       paymentAmount: "",
//       currency: "USD",
//       purposeOfPayment: "",
//       companyName: "",
//       taxId: "",
//       intermediaryBank: "",
//       accountHolderName: "",
//       mobileWalletProvider: "",
//       registeredPhoneNumber: "",
//       cardNumber: "",
//       expirationDate: "",
//       cvv: "",
//       paypalEmail: "",
//     })
//     setTouchedFields(new Set())
//     setCurrentStep(1)
//     setIsSubmitted(false)
//   }

//   // Validation functions
//   const isStep1Valid = () => {
//     return formData.paymentType !== "" && formData.paymentMethod !== ""
//   }

//   const isStep2Valid = () => {
//     if (!formData.fullName || !formData.phoneNumber) return false
    
//     if (formData.paymentType === "international") {
//       if (!formData.email) return false
//     }
    
//     if (formData.paymentType === "ethiopian" && formData.paymentMethod === "bank_transfer") {
//       if (!formData.accountHolderName || !formData.bankName || !formData.accountNumber) return false
//     }
    
//     if (formData.paymentType === "ethiopian" && formData.paymentMethod === "mobile_money") {
//       if (!formData.mobileWalletProvider || !formData.registeredPhoneNumber) return false
//     }
    
//     return true
//   }

//   const isStep3Valid = () => {
//     if (!formData.paymentAmount) return false
    
//     if (formData.paymentMethod === "credit_card") {
//       if (!formData.cardNumber || !formData.expirationDate || !formData.cvv) return false
//     }
    
//     if (formData.paymentMethod === "paypal") {
//       if (!formData.paypalEmail) return false
//     }
    
//     if (formData.paymentMethod === "bank_transfer") {
//       if (!formData.bankName || !formData.accountNumber || !formData.accountHolderName) return false
//     }
    
//     if (formData.paymentMethod === "mobile_money") {
//       if (!formData.mobileWalletProvider || !formData.registeredPhoneNumber) return false
//     }
    
//     return true
//   }

//   const goNext = () => {
//     if (currentStep === 1 && !isStep1Valid()) return
//     if (currentStep === 2 && !isStep2Valid()) return
//     setCurrentStep(prev => Math.min(prev + 1, 3))
//   }

//   const goBack = () => setCurrentStep(prev => Math.max(prev - 1, 1))

//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault()
//     if (!isStep3Valid()) {
//       // Mark all step 3 fields as touched to show errors
//       const step3Fields = ["paymentAmount"]
//       if (formData.paymentMethod === "credit_card") {
//         step3Fields.push("cardNumber", "expirationDate", "cvv")
//       }
//       if (formData.paymentMethod === "paypal") {
//         step3Fields.push("paypalEmail")
//       }
//       if (formData.paymentMethod === "bank_transfer") {
//         step3Fields.push("bankName", "accountNumber", "accountHolderName")
//       }
//       if (formData.paymentMethod === "mobile_money") {
//         step3Fields.push("mobileWalletProvider", "registeredPhoneNumber")
//       }
//       setTouchedFields(prev => new Set([...prev, ...step3Fields]))
//       return
//     }
//     console.log("Donation form submitted", formData)
//     setIsSubmitted(true)
//   }

//   const RequiredStar = () => <span className="text-red-500 ml-0.5">*</span>

//   const ErrorMessage = ({ field }: { field: string }) => {
//     const isInvalid = touchedFields.has(field) && !formData[field as keyof DonationFormData]
//     if (!isInvalid) return null
//     return (
//       <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
//         <AlertCircle className="w-3 h-3" />
//         This field is required
//       </p>
//     )
//   }

//   const renderStep1 = () => (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-2xl font-bold">Select Payment Method</h2>
//         <p className="text-sm text-muted-foreground">Choose how you would like to make your donation</p>
//       </div>

//       <div className="space-y-4">
//         <Label className="font-medium">
//           Payment Type <RequiredStar />
//         </Label>
//         <RadioGroup 
//           value={formData.paymentType} 
//           onValueChange={(value) => updateForm("paymentType", value)}
//         >
//           <div className="grid gap-3">
//             {paymentTypes.map((type) => (
//               <div key={type.value}>
//                 <RadioGroupItem value={type.value} id={type.value} className="peer sr-only" />
//                 <Label
//                   htmlFor={type.value}
//                   className={`flex p-4 border rounded-lg cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 ${
//                     touchedFields.has("paymentType") && !formData.paymentType ? "border-red-500 bg-red-50/50" : ""
//                   }`}
//                 >
//                   <type.icon className="h-6 w-6" />
//                   <div className="ml-3">
//                     <p className="font-medium">{type.label}</p>
//                     <p className="text-sm text-muted-foreground">{type.description}</p>
//                   </div>
//                 </Label>
//               </div>
//             ))}
//           </div>
//         </RadioGroup>
//         <ErrorMessage field="paymentType" />
//       </div>

//       {formData.paymentType && (
//         <div className="space-y-4">
//           <Label className="font-medium">
//             Payment Method <RequiredStar />
//           </Label>
//           <Select 
//             value={formData.paymentMethod} 
//             onValueChange={(value) => updateForm("paymentMethod", value)}
//             onOpenChange={() => markFieldTouched("paymentMethod")}
//           >
//             <SelectTrigger className={touchedFields.has("paymentMethod") && !formData.paymentMethod ? "border-red-500" : ""}>
//               <SelectValue placeholder="Select method" />
//             </SelectTrigger>
//             <SelectContent>
//               {getPaymentMethods().map((method) => (
//                 <SelectItem key={method.value} value={method.value}>
//                   {method.label}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//           <ErrorMessage field="paymentMethod" />
//         </div>
//       )}

//       <div className="flex justify-end gap-3">
//         <Button onClick={goNext} size="lg" disabled={!isStep1Valid()}>
//           Next <ArrowRight className="ml-2 w-4 h-4" />
//         </Button>
//       </div>
//     </div>
//   )

//   const renderStep2 = () => (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-2xl font-bold">Donation Details</h2>
//         <p className="text-sm text-muted-foreground">
//           Provide your donor information based on the selected payment type and method.
//         </p>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//         <div className="rounded-lg border border-border bg-secondary p-3">
//           <p className="text-xs uppercase text-muted-foreground">Payment Type</p>
//           <p className="font-semibold">{formData.paymentType || "Not selected"}</p>
//         </div>
//         <div className="rounded-lg border border-border bg-secondary p-3">
//           <p className="text-xs uppercase text-muted-foreground">Payment Method</p>
//           <p className="font-semibold">{formData.paymentMethod || "Not selected"}</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <Label>
//             Full Name {formData.paymentType === "international" ? "(as on bank account)" : "(as registered on bank/mobile account)"}
//             <RequiredStar />
//           </Label>
//           <Input
//             value={formData.fullName}
//             onChange={(e) => updateForm("fullName", e.target.value)}
//             onBlur={() => markFieldTouched("fullName")}
//             placeholder="John Doe"
//             className={touchedFields.has("fullName") && !formData.fullName ? "border-red-500" : ""}
//           />
//           <ErrorMessage field="fullName" />
//         </div>
//         <div className="space-y-2">
//           <Label>
//             Phone Number <RequiredStar />
//           </Label>
//           <Input
//             value={formData.phoneNumber}
//             onChange={(e) => updateForm("phoneNumber", e.target.value)}
//             onBlur={() => markFieldTouched("phoneNumber")}
//             placeholder={formData.paymentType === "ethiopian" ? "+251911234567" : "+1 555 123 4567"}
//             className={touchedFields.has("phoneNumber") && !formData.phoneNumber ? "border-red-500" : ""}
//           />
//           <ErrorMessage field="phoneNumber" />
//         </div>
//       </div>

//       {formData.paymentType === "international" && (
//         <>
//           <div className="space-y-2">
//             <Label>
//               Email Address <RequiredStar />
//             </Label>
//             <Input
//               type="email"
//               value={formData.email}
//               onChange={(e) => updateForm("email", e.target.value)}
//               onBlur={() => markFieldTouched("email")}
//               placeholder="your@email.com"
//               className={touchedFields.has("email") && !formData.email ? "border-red-500" : ""}
//             />
//             <ErrorMessage field="email" />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label>Street</Label>
//               <Input
//                 value={formData.streetAddress}
//                 onChange={(e) => updateForm("streetAddress", e.target.value)}
//                 placeholder="123 Main St"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>City</Label>
//               <Input
//                 value={formData.city}
//                 onChange={(e) => updateForm("city", e.target.value)}
//                 placeholder="New York"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>Country</Label>
//               <Input
//                 value={formData.country}
//                 onChange={(e) => updateForm("country", e.target.value)}
//                 placeholder="USA"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>Postal Code</Label>
//               <Input
//                 value={formData.postalCode}
//                 onChange={(e) => updateForm("postalCode", e.target.value)}
//                 placeholder="10001"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label>Bank Name</Label>
//               <Input
//                 value={formData.bankName}
//                 onChange={(e) => updateForm("bankName", e.target.value)}
//                 placeholder="Bank of America"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>Account Number / IBAN</Label>
//               <Input
//                 value={formData.accountNumber}
//                 onChange={(e) => updateForm("accountNumber", e.target.value)}
//                 placeholder="GB29NWBK60161331926819"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label>SWIFT/BIC Code</Label>
//               <Input
//                 value={formData.swiftCode}
//                 onChange={(e) => updateForm("swiftCode", e.target.value)}
//                 placeholder="NWBKGB2L"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>Bank Address (Optional)</Label>
//               <Input
//                 value={formData.bankAddress}
//                 onChange={(e) => updateForm("bankAddress", e.target.value)}
//                 placeholder="123 Bank St"
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label>Purpose of Payment</Label>
//             <Input
//               value={formData.purposeOfPayment}
//               onChange={(e) => updateForm("purposeOfPayment", e.target.value)}
//               placeholder="Donation for education program"
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label>Company Name (Optional)</Label>
//               <Input
//                 value={formData.companyName}
//                 onChange={(e) => updateForm("companyName", e.target.value)}
//                 placeholder="Company, LLC"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>Tax ID / National ID (Optional)</Label>
//               <Input
//                 value={formData.taxId}
//                 onChange={(e) => updateForm("taxId", e.target.value)}
//                 placeholder="123456789"
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label>Intermediary Bank Details (Optional)</Label>
//             <Textarea
//               value={formData.intermediaryBank}
//               onChange={(e) => updateForm("intermediaryBank", e.target.value)}
//               placeholder="JP Morgan Chase"
//               rows={3}
//             />
//           </div>
//         </>
//       )}

//       {formData.paymentType === "ethiopian" && formData.paymentMethod === "bank_transfer" && (
//         <>
//           <div className="space-y-2">
//             <Label>
//               Account Holder Name <RequiredStar />
//             </Label>
//             <Input
//               value={formData.accountHolderName}
//               onChange={(e) => updateForm("accountHolderName", e.target.value)}
//               onBlur={() => markFieldTouched("accountHolderName")}
//               placeholder="John Doe"
//               className={touchedFields.has("accountHolderName") && !formData.accountHolderName ? "border-red-500" : ""}
//             />
//             <ErrorMessage field="accountHolderName" />
//           </div>
//           <div className="space-y-2">
//             <Label>
//               Bank Name <RequiredStar />
//             </Label>
//             <Input
//               value={formData.bankName}
//               onChange={(e) => updateForm("bankName", e.target.value)}
//               onBlur={() => markFieldTouched("bankName")}
//               placeholder="CBE"
//               className={touchedFields.has("bankName") && !formData.bankName ? "border-red-500" : ""}
//             />
//             <ErrorMessage field="bankName" />
//           </div>
//           <div className="space-y-2">
//             <Label>
//               Account Number <RequiredStar />
//             </Label>
//             <Input
//               value={formData.accountNumber}
//               onChange={(e) => updateForm("accountNumber", e.target.value)}
//               onBlur={() => markFieldTouched("accountNumber")}
//               placeholder="1000123456789"
//               className={touchedFields.has("accountNumber") && !formData.accountNumber ? "border-red-500" : ""}
//             />
//             <ErrorMessage field="accountNumber" />
//           </div>
//         </>
//       )}

//       {formData.paymentType === "ethiopian" && formData.paymentMethod === "mobile_money" && (
//         <>
//           <div className="space-y-2">
//             <Label>
//               Mobile Wallet Provider <RequiredStar />
//             </Label>
//             <Select 
//               value={formData.mobileWalletProvider} 
//               onValueChange={(value) => updateForm("mobileWalletProvider", value)}
//               onOpenChange={() => markFieldTouched("mobileWalletProvider")}
//             >
//               <SelectTrigger className={touchedFields.has("mobileWalletProvider") && !formData.mobileWalletProvider ? "border-red-500" : ""}>
//                 <SelectValue placeholder="Select provider" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="telebirr">Telebirr</SelectItem>
//                 <SelectItem value="cbe_mobile">CBE Mobile</SelectItem>
//                 <SelectItem value="other">Other</SelectItem>
//               </SelectContent>
//             </Select>
//             <ErrorMessage field="mobileWalletProvider" />
//           </div>
//           <div className="space-y-2">
//             <Label>
//               Registered Phone Number <RequiredStar />
//             </Label>
//             <Input
//               value={formData.registeredPhoneNumber}
//               onChange={(e) => updateForm("registeredPhoneNumber", e.target.value)}
//               onBlur={() => markFieldTouched("registeredPhoneNumber")}
//               placeholder="+251911234567"
//               className={touchedFields.has("registeredPhoneNumber") && !formData.registeredPhoneNumber ? "border-red-500" : ""}
//             />
//             <ErrorMessage field="registeredPhoneNumber" />
//           </div>
//         </>
//       )}

//       <div className="flex justify-between gap-3">
//         <Button variant="outline" onClick={goBack}>
//           <ArrowLeft className="mr-2 w-4 h-4" /> Back
//         </Button>
//         <Button onClick={goNext} disabled={!isStep2Valid()}>
//           Next <ArrowRight className="ml-2 w-4 h-4" />
//         </Button>
//       </div>
//     </div>
//   )

//   const renderStep3 = () => (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-2xl font-bold">Payment Details</h2>
//         <p className="text-sm text-muted-foreground">Enter payment-specific fields according to selected method</p>
//       </div>

//       <div className="space-y-4">
//         <div className="space-y-2">
//           <Label>
//             Payment Amount <RequiredStar />
//           </Label>
//           <Input
//             type="number"
//             value={formData.paymentAmount}
//             onChange={(e) => updateForm("paymentAmount", e.target.value)}
//             onBlur={() => markFieldTouched("paymentAmount")}
//             placeholder="100.00"
//             className={touchedFields.has("paymentAmount") && !formData.paymentAmount ? "border-red-500" : ""}
//           />
//           <ErrorMessage field="paymentAmount" />
//         </div>

//         <div className="space-y-2">
//           <Label>Currency</Label>
//           <Select value={formData.currency} onValueChange={(value) => updateForm("currency", value)}>
//             <SelectTrigger>
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="USD">USD</SelectItem>
//               <SelectItem value="EUR">EUR</SelectItem>
//               <SelectItem value="ETB">ETB</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       {formData.paymentMethod === "credit_card" && (
//         <div className="space-y-4">
//           <p className="text-sm text-muted-foreground">Enter your card details. Card must be in donor name.</p>
//           <div className="space-y-2">
//             <Label>
//               Card Number <RequiredStar />
//             </Label>
//             <Input
//               value={formData.cardNumber}
//               onChange={(e) => updateForm("cardNumber", e.target.value)}
//               onBlur={() => markFieldTouched("cardNumber")}
//               placeholder="1234 5678 9012 3456"
//               maxLength={19}
//               className={touchedFields.has("cardNumber") && !formData.cardNumber ? "border-red-500" : ""}
//             />
//             <ErrorMessage field="cardNumber" />
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label>
//                 Expiration Date <RequiredStar />
//               </Label>
//               <Input
//                 value={formData.expirationDate}
//                 onChange={(e) => updateForm("expirationDate", e.target.value)}
//                 onBlur={() => markFieldTouched("expirationDate")}
//                 placeholder="MM/YY"
//                 maxLength={5}
//                 className={touchedFields.has("expirationDate") && !formData.expirationDate ? "border-red-500" : ""}
//               />
//               <ErrorMessage field="expirationDate" />
//             </div>
//             <div className="space-y-2">
//               <Label>
//                 CVV <RequiredStar />
//               </Label>
//               <Input
//                 value={formData.cvv}
//                 onChange={(e) => updateForm("cvv", e.target.value)}
//                 onBlur={() => markFieldTouched("cvv")}
//                 placeholder="123"
//                 maxLength={4}
//                 className={touchedFields.has("cvv") && !formData.cvv ? "border-red-500" : ""}
//               />
//               <ErrorMessage field="cvv" />
//             </div>
//           </div>
//         </div>
//       )}

//       {formData.paymentMethod === "paypal" && (
//         <div className="space-y-4">
//           <p className="text-sm text-muted-foreground">Enter your PayPal account details to receive payment instructions.</p>
//           <div className="space-y-2">
//             <Label>
//               PayPal Email <RequiredStar />
//             </Label>
//             <Input
//               type="email"
//               value={formData.paypalEmail}
//               onChange={(e) => updateForm("paypalEmail", e.target.value)}
//               onBlur={() => markFieldTouched("paypalEmail")}
//               placeholder="your@email.com"
//               className={touchedFields.has("paypalEmail") && !formData.paypalEmail ? "border-red-500" : ""}
//             />
//             <ErrorMessage field="paypalEmail" />
//           </div>
//         </div>
//       )}

//       {(formData.paymentMethod === "bank_transfer" || formData.paymentMethod === "mobile_money") && (
//         <div className="space-y-4">
//           <p className="text-sm text-muted-foreground">
//             For bank/mobile transfer, ensure details match registered account and phone.
//           </p>

//           {formData.paymentMethod === "bank_transfer" && (
//             <> 
//               <div className="space-y-2">
//                 <Label>
//                   Bank Name <RequiredStar />
//                 </Label>
//                 <Input
//                   value={formData.bankName}
//                   onChange={(e) => updateForm("bankName", e.target.value)}
//                   onBlur={() => markFieldTouched("bankName")}
//                   placeholder="CBE"
//                   className={touchedFields.has("bankName") && !formData.bankName ? "border-red-500" : ""}
//                 />
//                 <ErrorMessage field="bankName" />
//               </div>
//               <div className="space-y-2">
//                 <Label>
//                   Account Number <RequiredStar />
//                 </Label>
//                 <Input
//                   value={formData.accountNumber}
//                   onChange={(e) => updateForm("accountNumber", e.target.value)}
//                   onBlur={() => markFieldTouched("accountNumber")}
//                   placeholder="1000123456789"
//                   className={touchedFields.has("accountNumber") && !formData.accountNumber ? "border-red-500" : ""}
//                 />
//                 <ErrorMessage field="accountNumber" />
//               </div>
//               <div className="space-y-2">
//                 <Label>
//                   Account Holder Name <RequiredStar />
//                 </Label>
//                 <Input
//                   value={formData.accountHolderName}
//                   onChange={(e) => updateForm("accountHolderName", e.target.value)}
//                   onBlur={() => markFieldTouched("accountHolderName")}
//                   placeholder="John Doe"
//                   className={touchedFields.has("accountHolderName") && !formData.accountHolderName ? "border-red-500" : ""}
//                 />
//                 <ErrorMessage field="accountHolderName" />
//               </div>
//             </>
//           )}

//           {formData.paymentMethod === "mobile_money" && (
//             <>
//               <div className="space-y-2">
//                 <Label>
//                   Mobile Wallet Provider <RequiredStar />
//                 </Label>
//                 <Input
//                   value={formData.mobileWalletProvider}
//                   onChange={(e) => updateForm("mobileWalletProvider", e.target.value)}
//                   onBlur={() => markFieldTouched("mobileWalletProvider")}
//                   placeholder="Telebirr"
//                   className={touchedFields.has("mobileWalletProvider") && !formData.mobileWalletProvider ? "border-red-500" : ""}
//                 />
//                 <ErrorMessage field="mobileWalletProvider" />
//               </div>
//               <div className="space-y-2">
//                 <Label>
//                   Registered Phone Number <RequiredStar />
//                 </Label>
//                 <Input
//                   value={formData.registeredPhoneNumber}
//                   onChange={(e) => updateForm("registeredPhoneNumber", e.target.value)}
//                   onBlur={() => markFieldTouched("registeredPhoneNumber")}
//                   placeholder="+251911234567"
//                   className={touchedFields.has("registeredPhoneNumber") && !formData.registeredPhoneNumber ? "border-red-500" : ""}
//                 />
//                 <ErrorMessage field="registeredPhoneNumber" />
//               </div>
//             </>
//           )}
//         </div>
//       )}

//       <div className="flex justify-between gap-3">
//         <Button variant="outline" onClick={goBack}>
//           <ArrowLeft className="mr-2 w-4 h-4" /> Back
//         </Button>
//         <Button type="submit" onClick={handleSubmit}>
//           <CheckCircle className="mr-2 w-4 h-4" /> Submit Donation
//         </Button>
//       </div>
//     </div>
//   )

//   const renderThankYou = () => (
//     <div className="space-y-8 text-center py-8">
//       <div className="flex justify-center">
//         <div className="bg-green-100 p-4 rounded-full">
//           <CheckCircle className="w-16 h-16 text-green-600" />
//         </div>
//       </div>
//       <div className="space-y-3">
//         <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
//           Thank You for Your Donation ❤️
//         </h2>
//         <p className="text-lg text-muted-foreground">
//           Your donation has been received successfully. We truly appreciate your support in helping communities and changing lives.
//         </p>
//       </div>
//       <div className="pt-4">
//         <Button onClick={resetForm} size="lg" variant="outline" className="gap-2">
//           <RotateCcw className="w-4 h-4" />
//           Make Another Donation
//         </Button>
//       </div>
//     </div>
//   )

//   if (isSubmitted) {
//     return (
//       <main
//         className="min-h-screen p-6"
//         style={{
//           backgroundImage: "radial-gradient(circle at 15% 15%, rgba(96,165,250,0.25), transparent 40%), radial-gradient(circle at 90% 30%, rgba(14,165,233,0.2), transparent 50%), linear-gradient(to bottom, #eef2ff, #f9fafb)",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//         }}
//       >
//         <div className="mx-auto max-w-4xl">
//           <Card className="shadow-2xl border border-blue-200/70 bg-white/90 backdrop-blur-sm rounded-3xl">
//             <CardContent className="p-8 rounded-3xl ring-1 ring-blue-100/30">
//               {renderThankYou()}
//             </CardContent>
//           </Card>
//         </div>
//       </main>
//     )
//   }

//   return (
//     <main
//       className="min-h-screen p-6"
//       style={{
//         backgroundImage: "radial-gradient(circle at 15% 15%, rgba(96,165,250,0.25), transparent 40%), radial-gradient(circle at 90% 30%, rgba(14,165,233,0.2), transparent 50%), linear-gradient(to bottom, #eef2ff, #f9fafb)",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       <div className="mx-auto max-w-4xl">
//         <Card className="shadow-2xl border border-blue-200/70 bg-white/90 backdrop-blur-sm rounded-3xl">
//           <CardContent className="space-y-6 p-8 rounded-3xl ring-1 ring-blue-100/30">
//             <div className="space-y-2">
//               <div className="flex items-center gap-2">
//                 {[1,2,3].map((step) => (
//                   <Badge
//                     key={step}
//                     variant={currentStep === step ? "secondary" : "outline"}
//                     className="px-3 py-1"
//                   >
//                     Step {step}
//                   </Badge>
//                 ))}
//               </div>
//               <div className="space-y-1">
//                 <p className="text-xs uppercase tracking-wide text-muted-foreground">Step {currentStep} of 3</p>
//                 <h1 className="text-3xl font-bold">Dynamic Donation Form</h1>
//                 <p className="text-muted-foreground">Step-by-step form for all payment types and methods.</p>
//               </div>
//             </div>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {currentStep === 1 && renderStep1()}
//               {currentStep === 2 && renderStep2()}
//               {currentStep === 3 && renderStep3()}
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </main>
//   )
// };









// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Card, CardContent } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Badge } from "@/components/ui/badge"
// import { ArrowLeft, ArrowRight, CheckCircle, CreditCard, Building2, Globe, MapPin, Smartphone, Heart, RotateCcw, AlertCircle, Loader2 } from "lucide-react"
// import { createClient } from "@/lib/supabase/client"

// interface DonationFormData {
//   paymentType: string
//   paymentMethod: string

//   fullName: string
//   phoneNumber: string
//   email: string

//   streetAddress: string
//   city: string
//   country: string
//   postalCode: string
//   bankName: string
//   bankAddress: string
//   accountNumber: string
//   swiftCode: string
//   paymentAmount: string
//   currency: string
//   purposeOfPayment: string
//   companyName: string
//   taxId: string
//   intermediaryBank: string

//   accountHolderName: string
//   mobileWalletProvider: string
//   registeredPhoneNumber: string

//   cardNumber: string
//   expirationDate: string
//   cvv: string
//   paypalEmail: string
  
//   program: string
//   frequency: string
// }

// export default function DonatePage() {
//   const router = useRouter()
//   const [currentStep, setCurrentStep] = useState(1)
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set())
//   const [formData, setFormData] = useState<DonationFormData>({
//     paymentType: "",
//     paymentMethod: "",
//     fullName: "",
//     phoneNumber: "",
//     email: "",
//     streetAddress: "",
//     city: "",
//     country: "",
//     postalCode: "",
//     bankName: "",
//     bankAddress: "",
//     accountNumber: "",
//     swiftCode: "",
//     paymentAmount: "",
//     currency: "USD",
//     purposeOfPayment: "",
//     companyName: "",
//     taxId: "",
//     intermediaryBank: "",
//     accountHolderName: "",
//     mobileWalletProvider: "",
//     registeredPhoneNumber: "",
//     cardNumber: "",
//     expirationDate: "",
//     cvv: "",
//     paypalEmail: "",
//     program: "community",
//     frequency: "one-time",
//   })

//   const paymentTypes = [
//     { value: "international", label: "International Payments", description: "For donors outside Ethiopia", icon: Globe },
//     { value: "ethiopian", label: "Ethiopian Payments", description: "For donors in Ethiopia", icon: MapPin },
//   ]

//   const programs = [
//     { value: "children", label: "Children's Education" },
//     { value: "clean water", label: "Clean Water" },
//     { value: "women", label: "Women Empowerment" },
//     { value: "community", label: "Community Development" },
//   ]

//   const getPaymentMethods = () => {
//     if (formData.paymentType === "international") {
//       return [
//         { value: "credit_card", label: "Credit Card", icon: CreditCard },
//         { value: "paypal", label: "PayPal", icon: Building2 },
//         { value: "bank_transfer", label: "Bank Transfer", icon: Building2 },
//       ]
//     }

//     if (formData.paymentType === "ethiopian") {
//       return [
//         { value: "bank_transfer", label: "Bank Transfer", icon: Building2 },
//         { value: "mobile_money", label: "Mobile Money", icon: Smartphone },
//       ]
//     }
    
//     return []
//   }

//   const updateForm = (field: keyof DonationFormData, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }))
//     setTouchedFields(prev => new Set(prev).add(field))
//   }

//   const markFieldTouched = (field: keyof DonationFormData) => {
//     setTouchedFields(prev => new Set(prev).add(field))
//   }

//   // Validation functions
//   const isStep1Valid = () => {
//     return formData.paymentType !== "" && formData.paymentMethod !== ""
//   }

//   const isStep2Valid = () => {
//     if (!formData.fullName || !formData.phoneNumber) return false
    
//     if (formData.paymentType === "international") {
//       if (!formData.email) return false
//     }
    
//     if (formData.paymentType === "ethiopian" && formData.paymentMethod === "bank_transfer") {
//       if (!formData.accountHolderName || !formData.bankName || !formData.accountNumber) return false
//     }
    
//     if (formData.paymentType === "ethiopian" && formData.paymentMethod === "mobile_money") {
//       if (!formData.mobileWalletProvider || !formData.registeredPhoneNumber) return false
//     }
    
//     return true
//   }

//   const isStep3Valid = () => {
//     if (!formData.paymentAmount) return false
    
//     if (formData.paymentMethod === "credit_card") {
//       if (!formData.cardNumber || !formData.expirationDate || !formData.cvv) return false
//     }
    
//     if (formData.paymentMethod === "paypal") {
//       if (!formData.paypalEmail) return false
//     }
    
//     if (formData.paymentMethod === "bank_transfer") {
//       if (!formData.bankName || !formData.accountNumber || !formData.accountHolderName) return false
//     }
    
//     if (formData.paymentMethod === "mobile_money") {
//       if (!formData.mobileWalletProvider || !formData.registeredPhoneNumber) return false
//     }
    
//     return true
//   }

//   const goNext = () => {
//     if (currentStep === 1 && !isStep1Valid()) return
//     if (currentStep === 2 && !isStep2Valid()) return
//     setCurrentStep(prev => Math.min(prev + 1, 3))
//   }

//   const goBack = () => setCurrentStep(prev => Math.max(prev - 1, 1))

//   // Save donation to Supabase
//   const saveDonationToDatabase = async () => {
//     try {
//       const supabase = createClient()
      
//       const { data: { user } } = await supabase.auth.getUser()
      
//       // Prepare notes with all payment details
//       const notes = `
// Payment Type: ${formData.paymentType}
// Payment Method: ${formData.paymentMethod}
// ${formData.purposeOfPayment ? `Purpose: ${formData.purposeOfPayment}` : ''}
// ${formData.companyName ? `Company: ${formData.companyName}` : ''}
// ${formData.taxId ? `Tax ID: ${formData.taxId}` : ''}
// ${formData.swiftCode ? `SWIFT Code: ${formData.swiftCode}` : ''}
// ${formData.intermediaryBank ? `Intermediary Bank: ${formData.intermediaryBank}` : ''}
//       `.trim()
      
//       const donationRecord = {
//         donor_name: formData.fullName,
//         donor_email: formData.email || null,
//         amount: parseFloat(formData.paymentAmount),
//         program: formData.program,
//         frequency: formData.frequency,
//         external_tx_id: `DON-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
//         notes: notes,
//         user_id: user?.id || null,
//       }
      
//       console.log("Saving to database:", donationRecord)
      
//       const { data: result, error } = await supabase
//         .from("donations")
//         .insert(donationRecord)
//         .select()
      
//       if (error) {
//         console.error("Error saving to Supabase:", error)
//         throw error
//       }
      
//       console.log("Donation saved to Supabase successfully:", result)
//       return donationRecord.external_tx_id
//     } catch (error) {
//       console.error("Error in saveDonationToDatabase:", error)
//       throw error
//     }
//   }
  
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
      
//       if (!response.ok) {
//         console.error("Failed to send email")
//         return false
//       }
      
//       return true
//     } catch (error) {
//       console.error("Error sending email:", error)
//       return false
//     }
//   }

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault()
    
//     if (!isStep3Valid()) {
//       const step3Fields = ["paymentAmount"]
//       if (formData.paymentMethod === "credit_card") {
//         step3Fields.push("cardNumber", "expirationDate", "cvv")
//       }
//       if (formData.paymentMethod === "paypal") {
//         step3Fields.push("paypalEmail")
//       }
//       if (formData.paymentMethod === "bank_transfer") {
//         step3Fields.push("bankName", "accountNumber", "accountHolderName")
//       }
//       if (formData.paymentMethod === "mobile_money") {
//         step3Fields.push("mobileWalletProvider", "registeredPhoneNumber")
//       }
//       setTouchedFields(prev => new Set([...prev, ...step3Fields]))
//       return
//     }
    
//     setIsSubmitting(true)
    
//     try {
//       // Save to database
//       const transactionId = await saveDonationToDatabase()
      
//       // Send thank you email if email exists
//       if (formData.email) {
//         await sendThankYouEmail({
//           email: formData.email,
//           name: formData.fullName,
//           amount: parseFloat(formData.paymentAmount),
//           currency: formData.currency,
//           program: programs.find(p => p.value === formData.program)?.label || formData.program,
//           donationId: transactionId.slice(0, 8),
//           paymentMethod: getPaymentMethods().find(m => m.value === formData.paymentMethod)?.label || formData.paymentMethod,
//           frequency: formData.frequency,
//         })
//       }
      
//       // Redirect to success page with all data
//       const params = new URLSearchParams({
//         id: transactionId,
//         amount: formData.paymentAmount,
//         method: formData.paymentMethod,
//         cause: formData.program,
//         email: formData.email || "",
//         name: formData.fullName,
//         phone: formData.phoneNumber,
//         address: `${formData.streetAddress}, ${formData.city}, ${formData.country}, ${formData.postalCode}`,
//         frequency: formData.frequency,
//       })
      
//       router.push(`/donation-success?${params.toString()}`)
//     } catch (error) {
//       console.error("Error submitting donation:", error)
//       alert("There was an error processing your donation. Please try again or contact support.")
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const RequiredStar = () => <span className="text-red-500 ml-0.5">*</span>

//   const ErrorMessage = ({ field }: { field: string }) => {
//     const isInvalid = touchedFields.has(field) && !formData[field as keyof DonationFormData]
//     if (!isInvalid) return null
//     return (
//       <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
//         <AlertCircle className="w-3 h-3" />
//         This field is required
//       </p>
//     )
//   }

//   const renderStep1 = () => (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-2xl font-bold">Select Payment Method</h2>
//         <p className="text-sm text-muted-foreground">Choose how you would like to make your donation</p>
//       </div>

//       <div className="space-y-4">
//         <Label className="font-medium">
//           Payment Type <RequiredStar />
//         </Label>
//         <RadioGroup 
//           value={formData.paymentType} 
//           onValueChange={(value) => updateForm("paymentType", value)}
//         >
//           <div className="grid gap-3">
//             {paymentTypes.map((type) => (
//               <div key={type.value}>
//                 <RadioGroupItem value={type.value} id={type.value} className="peer sr-only" />
//                 <Label
//                   htmlFor={type.value}
//                   className={`flex p-4 border rounded-lg cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 ${
//                     touchedFields.has("paymentType") && !formData.paymentType ? "border-red-500 bg-red-50/50" : ""
//                   }`}
//                 >
//                   <type.icon className="h-6 w-6" />
//                   <div className="ml-3">
//                     <p className="font-medium">{type.label}</p>
//                     <p className="text-sm text-muted-foreground">{type.description}</p>
//                   </div>
//                 </Label>
//               </div>
//             ))}
//           </div>
//         </RadioGroup>
//         <ErrorMessage field="paymentType" />
//       </div>

//       {formData.paymentType && (
//         <div className="space-y-4">
//           <Label className="font-medium">
//             Payment Method <RequiredStar />
//           </Label>
//           <Select 
//             value={formData.paymentMethod} 
//             onValueChange={(value) => updateForm("paymentMethod", value)}
//             onOpenChange={() => markFieldTouched("paymentMethod")}
//           >
//             <SelectTrigger className={touchedFields.has("paymentMethod") && !formData.paymentMethod ? "border-red-500" : ""}>
//               <SelectValue placeholder="Select method" />
//             </SelectTrigger>
//             <SelectContent>
//               {getPaymentMethods().map((method) => (
//                 <SelectItem key={method.value} value={method.value}>
//                   {method.label}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//           <ErrorMessage field="paymentMethod" />
//         </div>
//       )}

//       <div className="flex justify-end gap-3">
//         <Button onClick={goNext} size="lg" disabled={!isStep1Valid()}>
//           Next <ArrowRight className="ml-2 w-4 h-4" />
//         </Button>
//       </div>
//     </div>
//   )

//   const renderStep2 = () => (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-2xl font-bold">Donation Details</h2>
//         <p className="text-sm text-muted-foreground">
//           Provide your donor information based on the selected payment type and method.
//         </p>
//       </div>
      
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//         <div className="rounded-lg border border-border bg-secondary p-3">
//           <p className="text-xs uppercase text-muted-foreground">Payment Type</p>
//           <p className="font-semibold">{formData.paymentType || "Not selected"}</p>
//         </div>
//         <div className="rounded-lg border border-border bg-secondary p-3">
//           <p className="text-xs uppercase text-muted-foreground">Payment Method</p>
//           <p className="font-semibold">{formData.paymentMethod || "Not selected"}</p>
//         </div>
//       </div>

//       <div className="space-y-2">
//         <Label>
//           Select Program <RequiredStar />
//         </Label>
//         <Select 
//           value={formData.program} 
//           onValueChange={(value) => updateForm("program", value)}
//         >
//           <SelectTrigger>
//             <SelectValue placeholder="Select a program to support" />
//           </SelectTrigger>
//           <SelectContent>
//             {programs.map((program) => (
//               <SelectItem key={program.value} value={program.value}>
//                 {program.label}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>

//       <div className="space-y-2">
//         <Label>
//           Donation Frequency <RequiredStar />
//         </Label>
//         <RadioGroup 
//           value={formData.frequency} 
//           onValueChange={(value) => updateForm("frequency", value)}
//           className="flex gap-4"
//         >
//           <div className="flex items-center space-x-2">
//             <RadioGroupItem value="one-time" id="one-time" />
//             <Label htmlFor="one-time">One-time</Label>
//           </div>
//           <div className="flex items-center space-x-2">
//             <RadioGroupItem value="monthly" id="monthly" />
//             <Label htmlFor="monthly">Monthly</Label>
//           </div>
//         </RadioGroup>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <Label>
//             Full Name <RequiredStar />
//           </Label>
//           <Input
//             value={formData.fullName}
//             onChange={(e) => updateForm("fullName", e.target.value)}
//             onBlur={() => markFieldTouched("fullName")}
//             placeholder="John Doe"
//             className={touchedFields.has("fullName") && !formData.fullName ? "border-red-500" : ""}
//           />
//           <ErrorMessage field="fullName" />
//         </div>
//         <div className="space-y-2">
//           <Label>
//             Phone Number <RequiredStar />
//           </Label>
//           <Input
//             value={formData.phoneNumber}
//             onChange={(e) => updateForm("phoneNumber", e.target.value)}
//             onBlur={() => markFieldTouched("phoneNumber")}
//             placeholder={formData.paymentType === "ethiopian" ? "+251911234567" : "+1 555 123 4567"}
//             className={touchedFields.has("phoneNumber") && !formData.phoneNumber ? "border-red-500" : ""}
//           />
//           <ErrorMessage field="phoneNumber" />
//         </div>
//       </div>

//       {formData.paymentType === "international" && (
//         <>
//           <div className="space-y-2">
//             <Label>
//               Email Address <RequiredStar />
//             </Label>
//             <Input
//               type="email"
//               value={formData.email}
//               onChange={(e) => updateForm("email", e.target.value)}
//               onBlur={() => markFieldTouched("email")}
//               placeholder="your@email.com"
//               className={touchedFields.has("email") && !formData.email ? "border-red-500" : ""}
//             />
//             <ErrorMessage field="email" />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label>Street Address</Label>
//               <Input
//                 value={formData.streetAddress}
//                 onChange={(e) => updateForm("streetAddress", e.target.value)}
//                 placeholder="123 Main St"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>City</Label>
//               <Input
//                 value={formData.city}
//                 onChange={(e) => updateForm("city", e.target.value)}
//                 placeholder="New York"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>Country</Label>
//               <Input
//                 value={formData.country}
//                 onChange={(e) => updateForm("country", e.target.value)}
//                 placeholder="USA"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>Postal Code</Label>
//               <Input
//                 value={formData.postalCode}
//                 onChange={(e) => updateForm("postalCode", e.target.value)}
//                 placeholder="10001"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label>Bank Name</Label>
//               <Input
//                 value={formData.bankName}
//                 onChange={(e) => updateForm("bankName", e.target.value)}
//                 placeholder="Bank of America"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>Account Number / IBAN</Label>
//               <Input
//                 value={formData.accountNumber}
//                 onChange={(e) => updateForm("accountNumber", e.target.value)}
//                 placeholder="GB29NWBK60161331926819"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label>SWIFT/BIC Code</Label>
//               <Input
//                 value={formData.swiftCode}
//                 onChange={(e) => updateForm("swiftCode", e.target.value)}
//                 placeholder="NWBKGB2L"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>Bank Address (Optional)</Label>
//               <Input
//                 value={formData.bankAddress}
//                 onChange={(e) => updateForm("bankAddress", e.target.value)}
//                 placeholder="123 Bank St"
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label>Purpose of Payment</Label>
//             <Input
//               value={formData.purposeOfPayment}
//               onChange={(e) => updateForm("purposeOfPayment", e.target.value)}
//               placeholder="Donation for education program"
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label>Company Name (Optional)</Label>
//               <Input
//                 value={formData.companyName}
//                 onChange={(e) => updateForm("companyName", e.target.value)}
//                 placeholder="Company, LLC"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>Tax ID / National ID (Optional)</Label>
//               <Input
//                 value={formData.taxId}
//                 onChange={(e) => updateForm("taxId", e.target.value)}
//                 placeholder="123456789"
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label>Intermediary Bank Details (Optional)</Label>
//             <Textarea
//               value={formData.intermediaryBank}
//               onChange={(e) => updateForm("intermediaryBank", e.target.value)}
//               placeholder="JP Morgan Chase"
//               rows={3}
//             />
//           </div>
//         </>
//       )}

//       {formData.paymentType === "ethiopian" && formData.paymentMethod === "bank_transfer" && (
//         <>
//           <div className="space-y-2">
//             <Label>
//               Account Holder Name <RequiredStar />
//             </Label>
//             <Input
//               value={formData.accountHolderName}
//               onChange={(e) => updateForm("accountHolderName", e.target.value)}
//               onBlur={() => markFieldTouched("accountHolderName")}
//               placeholder="John Doe"
//               className={touchedFields.has("accountHolderName") && !formData.accountHolderName ? "border-red-500" : ""}
//             />
//             <ErrorMessage field="accountHolderName" />
//           </div>
//           <div className="space-y-2">
//             <Label>
//               Bank Name <RequiredStar />
//             </Label>
//             <Input
//               value={formData.bankName}
//               onChange={(e) => updateForm("bankName", e.target.value)}
//               onBlur={() => markFieldTouched("bankName")}
//               placeholder="CBE"
//               className={touchedFields.has("bankName") && !formData.bankName ? "border-red-500" : ""}
//             />
//             <ErrorMessage field="bankName" />
//           </div>
//           <div className="space-y-2">
//             <Label>
//               Account Number <RequiredStar />
//             </Label>
//             <Input
//               value={formData.accountNumber}
//               onChange={(e) => updateForm("accountNumber", e.target.value)}
//               onBlur={() => markFieldTouched("accountNumber")}
//               placeholder="1000123456789"
//               className={touchedFields.has("accountNumber") && !formData.accountNumber ? "border-red-500" : ""}
//             />
//             <ErrorMessage field="accountNumber" />
//           </div>
//         </>
//       )}

//       {formData.paymentType === "ethiopian" && formData.paymentMethod === "mobile_money" && (
//         <>
//           <div className="space-y-2">
//             <Label>
//               Mobile Wallet Provider <RequiredStar />
//             </Label>
//             <Select 
//               value={formData.mobileWalletProvider} 
//               onValueChange={(value) => updateForm("mobileWalletProvider", value)}
//               onOpenChange={() => markFieldTouched("mobileWalletProvider")}
//             >
//               <SelectTrigger className={touchedFields.has("mobileWalletProvider") && !formData.mobileWalletProvider ? "border-red-500" : ""}>
//                 <SelectValue placeholder="Select provider" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="telebirr">Telebirr</SelectItem>
//                 <SelectItem value="cbe_mobile">CBE Mobile</SelectItem>
//                 <SelectItem value="other">Other</SelectItem>
//               </SelectContent>
//             </Select>
//             <ErrorMessage field="mobileWalletProvider" />
//           </div>
//           <div className="space-y-2">
//             <Label>
//               Registered Phone Number <RequiredStar />
//             </Label>
//             <Input
//               value={formData.registeredPhoneNumber}
//               onChange={(e) => updateForm("registeredPhoneNumber", e.target.value)}
//               onBlur={() => markFieldTouched("registeredPhoneNumber")}
//               placeholder="+251911234567"
//               className={touchedFields.has("registeredPhoneNumber") && !formData.registeredPhoneNumber ? "border-red-500" : ""}
//             />
//             <ErrorMessage field="registeredPhoneNumber" />
//           </div>
//         </>
//       )}

//       <div className="flex justify-between gap-3">
//         <Button variant="outline" onClick={goBack}>
//           <ArrowLeft className="mr-2 w-4 h-4" /> Back
//         </Button>
//         <Button onClick={goNext} disabled={!isStep2Valid()}>
//           Next <ArrowRight className="ml-2 w-4 h-4" />
//         </Button>
//       </div>
//     </div>
//   )

//   const renderStep3 = () => (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-2xl font-bold">Payment Details</h2>
//         <p className="text-sm text-muted-foreground">Enter payment-specific fields according to selected method</p>
//       </div>

//       <div className="space-y-4">
//         <div className="space-y-2">
//           <Label>
//             Payment Amount <RequiredStar />
//           </Label>
//           <Input
//             type="number"
//             step="0.01"
//             value={formData.paymentAmount}
//             onChange={(e) => updateForm("paymentAmount", e.target.value)}
//             onBlur={() => markFieldTouched("paymentAmount")}
//             placeholder="100.00"
//             className={touchedFields.has("paymentAmount") && !formData.paymentAmount ? "border-red-500" : ""}
//           />
//           <ErrorMessage field="paymentAmount" />
//         </div>

//         <div className="space-y-2">
//           <Label>Currency</Label>
//           <Select value={formData.currency} onValueChange={(value) => updateForm("currency", value)}>
//             <SelectTrigger>
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="USD">USD</SelectItem>
//               <SelectItem value="EUR">EUR</SelectItem>
//               <SelectItem value="ETB">ETB</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       {formData.paymentMethod === "credit_card" && (
//         <div className="space-y-4">
//           <p className="text-sm text-muted-foreground">Enter your card details. Card must be in donor name.</p>
//           <div className="space-y-2">
//             <Label>
//               Card Number <RequiredStar />
//             </Label>
//             <Input
//               value={formData.cardNumber}
//               onChange={(e) => updateForm("cardNumber", e.target.value)}
//               onBlur={() => markFieldTouched("cardNumber")}
//               placeholder="1234 5678 9012 3456"
//               maxLength={19}
//               className={touchedFields.has("cardNumber") && !formData.cardNumber ? "border-red-500" : ""}
//             />
//             <ErrorMessage field="cardNumber" />
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label>
//                 Expiration Date <RequiredStar />
//               </Label>
//               <Input
//                 value={formData.expirationDate}
//                 onChange={(e) => updateForm("expirationDate", e.target.value)}
//                 onBlur={() => markFieldTouched("expirationDate")}
//                 placeholder="MM/YY"
//                 maxLength={5}
//                 className={touchedFields.has("expirationDate") && !formData.expirationDate ? "border-red-500" : ""}
//               />
//               <ErrorMessage field="expirationDate" />
//             </div>
//             <div className="space-y-2">
//               <Label>
//                 CVV <RequiredStar />
//               </Label>
//               <Input
//                 value={formData.cvv}
//                 onChange={(e) => updateForm("cvv", e.target.value)}
//                 onBlur={() => markFieldTouched("cvv")}
//                 placeholder="123"
//                 maxLength={4}
//                 className={touchedFields.has("cvv") && !formData.cvv ? "border-red-500" : ""}
//               />
//               <ErrorMessage field="cvv" />
//             </div>
//           </div>
//         </div>
//       )}

//       {formData.paymentMethod === "paypal" && (
//         <div className="space-y-4">
//           <p className="text-sm text-muted-foreground">Enter your PayPal account details to receive payment instructions.</p>
//           <div className="space-y-2">
//             <Label>
//               PayPal Email <RequiredStar />
//             </Label>
//             <Input
//               type="email"
//               value={formData.paypalEmail}
//               onChange={(e) => updateForm("paypalEmail", e.target.value)}
//               onBlur={() => markFieldTouched("paypalEmail")}
//               placeholder="your@email.com"
//               className={touchedFields.has("paypalEmail") && !formData.paypalEmail ? "border-red-500" : ""}
//             />
//             <ErrorMessage field="paypalEmail" />
//           </div>
//         </div>
//       )}

//       {(formData.paymentMethod === "bank_transfer" || formData.paymentMethod === "mobile_money") && (
//         <div className="space-y-4">
//           <p className="text-sm text-muted-foreground">
//             For bank/mobile transfer, ensure details match registered account and phone.
//           </p>

//           {formData.paymentMethod === "bank_transfer" && (
//             <> 
//               <div className="space-y-2">
//                 <Label>
//                   Bank Name <RequiredStar />
//                 </Label>
//                 <Input
//                   value={formData.bankName}
//                   onChange={(e) => updateForm("bankName", e.target.value)}
//                   onBlur={() => markFieldTouched("bankName")}
//                   placeholder="CBE"
//                   className={touchedFields.has("bankName") && !formData.bankName ? "border-red-500" : ""}
//                 />
//                 <ErrorMessage field="bankName" />
//               </div>
//               <div className="space-y-2">
//                 <Label>
//                   Account Number <RequiredStar />
//                 </Label>
//                 <Input
//                   value={formData.accountNumber}
//                   onChange={(e) => updateForm("accountNumber", e.target.value)}
//                   onBlur={() => markFieldTouched("accountNumber")}
//                   placeholder="1000123456789"
//                   className={touchedFields.has("accountNumber") && !formData.accountNumber ? "border-red-500" : ""}
//                 />
//                 <ErrorMessage field="accountNumber" />
//               </div>
//               <div className="space-y-2">
//                 <Label>
//                   Account Holder Name <RequiredStar />
//                 </Label>
//                 <Input
//                   value={formData.accountHolderName}
//                   onChange={(e) => updateForm("accountHolderName", e.target.value)}
//                   onBlur={() => markFieldTouched("accountHolderName")}
//                   placeholder="John Doe"
//                   className={touchedFields.has("accountHolderName") && !formData.accountHolderName ? "border-red-500" : ""}
//                 />
//                 <ErrorMessage field="accountHolderName" />
//               </div>
//             </>
//           )}

//           {formData.paymentMethod === "mobile_money" && (
//             <>
//               <div className="space-y-2">
//                 <Label>
//                   Mobile Wallet Provider <RequiredStar />
//                 </Label>
//                 <Input
//                   value={formData.mobileWalletProvider}
//                   onChange={(e) => updateForm("mobileWalletProvider", e.target.value)}
//                   onBlur={() => markFieldTouched("mobileWalletProvider")}
//                   placeholder="Telebirr"
//                   className={touchedFields.has("mobileWalletProvider") && !formData.mobileWalletProvider ? "border-red-500" : ""}
//                 />
//                 <ErrorMessage field="mobileWalletProvider" />
//               </div>
//               <div className="space-y-2">
//                 <Label>
//                   Registered Phone Number <RequiredStar />
//                 </Label>
//                 <Input
//                   value={formData.registeredPhoneNumber}
//                   onChange={(e) => updateForm("registeredPhoneNumber", e.target.value)}
//                   onBlur={() => markFieldTouched("registeredPhoneNumber")}
//                   placeholder="+251911234567"
//                   className={touchedFields.has("registeredPhoneNumber") && !formData.registeredPhoneNumber ? "border-red-500" : ""}
//                 />
//                 <ErrorMessage field="registeredPhoneNumber" />
//               </div>
//             </>
//           )}
//         </div>
//       )}

//       <div className="flex justify-between gap-3">
//         <Button variant="outline" onClick={goBack}>
//           <ArrowLeft className="mr-2 w-4 h-4" /> Back
//         </Button>
//         <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
//           {isSubmitting ? (
//             <>
//               <Loader2 className="mr-2 w-4 h-4 animate-spin" />
//               Processing...
//             </>
//           ) : (
//             <>
//               <CheckCircle className="mr-2 w-4 h-4" />
//               Submit Donation
//             </>
//           )}
//         </Button>
//       </div>
//     </div>
//   )

//   return (
//     <main
//       className="min-h-screen p-6"
//       style={{
//         backgroundImage: "radial-gradient(circle at 15% 15%, rgba(96,165,250,0.25), transparent 40%), radial-gradient(circle at 90% 30%, rgba(14,165,233,0.2), transparent 50%), linear-gradient(to bottom, #eef2ff, #f9fafb)",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       <div className="mx-auto max-w-4xl">
//         <Card className="shadow-2xl border border-blue-200/70 bg-white/90 backdrop-blur-sm rounded-3xl">
//           <CardContent className="space-y-6 p-8 rounded-3xl ring-1 ring-blue-100/30">
//             <div className="space-y-2">
//               <div className="flex items-center gap-2">
//                 {[1,2,3].map((step) => (
//                   <Badge
//                     key={step}
//                     variant={currentStep === step ? "secondary" : "outline"}
//                     className="px-3 py-1"
//                   >
//                     Step {step}
//                   </Badge>
//                 ))}
//               </div>
//               <div className="space-y-1">
//                 <p className="text-xs uppercase tracking-wide text-muted-foreground">Step {currentStep} of 3</p>
//                 <h1 className="text-3xl font-bold">Make a Donation</h1>
//                 <p className="text-muted-foreground">Your generosity helps transform lives across Ethiopia.</p>
//               </div>
//             </div>
//             <form className="space-y-6">
//               {currentStep === 1 && renderStep1()}
//               {currentStep === 2 && renderStep2()}
//               {currentStep === 3 && renderStep3()}
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </main>
//   )
// };








// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Card, CardContent } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Badge } from "@/components/ui/badge"
// import { ArrowLeft, ArrowRight, CheckCircle, CreditCard, Building2, Globe, MapPin, Smartphone, AlertCircle, Loader2 } from "lucide-react"
// import { createClient } from "@/lib/supabase/client"

// interface DonationFormData {
//   paymentType: string
//   paymentMethod: string

//   fullName: string
//   phoneNumber: string
//   email: string

//   streetAddress: string
//   city: string
//   country: string
//   postalCode: string
//   bankName: string
//   bankAddress: string
//   accountNumber: string
//   swiftCode: string
//   paymentAmount: string
//   currency: string
//   purposeOfPayment: string
//   companyName: string
//   taxId: string
//   intermediaryBank: string

//   accountHolderName: string
//   mobileWalletProvider: string
//   registeredPhoneNumber: string

//   cardNumber: string
//   expirationDate: string
//   cvv: string
//   paypalEmail: string
  
//   program: string
//   frequency: string
// }

// export default function DonatePage() {
//   const router = useRouter()
//   const [currentStep, setCurrentStep] = useState(1)
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set())
//   const [formData, setFormData] = useState<DonationFormData>({
//     paymentType: "",
//     paymentMethod: "",
//     fullName: "",
//     phoneNumber: "",
//     email: "",
//     streetAddress: "",
//     city: "",
//     country: "",
//     postalCode: "",
//     bankName: "",
//     bankAddress: "",
//     accountNumber: "",
//     swiftCode: "",
//     paymentAmount: "",
//     currency: "USD",
//     purposeOfPayment: "",
//     companyName: "",
//     taxId: "",
//     intermediaryBank: "",
//     accountHolderName: "",
//     mobileWalletProvider: "",
//     registeredPhoneNumber: "",
//     cardNumber: "",
//     expirationDate: "",
//     cvv: "",
//     paypalEmail: "",
//     program: "community",
//     frequency: "one-time",
//   })

//   const paymentTypes = [
//     { value: "international", label: "International Payments", description: "For donors outside Ethiopia", icon: Globe },
//     { value: "ethiopian", label: "Ethiopian Payments", description: "For donors in Ethiopia", icon: MapPin },
//   ]

//   // Match your database program values exactly
//   const programs = [
//     { value: "children", label: "Children's Education" },
//     { value: "clean water", label: "Clean Water" },
//     { value: "women", label: "Women Empowerment" },
//     { value: "community", label: "Community Development" },
//   ]

//   const getPaymentMethods = () => {
//     if (formData.paymentType === "international") {
//       return [
//         { value: "credit_card", label: "Credit Card", icon: CreditCard },
//         { value: "paypal", label: "PayPal", icon: Building2 },
//         { value: "bank_transfer", label: "Bank Transfer", icon: Building2 },
//       ]
//     }

//     if (formData.paymentType === "ethiopian") {
//       return [
//         { value: "bank_transfer", label: "Bank Transfer", icon: Building2 },
//         { value: "mobile_money", label: "Mobile Money", icon: Smartphone },
//       ]
//     }
    
//     return []
//   }

//   const updateForm = (field: keyof DonationFormData, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }))
//     setTouchedFields(prev => new Set(prev).add(field))
//   }

//   const markFieldTouched = (field: keyof DonationFormData) => {
//     setTouchedFields(prev => new Set(prev).add(field))
//   }

//   // Validation functions
//   const isStep1Valid = () => {
//     return formData.paymentType !== "" && formData.paymentMethod !== ""
//   }

//   const isStep2Valid = () => {
//     if (!formData.fullName || !formData.phoneNumber) return false
    
//     if (formData.paymentType === "international") {
//       if (!formData.email) return false
//     }
    
//     if (formData.paymentType === "ethiopian" && formData.paymentMethod === "bank_transfer") {
//       if (!formData.accountHolderName || !formData.bankName || !formData.accountNumber) return false
//     }
    
//     if (formData.paymentType === "ethiopian" && formData.paymentMethod === "mobile_money") {
//       if (!formData.mobileWalletProvider || !formData.registeredPhoneNumber) return false
//     }
    
//     return true
//   }

//   const isStep3Valid = () => {
//     if (!formData.paymentAmount) return false
    
//     if (formData.paymentMethod === "credit_card") {
//       if (!formData.cardNumber || !formData.expirationDate || !formData.cvv) return false
//     }
    
//     if (formData.paymentMethod === "paypal") {
//       if (!formData.paypalEmail) return false
//     }
    
//     if (formData.paymentMethod === "bank_transfer") {
//       if (!formData.bankName || !formData.accountNumber || !formData.accountHolderName) return false
//     }
    
//     if (formData.paymentMethod === "mobile_money") {
//       if (!formData.mobileWalletProvider || !formData.registeredPhoneNumber) return false
//     }
    
//     return true
//   }

//   const goNext = () => {
//     if (currentStep === 1 && !isStep1Valid()) return
//     if (currentStep === 2 && !isStep2Valid()) return
//     setCurrentStep(prev => Math.min(prev + 1, 3))
//   }

//   const goBack = () => setCurrentStep(prev => Math.max(prev - 1, 1))

//   // Save donation to your existing database
//   const saveDonationToDatabase = async () => {
//     try {
//       const supabase = createClient()
      
//       const { data: { user } } = await supabase.auth.getUser()
      
//       // Prepare notes with all payment details (matches your notes text field)
//       const notes = `
// Payment Type: ${formData.paymentType}
// Payment Method: ${formData.paymentMethod}
// ${formData.purposeOfPayment ? `Purpose: ${formData.purposeOfPayment}` : ''}
// ${formData.companyName ? `Company: ${formData.companyName}` : ''}
// ${formData.taxId ? `Tax ID: ${formData.taxId}` : ''}
// ${formData.swiftCode ? `SWIFT Code: ${formData.swiftCode}` : ''}
// ${formData.intermediaryBank ? `Intermediary Bank: ${formData.intermediaryBank}` : ''}
// ${formData.bankAddress ? `Bank Address: ${formData.bankAddress}` : ''}
// ${formData.city ? `City: ${formData.city}` : ''}
// ${formData.country ? `Country: ${formData.country}` : ''}
// ${formData.postalCode ? `Postal Code: ${formData.postalCode}` : ''}
// ${formData.streetAddress ? `Street Address: ${formData.streetAddress}` : ''}
//       `.trim()
      
//       // Generate unique external transaction ID
//       const externalTxId = `DON-${Date.now()}-${Math.random().toString(36).substr(2, 8)}`
      
//       // Create donation record matching your database schema exactly
//       const donationRecord = {
//         donor_name: formData.fullName,
//         donor_email: formData.email || null,
//         amount: parseFloat(formData.paymentAmount),
//         program: formData.program, // Must match: children, clean water, women, community
//         frequency: formData.frequency, // one-time or monthly
//         external_tx_id: externalTxId,
//         notes: notes,
//         user_id: user?.id || null,
//         // volunteer_id and contact_id can be set later if needed
//       }
      
//       console.log("Saving to database:", donationRecord)
      
//       const { data: result, error } = await supabase
//         .from("donations")
//         .insert(donationRecord)
//         .select()
      
//       if (error) {
//         console.error("Error saving to Supabase:", error)
//         throw error
//       }
      
//       console.log("Donation saved to Supabase successfully:", result)
//       return externalTxId
//     } catch (error) {
//       console.error("Error in saveDonationToDatabase:", error)
//       throw error
//     }
//   }
  
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
      
//       if (!response.ok) {
//         console.error("Failed to send email")
//         return false
//       }
      
//       return true
//     } catch (error) {
//       console.error("Error sending email:", error)
//       return false
//     }
//   }

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault()
    
//     if (!isStep3Valid()) {
//       const step3Fields = ["paymentAmount"]
//       if (formData.paymentMethod === "credit_card") {
//         step3Fields.push("cardNumber", "expirationDate", "cvv")
//       }
//       if (formData.paymentMethod === "paypal") {
//         step3Fields.push("paypalEmail")
//       }
//       if (formData.paymentMethod === "bank_transfer") {
//         step3Fields.push("bankName", "accountNumber", "accountHolderName")
//       }
//       if (formData.paymentMethod === "mobile_money") {
//         step3Fields.push("mobileWalletProvider", "registeredPhoneNumber")
//       }
//       setTouchedFields(prev => new Set([...prev, ...step3Fields]))
//       return
//     }
    
//     setIsSubmitting(true)
    
//     try {
//       // Save to database
//       const externalTxId = await saveDonationToDatabase()
      
//       // Send thank you email if email exists
//       if (formData.email) {
//         await sendThankYouEmail({
//           email: formData.email,
//           name: formData.fullName,
//           amount: parseFloat(formData.paymentAmount),
//           currency: formData.currency,
//           program: programs.find(p => p.value === formData.program)?.label || formData.program,
//           donationId: externalTxId.slice(0, 8),
//           paymentMethod: getPaymentMethods().find(m => m.value === formData.paymentMethod)?.label || formData.paymentMethod,
//           frequency: formData.frequency,
//         })
//       }
      
//       // Build address string
//       const addressParts = [
//         formData.streetAddress,
//         formData.city,
//         formData.country,
//         formData.postalCode
//       ].filter(part => part).join(", ")
      
//       // Redirect to success page with all data
//       const params = new URLSearchParams({
//         id: externalTxId,
//         amount: formData.paymentAmount,
//         method: formData.paymentMethod,
//         program: formData.program,
//         email: formData.email || "",
//         name: formData.fullName,
//         phone: formData.phoneNumber,
//         address: addressParts,
//         frequency: formData.frequency,
//       })
      
//       router.push(`/donation-success?${params.toString()}`)
//     } catch (error) {
//       console.error("Error submitting donation:", error)
//       alert("There was an error processing your donation. Please try again or contact support.")
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const RequiredStar = () => <span className="text-red-500 ml-0.5">*</span>

//   const ErrorMessage = ({ field }: { field: string }) => {
//     const isInvalid = touchedFields.has(field) && !formData[field as keyof DonationFormData]
//     if (!isInvalid) return null
//     return (
//       <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
//         <AlertCircle className="w-3 h-3" />
//         This field is required
//       </p>
//     )
//   }

//   const renderStep1 = () => (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-2xl font-bold">Select Payment Method</h2>
//         <p className="text-sm text-muted-foreground">Choose how you would like to make your donation</p>
//       </div>

//       <div className="space-y-4">
//         <Label className="font-medium">
//           Payment Type <RequiredStar />
//         </Label>
//         <RadioGroup 
//           value={formData.paymentType} 
//           onValueChange={(value) => updateForm("paymentType", value)}
//         >
//           <div className="grid gap-3">
//             {paymentTypes.map((type) => (
//               <div key={type.value}>
//                 <RadioGroupItem value={type.value} id={type.value} className="peer sr-only" />
//                 <Label
//                   htmlFor={type.value}
//                   className={`flex p-4 border rounded-lg cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 ${
//                     touchedFields.has("paymentType") && !formData.paymentType ? "border-red-500 bg-red-50/50" : ""
//                   }`}
//                 >
//                   <type.icon className="h-6 w-6" />
//                   <div className="ml-3">
//                     <p className="font-medium">{type.label}</p>
//                     <p className="text-sm text-muted-foreground">{type.description}</p>
//                   </div>
//                 </Label>
//               </div>
//             ))}
//           </div>
//         </RadioGroup>
//         <ErrorMessage field="paymentType" />
//       </div>

//       {formData.paymentType && (
//         <div className="space-y-4">
//           <Label className="font-medium">
//             Payment Method <RequiredStar />
//           </Label>
//           <Select 
//             value={formData.paymentMethod} 
//             onValueChange={(value) => updateForm("paymentMethod", value)}
//             onOpenChange={() => markFieldTouched("paymentMethod")}
//           >
//             <SelectTrigger className={touchedFields.has("paymentMethod") && !formData.paymentMethod ? "border-red-500" : ""}>
//               <SelectValue placeholder="Select method" />
//             </SelectTrigger>
//             <SelectContent>
//               {getPaymentMethods().map((method) => (
//                 <SelectItem key={method.value} value={method.value}>
//                   {method.label}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//           <ErrorMessage field="paymentMethod" />
//         </div>
//       )}

//       <div className="flex justify-end gap-3">
//         <Button onClick={goNext} size="lg" disabled={!isStep1Valid()}>
//           Next <ArrowRight className="ml-2 w-4 h-4" />
//         </Button>
//       </div>
//     </div>
//   )

//   const renderStep2 = () => (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-2xl font-bold">Donation Details</h2>
//         <p className="text-sm text-muted-foreground">
//           Provide your donor information based on the selected payment type and method.
//         </p>
//       </div>
      
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//         <div className="rounded-lg border border-border bg-secondary p-3">
//           <p className="text-xs uppercase text-muted-foreground">Payment Type</p>
//           <p className="font-semibold capitalize">{formData.paymentType || "Not selected"}</p>
//         </div>
//         <div className="rounded-lg border border-border bg-secondary p-3">
//           <p className="text-xs uppercase text-muted-foreground">Payment Method</p>
//           <p className="font-semibold capitalize">{formData.paymentMethod?.replace(/_/g, ' ') || "Not selected"}</p>
//         </div>
//       </div>

//       <div className="space-y-2">
//         <Label>
//           Select Program <RequiredStar />
//         </Label>
//         <Select 
//           value={formData.program} 
//           onValueChange={(value) => updateForm("program", value)}
//         >
//           <SelectTrigger>
//             <SelectValue placeholder="Select a program to support" />
//           </SelectTrigger>
//           <SelectContent>
//             {programs.map((program) => (
//               <SelectItem key={program.value} value={program.value}>
//                 {program.label}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>

//       <div className="space-y-2">
//         <Label>
//           Donation Frequency <RequiredStar />
//         </Label>
//         <RadioGroup 
//           value={formData.frequency} 
//           onValueChange={(value) => updateForm("frequency", value)}
//           className="flex gap-4"
//         >
//           <div className="flex items-center space-x-2">
//             <RadioGroupItem value="one-time" id="one-time" />
//             <Label htmlFor="one-time">One-time</Label>
//           </div>
//           <div className="flex items-center space-x-2">
//             <RadioGroupItem value="monthly" id="monthly" />
//             <Label htmlFor="monthly">Monthly</Label>
//           </div>
//         </RadioGroup>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <Label>
//             Full Name <RequiredStar />
//           </Label>
//           <Input
//             value={formData.fullName}
//             onChange={(e) => updateForm("fullName", e.target.value)}
//             onBlur={() => markFieldTouched("fullName")}
//             placeholder="John Doe"
//             className={touchedFields.has("fullName") && !formData.fullName ? "border-red-500" : ""}
//           />
//           <ErrorMessage field="fullName" />
//         </div>
//         <div className="space-y-2">
//           <Label>
//             Phone Number <RequiredStar />
//           </Label>
//           <Input
//             value={formData.phoneNumber}
//             onChange={(e) => updateForm("phoneNumber", e.target.value)}
//             onBlur={() => markFieldTouched("phoneNumber")}
//             placeholder={formData.paymentType === "ethiopian" ? "+251911234567" : "+1 555 123 4567"}
//             className={touchedFields.has("phoneNumber") && !formData.phoneNumber ? "border-red-500" : ""}
//           />
//           <ErrorMessage field="phoneNumber" />
//         </div>
//       </div>

//       {formData.paymentType === "international" && (
//         <>
//           <div className="space-y-2">
//             <Label>
//               Email Address <RequiredStar />
//             </Label>
//             <Input
//               type="email"
//               value={formData.email}
//               onChange={(e) => updateForm("email", e.target.value)}
//               onBlur={() => markFieldTouched("email")}
//               placeholder="your@email.com"
//               className={touchedFields.has("email") && !formData.email ? "border-red-500" : ""}
//             />
//             <ErrorMessage field="email" />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label>Street Address</Label>
//               <Input
//                 value={formData.streetAddress}
//                 onChange={(e) => updateForm("streetAddress", e.target.value)}
//                 placeholder="123 Main St"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>City</Label>
//               <Input
//                 value={formData.city}
//                 onChange={(e) => updateForm("city", e.target.value)}
//                 placeholder="New York"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>Country</Label>
//               <Input
//                 value={formData.country}
//                 onChange={(e) => updateForm("country", e.target.value)}
//                 placeholder="USA"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>Postal Code</Label>
//               <Input
//                 value={formData.postalCode}
//                 onChange={(e) => updateForm("postalCode", e.target.value)}
//                 placeholder="10001"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label>Bank Name</Label>
//               <Input
//                 value={formData.bankName}
//                 onChange={(e) => updateForm("bankName", e.target.value)}
//                 placeholder="Bank of America"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>Account Number / IBAN</Label>
//               <Input
//                 value={formData.accountNumber}
//                 onChange={(e) => updateForm("accountNumber", e.target.value)}
//                 placeholder="GB29NWBK60161331926819"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label>SWIFT/BIC Code</Label>
//               <Input
//                 value={formData.swiftCode}
//                 onChange={(e) => updateForm("swiftCode", e.target.value)}
//                 placeholder="NWBKGB2L"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>Bank Address (Optional)</Label>
//               <Input
//                 value={formData.bankAddress}
//                 onChange={(e) => updateForm("bankAddress", e.target.value)}
//                 placeholder="123 Bank St"
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label>Purpose of Payment</Label>
//             <Input
//               value={formData.purposeOfPayment}
//               onChange={(e) => updateForm("purposeOfPayment", e.target.value)}
//               placeholder="Donation for education program"
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label>Company Name (Optional)</Label>
//               <Input
//                 value={formData.companyName}
//                 onChange={(e) => updateForm("companyName", e.target.value)}
//                 placeholder="Company, LLC"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>Tax ID / National ID (Optional)</Label>
//               <Input
//                 value={formData.taxId}
//                 onChange={(e) => updateForm("taxId", e.target.value)}
//                 placeholder="123456789"
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label>Intermediary Bank Details (Optional)</Label>
//             <Textarea
//               value={formData.intermediaryBank}
//               onChange={(e) => updateForm("intermediaryBank", e.target.value)}
//               placeholder="JP Morgan Chase"
//               rows={3}
//             />
//           </div>
//         </>
//       )}

//       {formData.paymentType === "ethiopian" && formData.paymentMethod === "bank_transfer" && (
//         <>
//           <div className="space-y-2">
//             <Label>
//               Account Holder Name <RequiredStar />
//             </Label>
//             <Input
//               value={formData.accountHolderName}
//               onChange={(e) => updateForm("accountHolderName", e.target.value)}
//               onBlur={() => markFieldTouched("accountHolderName")}
//               placeholder="John Doe"
//               className={touchedFields.has("accountHolderName") && !formData.accountHolderName ? "border-red-500" : ""}
//             />
//             <ErrorMessage field="accountHolderName" />
//           </div>
//           <div className="space-y-2">
//             <Label>
//               Bank Name <RequiredStar />
//             </Label>
//             <Input
//               value={formData.bankName}
//               onChange={(e) => updateForm("bankName", e.target.value)}
//               onBlur={() => markFieldTouched("bankName")}
//               placeholder="CBE"
//               className={touchedFields.has("bankName") && !formData.bankName ? "border-red-500" : ""}
//             />
//             <ErrorMessage field="bankName" />
//           </div>
//           <div className="space-y-2">
//             <Label>
//               Account Number <RequiredStar />
//             </Label>
//             <Input
//               value={formData.accountNumber}
//               onChange={(e) => updateForm("accountNumber", e.target.value)}
//               onBlur={() => markFieldTouched("accountNumber")}
//               placeholder="1000123456789"
//               className={touchedFields.has("accountNumber") && !formData.accountNumber ? "border-red-500" : ""}
//             />
//             <ErrorMessage field="accountNumber" />
//           </div>
//         </>
//       )}

//       {formData.paymentType === "ethiopian" && formData.paymentMethod === "mobile_money" && (
//         <>
//           <div className="space-y-2">
//             <Label>
//               Mobile Wallet Provider <RequiredStar />
//             </Label>
//             <Select 
//               value={formData.mobileWalletProvider} 
//               onValueChange={(value) => updateForm("mobileWalletProvider", value)}
//               onOpenChange={() => markFieldTouched("mobileWalletProvider")}
//             >
//               <SelectTrigger className={touchedFields.has("mobileWalletProvider") && !formData.mobileWalletProvider ? "border-red-500" : ""}>
//                 <SelectValue placeholder="Select provider" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="telebirr">Telebirr</SelectItem>
//                 <SelectItem value="cbe_mobile">CBE Mobile</SelectItem>
//                 <SelectItem value="other">Other</SelectItem>
//               </SelectContent>
//             </Select>
//             <ErrorMessage field="mobileWalletProvider" />
//           </div>
//           <div className="space-y-2">
//             <Label>
//               Registered Phone Number <RequiredStar />
//             </Label>
//             <Input
//               value={formData.registeredPhoneNumber}
//               onChange={(e) => updateForm("registeredPhoneNumber", e.target.value)}
//               onBlur={() => markFieldTouched("registeredPhoneNumber")}
//               placeholder="+251911234567"
//               className={touchedFields.has("registeredPhoneNumber") && !formData.registeredPhoneNumber ? "border-red-500" : ""}
//             />
//             <ErrorMessage field="registeredPhoneNumber" />
//           </div>
//         </>
//       )}

//       <div className="flex justify-between gap-3">
//         <Button variant="outline" onClick={goBack}>
//           <ArrowLeft className="mr-2 w-4 h-4" /> Back
//         </Button>
//         <Button onClick={goNext} disabled={!isStep2Valid()}>
//           Next <ArrowRight className="ml-2 w-4 h-4" />
//         </Button>
//       </div>
//     </div>
//   )

//   const renderStep3 = () => (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-2xl font-bold">Payment Details</h2>
//         <p className="text-sm text-muted-foreground">Enter payment-specific fields according to selected method</p>
//       </div>

//       <div className="space-y-4">
//         <div className="space-y-2">
//           <Label>
//             Payment Amount <RequiredStar />
//           </Label>
//           <Input
//             type="number"
//             step="0.01"
//             value={formData.paymentAmount}
//             onChange={(e) => updateForm("paymentAmount", e.target.value)}
//             onBlur={() => markFieldTouched("paymentAmount")}
//             placeholder="100.00"
//             className={touchedFields.has("paymentAmount") && !formData.paymentAmount ? "border-red-500" : ""}
//           />
//           <ErrorMessage field="paymentAmount" />
//         </div>

//         <div className="space-y-2">
//           <Label>Currency</Label>
//           <Select value={formData.currency} onValueChange={(value) => updateForm("currency", value)}>
//             <SelectTrigger>
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="USD">USD</SelectItem>
//               <SelectItem value="EUR">EUR</SelectItem>
//               <SelectItem value="ETB">ETB</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       {formData.paymentMethod === "credit_card" && (
//         <div className="space-y-4">
//           <p className="text-sm text-muted-foreground">Enter your card details. Card must be in donor name.</p>
//           <div className="space-y-2">
//             <Label>
//               Card Number <RequiredStar />
//             </Label>
//             <Input
//               value={formData.cardNumber}
//               onChange={(e) => updateForm("cardNumber", e.target.value)}
//               onBlur={() => markFieldTouched("cardNumber")}
//               placeholder="1234 5678 9012 3456"
//               maxLength={19}
//               className={touchedFields.has("cardNumber") && !formData.cardNumber ? "border-red-500" : ""}
//             />
//             <ErrorMessage field="cardNumber" />
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label>
//                 Expiration Date <RequiredStar />
//               </Label>
//               <Input
//                 value={formData.expirationDate}
//                 onChange={(e) => updateForm("expirationDate", e.target.value)}
//                 onBlur={() => markFieldTouched("expirationDate")}
//                 placeholder="MM/YY"
//                 maxLength={5}
//                 className={touchedFields.has("expirationDate") && !formData.expirationDate ? "border-red-500" : ""}
//               />
//               <ErrorMessage field="expirationDate" />
//             </div>
//             <div className="space-y-2">
//               <Label>
//                 CVV <RequiredStar />
//               </Label>
//               <Input
//                 value={formData.cvv}
//                 onChange={(e) => updateForm("cvv", e.target.value)}
//                 onBlur={() => markFieldTouched("cvv")}
//                 placeholder="123"
//                 maxLength={4}
//                 className={touchedFields.has("cvv") && !formData.cvv ? "border-red-500" : ""}
//               />
//               <ErrorMessage field="cvv" />
//             </div>
//           </div>
//         </div>
//       )}

//       {formData.paymentMethod === "paypal" && (
//         <div className="space-y-4">
//           <p className="text-sm text-muted-foreground">Enter your PayPal account details to receive payment instructions.</p>
//           <div className="space-y-2">
//             <Label>
//               PayPal Email <RequiredStar />
//             </Label>
//             <Input
//               type="email"
//               value={formData.paypalEmail}
//               onChange={(e) => updateForm("paypalEmail", e.target.value)}
//               onBlur={() => markFieldTouched("paypalEmail")}
//               placeholder="your@email.com"
//               className={touchedFields.has("paypalEmail") && !formData.paypalEmail ? "border-red-500" : ""}
//             />
//             <ErrorMessage field="paypalEmail" />
//           </div>
//         </div>
//       )}

//       {(formData.paymentMethod === "bank_transfer" || formData.paymentMethod === "mobile_money") && (
//         <div className="space-y-4">
//           <p className="text-sm text-muted-foreground">
//             For bank/mobile transfer, ensure details match registered account and phone.
//           </p>

//           {formData.paymentMethod === "bank_transfer" && (
//             <> 
//               <div className="space-y-2">
//                 <Label>
//                   Bank Name <RequiredStar />
//                 </Label>
//                 <Input
//                   value={formData.bankName}
//                   onChange={(e) => updateForm("bankName", e.target.value)}
//                   onBlur={() => markFieldTouched("bankName")}
//                   placeholder="CBE"
//                   className={touchedFields.has("bankName") && !formData.bankName ? "border-red-500" : ""}
//                 />
//                 <ErrorMessage field="bankName" />
//               </div>
//               <div className="space-y-2">
//                 <Label>
//                   Account Number <RequiredStar />
//                 </Label>
//                 <Input
//                   value={formData.accountNumber}
//                   onChange={(e) => updateForm("accountNumber", e.target.value)}
//                   onBlur={() => markFieldTouched("accountNumber")}
//                   placeholder="1000123456789"
//                   className={touchedFields.has("accountNumber") && !formData.accountNumber ? "border-red-500" : ""}
//                 />
//                 <ErrorMessage field="accountNumber" />
//               </div>
//               <div className="space-y-2">
//                 <Label>
//                   Account Holder Name <RequiredStar />
//                 </Label>
//                 <Input
//                   value={formData.accountHolderName}
//                   onChange={(e) => updateForm("accountHolderName", e.target.value)}
//                   onBlur={() => markFieldTouched("accountHolderName")}
//                   placeholder="John Doe"
//                   className={touchedFields.has("accountHolderName") && !formData.accountHolderName ? "border-red-500" : ""}
//                 />
//                 <ErrorMessage field="accountHolderName" />
//               </div>
//             </>
//           )}

//           {formData.paymentMethod === "mobile_money" && (
//             <>
//               <div className="space-y-2">
//                 <Label>
//                   Mobile Wallet Provider <RequiredStar />
//                 </Label>
//                 <Input
//                   value={formData.mobileWalletProvider}
//                   onChange={(e) => updateForm("mobileWalletProvider", e.target.value)}
//                   onBlur={() => markFieldTouched("mobileWalletProvider")}
//                   placeholder="Telebirr"
//                   className={touchedFields.has("mobileWalletProvider") && !formData.mobileWalletProvider ? "border-red-500" : ""}
//                 />
//                 <ErrorMessage field="mobileWalletProvider" />
//               </div>
//               <div className="space-y-2">
//                 <Label>
//                   Registered Phone Number <RequiredStar />
//                 </Label>
//                 <Input
//                   value={formData.registeredPhoneNumber}
//                   onChange={(e) => updateForm("registeredPhoneNumber", e.target.value)}
//                   onBlur={() => markFieldTouched("registeredPhoneNumber")}
//                   placeholder="+251911234567"
//                   className={touchedFields.has("registeredPhoneNumber") && !formData.registeredPhoneNumber ? "border-red-500" : ""}
//                 />
//                 <ErrorMessage field="registeredPhoneNumber" />
//               </div>
//             </>
//           )}
//         </div>
//       )}

//       <div className="flex justify-between gap-3">
//         <Button variant="outline" onClick={goBack}>
//           <ArrowLeft className="mr-2 w-4 h-4" /> Back
//         </Button>
//         <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
//           {isSubmitting ? (
//             <>
//               <Loader2 className="mr-2 w-4 h-4 animate-spin" />
//               Processing...
//             </>
//           ) : (
//             <>
//               <CheckCircle className="mr-2 w-4 h-4" />
//               Submit Donation
//             </>
//           )}
//         </Button>
//       </div>
//     </div>
//   )

//   return (
//     <main
//       className="min-h-screen p-6"
//       style={{
//         backgroundImage: "radial-gradient(circle at 15% 15%, rgba(96,165,250,0.25), transparent 40%), radial-gradient(circle at 90% 30%, rgba(14,165,233,0.2), transparent 50%), linear-gradient(to bottom, #eef2ff, #f9fafb)",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       <div className="mx-auto max-w-4xl">
//         <Card className="shadow-2xl border border-blue-200/70 bg-white/90 backdrop-blur-sm rounded-3xl">
//           <CardContent className="space-y-6 p-8 rounded-3xl ring-1 ring-blue-100/30">
//             <div className="space-y-2">
//               <div className="flex items-center gap-2">
//                 {[1,2,3].map((step) => (
//                   <Badge
//                     key={step}
//                     variant={currentStep === step ? "secondary" : "outline"}
//                     className="px-3 py-1"
//                   >
//                     Step {step}
//                   </Badge>
//                 ))}
//               </div>
//               <div className="space-y-1">
//                 <p className="text-xs uppercase tracking-wide text-muted-foreground">Step {currentStep} of 3</p>
//                 <h1 className="text-3xl font-bold">Make a Donation</h1>
//                 <p className="text-muted-foreground">Your generosity helps transform lives across Ethiopia.</p>
//               </div>
//             </div>
//             <form className="space-y-6">
//               {currentStep === 1 && renderStep1()}
//               {currentStep === 2 && renderStep2()}
//               {currentStep === 3 && renderStep3()}
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </main>
//   )
// };









// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Card, CardContent } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Badge } from "@/components/ui/badge"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { ArrowLeft, ArrowRight, CheckCircle, CreditCard, Building2, Globe, MapPin, Smartphone, AlertCircle, Loader2, XCircle } from "lucide-react"
// import { createClient } from "@/lib/supabase/client"

// interface DonationFormData {
//   paymentType: string
//   paymentMethod: string

//   fullName: string
//   phoneNumber: string
//   email: string

//   streetAddress: string
//   city: string
//   country: string
//   postalCode: string
//   bankName: string
//   bankAddress: string
//   accountNumber: string
//   swiftCode: string
//   paymentAmount: string
//   currency: string
//   purposeOfPayment: string
//   companyName: string
//   taxId: string
//   intermediaryBank: string

//   accountHolderName: string
//   mobileWalletProvider: string
//   registeredPhoneNumber: string

//   cardNumber: string
//   expirationDate: string
//   cvv: string
//   paypalEmail: string
  
//   program: string
//   frequency: string
// }

// export default function DonatePage() {
//   const router = useRouter()
//   const [currentStep, setCurrentStep] = useState(1)
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set())
//   const [formData, setFormData] = useState<DonationFormData>({
//     paymentType: "",
//     paymentMethod: "",
//     fullName: "",
//     phoneNumber: "",
//     email: "",
//     streetAddress: "",
//     city: "",
//     country: "",
//     postalCode: "",
//     bankName: "",
//     bankAddress: "",
//     accountNumber: "",
//     swiftCode: "",
//     paymentAmount: "",
//     currency: "USD",
//     purposeOfPayment: "",
//     companyName: "",
//     taxId: "",
//     intermediaryBank: "",
//     accountHolderName: "",
//     mobileWalletProvider: "",
//     registeredPhoneNumber: "",
//     cardNumber: "",
//     expirationDate: "",
//     cvv: "",
//     paypalEmail: "",
//     program: "community",
//     frequency: "one-time",
//   })

//   const paymentTypes = [
//     { value: "international", label: "International Payments", description: "For donors outside Ethiopia", icon: Globe },
//     { value: "ethiopian", label: "Ethiopian Payments", description: "For donors in Ethiopia", icon: MapPin },
//   ]

//   const programs = [
//     { value: "children", label: "Children's Education" },
//     { value: "clean water", label: "Clean Water" },
//     { value: "women", label: "Women Empowerment" },
//     { value: "community", label: "Community Development" },
//   ]

//   const getPaymentMethods = () => {
//     if (formData.paymentType === "international") {
//       return [
//         { value: "credit_card", label: "Credit Card", icon: CreditCard },
//         { value: "paypal", label: "PayPal", icon: Building2 },
//         { value: "bank_transfer", label: "Bank Transfer", icon: Building2 },
//       ]
//     }

//     if (formData.paymentType === "ethiopian") {
//       return [
//         { value: "bank_transfer", label: "Bank Transfer", icon: Building2 },
//         { value: "mobile_money", label: "Mobile Money", icon: Smartphone },
//       ]
//     }
    
//     return []
//   }

//   const updateForm = (field: keyof DonationFormData, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }))
//     setTouchedFields(prev => new Set(prev).add(field))
//     // Clear error when user starts typing
//     if (error) setError(null)
//   }

//   const markFieldTouched = (field: keyof DonationFormData) => {
//     setTouchedFields(prev => new Set(prev).add(field))
//   }

//   const isStep1Valid = () => {
//     return formData.paymentType !== "" && formData.paymentMethod !== ""
//   }

//   const isStep2Valid = () => {
//     if (!formData.fullName || !formData.phoneNumber) return false
    
//     if (formData.paymentType === "international") {
//       if (!formData.email) return false
//     }
    
//     if (formData.paymentType === "ethiopian" && formData.paymentMethod === "bank_transfer") {
//       if (!formData.accountHolderName || !formData.bankName || !formData.accountNumber) return false
//     }
    
//     if (formData.paymentType === "ethiopian" && formData.paymentMethod === "mobile_money") {
//       if (!formData.mobileWalletProvider || !formData.registeredPhoneNumber) return false
//     }
    
//     return true
//   }

//   const isStep3Valid = () => {
//     if (!formData.paymentAmount) return false
    
//     if (formData.paymentMethod === "credit_card") {
//       if (!formData.cardNumber || !formData.expirationDate || !formData.cvv) return false
//     }
    
//     if (formData.paymentMethod === "paypal") {
//       if (!formData.paypalEmail) return false
//     }
    
//     if (formData.paymentMethod === "bank_transfer") {
//       if (!formData.bankName || !formData.accountNumber || !formData.accountHolderName) return false
//     }
    
//     if (formData.paymentMethod === "mobile_money") {
//       if (!formData.mobileWalletProvider || !formData.registeredPhoneNumber) return false
//     }
    
//     return true
//   }

//   const goNext = () => {
//     setError(null)
//     if (currentStep === 1 && !isStep1Valid()) {
//       setError("Please select both payment type and method to continue.")
//       return
//     }
//     if (currentStep === 2 && !isStep2Valid()) {
//       setError("Please fill in all required fields before continuing.")
//       return
//     }
//     setCurrentStep(prev => Math.min(prev + 1, 3))
//   }

//   const goBack = () => {
//     setError(null)
//     setCurrentStep(prev => Math.max(prev - 1, 1))
//   }

//   const saveDonationToDatabase = async () => {
//     try {
//       const supabase = createClient()
      
//       const { data: { user } } = await supabase.auth.getUser()
      
//       const notes = `
// Payment Type: ${formData.paymentType}
// Payment Method: ${formData.paymentMethod}
// ${formData.purposeOfPayment ? `Purpose: ${formData.purposeOfPayment}` : ''}
// ${formData.companyName ? `Company: ${formData.companyName}` : ''}
// ${formData.taxId ? `Tax ID: ${formData.taxId}` : ''}
// ${formData.swiftCode ? `SWIFT Code: ${formData.swiftCode}` : ''}
// ${formData.intermediaryBank ? `Intermediary Bank: ${formData.intermediaryBank}` : ''}
// ${formData.bankAddress ? `Bank Address: ${formData.bankAddress}` : ''}
// ${formData.city ? `City: ${formData.city}` : ''}
// ${formData.country ? `Country: ${formData.country}` : ''}
// ${formData.postalCode ? `Postal Code: ${formData.postalCode}` : ''}
// ${formData.streetAddress ? `Street Address: ${formData.streetAddress}` : ''}
//       `.trim()
      
//       const externalTxId = `DON-${Date.now()}-${Math.random().toString(36).substr(2, 8)}`
      
//       const donationRecord = {
//         donor_name: formData.fullName,
//         donor_email: formData.email || null,
//         amount: parseFloat(formData.paymentAmount),
//         program: formData.program,
//         frequency: formData.frequency,
//         external_tx_id: externalTxId,
//         notes: notes,
//         user_id: user?.id || null,
//       }
      
//       const { error } = await supabase
//         .from("donations")
//         .insert(donationRecord)
      
//       if (error) {
//         console.error("Database error:", error)
//         throw new Error(error.message || "Failed to save donation")
//       }
      
//       return externalTxId
//     } catch (error: any) {
//       console.error("Error in saveDonationToDatabase:", error)
//       throw new Error(error.message || "Unable to process your donation. Please try again.")
//     }
//   }
  
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
      
//       if (!response.ok) {
//         console.error("Failed to send email")
//         // Don't throw error - email failure shouldn't stop donation
//       }
//     } catch (error) {
//       console.error("Error sending email:", error)
//       // Don't throw error - email failure shouldn't stop donation
//     }
//   }

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault()
//     setError(null)
    
//     if (!isStep3Valid()) {
//       const step3Fields = ["paymentAmount"]
//       if (formData.paymentMethod === "credit_card") {
//         step3Fields.push("cardNumber", "expirationDate", "cvv")
//       }
//       if (formData.paymentMethod === "paypal") {
//         step3Fields.push("paypalEmail")
//       }
//       if (formData.paymentMethod === "bank_transfer") {
//         step3Fields.push("bankName", "accountNumber", "accountHolderName")
//       }
//       if (formData.paymentMethod === "mobile_money") {
//         step3Fields.push("mobileWalletProvider", "registeredPhoneNumber")
//       }
//       setTouchedFields(prev => new Set([...prev, ...step3Fields]))
//       setError("Please fill in all payment details before submitting.")
//       return
//     }
    
//     setIsSubmitting(true)
    
//     try {
//       // Save to database
//       const externalTxId = await saveDonationToDatabase()
      
//       // Send thank you email if email exists (don't wait for it)
//       if (formData.email) {
//         const programLabel = programs.find(p => p.value === formData.program)?.label || formData.program
//         const paymentMethodLabel = getPaymentMethods().find(m => m.value === formData.paymentMethod)?.label || formData.paymentMethod
        
//         sendThankYouEmail({
//           email: formData.email,
//           name: formData.fullName,
//           amount: parseFloat(formData.paymentAmount),
//           currency: formData.currency,
//           program: programLabel,
//           donationId: externalTxId.slice(0, 8),
//           paymentMethod: paymentMethodLabel,
//           frequency: formData.frequency,
//         }).catch(err => console.error("Email error:", err))
//       }
      
//       // Build address string
//       const addressParts = [
//         formData.streetAddress,
//         formData.city,
//         formData.country,
//         formData.postalCode
//       ].filter(part => part).join(", ")
      
//       // Redirect to success page
//       const params = new URLSearchParams({
//         id: externalTxId,
//         amount: formData.paymentAmount,
//         method: formData.paymentMethod,
//         program: formData.program,
//         email: formData.email || "",
//         name: formData.fullName,
//         phone: formData.phoneNumber,
//         address: addressParts,
//         frequency: formData.frequency,
//       })
      
//       router.push(`/donation-success?${params.toString()}`)
//     } catch (error: any) {
//       console.error("Error submitting donation:", error)
//       setError(error.message || "Unable to process your donation. Please check your information and try again.")
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const RequiredStar = () => <span className="text-red-500 ml-0.5">*</span>

//   const ErrorMessage = ({ field }: { field: string }) => {
//     const isInvalid = touchedFields.has(field) && !formData[field as keyof DonationFormData]
//     if (!isInvalid) return null
//     return (
//       <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
//         <AlertCircle className="w-3 h-3" />
//         This field is required
//       </p>
//     )
//   }

//   const renderStep1 = () => (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-2xl font-bold">Select Payment Method</h2>
//         <p className="text-sm text-muted-foreground">Choose how you would like to make your donation</p>
//       </div>

//       <div className="space-y-4">
//         <Label className="font-medium">
//           Payment Type <RequiredStar />
//         </Label>
//         <RadioGroup 
//           value={formData.paymentType} 
//           onValueChange={(value) => updateForm("paymentType", value)}
//         >
//           <div className="grid gap-3">
//             {paymentTypes.map((type) => (
//               <div key={type.value}>
//                 <RadioGroupItem value={type.value} id={type.value} className="peer sr-only" />
//                 <Label
//                   htmlFor={type.value}
//                   className={`flex p-4 border rounded-lg cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 ${
//                     touchedFields.has("paymentType") && !formData.paymentType ? "border-red-500 bg-red-50/50" : ""
//                   }`}
//                 >
//                   <type.icon className="h-6 w-6" />
//                   <div className="ml-3">
//                     <p className="font-medium">{type.label}</p>
//                     <p className="text-sm text-muted-foreground">{type.description}</p>
//                   </div>
//                 </Label>
//               </div>
//             ))}
//           </div>
//         </RadioGroup>
//         <ErrorMessage field="paymentType" />
//       </div>

//       {formData.paymentType && (
//         <div className="space-y-4">
//           <Label className="font-medium">
//             Payment Method <RequiredStar />
//           </Label>
//           <Select 
//             value={formData.paymentMethod} 
//             onValueChange={(value) => updateForm("paymentMethod", value)}
//             onOpenChange={() => markFieldTouched("paymentMethod")}
//           >
//             <SelectTrigger className={touchedFields.has("paymentMethod") && !formData.paymentMethod ? "border-red-500" : ""}>
//               <SelectValue placeholder="Select method" />
//             </SelectTrigger>
//             <SelectContent>
//               {getPaymentMethods().map((method) => (
//                 <SelectItem key={method.value} value={method.value}>
//                   {method.label}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//           <ErrorMessage field="paymentMethod" />
//         </div>
//       )}

//       <div className="flex justify-end gap-3">
//         <Button onClick={goNext} size="lg" disabled={!isStep1Valid()}>
//           Next <ArrowRight className="ml-2 w-4 h-4" />
//         </Button>
//       </div>
//     </div>
//   )

//   const renderStep2 = () => (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-2xl font-bold">Donation Details</h2>
//         <p className="text-sm text-muted-foreground">
//           Provide your donor information based on the selected payment type and method.
//         </p>
//       </div>
      
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//         <div className="rounded-lg border border-border bg-secondary p-3">
//           <p className="text-xs uppercase text-muted-foreground">Payment Type</p>
//           <p className="font-semibold capitalize">{formData.paymentType || "Not selected"}</p>
//         </div>
//         <div className="rounded-lg border border-border bg-secondary p-3">
//           <p className="text-xs uppercase text-muted-foreground">Payment Method</p>
//           <p className="font-semibold capitalize">{formData.paymentMethod?.replace(/_/g, ' ') || "Not selected"}</p>
//         </div>
//       </div>

//       <div className="space-y-2">
//         <Label>
//           Select Program <RequiredStar />
//         </Label>
//         <Select 
//           value={formData.program} 
//           onValueChange={(value) => updateForm("program", value)}
//         >
//           <SelectTrigger>
//             <SelectValue placeholder="Select a program to support" />
//           </SelectTrigger>
//           <SelectContent>
//             {programs.map((program) => (
//               <SelectItem key={program.value} value={program.value}>
//                 {program.label}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>

//       <div className="space-y-2">
//         <Label>
//           Donation Frequency <RequiredStar />
//         </Label>
//         <RadioGroup 
//           value={formData.frequency} 
//           onValueChange={(value) => updateForm("frequency", value)}
//           className="flex gap-4"
//         >
//           <div className="flex items-center space-x-2">
//             <RadioGroupItem value="one-time" id="one-time" />
//             <Label htmlFor="one-time">One-time</Label>
//           </div>
//           <div className="flex items-center space-x-2">
//             <RadioGroupItem value="monthly" id="monthly" />
//             <Label htmlFor="monthly">Monthly</Label>
//           </div>
//         </RadioGroup>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <Label>
//             Full Name <RequiredStar />
//           </Label>
//           <Input
//             value={formData.fullName}
//             onChange={(e) => updateForm("fullName", e.target.value)}
//             onBlur={() => markFieldTouched("fullName")}
//             placeholder="John Doe"
//             className={touchedFields.has("fullName") && !formData.fullName ? "border-red-500" : ""}
//           />
//           <ErrorMessage field="fullName" />
//         </div>
//         <div className="space-y-2">
//           <Label>
//             Phone Number <RequiredStar />
//           </Label>
//           <Input
//             value={formData.phoneNumber}
//             onChange={(e) => updateForm("phoneNumber", e.target.value)}
//             onBlur={() => markFieldTouched("phoneNumber")}
//             placeholder={formData.paymentType === "ethiopian" ? "+251911234567" : "+1 555 123 4567"}
//             className={touchedFields.has("phoneNumber") && !formData.phoneNumber ? "border-red-500" : ""}
//           />
//           <ErrorMessage field="phoneNumber" />
//         </div>
//       </div>

//       {formData.paymentType === "international" && (
//         <>
//           <div className="space-y-2">
//             <Label>
//               Email Address <RequiredStar />
//             </Label>
//             <Input
//               type="email"
//               value={formData.email}
//               onChange={(e) => updateForm("email", e.target.value)}
//               onBlur={() => markFieldTouched("email")}
//               placeholder="your@email.com"
//               className={touchedFields.has("email") && !formData.email ? "border-red-500" : ""}
//             />
//             <ErrorMessage field="email" />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label>Street Address</Label>
//               <Input
//                 value={formData.streetAddress}
//                 onChange={(e) => updateForm("streetAddress", e.target.value)}
//                 placeholder="123 Main St"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>City</Label>
//               <Input
//                 value={formData.city}
//                 onChange={(e) => updateForm("city", e.target.value)}
//                 placeholder="New York"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>Country</Label>
//               <Input
//                 value={formData.country}
//                 onChange={(e) => updateForm("country", e.target.value)}
//                 placeholder="USA"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>Postal Code</Label>
//               <Input
//                 value={formData.postalCode}
//                 onChange={(e) => updateForm("postalCode", e.target.value)}
//                 placeholder="10001"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label>Bank Name</Label>
//               <Input
//                 value={formData.bankName}
//                 onChange={(e) => updateForm("bankName", e.target.value)}
//                 placeholder="Bank of America"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>Account Number / IBAN</Label>
//               <Input
//                 value={formData.accountNumber}
//                 onChange={(e) => updateForm("accountNumber", e.target.value)}
//                 placeholder="GB29NWBK60161331926819"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label>SWIFT/BIC Code</Label>
//               <Input
//                 value={formData.swiftCode}
//                 onChange={(e) => updateForm("swiftCode", e.target.value)}
//                 placeholder="NWBKGB2L"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>Bank Address (Optional)</Label>
//               <Input
//                 value={formData.bankAddress}
//                 onChange={(e) => updateForm("bankAddress", e.target.value)}
//                 placeholder="123 Bank St"
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label>Purpose of Payment</Label>
//             <Input
//               value={formData.purposeOfPayment}
//               onChange={(e) => updateForm("purposeOfPayment", e.target.value)}
//               placeholder="Donation for education program"
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label>Company Name (Optional)</Label>
//               <Input
//                 value={formData.companyName}
//                 onChange={(e) => updateForm("companyName", e.target.value)}
//                 placeholder="Company, LLC"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>Tax ID / National ID (Optional)</Label>
//               <Input
//                 value={formData.taxId}
//                 onChange={(e) => updateForm("taxId", e.target.value)}
//                 placeholder="123456789"
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label>Intermediary Bank Details (Optional)</Label>
//             <Textarea
//               value={formData.intermediaryBank}
//               onChange={(e) => updateForm("intermediaryBank", e.target.value)}
//               placeholder="JP Morgan Chase"
//               rows={3}
//             />
//           </div>
//         </>
//       )}

//       {formData.paymentType === "ethiopian" && formData.paymentMethod === "bank_transfer" && (
//         <>
//           <div className="space-y-2">
//             <Label>
//               Account Holder Name <RequiredStar />
//             </Label>
//             <Input
//               value={formData.accountHolderName}
//               onChange={(e) => updateForm("accountHolderName", e.target.value)}
//               onBlur={() => markFieldTouched("accountHolderName")}
//               placeholder="John Doe"
//               className={touchedFields.has("accountHolderName") && !formData.accountHolderName ? "border-red-500" : ""}
//             />
//             <ErrorMessage field="accountHolderName" />
//           </div>
//           <div className="space-y-2">
//             <Label>
//               Bank Name <RequiredStar />
//             </Label>
//             <Input
//               value={formData.bankName}
//               onChange={(e) => updateForm("bankName", e.target.value)}
//               onBlur={() => markFieldTouched("bankName")}
//               placeholder="CBE"
//               className={touchedFields.has("bankName") && !formData.bankName ? "border-red-500" : ""}
//             />
//             <ErrorMessage field="bankName" />
//           </div>
//           <div className="space-y-2">
//             <Label>
//               Account Number <RequiredStar />
//             </Label>
//             <Input
//               value={formData.accountNumber}
//               onChange={(e) => updateForm("accountNumber", e.target.value)}
//               onBlur={() => markFieldTouched("accountNumber")}
//               placeholder="1000123456789"
//               className={touchedFields.has("accountNumber") && !formData.accountNumber ? "border-red-500" : ""}
//             />
//             <ErrorMessage field="accountNumber" />
//           </div>
//         </>
//       )}

//       {formData.paymentType === "ethiopian" && formData.paymentMethod === "mobile_money" && (
//         <>
//           <div className="space-y-2">
//             <Label>
//               Mobile Wallet Provider <RequiredStar />
//             </Label>
//             <Select 
//               value={formData.mobileWalletProvider} 
//               onValueChange={(value) => updateForm("mobileWalletProvider", value)}
//               onOpenChange={() => markFieldTouched("mobileWalletProvider")}
//             >
//               <SelectTrigger className={touchedFields.has("mobileWalletProvider") && !formData.mobileWalletProvider ? "border-red-500" : ""}>
//                 <SelectValue placeholder="Select provider" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="telebirr">Telebirr</SelectItem>
//                 <SelectItem value="cbe_mobile">CBE Mobile</SelectItem>
//                 <SelectItem value="other">Other</SelectItem>
//               </SelectContent>
//             </Select>
//             <ErrorMessage field="mobileWalletProvider" />
//           </div>
//           <div className="space-y-2">
//             <Label>
//               Registered Phone Number <RequiredStar />
//             </Label>
//             <Input
//               value={formData.registeredPhoneNumber}
//               onChange={(e) => updateForm("registeredPhoneNumber", e.target.value)}
//               onBlur={() => markFieldTouched("registeredPhoneNumber")}
//               placeholder="+251911234567"
//               className={touchedFields.has("registeredPhoneNumber") && !formData.registeredPhoneNumber ? "border-red-500" : ""}
//             />
//             <ErrorMessage field="registeredPhoneNumber" />
//           </div>
//         </>
//       )}

//       <div className="flex justify-between gap-3">
//         <Button variant="outline" onClick={goBack}>
//           <ArrowLeft className="mr-2 w-4 h-4" /> Back
//         </Button>
//         <Button onClick={goNext} disabled={!isStep2Valid()}>
//           Next <ArrowRight className="ml-2 w-4 h-4" />
//         </Button>
//       </div>
//     </div>
//   )

//   const renderStep3 = () => (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-2xl font-bold">Payment Details</h2>
//         <p className="text-sm text-muted-foreground">Enter payment-specific fields according to selected method</p>
//       </div>

//       <div className="space-y-4">
//         <div className="space-y-2">
//           <Label>
//             Payment Amount <RequiredStar />
//           </Label>
//           <Input
//             type="number"
//             step="0.01"
//             value={formData.paymentAmount}
//             onChange={(e) => updateForm("paymentAmount", e.target.value)}
//             onBlur={() => markFieldTouched("paymentAmount")}
//             placeholder="100.00"
//             className={touchedFields.has("paymentAmount") && !formData.paymentAmount ? "border-red-500" : ""}
//           />
//           <ErrorMessage field="paymentAmount" />
//         </div>

//         <div className="space-y-2">
//           <Label>Currency</Label>
//           <Select value={formData.currency} onValueChange={(value) => updateForm("currency", value)}>
//             <SelectTrigger>
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="USD">USD</SelectItem>
//               <SelectItem value="EUR">EUR</SelectItem>
//               <SelectItem value="ETB">ETB</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       {formData.paymentMethod === "credit_card" && (
//         <div className="space-y-4">
//           <p className="text-sm text-muted-foreground">Enter your card details. Card must be in donor name.</p>
//           <div className="space-y-2">
//             <Label>
//               Card Number <RequiredStar />
//             </Label>
//             <Input
//               value={formData.cardNumber}
//               onChange={(e) => updateForm("cardNumber", e.target.value)}
//               onBlur={() => markFieldTouched("cardNumber")}
//               placeholder="1234 5678 9012 3456"
//               maxLength={19}
//               className={touchedFields.has("cardNumber") && !formData.cardNumber ? "border-red-500" : ""}
//             />
//             <ErrorMessage field="cardNumber" />
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label>
//                 Expiration Date <RequiredStar />
//               </Label>
//               <Input
//                 value={formData.expirationDate}
//                 onChange={(e) => updateForm("expirationDate", e.target.value)}
//                 onBlur={() => markFieldTouched("expirationDate")}
//                 placeholder="MM/YY"
//                 maxLength={5}
//                 className={touchedFields.has("expirationDate") && !formData.expirationDate ? "border-red-500" : ""}
//               />
//               <ErrorMessage field="expirationDate" />
//             </div>
//             <div className="space-y-2">
//               <Label>
//                 CVV <RequiredStar />
//               </Label>
//               <Input
//                 value={formData.cvv}
//                 onChange={(e) => updateForm("cvv", e.target.value)}
//                 onBlur={() => markFieldTouched("cvv")}
//                 placeholder="123"
//                 maxLength={4}
//                 className={touchedFields.has("cvv") && !formData.cvv ? "border-red-500" : ""}
//               />
//               <ErrorMessage field="cvv" />
//             </div>
//           </div>
//         </div>
//       )}

//       {formData.paymentMethod === "paypal" && (
//         <div className="space-y-4">
//           <p className="text-sm text-muted-foreground">Enter your PayPal account details to receive payment instructions.</p>
//           <div className="space-y-2">
//             <Label>
//               PayPal Email <RequiredStar />
//             </Label>
//             <Input
//               type="email"
//               value={formData.paypalEmail}
//               onChange={(e) => updateForm("paypalEmail", e.target.value)}
//               onBlur={() => markFieldTouched("paypalEmail")}
//               placeholder="your@email.com"
//               className={touchedFields.has("paypalEmail") && !formData.paypalEmail ? "border-red-500" : ""}
//             />
//             <ErrorMessage field="paypalEmail" />
//           </div>
//         </div>
//       )}

//       {(formData.paymentMethod === "bank_transfer" || formData.paymentMethod === "mobile_money") && (
//         <div className="space-y-4">
//           <p className="text-sm text-muted-foreground">
//             For bank/mobile transfer, ensure details match registered account and phone.
//           </p>

//           {formData.paymentMethod === "bank_transfer" && (
//             <> 
//               <div className="space-y-2">
//                 <Label>
//                   Bank Name <RequiredStar />
//                 </Label>
//                 <Input
//                   value={formData.bankName}
//                   onChange={(e) => updateForm("bankName", e.target.value)}
//                   onBlur={() => markFieldTouched("bankName")}
//                   placeholder="CBE"
//                   className={touchedFields.has("bankName") && !formData.bankName ? "border-red-500" : ""}
//                 />
//                 <ErrorMessage field="bankName" />
//               </div>
//               <div className="space-y-2">
//                 <Label>
//                   Account Number <RequiredStar />
//                 </Label>
//                 <Input
//                   value={formData.accountNumber}
//                   onChange={(e) => updateForm("accountNumber", e.target.value)}
//                   onBlur={() => markFieldTouched("accountNumber")}
//                   placeholder="1000123456789"
//                   className={touchedFields.has("accountNumber") && !formData.accountNumber ? "border-red-500" : ""}
//                 />
//                 <ErrorMessage field="accountNumber" />
//               </div>
//               <div className="space-y-2">
//                 <Label>
//                   Account Holder Name <RequiredStar />
//                 </Label>
//                 <Input
//                   value={formData.accountHolderName}
//                   onChange={(e) => updateForm("accountHolderName", e.target.value)}
//                   onBlur={() => markFieldTouched("accountHolderName")}
//                   placeholder="John Doe"
//                   className={touchedFields.has("accountHolderName") && !formData.accountHolderName ? "border-red-500" : ""}
//                 />
//                 <ErrorMessage field="accountHolderName" />
//               </div>
//             </>
//           )}

//           {formData.paymentMethod === "mobile_money" && (
//             <>
//               <div className="space-y-2">
//                 <Label>
//                   Mobile Wallet Provider <RequiredStar />
//                 </Label>
//                 <Input
//                   value={formData.mobileWalletProvider}
//                   onChange={(e) => updateForm("mobileWalletProvider", e.target.value)}
//                   onBlur={() => markFieldTouched("mobileWalletProvider")}
//                   placeholder="Telebirr"
//                   className={touchedFields.has("mobileWalletProvider") && !formData.mobileWalletProvider ? "border-red-500" : ""}
//                 />
//                 <ErrorMessage field="mobileWalletProvider" />
//               </div>
//               <div className="space-y-2">
//                 <Label>
//                   Registered Phone Number <RequiredStar />
//                 </Label>
//                 <Input
//                   value={formData.registeredPhoneNumber}
//                   onChange={(e) => updateForm("registeredPhoneNumber", e.target.value)}
//                   onBlur={() => markFieldTouched("registeredPhoneNumber")}
//                   placeholder="+251911234567"
//                   className={touchedFields.has("registeredPhoneNumber") && !formData.registeredPhoneNumber ? "border-red-500" : ""}
//                 />
//                 <ErrorMessage field="registeredPhoneNumber" />
//               </div>
//             </>
//           )}
//         </div>
//       )}

//       <div className="flex justify-between gap-3">
//         <Button variant="outline" onClick={goBack}>
//           <ArrowLeft className="mr-2 w-4 h-4" /> Back
//         </Button>
//         <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
//           {isSubmitting ? (
//             <>
//               <Loader2 className="mr-2 w-4 h-4 animate-spin" />
//               Processing...
//             </>
//           ) : (
//             <>
//               <CheckCircle className="mr-2 w-4 h-4" />
//               Complete Donation
//             </>
//           )}
//         </Button>
//       </div>
//     </div>
//   )

//   return (
//     <main
//       className="min-h-screen p-6"
//       style={{
//         backgroundImage: "radial-gradient(circle at 15% 15%, rgba(96,165,250,0.25), transparent 40%), radial-gradient(circle at 90% 30%, rgba(14,165,233,0.2), transparent 50%), linear-gradient(to bottom, #eef2ff, #f9fafb)",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       <div className="mx-auto max-w-4xl">
//         <Card className="shadow-2xl border border-blue-200/70 bg-white/90 backdrop-blur-sm rounded-3xl">
//           <CardContent className="space-y-6 p-8 rounded-3xl ring-1 ring-blue-100/30">
//             <div className="space-y-2">
//               <div className="flex items-center gap-2">
//                 {[1,2,3].map((step) => (
//                   <Badge
//                     key={step}
//                     variant={currentStep === step ? "secondary" : "outline"}
//                     className="px-3 py-1"
//                   >
//                     Step {step}
//                   </Badge>
//                 ))}
//               </div>
//               <div className="space-y-1">
//                 <p className="text-xs uppercase tracking-wide text-muted-foreground">Step {currentStep} of 3</p>
//                 <h1 className="text-3xl font-bold">Make a Donation</h1>
//                 <p className="text-muted-foreground">Your generosity helps transform lives across Ethiopia.</p>
//               </div>
//             </div>

//             {/* Error Alert */}
//             {error && (
//               <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
//                 <XCircle className="h-4 w-4" />
//                 <AlertDescription className="ml-2">
//                   {error}
//                 </AlertDescription>
//               </Alert>
//             )}

//             <form className="space-y-6">
//               {currentStep === 1 && renderStep1()}
//               {currentStep === 2 && renderStep2()}
//               {currentStep === 3 && renderStep3()}
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </main>
//   )
// };


"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, ArrowRight, CheckCircle, CreditCard, Building2, Globe, MapPin, Smartphone, AlertCircle, Loader2, XCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface DonationFormData {
  paymentType: string
  paymentMethod: string
  fullName: string
  phoneNumber: string
  email: string
  streetAddress: string
  city: string
  country: string
  postalCode: string
  bankName: string
  bankAddress: string
  accountNumber: string
  swiftCode: string
  paymentAmount: string
  currency: string
  purposeOfPayment: string
  companyName: string
  taxId: string
  intermediaryBank: string
  accountHolderName: string
  mobileWalletProvider: string
  registeredPhoneNumber: string
  cardNumber: string
  expirationDate: string
  cvv: string
  paypalEmail: string
  program: string
  frequency: string
}

export default function DonatePage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [emailStatus, setEmailStatus] = useState<{ sending: boolean; sent: boolean }>({ sending: false, sent: false })
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set())
  const [formData, setFormData] = useState<DonationFormData>({
    paymentType: "",
    paymentMethod: "",
    fullName: "",
    phoneNumber: "",
    email: "",
    streetAddress: "",
    city: "",
    country: "",
    postalCode: "",
    bankName: "",
    bankAddress: "",
    accountNumber: "",
    swiftCode: "",
    paymentAmount: "",
    currency: "USD",
    purposeOfPayment: "",
    companyName: "",
    taxId: "",
    intermediaryBank: "",
    accountHolderName: "",
    mobileWalletProvider: "",
    registeredPhoneNumber: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    paypalEmail: "",
    program: "community",
    frequency: "one-time",
  })

  const paymentTypes = [
    { value: "international", label: "International Payments", description: "For donors outside Ethiopia", icon: Globe },
    { value: "ethiopian", label: "Ethiopian Payments", description: "For donors in Ethiopia", icon: MapPin },
  ]

  const programs = [
    { value: "children", label: "Children's Education" },
    { value: "clean water", label: "Clean Water" },
    { value: "women", label: "Women Empowerment" },
    { value: "community", label: "Community Development" },
  ]

  const getPaymentMethods = () => {
    if (formData.paymentType === "international") {
      return [
        { value: "credit_card", label: "Credit Card", icon: CreditCard },
        { value: "paypal", label: "PayPal", icon: Building2 },
        { value: "bank_transfer", label: "Bank Transfer", icon: Building2 },
      ]
    }
    if (formData.paymentType === "ethiopian") {
      return [
        { value: "bank_transfer", label: "Bank Transfer", icon: Building2 },
        { value: "mobile_money", label: "Mobile Money", icon: Smartphone },
      ]
    }
    return []
  }

  const updateForm = (field: keyof DonationFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setTouchedFields(prev => new Set(prev).add(field))
    if (error) setError(null)
  }

  const markFieldTouched = (field: keyof DonationFormData) => {
    setTouchedFields(prev => new Set(prev).add(field))
  }

  const isStep1Valid = () => {
    return formData.paymentType !== "" && formData.paymentMethod !== ""
  }

  const isStep2Valid = () => {
    if (!formData.fullName || !formData.phoneNumber) return false
    
    if (formData.paymentType === "international") {
      if (!formData.email) return false
    }
    
    if (formData.paymentType === "ethiopian" && formData.paymentMethod === "bank_transfer") {
      if (!formData.accountHolderName || !formData.bankName || !formData.accountNumber) return false
    }
    
    if (formData.paymentType === "ethiopian" && formData.paymentMethod === "mobile_money") {
      if (!formData.mobileWalletProvider || !formData.registeredPhoneNumber) return false
    }
    
    return true
  }

  const isStep3Valid = () => {
    if (!formData.paymentAmount) return false
    
    if (formData.paymentMethod === "credit_card") {
      if (!formData.cardNumber || !formData.expirationDate || !formData.cvv) return false
    }
    
    if (formData.paymentMethod === "paypal") {
      if (!formData.paypalEmail) return false
    }
    
    if (formData.paymentMethod === "bank_transfer") {
      if (!formData.bankName || !formData.accountNumber || !formData.accountHolderName) return false
    }
    
    if (formData.paymentMethod === "mobile_money") {
      if (!formData.mobileWalletProvider || !formData.registeredPhoneNumber) return false
    }
    
    return true
  }

  const goNext = () => {
    setError(null)
    if (currentStep === 1 && !isStep1Valid()) {
      setError("Please select both payment type and method to continue.")
      return
    }
    if (currentStep === 2 && !isStep2Valid()) {
      setError("Please fill in all required fields before continuing.")
      return
    }
    setCurrentStep(prev => Math.min(prev + 1, 3))
  }

  const goBack = () => {
    setError(null)
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const saveDonationToDatabase = async () => {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      const notes = `
Payment Type: ${formData.paymentType}
Payment Method: ${formData.paymentMethod}
${formData.purposeOfPayment ? `Purpose: ${formData.purposeOfPayment}` : ''}
${formData.companyName ? `Company: ${formData.companyName}` : ''}
${formData.taxId ? `Tax ID: ${formData.taxId}` : ''}
${formData.swiftCode ? `SWIFT Code: ${formData.swiftCode}` : ''}
${formData.intermediaryBank ? `Intermediary Bank: ${formData.intermediaryBank}` : ''}
${formData.bankAddress ? `Bank Address: ${formData.bankAddress}` : ''}
${formData.city ? `City: ${formData.city}` : ''}
${formData.country ? `Country: ${formData.country}` : ''}
${formData.postalCode ? `Postal Code: ${formData.postalCode}` : ''}
${formData.streetAddress ? `Street Address: ${formData.streetAddress}` : ''}
      `.trim()
      
      const externalTxId = `DON-${Date.now()}-${Math.random().toString(36).substr(2, 8)}`
      
      const donationRecord = {
        donor_name: formData.fullName,
        donor_email: formData.email || null,
        amount: parseFloat(formData.paymentAmount),
        program: formData.program,
        frequency: formData.frequency,
        external_tx_id: externalTxId,
        notes: notes,
        user_id: user?.id || null,
      }
      
      const { error } = await supabase.from("donations").insert(donationRecord)
      
      if (error) {
        console.error("Database error:", error)
        throw new Error(error.message || "Failed to save donation")
      }
      
      return externalTxId
    } catch (error: any) {
      console.error("Error in saveDonationToDatabase:", error)
      throw new Error(error.message || "Unable to process your donation. Please try again.")
    }
  }
  
  const sendThankYouEmail = async (data: {
    email: string
    name: string
    amount: number
    currency: string
    program: string
    donationId: string
    paymentMethod: string
    frequency: string
  }) => {
    try {
      const response = await fetch("/api/send-donation-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        console.error("Failed to send email:", errorData)
        return false
      }
      
      console.log("Email sent successfully")
      return true
    } catch (error) {
      console.error("Error sending email:", error)
      return false
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)
    
    if (!isStep3Valid()) {
      const step3Fields = ["paymentAmount"]
      if (formData.paymentMethod === "credit_card") {
        step3Fields.push("cardNumber", "expirationDate", "cvv")
      }
      if (formData.paymentMethod === "paypal") {
        step3Fields.push("paypalEmail")
      }
      if (formData.paymentMethod === "bank_transfer") {
        step3Fields.push("bankName", "accountNumber", "accountHolderName")
      }
      if (formData.paymentMethod === "mobile_money") {
        step3Fields.push("mobileWalletProvider", "registeredPhoneNumber")
      }
      setTouchedFields(prev => new Set([...prev, ...step3Fields]))
      setError("Please fill in all payment details before submitting.")
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Save to database
      const externalTxId = await saveDonationToDatabase()
      
      // Send thank you email if email exists
      if (formData.email) {
        setEmailStatus({ sending: true, sent: false })
        const programLabel = programs.find(p => p.value === formData.program)?.label || formData.program
        const paymentMethodLabel = getPaymentMethods().find(m => m.value === formData.paymentMethod)?.label || formData.paymentMethod
        
        await sendThankYouEmail({
          email: formData.email,
          name: formData.fullName,
          amount: parseFloat(formData.paymentAmount),
          currency: formData.currency,
          program: programLabel,
          donationId: externalTxId.slice(0, 8),
          paymentMethod: paymentMethodLabel,
          frequency: formData.frequency,
        })
        setEmailStatus({ sending: false, sent: true })
      }
      
      // Build address string
      const addressParts = [
        formData.streetAddress,
        formData.city,
        formData.country,
        formData.postalCode
      ].filter(part => part).join(", ")
      
      // Redirect to success page
      const params = new URLSearchParams({
        id: externalTxId,
        amount: formData.paymentAmount,
        method: formData.paymentMethod,
        program: formData.program,
        email: formData.email || "",
        name: formData.fullName,
        phone: formData.phoneNumber,
        address: addressParts,
        frequency: formData.frequency,
      })
      
      router.push(`/donate/success?${params.toString()}`)
      
    } catch (error: any) {
      console.error("Error submitting donation:", error)
      setError(error.message || "Unable to process your donation. Please check your information and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const RequiredStar = () => <span className="text-red-500 ml-0.5">*</span>

  const ErrorMessage = ({ field }: { field: string }) => {
    const isInvalid = touchedFields.has(field) && !formData[field as keyof DonationFormData]
    if (!isInvalid) return null
    return (
      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
        <AlertCircle className="w-3 h-3" />
        This field is required
      </p>
    )
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Select Payment Method</h2>
        <p className="text-sm text-muted-foreground">Choose how you would like to make your donation</p>
      </div>

      <div className="space-y-4">
        <Label className="font-medium">
          Payment Type <RequiredStar />
        </Label>
        <RadioGroup 
          value={formData.paymentType} 
          onValueChange={(value) => updateForm("paymentType", value)}
        >
          <div className="grid gap-3">
            {paymentTypes.map((type) => (
              <div key={type.value}>
                <RadioGroupItem value={type.value} id={type.value} className="peer sr-only" />
                <Label
                  htmlFor={type.value}
                  className={`flex p-4 border rounded-lg cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 ${
                    touchedFields.has("paymentType") && !formData.paymentType ? "border-red-500 bg-red-50/50" : ""
                  }`}
                >
                  <type.icon className="h-6 w-6" />
                  <div className="ml-3">
                    <p className="font-medium">{type.label}</p>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                  </div>
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
        <ErrorMessage field="paymentType" />
      </div>

      {formData.paymentType && (
        <div className="space-y-4">
          <Label className="font-medium">
            Payment Method <RequiredStar />
          </Label>
          <Select 
            value={formData.paymentMethod} 
            onValueChange={(value) => updateForm("paymentMethod", value)}
            onOpenChange={() => markFieldTouched("paymentMethod")}
          >
            <SelectTrigger className={touchedFields.has("paymentMethod") && !formData.paymentMethod ? "border-red-500" : ""}>
              <SelectValue placeholder="Select method" />
            </SelectTrigger>
            <SelectContent>
              {getPaymentMethods().map((method) => (
                <SelectItem key={method.value} value={method.value}>
                  {method.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <ErrorMessage field="paymentMethod" />
        </div>
      )}

      <div className="flex justify-end gap-3">
        <Button onClick={goNext} size="lg" disabled={!isStep1Valid()}>
          Next <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Donation Details</h2>
        <p className="text-sm text-muted-foreground">
          Provide your donor information based on the selected payment type and method.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-lg border border-border bg-secondary p-3">
          <p className="text-xs uppercase text-muted-foreground">Payment Type</p>
          <p className="font-semibold capitalize">{formData.paymentType || "Not selected"}</p>
        </div>
        <div className="rounded-lg border border-border bg-secondary p-3">
          <p className="text-xs uppercase text-muted-foreground">Payment Method</p>
          <p className="font-semibold capitalize">{formData.paymentMethod?.replace(/_/g, ' ') || "Not selected"}</p>
        </div>
      </div>

      <div className="space-y-2">
        <Label>
          Select Program <RequiredStar />
        </Label>
        <Select 
          value={formData.program} 
          onValueChange={(value) => updateForm("program", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a program to support" />
          </SelectTrigger>
          <SelectContent>
            {programs.map((program) => (
              <SelectItem key={program.value} value={program.value}>
                {program.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>
          Donation Frequency <RequiredStar />
        </Label>
        <RadioGroup 
          value={formData.frequency} 
          onValueChange={(value) => updateForm("frequency", value)}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="one-time" id="one-time" />
            <Label htmlFor="one-time">One-time</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="monthly" id="monthly" />
            <Label htmlFor="monthly">Monthly</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>
            Full Name <RequiredStar />
          </Label>
          <Input
            value={formData.fullName}
            onChange={(e) => updateForm("fullName", e.target.value)}
            onBlur={() => markFieldTouched("fullName")}
            placeholder="John Doe"
            className={touchedFields.has("fullName") && !formData.fullName ? "border-red-500" : ""}
          />
          <ErrorMessage field="fullName" />
        </div>
        <div className="space-y-2">
          <Label>
            Phone Number <RequiredStar />
          </Label>
          <Input
            value={formData.phoneNumber}
            onChange={(e) => updateForm("phoneNumber", e.target.value)}
            onBlur={() => markFieldTouched("phoneNumber")}
            placeholder={formData.paymentType === "ethiopian" ? "+251911234567" : "+1 555 123 4567"}
            className={touchedFields.has("phoneNumber") && !formData.phoneNumber ? "border-red-500" : ""}
          />
          <ErrorMessage field="phoneNumber" />
        </div>
      </div>

      {formData.paymentType === "international" && (
        <>
          <div className="space-y-2">
            <Label>
              Email Address <RequiredStar />
            </Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => updateForm("email", e.target.value)}
              onBlur={() => markFieldTouched("email")}
              placeholder="your@email.com"
              className={touchedFields.has("email") && !formData.email ? "border-red-500" : ""}
            />
            <ErrorMessage field="email" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Street Address</Label>
              <Input
                value={formData.streetAddress}
                onChange={(e) => updateForm("streetAddress", e.target.value)}
                placeholder="123 Main St"
              />
            </div>
            <div className="space-y-2">
              <Label>City</Label>
              <Input
                value={formData.city}
                onChange={(e) => updateForm("city", e.target.value)}
                placeholder="New York"
              />
            </div>
            <div className="space-y-2">
              <Label>Country</Label>
              <Input
                value={formData.country}
                onChange={(e) => updateForm("country", e.target.value)}
                placeholder="USA"
              />
            </div>
            <div className="space-y-2">
              <Label>Postal Code</Label>
              <Input
                value={formData.postalCode}
                onChange={(e) => updateForm("postalCode", e.target.value)}
                placeholder="10001"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Bank Name</Label>
              <Input
                value={formData.bankName}
                onChange={(e) => updateForm("bankName", e.target.value)}
                placeholder="Bank of America"
              />
            </div>
            <div className="space-y-2">
              <Label>Account Number / IBAN</Label>
              <Input
                value={formData.accountNumber}
                onChange={(e) => updateForm("accountNumber", e.target.value)}
                placeholder="GB29NWBK60161331926819"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>SWIFT/BIC Code</Label>
              <Input
                value={formData.swiftCode}
                onChange={(e) => updateForm("swiftCode", e.target.value)}
                placeholder="NWBKGB2L"
              />
            </div>
            <div className="space-y-2">
              <Label>Bank Address (Optional)</Label>
              <Input
                value={formData.bankAddress}
                onChange={(e) => updateForm("bankAddress", e.target.value)}
                placeholder="123 Bank St"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Purpose of Payment</Label>
            <Input
              value={formData.purposeOfPayment}
              onChange={(e) => updateForm("purposeOfPayment", e.target.value)}
              placeholder="Donation for education program"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Company Name (Optional)</Label>
              <Input
                value={formData.companyName}
                onChange={(e) => updateForm("companyName", e.target.value)}
                placeholder="Company, LLC"
              />
            </div>
            <div className="space-y-2">
              <Label>Tax ID / National ID (Optional)</Label>
              <Input
                value={formData.taxId}
                onChange={(e) => updateForm("taxId", e.target.value)}
                placeholder="123456789"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Intermediary Bank Details (Optional)</Label>
            <Textarea
              value={formData.intermediaryBank}
              onChange={(e) => updateForm("intermediaryBank", e.target.value)}
              placeholder="JP Morgan Chase"
              rows={3}
            />
          </div>
        </>
      )}

      {formData.paymentType === "ethiopian" && formData.paymentMethod === "bank_transfer" && (
        <>
          <div className="space-y-2">
            <Label>
              Account Holder Name <RequiredStar />
            </Label>
            <Input
              value={formData.accountHolderName}
              onChange={(e) => updateForm("accountHolderName", e.target.value)}
              onBlur={() => markFieldTouched("accountHolderName")}
              placeholder="John Doe"
              className={touchedFields.has("accountHolderName") && !formData.accountHolderName ? "border-red-500" : ""}
            />
            <ErrorMessage field="accountHolderName" />
          </div>
          <div className="space-y-2">
            <Label>
              Bank Name <RequiredStar />
            </Label>
            <Input
              value={formData.bankName}
              onChange={(e) => updateForm("bankName", e.target.value)}
              onBlur={() => markFieldTouched("bankName")}
              placeholder="CBE"
              className={touchedFields.has("bankName") && !formData.bankName ? "border-red-500" : ""}
            />
            <ErrorMessage field="bankName" />
          </div>
          <div className="space-y-2">
            <Label>
              Account Number <RequiredStar />
            </Label>
            <Input
              value={formData.accountNumber}
              onChange={(e) => updateForm("accountNumber", e.target.value)}
              onBlur={() => markFieldTouched("accountNumber")}
              placeholder="1000123456789"
              className={touchedFields.has("accountNumber") && !formData.accountNumber ? "border-red-500" : ""}
            />
            <ErrorMessage field="accountNumber" />
          </div>
        </>
      )}

      {formData.paymentType === "ethiopian" && formData.paymentMethod === "mobile_money" && (
        <>
          <div className="space-y-2">
            <Label>
              Mobile Wallet Provider <RequiredStar />
            </Label>
            <Select 
              value={formData.mobileWalletProvider} 
              onValueChange={(value) => updateForm("mobileWalletProvider", value)}
              onOpenChange={() => markFieldTouched("mobileWalletProvider")}
            >
              <SelectTrigger className={touchedFields.has("mobileWalletProvider") && !formData.mobileWalletProvider ? "border-red-500" : ""}>
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="telebirr">Telebirr</SelectItem>
                <SelectItem value="cbe_mobile">CBE Mobile</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <ErrorMessage field="mobileWalletProvider" />
          </div>
          <div className="space-y-2">
            <Label>
              Registered Phone Number <RequiredStar />
            </Label>
            <Input
              value={formData.registeredPhoneNumber}
              onChange={(e) => updateForm("registeredPhoneNumber", e.target.value)}
              onBlur={() => markFieldTouched("registeredPhoneNumber")}
              placeholder="+251911234567"
              className={touchedFields.has("registeredPhoneNumber") && !formData.registeredPhoneNumber ? "border-red-500" : ""}
            />
            <ErrorMessage field="registeredPhoneNumber" />
          </div>
        </>
      )}

      <div className="flex justify-between gap-3">
        <Button variant="outline" onClick={goBack}>
          <ArrowLeft className="mr-2 w-4 h-4" /> Back
        </Button>
        <Button onClick={goNext} disabled={!isStep2Valid()}>
          Next <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Payment Details</h2>
        <p className="text-sm text-muted-foreground">Enter payment-specific fields according to selected method</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>
            Payment Amount <RequiredStar />
          </Label>
          <Input
            type="number"
            step="0.01"
            value={formData.paymentAmount}
            onChange={(e) => updateForm("paymentAmount", e.target.value)}
            onBlur={() => markFieldTouched("paymentAmount")}
            placeholder="100.00"
            className={touchedFields.has("paymentAmount") && !formData.paymentAmount ? "border-red-500" : ""}
          />
          <ErrorMessage field="paymentAmount" />
        </div>

        <div className="space-y-2">
          <Label>Currency</Label>
          <Select value={formData.currency} onValueChange={(value) => updateForm("currency", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="ETB">ETB</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {formData.paymentMethod === "credit_card" && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Enter your card details. Card must be in donor name.</p>
          <div className="space-y-2">
            <Label>
              Card Number <RequiredStar />
            </Label>
            <Input
              value={formData.cardNumber}
              onChange={(e) => updateForm("cardNumber", e.target.value)}
              onBlur={() => markFieldTouched("cardNumber")}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className={touchedFields.has("cardNumber") && !formData.cardNumber ? "border-red-500" : ""}
            />
            <ErrorMessage field="cardNumber" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                Expiration Date <RequiredStar />
              </Label>
              <Input
                value={formData.expirationDate}
                onChange={(e) => updateForm("expirationDate", e.target.value)}
                onBlur={() => markFieldTouched("expirationDate")}
                placeholder="MM/YY"
                maxLength={5}
                className={touchedFields.has("expirationDate") && !formData.expirationDate ? "border-red-500" : ""}
              />
              <ErrorMessage field="expirationDate" />
            </div>
            <div className="space-y-2">
              <Label>
                CVV <RequiredStar />
              </Label>
              <Input
                value={formData.cvv}
                onChange={(e) => updateForm("cvv", e.target.value)}
                onBlur={() => markFieldTouched("cvv")}
                placeholder="123"
                maxLength={4}
                className={touchedFields.has("cvv") && !formData.cvv ? "border-red-500" : ""}
              />
              <ErrorMessage field="cvv" />
            </div>
          </div>
        </div>
      )}

      {formData.paymentMethod === "paypal" && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Enter your PayPal account details to receive payment instructions.</p>
          <div className="space-y-2">
            <Label>
              PayPal Email <RequiredStar />
            </Label>
            <Input
              type="email"
              value={formData.paypalEmail}
              onChange={(e) => updateForm("paypalEmail", e.target.value)}
              onBlur={() => markFieldTouched("paypalEmail")}
              placeholder="your@email.com"
              className={touchedFields.has("paypalEmail") && !formData.paypalEmail ? "border-red-500" : ""}
            />
            <ErrorMessage field="paypalEmail" />
          </div>
        </div>
      )}

      {(formData.paymentMethod === "bank_transfer" || formData.paymentMethod === "mobile_money") && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            For bank/mobile transfer, ensure details match registered account and phone.
          </p>

          {formData.paymentMethod === "bank_transfer" && (
            <> 
              <div className="space-y-2">
                <Label>
                  Bank Name <RequiredStar />
                </Label>
                <Input
                  value={formData.bankName}
                  onChange={(e) => updateForm("bankName", e.target.value)}
                  onBlur={() => markFieldTouched("bankName")}
                  placeholder="CBE"
                  className={touchedFields.has("bankName") && !formData.bankName ? "border-red-500" : ""}
                />
                <ErrorMessage field="bankName" />
              </div>
              <div className="space-y-2">
                <Label>
                  Account Number <RequiredStar />
                </Label>
                <Input
                  value={formData.accountNumber}
                  onChange={(e) => updateForm("accountNumber", e.target.value)}
                  onBlur={() => markFieldTouched("accountNumber")}
                  placeholder="1000123456789"
                  className={touchedFields.has("accountNumber") && !formData.accountNumber ? "border-red-500" : ""}
                />
                <ErrorMessage field="accountNumber" />
              </div>
              <div className="space-y-2">
                <Label>
                  Account Holder Name <RequiredStar />
                </Label>
                <Input
                  value={formData.accountHolderName}
                  onChange={(e) => updateForm("accountHolderName", e.target.value)}
                  onBlur={() => markFieldTouched("accountHolderName")}
                  placeholder="John Doe"
                  className={touchedFields.has("accountHolderName") && !formData.accountHolderName ? "border-red-500" : ""}
                />
                <ErrorMessage field="accountHolderName" />
              </div>
            </>
          )}

          {formData.paymentMethod === "mobile_money" && (
            <>
              <div className="space-y-2">
                <Label>
                  Mobile Wallet Provider <RequiredStar />
                </Label>
                <Input
                  value={formData.mobileWalletProvider}
                  onChange={(e) => updateForm("mobileWalletProvider", e.target.value)}
                  onBlur={() => markFieldTouched("mobileWalletProvider")}
                  placeholder="Telebirr"
                  className={touchedFields.has("mobileWalletProvider") && !formData.mobileWalletProvider ? "border-red-500" : ""}
                />
                <ErrorMessage field="mobileWalletProvider" />
              </div>
              <div className="space-y-2">
                <Label>
                  Registered Phone Number <RequiredStar />
                </Label>
                <Input
                  value={formData.registeredPhoneNumber}
                  onChange={(e) => updateForm("registeredPhoneNumber", e.target.value)}
                  onBlur={() => markFieldTouched("registeredPhoneNumber")}
                  placeholder="+251911234567"
                  className={touchedFields.has("registeredPhoneNumber") && !formData.registeredPhoneNumber ? "border-red-500" : ""}
                />
                <ErrorMessage field="registeredPhoneNumber" />
              </div>
            </>
          )}
        </div>
      )}

      <div className="flex justify-between gap-3">
        <Button variant="outline" onClick={goBack}>
          <ArrowLeft className="mr-2 w-4 h-4" /> Back
        </Button>
        <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CheckCircle className="mr-2 w-4 h-4" />
              Complete Donation
            </>
          )}
        </Button>
      </div>
    </div>
  )

  return (
    <main
      className="min-h-screen p-6 relative overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(96, 165, 250, 0.2) 50%, rgba(139, 92, 246, 0.15) 100%),
          radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
          linear-gradient(to bottom, #f0f9ff, #e0f2fe, #f0f9ff)
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "scroll",
      }}
    >
      {/* Animated overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-indigo-900/20 animate-pulse"></div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-200/40 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-purple-200/30 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-indigo-200/50 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}></div>
        <div className="absolute bottom-1/4 right-1/2 w-2 h-2 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '4.5s' }}></div>

        {/* Geometric shapes */}
        <div className="absolute top-1/6 left-1/6 w-3 h-3 border border-white/20 rotate-45 animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-2/3 right-1/5 w-2 h-2 border border-blue-200/30 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/5 left-1/2 w-1 h-4 bg-gradient-to-b from-purple-300/20 to-transparent animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/8 w-2 h-2 bg-indigo-300/25 rounded-full animate-glow" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Subtle moving gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer pointer-events-none" style={{ backgroundSize: '200% 100%' }}></div>
      {/* Header with Logo */}
      <div className="mx-auto max-w-4xl mb-6 relative z-10">
        <div className="flex justify-center">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <ArrowRight className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-serif text-xl font-bold text-foreground">
              SHAPE<span className="text-primary">thiopia</span>
            </span>
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-4xl">
        <Card className="shadow-2xl border border-blue-200/70 bg-white/90 backdrop-blur-sm rounded-3xl">
          <CardContent className="space-y-6 p-8 rounded-3xl ring-1 ring-blue-100/30">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {[1,2,3].map((step) => (
                  <Badge
                    key={step}
                    variant={currentStep === step ? "secondary" : "outline"}
                    className="px-3 py-1"
                  >
                    Step {step}
                  </Badge>
                ))}
              </div>
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Step {currentStep} of 3</p>
                <h1 className="text-3xl font-bold">Make a Donation</h1>
                <p className="text-muted-foreground">Your generosity helps transform lives across Ethiopia.</p>
              </div>
            </div>

            {error && (
              <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
                <XCircle className="h-4 w-4" />
                <AlertDescription className="ml-2">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <form className="space-y-6">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
};







