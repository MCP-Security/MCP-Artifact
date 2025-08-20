import React from "react";
import Image from "next/image";

const clients = [
  {
    name: "Windsurf",
    icon: "https://ext.same-assets.com/915018010/1581566948.svg",
    desc: "The new purpose-built IDE to harness magic"
  },
  {
    name: "ChatWise",
    icon: "https://ext.same-assets.com/915018010/731937817.svg",
    desc: "The second fastest AI chatbot"
  },
  {
    name: "Cursor",
    icon: "https://ext.same-assets.com/915018010/2702779283.svg",
    desc: "The AI Code Editor"
  },
  {
    name: "Visual Studio Code",
    icon: "https://ext.same-assets.com/915018010/2744450724.svg",
    desc: "Visual Studio Code"
  },
  {
    name: "DeepChat",
    icon: "https://ext.same-assets.com/915018010/3170004912.svg",
    desc: "Your AI Partner on Desktop"
  },
  {
    name: "Y Gui",
    icon: "https://ext.same-assets.com/915018010/3939565216.svg",
    desc: "A web-based graphical interface for AI chat interactions with support for multiple AI models and MCP (Model Context Protocol) servers."
  },
  {
    name: "Cherry Studio",
    icon: "https://ext.same-assets.com/915018010/2059979464.svg",
    desc: "Cherry Studio is a desktop client that supports for multiple LLM providers."
  },
  {
    name: "HyperChat",
    icon: "https://ext.same-assets.com/915018010/403100032.svg",
    desc: "HyperChat is a Chat client that strives for openness, utilizing APIs from various LLMs to achieve the best Chat experience, as well as implementing productivity tools through the MCP protocol."
  },
  {
    name: "Cline  #1 on OpenRouter",
    icon: "https://ext.same-assets.com/915018010/1573002659.svg",
    desc: "Autonomous coding agent right in your IDE, capable of creating/editing files, executing commands, using the browser, and more with your permission every step of the way."
  },
  {
    name: "y-cli ",
    icon: "https://ext.same-assets.com/915018010/4162928580.svg",
    desc: "A Tiny Terminal Chat App for AI Models with MCP Client Support"
  },
  {
    name: "Continue",
    icon: "https://ext.same-assets.com/915018010/2328028258.svg",
    desc: "Create, share, and use custom AI code assistants with our open-source IDE extensions and hub of models, rules, prompts, docs, and other building blocks"
  },
  {
    name: "Roo Code",
    icon: "https://ext.same-assets.com/915018010/2306923860.svg",
    desc: "Roo Code (prev. Roo Cline) gives you a whole dev team of AI agents in your code editor."
  },
];

export function FeaturedClientsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-8 mb-12">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-[#3a393b]">Featured MCP Clients</h2>
        <a href="#" className="flex items-center gap-1 text-sm text-[#be5e48] hover:underline font-semibold">
          View All
          <span className="inline-block text-base">→</span>
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {clients.map((client) => (
          <div key={client.name} className="bg-white shadow-sm border border-[#ede9df] rounded-xl p-4 flex items-center gap-3 min-h-[82px] relative hover:shadow-md transition">
            <Image src={client.icon} alt={client.name+" icon"} width={32} height={32} className="rounded-md" />
            <div className="flex flex-col flex-1 min-w-0">
              <span className="font-semibold text-base text-[#3a393b] truncate">{client.name}</span>
              <span className="text-xs text-[#98938d] max-w-full truncate block" title={client.desc}>{client.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
