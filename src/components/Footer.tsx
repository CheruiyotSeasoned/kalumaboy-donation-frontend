import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-white py-12">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">KalumaBoy Initiative</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              A registered non-profit organization dedicated to providing medical support 
              and care for Kaluma Boy's recovery journey.
            </p>
            <div className="mt-4 text-sm text-white/70">
              <p>NGO Registration: ............</p>
              <p>PBO Certificate: .............</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-white/80">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@kalumaboyinitiative.org" className="hover:text-primary-light transition-colors">
                  info@akisolve@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Phone className="h-4 w-4" />
                <a href="tel:+254712345678" className="hover:text-primary-light transition-colors">
                  info@akisolve@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <MapPin className="h-4 w-4" />
                <span>Nairobi, Kenya</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Follow Our Journey</h4>
            <p className="text-sm text-white/80 mb-4">
              Stay updated on Kaluma's progress and our community impact.
            </p>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="bg-white/10 p-2 rounded-lg hover:bg-primary-light transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="bg-white/10 p-2 rounded-lg hover:bg-primary-light transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="bg-white/10 p-2 rounded-lg hover:bg-primary-light transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center text-sm text-white/70">
          <p>© 2025 KalumaBoy Initiative. All rights reserved. Registered non-profit organization.</p>
          <p className="mt-2">Your donations are tax-deductible. Secure payments powered by M-Pesa and Pesapal.</p>
        </div>
      </div>
    </footer>
  );
};