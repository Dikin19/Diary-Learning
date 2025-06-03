
import RotatingTex from '../Components/Reactbits/RotatingText/RotatingText'
import SplitText from '../Components/Reactbits/SplitText/SplitText'
import BlurText from '../Components/Reactbits/BlurText/BlurText'
import AnimatedContent from '../Components/Reactbits/AnimatedContent/AnimatedContent'
import Threads from '../Components/Reactbits/Threads/Threads'
import CircularText from '../Components/Reactbits/CircularText/CircularText'

function Reactbits() {



  return (
    <div className="min-h-screen border-2 overflow-x-hidden bg-[#FFF7ED] relative text-[#3E2C23]">
      <AnimatedContent>
        <Threads
          amplitude={1}
          distance={0}
          enableMouseInteraction={true}
          className="absolute inset-0 z-[-1] m-auto"
        />

        <h1 className="text-center"> test</h1>

        <div className='flex justfy-conten center'>
          <div>
            <RotatingTex
              texts={['React', 'Bits', 'Is', 'Cool!']}
              mainClassName="bg-cyan-300 text-[#3E2C23] justify-center rounded-lg"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </div>
        </div>

        <div className="flex border flex-col items-start">
          <SplitText
            text="I'm Muhamad Sodikin"
            className="text-2xl text-black font-semibold text-start"
            delay={50}
            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
            threshold={0.2}
            rootMargin="-50px"
          />
        </div>

        <div className='flex justify-content center'>
          <BlurText
            text="I am a Full Stack Developer with a solid foundation in leadership, communication, analytical skills, problem-solving, 
                  and a strong work ethic. After transitioning from the coffee industry to technology, I discovered a deep passion for programming
                  and pursued self-learning through both online and offline courses. I possess a strong ability to quickly adapt and continuously 
                  improve with focus on doing repetition practice and analyzing user requirements to deliver effective, user-centered solutions as Front-end."
            delay={50}
            className="text-black text-lg"
            animateBy="words"
            direction="bottom"
          />
        </div>

        <div>
          <CircularText
            text="WAIT * FOR LOADING * CONNECTION * "
            onHover="speedUp"
            spinDuration={50}
            className="absolute mt-4 ml-4"
            color="#D4AF37"
          />
        </div>





      </AnimatedContent>
    </div>
  );

}

export default Reactbits


