import { motion } from "framer-motion";
import ReactTypingEffect from "react-typing-effect";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#7c3aed]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div className="mt-8">
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm{" "}
            <span className="font-extrabold text-transparent sm:text-8xl bg-clip-text bg-gradient-to-r from-[#7c3aed] to-fuchsia-600">
              Azis
            </span>
          </h1>

          <h1 className="inline md:text-xl font-semibold">and I'm a </h1>
          <ReactTypingEffect
            speed={100}
            eraseDelay={1000}
            eraseSpeed={100}
            typingDelay={100}
            className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-fuchsia-600"
            text={["Web developer", "UI / UX Designer"]}
          />
        </div>
      </div>

      <ComputersCanvas />

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
