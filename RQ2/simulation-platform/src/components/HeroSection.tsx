import React from "react";

export function HeroSection() {
  return (
    <section className="w-full max-w-3xl mx-auto flex flex-col items-center text-center mt-12 mb-8 px-4">
      {/* Indexed badge */}
      <div className="mb-3 flex items-center gap-1">
        <span className="bg-[#fff4ee] text-[#be5e48] rounded-xl font-semibold text-xs px-3 py-1 border border-[#ffe0cf] shadow-sm">13193</span>
        <span className="ml-2 text-xs text-[#98938d] font-medium">Indexed</span>
      </div>
      {/* Headline */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight">
        Find Awesome
        <span className="text-[#be5e48] px-2">MCP Servers</span>
      </h1>
      {/* Subheading */}
      <div className="text-[#7e7973] text-base md:text-lg mb-6">
        The largest collection of MCP Servers.
      </div>
      {/* Search bar */}
      <form className="w-full flex justify-center">
        <input
          className="w-full md:w-96 bg-white border border-[#e8e5df] rounded-lg shadow-sm px-5 py-3 text-base placeholder-[#be5e48] focus:outline-none focus:border-[#be5e48] transition"
          type="text"
          placeholder="Search with keywords"
          
        />
        <button
          type="submit"
          disabled
          className="-ml-12 px-3 my-3 bg-white text-[#be5e48] font-bold text-xl hover:bg-[#fff4ee] rounded-r-lg cursor-not-allowed"
         >
          ↵
        </button>
      </form>
    </section>
  );
}
