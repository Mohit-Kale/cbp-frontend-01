'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { paths } from '@/navigate/paths'
import { useAuthDialog } from '@/components/auth/useAuthDialog.hook'
import moment from 'moment'

const boardtideLogo = '/assets/boardtide-logo.png'

const Footer = () => {
  const { openAuthDialog } = useAuthDialog()

  const handleFindExpertsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    openAuthDialog('signup', 'CONSULTANT')
  }

  // Moved inside component to safely access openAuthDialog
  const footerLinks = {
    platformLinks: [
      { name: 'Find Experts', path: paths.findExperts() },
      { name: 'How it Works', path: paths.howItWorks() },
      { name: 'Pricing', path: paths.pricing() },
    ],
    forExpertsLinks: [
      {
        name: 'Join as Expert',
        onClick: (e: React.MouseEvent) => {
          e.preventDefault()
          openAuthDialog('signup', 'CONSULTANT')
        },
      },
      { name: 'Expert Resources', path: '' },
      { name: 'Success Stories', path: '' },
    ],
    companyLinks: [
      { name: 'About', path: '#' },
      { name: 'Contact', path: '#' },
      { name: 'Privacy', path: '#' },
    ],
  }

  return (
    <footer className="bg-muted border-t border-border pt-8 pb-4">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo + Description */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Image src={boardtideLogo} alt="Boardtide Logo" width={32} height={32} />
              <span className="text-xl font-bold text-foreground">Boardtide</span>
            </div>
            <p className="text-muted-foreground">Connecting technology startups and scale-ups with world-class executive expertise.</p>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Platform</h4>
            <ul className="space-y-2 text-muted-foreground">
              {footerLinks.platformLinks.map((item, index) => (
                <li key={index}>
                  <Link href={item.path} className="hover:text-foreground">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Experts Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">For Experts</h4>
            <ul className="space-y-2 text-muted-foreground">
              {footerLinks.forExpertsLinks.map((item, index) => (
                <li key={index}>
                  {item.onClick ? (
                    <Link href="#" onClick={item.onClick} className="hover:text-foreground cursor-pointer">
                      {item.name}
                    </Link>
                  ) : (
                    <Link href={item.path ?? '#'} className="hover:text-foreground">
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Company</h4>
            <ul className="space-y-2 text-muted-foreground">
              {footerLinks.companyLinks.map((item, index) => (
                <li key={index}>
                  <Link href={item.path} className="hover:text-foreground">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Separator + Copyright */}
        <Separator className="my-4 bg-border" />
        <div className="text-center text-muted-foreground text-sm">© {moment().format('YYYY')} Boardtide. All rights reserved.</div>
      </div>
    </footer>
  )
}

export default Footer
