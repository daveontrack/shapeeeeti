import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Target, Eye, Heart, Users, Shield, Handshake, Award, 
  ArrowRight, CheckCircle, TrendingUp, 
  Bolt,
  Star
} from "lucide-react"

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about SHAPEthiopia's mission, vision, values, and 18+ years of community development work across Ethiopia. Meet our team and understand our approach.",
}

const values = [
  {
    icon: Heart,
    title: "Compassion",
    description: "We approach every child, woman, and community with empathy and genuine care for their wellbeing.",
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "We uphold honesty, accountability, and the highest ethical standards in everything we do.",
  },
  {
    icon: Handshake,
    title: "Collaboration",
    description: "We partner with individuals, organizations, and communities to create meaningful and lasting impact.",
  },
  {
    icon: TrendingUp,
    title: "Empowerment",
    description: "We support children and women to reach their potential and achieve self-reliance.",
  },
  {
    icon: Users,
    title: "Equity",
    description: "We work with the most vulnerable and marginalized with fairness, ensuring everyone has equal opportunities.",
  },
  {
    icon: Star,
    title: "Respect",
    description: "We value the dignity, diversity, and unique contributions of every individual we serve.",
  },
  {
    icon: Bolt,
    title: "Hard Work & Courage",
    description: "We face challenges with perseverance, boldness, and determination to achieve the best outcomes.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "We operate openly and honestly, keeping our actions and decisions visible to all stakeholders.",
  },
];

const milestones = [
  { year: "2006", title: "Founded", description: "SHAPEthiopia established with the first H.O.P.E. Center in Shanto to support 150 children and widows." },
  { year: "2010", title: "Dale H.O.P.E. Center", description: "Opened Dale Center serving 150 orphaned and vulnerable children, providing education, meals, and medical care." },
  { year: "2011", title: "Humbo/Tebela Center", description: "Launched Humbo/Tebela Center enrolling 150 children with full educational and care support." },
  { year: "2016", title: "Boricha H.O.P.E. Center", description: "Started Boricha Center, providing 150 children with education, nutrition, and hygiene programs." },
  { year: "2016", title: "Hawassa H.O.P.E. Center", description: "Opened Hawassa Center serving vulnerable children in Tabor Sub-City, including daily meals and full sponsorship model." },
  { year: "2019", title: "Arba Minch Center", description: "Expanded to Arba Minch H.O.P.E. Center focusing on youth development and community programs." },
  { year: "2024", title: "20,000+ Impact", description: "SHAPEthiopia programs now positively impact over 20,000 children, women, and community members across multiple centers." },

  { year: "2025", title: "Digital Transformation", description: "Introduced digital management systems for child sponsorship, education tracking, and donor engagement to improve efficiency and transparency." },
  { year: "2026", title: "New Regional Expansion", description: "Launched additional H.O.P.E. Center in a new region, extending services to underserved rural communities." },
  { year: "2027", title: "Education Excellence Program", description: "Initiated advanced tutoring, STEM education, and scholarship programs to support high-achieving students." },
  { year: "2028", title: "Women Empowerment Initiative", description: "Expanded programs to empower women through vocational training, small business support, and financial literacy." },
  { year: "2029", title: "Health & Nutrition Scale-Up", description: "Enhanced healthcare services including mental health support, nutrition programs, and partnerships with local clinics." },
  { year: "2030", title: "50,000+ Lives Impacted", description: "Reached a milestone of positively impacting over 50,000 individuals through sustainable community development programs." },
];


