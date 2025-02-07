import AnimatedHeart from "../components/AnimatedHeart"
import EmailForm from "../components/EmailForm"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <h1 className="text-4xl md:text-6xl mb-8 text-center font-playfair">
        i <AnimatedHeart /> it .ai
      </h1>
      <p className="text-sm md:text-base mb-8 font-roboto text-center">we are building the future of ecommerce  <br/>  join the waitlist now</p>
      <EmailForm />
    </main>
  )
}

