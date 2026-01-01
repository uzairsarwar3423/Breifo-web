'use client';

import Image from "next/image";
import WaitlistForm from "../ui/WaitlistForm";

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center pt-20 pb-12 sm:pt-24 sm:pb-16 md:pt-28 md:pb-20 lg:pt-32 lg:pb-32 bg-[url('/bg-with-grid.png')] bg-cover bg-center bg-no-repeat overflow-hidden">
      
      {/* Overlay gradient for better text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/20 to-white/80 sm:from-white/50 sm:via-transparent sm:to-white/80 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32">
        <div className="flex flex-col-reverse md:flex-row items-center gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20">
          
          {/* Left Content Column */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
            
            {/* Main Headline */}
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.15] sm:leading-[1.1]">
              Realtime Meeting <br className="hidden sm:block lg:hidden xl:block" />
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-transparent bg-clip-text inline-block">
                Summaries. Instantly.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-4 sm:mt-5 md:mt-6 text-sm xs:text-base sm:text-lg md:text-base lg:text-lg xl:text-xl text-slate-600 max-w-lg leading-relaxed px-2 sm:px-0">
              Briefo.ai listens to your meetings, summarizes key points in real-time,
              and delivers actionable insights—so you never miss what matters.
            </p>

            {/* Waitlist Form */}
            <div className="mt-6 sm:mt-7 md:mt-8 w-full max-w-md px-2 sm:px-0">
              <WaitlistForm />
            </div>

            {/* Social Proof */}
            <div className="mt-6 sm:mt-7 md:mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-4 w-full">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full border-2 border-white bg-gradient-to-br from-indigo-200 to-violet-200 shadow-sm" 
                  />
                ))}
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-500">
                Trusted by <span className="text-indigo-600 font-bold">1,000+</span> teams worldwide
              </p>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <div className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px] xl:max-w-[600px] animate-in fade-in slide-in-from-right-8 duration-1000">
              
              {/* Decorative background glow */}
              <div className="absolute -inset-2 sm:-inset-3 md:-inset-4 bg-gradient-to-br from-indigo-100 via-violet-100 to-purple-100 rounded-full blur-2xl sm:blur-3xl opacity-40 sm:opacity-50" />
              
              {/* Main Image */}
              <div className="relative">
                <Image
                  src="/users-group.png"
                  alt="Briefo.ai users visualizing real-time summaries"
                  width={700}
                  height={500}
                  className="relative drop-shadow-2xl object-contain h-auto w-full"
                  priority
                  sizes="(max-width: 400px) 280px, (max-width: 640px) 400px, (max-width: 768px) 450px, (max-width: 1024px) 500px, 600px"
                />
              </div>

              {/* Floating elements for visual interest (optional) */}
              <div className="hidden sm:block absolute -top-4 -right-4 w-16 h-16 md:w-20 md:h-20 bg-indigo-500/10 rounded-full blur-xl animate-pulse" />
              <div className="hidden sm:block absolute -bottom-6 -left-6 w-20 h-20 md:w-24 md:h-24 bg-violet-500/10 rounded-full blur-xl animate-pulse delay-75" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}