const leadership = [
  {
    name: "Desalegn Daka",
    role: "Executive Director",
    bio: "Provides strategic leadership and overall direction for SHAPEthiopia, overseeing programs, partnerships, and long-term organizational growth.",
  },
  {
    name: "Tadele Tafese",
    role: "Vice Executive Manager",
    bio: "Supports executive leadership in coordinating operations, implementing strategies, and ensuring effective program execution across all centers.",
  },
  {
    name: "Aba Fikadu Fako",
    role: "Monitoring, Evaluation, and Reporting Department",
    bio: "Leads monitoring and evaluation activities, ensuring program effectiveness, accountability, and accurate reporting of impact and outcomes.",
  },
  {
    name: "Messelech Biranu",
    role: "Grants, Finance, and HR Manager",
    bio: "Manages financial operations, grant administration, and human resources, ensuring transparency, compliance, and efficient organizational support systems.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 bg-secondary">
          <div className="container mx-auto px-4 pt-12">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                About Us
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mt-3 mb-6">
                Our Story of Impact
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                For over 18 years, SHAPEthiopia has been dedicated to empowering 
                communities and transforming lives across Ethiopia through sustainable 
                development programs.
              </p>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
                <Image                  
                src="/images/hero-ethiopia1.jpg"

                  alt="Ethiopian community members"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              
              <div className="space-y-8">
                {/* Vision */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Eye className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="font-serif text-2xl font-bold text-foreground">Our Vision</h2>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed pl-15">
                    A future where all people in Ethiopia live healthy, happy, productive, and dignified lives, free from poverty and empowered to reach their full potential.
                  </p>
                </div>

                {/* Mission */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="font-serif text-2xl font-bold text-foreground">Our Mission</h2>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed pl-15">
                    To educate and support vulnerable children, and empower poor women and their communities to break the cycle of poverty, hunger, illiteracy, and disease, enabling them to lead healthy, happy, productive, and dignified lives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                Our Values
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-3 mb-6">
                The Principles That Guide Us
              </h2>
              <p className="text-muted-foreground text-lg">
                Our core values shape every decision we make and every program we implement.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => (
                <Card key={value.title} className="text-center border-0 shadow-lg">
                  <CardContent className="pt-8 pb-8">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                      <value.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 lg:order-2">
                <div>
                  <span className="text-primary font-medium text-sm uppercase tracking-wider">
                    Our Approach
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-3 mb-6">
                    Community-Driven Development
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    We believe that sustainable change comes from within communities. 
                    Our approach centers on empowering local leaders, building capacity, 
                    and creating systems that communities can maintain independently.
                  </p>
                </div>

                <ul className="space-y-4">
                  {[
                    "Partner with local leaders and community organizations",
                    "Conduct thorough needs assessments before implementing programs",
                    "Build local capacity through training and mentorship",
                    "Ensure community ownership of all initiatives",
                    "Measure impact and continuously improve our methods",
                    "Create sustainable systems that outlast our direct involvement",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden lg:order-1">
                <Image
                  src="/images/team-meeting.jpg"
                  alt="SHAPEthiopia team meeting"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 500vw"

                />
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="font-medium text-sm uppercase tracking-wider opacity-80">
                Our Journey
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-3 mb-6">
                18+ Years of Impact
              </h2>
              <p className="opacity-80 text-lg">
                From our humble beginnings to serving over 20,000 people today.
              </p>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-primary-foreground/20 hidden lg:block" />
              
              <div className="space-y-8 lg:space-y-0">
                {milestones.map((milestone, index) => (
                  <div 
                    key={milestone.year}
                    className={`relative lg:flex lg:items-center ${
                      index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                    }`}
                  >
                    {/* Content */}
                    <div className={`lg:w-1/2 ${index % 2 === 0 ? "lg:pr-16 lg:text-right" : "lg:pl-16"}`}>
                      <div className="bg-primary-foreground/10 rounded-xl p-6 backdrop-blur-sm">
                        <span className="text-2xl font-bold">{milestone.year}</span>
                        <h3 className="font-serif text-xl font-semibold mt-2">{milestone.title}</h3>
                        <p className="opacity-80 mt-2">{milestone.description}</p>
                      </div>
                    </div>
                    
                    {/* Dot */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary-foreground hidden lg:block" />
                    
                    {/* Spacer for alternating layout */}
                    <div className="lg:w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Governance / Leadership */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                Our Governance
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-3 mb-6">
                Leadership Team
              </h2>
              <p className="text-muted-foreground text-lg">
                Our dedicated team brings decades of experience in community development, 
                education, and nonprofit management.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {leadership.map((person) => (
                <Card key={person.name} className="text-center border-0 shadow-lg overflow-hidden">
                  <div className="h-48 bg-muted flex items-center justify-center">
                    <Users className="w-20 h-20 text-muted-foreground/30" />
                  </div>
                  <CardContent className="pt-6 pb-6">
                    <h3 className="font-serif text-lg font-semibold text-foreground">
                      {person.name}
                    </h3>
                    <p className="text-primary text-sm font-medium mt-1">{person.role}</p>
                    <p className="text-muted-foreground text-sm mt-3">{person.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">
                SHAPEthiopia is governed by a Board of Directors comprised of experienced 
                professionals committed to our mission.
              </p>
              <Button variant="outline" asChild>
                <Link href="/contact">
                  Contact Our Team
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-secondary">
          <div className="container mx-auto px-4 text-center">
            <Award className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Join Our Mission
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Whether through donations, volunteering, or partnerships, there are many 
              ways to be part of the SHAPEthiopia family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" asChild>
                <Link href="/volunteer">
                  Get Involved
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
