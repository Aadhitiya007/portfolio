import { Button } from "@/components/ui/button";
import { Twitter, Linkedin, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Launchify</h3>
            <p className="mb-4">
              The future of productivity is coming soon. Be ready to transform the way you work.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white transition duration-150">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white transition duration-150">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white transition duration-150">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white transition duration-150">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-white transition duration-150">Features</a></li>
              <li><a href="#" className="hover:text-white transition duration-150">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition duration-150">Roadmap</a></li>
              <li><a href="#" className="hover:text-white transition duration-150">Beta Program</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition duration-150">About Us</a></li>
              <li><a href="#" className="hover:text-white transition duration-150">Careers</a></li>
              <li><a href="#" className="hover:text-white transition duration-150">Blog</a></li>
              <li><a href="#" className="hover:text-white transition duration-150">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition duration-150">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition duration-150">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition duration-150">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-white transition duration-150">GDPR Compliance</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Launchify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
