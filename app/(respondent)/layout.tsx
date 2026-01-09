export default function RespondentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Mobile-optimized container */}
      <div className="mx-auto max-w-md">
        {children}
      </div>
    </div>
  )
}
