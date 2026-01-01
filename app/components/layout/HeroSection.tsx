'use client';

import Image from "next/image";
import WaitlistForm from "../ui/WaitlistForm";

export default function HeroSection() {
  return (
    <section className="pb-32 md:pb-44 bg-[url('/bg-with-grid.png')] bg-cover bg-center bg-no-repeat text-slate-800">
      <div className="flex flex-col-reverse gap-10 md:flex-row px-4 md:px-16 lg:px-24 xl:px-32 mt-16 md:mt-32">
        {/* Left */}
        <div className="max-md:text-center">
           <h1 className="text-4xl md:text-6xl font-semibold max-w-xl bg-gradient-to-r from-slate-900 to-indigo-600 text-transparent bg-clip-text">
            Realtime Meeting Summaries. Instantly.
          </h1>

          <p className="text-base max-w-lg mt-6 text-slate-600">
            Briefo.ai listens to your meetings, summarizes key points in real-time,
            and delivers actionable insights—so you never miss what matters.
          </p>

          <div className="flex items-center gap-4 mt-8 max-md:justify-center">
            <WaitlistForm />
          </div>

        <p className="text-sm text-slate-500 mt-6">
            Trusted by 1,000+ teams worldwide
          </p>
        </div>

        {/* Right */}
        <div className="w-full md:max-w-md lg:max-w-lg">
          <Image
            src="/users-group.png"
            alt="Briefo.ai users"
            width={600}
            height={400}
            priority
          />
        </div>
      </div>
    </section>
  );
}
