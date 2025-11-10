import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
const boardtideLogo = '/assets/boardtide-logo.png'

import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src={boardtideLogo} alt="Boardtide Logo" width={32} height={32} />
            <span className="text-2xl font-bold text-foreground">Boardtide</span>
          </Link>

          {/* Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="flex items-center space-x-8">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/how-it-works" className="text-muted-foreground hover:text-foreground">
                    How it Works
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/find-experts" className="text-muted-foreground hover:text-foreground">
                    Find Experts
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/for-experts" className="text-muted-foreground hover:text-foreground">
                    For Experts
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/pricing" className="text-muted-foreground hover:text-foreground">
                    Pricing
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              Login
            </Button>
            <Button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">Get Started</Button>
          </div>
        </div>
      </header>
      {/* <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image src={boardtideLogo} alt="Boardtide Logo" width={32} height={32} />
            <span className="text-2xl font-bold text-foreground">Boardtide</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/how-it-works" className="text-muted-foreground hover:text-foreground">How it Works</Link>
            <Link href="/find-experts" className="text-muted-foreground hover:text-foreground">Find Experts</Link>
            <Link href="/for-experts" className="text-muted-foreground hover:text-foreground">For Experts</Link>
            <Link href="/pricing" className="text-muted-foreground hover:text-foreground">Pricing</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant={'ghost'} className="text-muted-foreground hover:text-foreground">
              Login
            </Button>
            <Button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
              Get Started
            </Button>
          </div>
        </div>
      </header> */}

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10"></div>
        <div className="container mx-auto px-4 py-20 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-foreground mb-8">
              Global C-Suite Expertise
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent block">By the Hour</span>
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              Access world-class executives from successful SaaS, AI, fintech, and technology companies. Book sessions by the hour with experienced C-suite leaders from around the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/find-experts" className="bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 shadow-lg text-center">
                Find an Expert
              </Link>
              <Link href="/for-experts" className="border border-border bg-background text-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/10 text-center">
                Become an Expert
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">How Boardtide Works</h2>
            <p className="text-xl font-bold text-muted-foreground max-w-3xl mx-auto leading-relaxed">Three simple steps to access technology executive expertise</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">1</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Browse Experts</h3>
              <p className="text-lg font-semibold text-muted-foreground leading-relaxed">Search our global network of C-suite executives by expertise, industry, and availability</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">2</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Book a Session</h3>
              <p className="text-lg font-semibold text-muted-foreground leading-relaxed">Schedule hourly consultations with global executives that fit your timeline and budget</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">3</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Get Results</h3>
              <p className="text-lg font-semibold text-muted-foreground leading-relaxed">Receive actionable insights and strategic guidance to accelerate your business growth</p>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Technology Expertise Areas</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Specialized knowledge from executives who have scaled technology companies across all sectors</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-primary font-bold">🚀</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">SaaS & Startups</h3>
              <p className="text-muted-foreground text-sm">Product-Market Fit, Scaling, Fundraising, Go-to-Market, B2B Sales, Subscription Models</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-primary font-bold">🤖</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI & Machine Learning</h3>
              <p className="text-muted-foreground text-sm">AI Strategy, ML Implementation, Data Science, LLMs, Computer Vision, Automation</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-primary font-bold">💰</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fintech & Crypto</h3>
              <p className="text-muted-foreground text-sm">Digital Banking, Payments, Blockchain, DeFi, Regulatory Compliance, Financial Innovation</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-primary font-bold">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Deep Tech & Infrastructure</h3>
              <p className="text-muted-foreground text-sm">Cloud Architecture, DevOps, Cybersecurity, IoT, Hardware, Enterprise Software</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Access Global Executive Expertise?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">Join technology companies worldwide getting C-suite guidance by the hour</p>
          <Link href="/find-experts" className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 shadow-lg">
            Get Started Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Image src={boardtideLogo} alt="Boardtide Logo" width={36} height={36} />
                <span className="text-xl font-bold">Boardtide</span>
              </div>
              <p className="text-muted-foreground">Connecting technology startups and scale-ups with world-class executive expertise.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/find-experts" className="hover:text-foreground">
                    Find Experts
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="hover:text-foreground">
                    How it Works
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-foreground">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Experts</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/for-experts" className="hover:text-foreground">
                    Join as Expert
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Expert Resources
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Success Stories
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground">
                    Contact
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">© 2024 Boardtide. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}
