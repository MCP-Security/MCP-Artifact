import Link from 'next/link';
import { Github, Mail, Twitter, MessageCircle } from 'lucide-react'; // Using MessageCircle for Discord as an example

export function Footer() {
  return (
    <footer className="bg-[#f2f2ec] text-[#3a393b] border-t border-[#ece9e2]">
      <div className="mx-auto py-8 px-8">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 px-8">
          {/* Column 1: Logo, Description, Social Icons */}
          <div className="lg:col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-9 h-8 flex items-center justify-center rounded-md border border-[#e9e6df] bg-white shadow-sm text-lg font-bold text-[#3a393b] mr-2">
                Ms
              </div>
              <span className="text-xl font-semibold">MCP Servers</span>
            </div>
            <p className="text-sm text-[#7e7973] mb-4 leading-relaxed">
              The largest collection of MCP Servers, featuring Awesome MCP Servers and Claude MCP integration.
            </p>
            <div className="flex space-x-4 text-[#7e7973]">
              <a href="#" aria-label="Twitter" className="hover:text-[#be5e48] transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" aria-label="GitHub" className="hover:text-[#be5e48] transition-colors">
                <Github size={18} />
              </a>
              <a href="#" aria-label="Discord" className="hover:text-[#be5e48] transition-colors">
                <MessageCircle size={18} />
              </a>
              <a href="#" aria-label="Email" className="hover:text-[#be5e48] transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div className="mx-8">
            <h3 className="font-semibold mb-3 text-sm text-[#3a393b]">Explore</h3>
            <ul className="space-y-2 text-sm text-[#7e7973]">
              <li><Link href="#" className="hover:text-[#be5e48] transition-colors">MCP Servers</Link></li>
              <li><Link href="#" className="hover:text-[#be5e48] transition-colors">MCP Clients</Link></li>
              <li><Link href="#" className="hover:text-[#be5e48] transition-colors">MCP Categories</Link></li>
              <li><Link href="#" className="hover:text-[#be5e48] transition-colors">MCP Tags</Link></li>
              <li><Link href="#" className="hover:text-[#be5e48] transition-colors">MCP Posts</Link></li>
            </ul>
          </div>

          {/* Column 3: Community */}
          <div className="mx-8">
            <h3 className="font-semibold mb-3 text-sm text-[#3a393b]">Community</h3>
            <ul className="space-y-2 text-sm text-[#7e7973]">
              <li><Link href="#" className="hover:text-[#be5e48] transition-colors">Telegram</Link></li>
              <li><Link href="#" className="hover:text-[#be5e48] transition-colors">Discord</Link></li>
              <li><Link href="#" className="hover:text-[#be5e48] transition-colors">Twitter</Link></li>
              <li><Link href="#" className="hover:text-[#be5e48] transition-colors">GitHub</Link></li>
            </ul>
          </div>

          {/* Column 4: Friends */}
          <div className="mx-8" >
            <h3 className="font-semibold mb-3 text-sm text-[#3a393b]">Friends</h3>
            <ul className="space-y-2 text-sm text-[#7e7973]">
              <li><Link href="#" className="hover:text-[#be5e48] transition-colors">ThinkAny</Link></li>
              <li><Link href="#" className="hover:text-[#be5e48] transition-colors">HeyBeauty</Link></li>
              <li><Link href="#" className="hover:text-[#be5e48] transition-colors">CopyWeb</Link></li>
              <li><Link href="#" className="hover:text-[#be5e48] transition-colors">Raphael AI</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-[#ece9e2] pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-[#98938d]">
          <p className="mb-2 md:mb-0">
            © 2025 • mcp.simulation All rights reserved. <Link href="#" className="text-[#be5e48] hover:underline">build with Next.js</Link>
          </p>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-[#be5e48] transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#be5e48] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
