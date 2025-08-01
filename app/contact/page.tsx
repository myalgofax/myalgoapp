export default function Contact() {
  return (
    <div className="bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>
          <div className="bg-card text-card-foreground rounded-lg border p-6">
            <p className="text-center text-muted-foreground">
              Get in touch with our team for support, questions, or feedback about My AlgoFax.
            </p>
            <div className="mt-6 space-y-4">
              <div className="text-center">
                <h3 className="font-semibold">Email</h3>
                <p className="text-muted-foreground">support@myalgofax.com</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold">Phone</h3>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
