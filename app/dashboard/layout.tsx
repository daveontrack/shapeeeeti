import { DashboardNavbar } from "@/components/dashboard/navbar"

// Mock user and profile for demo (works without DB connection)
const MOCK_USER = {
  id: "mock-user-123",
  email: "user@example.com",
  app_metadata: {},
  user_metadata: {},
  aud: "authenticated",
  created_at: new Date().toISOString(),
} as any

const MOCK_PROFILE = {
  id: "mock-user-123",
  first_name: null,
  last_name: null,
  avatar_url: null,
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-secondary/30 flex flex-col">
      <DashboardNavbar user={MOCK_USER} profile={MOCK_PROFILE} />
      <main className="flex-1">
        <div className="container max-w-5xl mx-auto px-4 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
