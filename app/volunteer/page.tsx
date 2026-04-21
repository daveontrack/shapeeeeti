"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Spinner } from "@/components/ui/spinner"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { createClient } from "@/lib/supabase/client"
import { Globe, MapPin, Handshake, Building2, Users, Heart, Clock, CheckCircle, ArrowRight, Mail, CheckCircle2, AlertCircle } from "lucide-react"

export const dynamic = "force-dynamic"

const volunteerOptions = [
  {
    id: "global",
    icon: Globe,
    title: "Global Volunteer",
    description: "Support our mission remotely through skills-based volunteering, fundraising, or awareness campaigns.",
    commitment: "Flexible hours",
    features: [
      "Remote work opportunities",
      "Use your professional skills",
      "Flexible scheduling",
      "Regular team meetings",
    ],
  },
  {
    id: "visit",
    icon: MapPin,
    title: "Visit Our Centers",
    description: "Experience our work firsthand by visiting one of our six centers in Ethiopia for a short-term mission trip.",
    commitment: "1-4 weeks",
    features: [
      "Immersive cultural experience",
      "Direct community engagement",
      "Accommodation provided",
      "Guided orientation program",
    ],
  },
  {
    id: "partner",
    icon: Handshake,
    title: "Become a Partner",
    description: "Organizations and businesses can partner with us for corporate social responsibility initiatives.",
    commitment: "Ongoing",
    features: [
      "Corporate volunteering programs",
      "Matched giving opportunities",
      "Brand partnership benefits",
      "Impact reporting",
    ],
  },
  {
    id: "sponsor",
    icon: Building2,
    title: "Become a Sponsor",
    description: "Sponsor a child, program, or center to provide sustained support for our community initiatives.",
    commitment: "Monthly/Annual",
    features: [
      "Direct impact on lives",
      "Regular progress updates",
      "Personal connection with beneficiaries",
      "Tax-deductible contributions",
    ],
  },
]

type FormErrors = {
  name?: string
  email?: string
  interest?: string
  message?: string
}

const interestLabels: Record<string, string> = {
  global: "Global Volunteer",
  visit: "Visit Centers",
  partner: "Partnership",
  sponsor: "Sponsorship",
}

export default function VolunteerPage() {
  const { toast } = useToast()
  const searchParams = useSearchParams()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  })

  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  useEffect(() => {
    const hash = window.location.hash.replace("#", "")
    if (hash && ["global", "visit", "partner", "sponsor"].includes(hash)) {
      setFormData(prev => ({ ...prev, interest: hash }))
      setSelectedOption(hash)
      setTimeout(() => {
        document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }
  }, [searchParams])

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.interest) newErrors.interest = "Please select an area of interest"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return toast({ title: "Validation Error", description: "Please fix the errors.", variant: "destructive" })

    setIsSubmitting(true)
    try {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      const user = session?.user ?? null
      const nameParts = formData.name.trim().split(" ")
      const firstName = nameParts[0]
      const lastName = nameParts.slice(1).join(" ") || ""

      const { error } = await supabase.from("volunteer_applications").insert({
        user_id: user?.id || null,
        first_name: firstName,
        last_name: lastName,
        email: formData.email,
        phone: formData.phone || null,
        interests: formData.interest || null,
        motivation: formData.message || null,
        status: "pending",
      })

      if (error) throw error

      // Send email notification
      await fetch('/api/volunteer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          interest: interestLabels[formData.interest] || formData.interest,
          message: formData.message,
        }),
      })

      setIsSubmitted(true)
      setFormData({ name: "", email: "", phone: "", interest: "", message: "" })
      setErrors({})
      setTimeout(() => document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" }), 100)
    } catch (err) {
      console.error(err)
      toast({ title: "Submission Failed", description: "Please try again.", variant: "destructive" })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Navigation />

      {/* Hero */}
      <section className="bg-secondary py-24 text-center">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-6">Join Our Mission</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          There are many ways to contribute to our work. Whether through volunteering, partnerships, or sponsorship, your involvement makes a real difference.
        </p>
      </section>

      {/* Volunteer Options */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
          {volunteerOptions.map(option => (
            <Card key={option.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <option.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-serif text-xl">{option.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" /> {option.commitment}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription>{option.description}</CardDescription>
                <ul className="space-y-2">
                  {option.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary" /> {f}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full mt-4"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, interest: option.id }))
                    setSelectedOption(option.id)
                    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-24">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="font-serif text-3xl font-bold text-center mb-6">
            {selectedOption ? `Apply for ${interestLabels[selectedOption]}` : "Volunteer Application"}
          </h2>
          {isSubmitted ? (
            <Alert className="border-primary/20 bg-primary/5">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <AlertTitle>Thank you for your interest!</AlertTitle>
              <AlertDescription>
                Your application has been submitted. We will contact you within 48 hours.
                <Button variant="outline" onClick={() => setIsSubmitted(false)} className="mt-4">Submit Another Application</Button>
              </AlertDescription>
            </Alert>
          ) : (
            <Card className="border-0 shadow-xl">
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={e => handleInputChange("name", e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={e => handleInputChange("email", e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={e => handleInputChange("phone", e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Label htmlFor="interest">Area of Interest *</Label>
                      <Select
                        value={formData.interest}
                        onValueChange={v => handleInputChange("interest", v)}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="global">Global Volunteer</SelectItem>
                          <SelectItem value="visit">Visit Centers</SelectItem>
                          <SelectItem value="partner">Partnership</SelectItem>
                          <SelectItem value="sponsor">Sponsorship</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Tell Us About Yourself</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      placeholder="Share your background, skills, and motivation..."
                      value={formData.message}
                      onChange={e => handleInputChange("message", e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? <Spinner className="mr-2" /> : <Mail className="mr-2 h-5 w-5" />}
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}
