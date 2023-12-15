import { Features } from '../../components/features/features'
import { Footer } from '../../components/footer/footer'
import { Hero } from '../../components/hero/hero'
import { NavBar } from '../../components/navbar/navbar'
import './home.css'

export const Home = () => {
  return (
    <div>
      <NavBar />
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  )
}
