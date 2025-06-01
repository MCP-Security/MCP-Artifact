import React from "react";

const faqs = [
  {
    q: "What is MCP (Model Context Protocol)?",
    a: "MCP is an open-source protocol developed by Anthropic that enables AI systems like Claude to securely connect with various data sources. It provides a universal standard for AI assistants to access external data, tools, and prompts through a client-server architecture.",
  },
  {
    q: "What is MCP Server?",
    a: "MCP Server is a system that provides context, tools, and prompts to AI clients. It can expose data sources like files, documents, databases, and API integrations, allowing AI assistants to access real-time information in a secure way.",
  },
  {
    q: "How do MCP Server work?",
    a: "MCP Server work through a simple client-server architecture. They expose data and tools through a standardized protocol, maintaining secure 1:1 connections with clients inside host applications like Claude Desktop.",
  },
  {
    q: "What can MCP Server provide?",
    a: "MCP Server can share resources (files, docs, data), expose tools (API integrations, actions), and provide prompts (templated interactions). They control their own resources and maintain clear system boundaries for security.",
  },
  {
    q: "How does Claude use MCP?",
    a: "Claude can connect to MCP server to access external data sources and tools, enhancing its capabilities with real-time information. Currently, this works with local MCP servers, with enterprise remote server support coming soon.",
  },
  {
    q: "Is MCP Server secure?",
    a: "Yes, security is built into the MCP protocol. Server controls its own resources, there's no need to share API keys with LLM providers, and the system maintains clear boundaries. Each server manages its own access and data.",
  },
];

export function FAQSection() {
  return (
    <section className="max-w-5xl mx-auto py-16 px-4">
      <h2 className="text-2xl font-bold mb-8 text-center text-[#3a393b]">FAQ</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
        {faqs.map((item, i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <span className="inline-flex items-center justify-center w-7 h-7 bg-[#fff4ee] border border-[#ffe0cf] text-[#be5e48] font-bold rounded-full select-none">Q</span>
            </div>
            <div>
              <div className="font-semibold text-[#3a393b] mb-1 leading-tight">{item.q}</div>
              <div className="text-[#98938d] text-sm leading-relaxed">{item.a}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
