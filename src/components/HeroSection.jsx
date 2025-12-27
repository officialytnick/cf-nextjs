// import React from "react";
// import { motion } from "framer-motion";
// import { ArrowDown } from "lucide-react";
// import { Button } from "@/components/ui/button";

// const HeroSection = () => {
//   return (
//     <section className="relative flex items-center justify-center text-center h-[50vh] md:h-[55vh] overflow-hidden">
//       {/* <img
//         src="/media/img3.webp"
//         alt="Background showing creative tools and design elements"
//         className="absolute inset-0 w-full h-full object-cover object-center"
//       /> */}
//       <div
//           className="absolute inset-0 w-full h-full bg-cover bg-center"
//           style={{ backgroundImage: "url('/media/img3.webp')" }}
//           aria-hidden="true">
//       </div>
//       <div className="absolute inset-0 bg-black/60 dark:bg-black/70" />
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="relative z-10 px-6 max-w-6xl mx-auto text-white"
//       >
//         <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-5 md:mb-10">
//           Free, Secure & Easy Online Image & PDF Tools
//         </h1>
//         <p className="text-1xl sm:text-lg md:text-xl text-gray-200 mb-5 md:mb-10">
//           Quickly compress, convert, and resize images or PDFs - fast, private, and no sign-up required.
//         </p>
//         <Button
//          onClick={() => document.getElementById('toolsSection')?.scrollIntoView({ behavior: 'smooth' })}
//           size="lg"
//           className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-5 rounded-full shadow-md hover:shadow-lg transition-all"
//         >
//           Explore Tools
//           <ArrowDown className="w-5 h-5 ml-2 animate-bounce" />
//         </Button>
//       </motion.div>

//     </section>
//   );
// };

// export default HeroSection;
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  const SNOW_COUNT = isMobile ? 50 : 160;

  const snowflakes = useMemo(
    () =>
      Array.from({ length: SNOW_COUNT }).map(() => ({
        left: Math.random() * 100,
        size: isMobile ? Math.random() * 4 + 3 : Math.random() * 6 + 4,
        duration: Math.random() * 8 + 10,
        delay: Math.random() * -20,
        blur: isMobile ? Math.random() * 1.5 : Math.random() * 2.5,
        opacity: Math.random() * 0.4 + 0.6,
        drift: Math.random() * 40 + 20,
      })),
    [SNOW_COUNT, isMobile]
  );

  return (
    <section className="relative flex items-center justify-center text-center h-[65vh] overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/media/BG.webp')" }}
      />

      {/* Black gradient */}
      <div className="absolute inset-0 bg-black/60 dark:bg-black/70" />

      {/* 🐼 Panda right aligned */}
      <div className="absolute inset-0 flex items-end justify-end pointer-events-none pr-6 md:pr-16">
        <img
          src="/media/panda.webp"
          alt="Christmas Panda"
          className="w-[150px] sm:w-[150px] md:w-[350px] object-contain"
        />
      </div>

      {/* ❄ Snow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {snowflakes.map((flake, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white snowflake"
            style={{
              left: `${flake.left}%`,
              width: flake.size,
              height: flake.size,
              animationDuration: `${flake.duration}s`,
              animationDelay: `${flake.delay}s`,
              filter: `blur(${flake.blur}px)`,
              opacity: flake.opacity,
              "--drift": `${flake.drift}px`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative px-6 max-w-6xl mx-auto text-white"
      >
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-5 md:mb-10">
           Free, Secure & Easy Online Image & PDF Tools
        </h1>

        <p className="text-1xl sm:text-lg md:text-xl text-gray-200 mb-5 md:mb-10">
           Quickly compress, convert, and resize images or PDFs - fast, private, and no sign-up required.
         </p>

        <Button
          onClick={() =>
            document
              .getElementById("toolsSection")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          size="lg"
          className="bg-red-500 hover:bg-red-600 px-8 py-5 rounded-full"
        >
          Explore Tools <ArrowDown className="ml-2 w-5 h-5 animate-bounce" />
        </Button>
      </motion.div>

      {/* Snow animation */}
      <style>{`
        @keyframes snowFall {
          0% {
            transform: translateY(-10vh) translateX(0);
          }
          50% {
            transform: translateY(50vh) translateX(var(--drift));
          }
          100% {
            transform: translateY(110vh) translateX(calc(var(--drift) * -1));
          }
        }
        .snowflake {
          animation-name: snowFall;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
      `}</style>

    </section>
  );
};

export default HeroSection;
