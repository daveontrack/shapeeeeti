'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users, Handshake, Building2 } from "lucide-react"
import { useAuthRedirect } from "@/hooks/use-auth-redirect"

const actions = [
  {
    icon: Users,
    title: "Become a Volunteer",
    description: "Join our team of dedicated volunteers making a difference in Ethiopia.",
    href: "/volunteer",
    buttonText: "Join Us",
    variant: "default" as const,
    action: "volunteer",
  },
  {
    icon: Handshake,
    title: "Partner With Us",
    description: "Organizations and businesses can create lasting impact through partnership.",
    href: "/volunteer#partner",
    buttonText: "Become a Partner",
    variant: "outline" as const,
    action: "volunteer",
  },
  {
    icon: Building2,
    title: "Visit Our Centers",
    description: "Experience our work firsthand by visiting one of our community centers.",
    href: "/volunteer#visit",
    buttonText: "Plan a Visit",
    variant: "outline" as const,
    action: "volunteer",
  },
]

export function CTASection() {
  const { redirectToLoginIfNeeded } = useAuthRedirect()
  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Get Involved
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-3 mb-6">
            Join Us in Making a Difference
          </h2>
          <p className="text-muted-foreground text-lg">
            There are many ways to support our mission. Whether through donations, 
            volunteering, or partnerships, your contribution matters.
          </p>
        </div>

        {/* Actions Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {actions.map((action) => (
            <div
              key={action.title}
              className="bg-card rounded-2xl p-8 text-center hover:shadow-lg transition-shadow border"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <action.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                {action.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                {action.description}
              </p>
              <Button variant={action.variant} onClick={() => redirectToLoginIfNeeded(action.href)} className="w-full">
                {action.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
