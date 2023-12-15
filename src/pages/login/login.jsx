import { Footer } from '../../components/footer/footer'
import { LoginForm } from '../../components/loginForm/loginForm'
import { NavBar } from '../../components/navbar/navbar'

import './login.css'

export const Login = () => {
  return (
    <div>
      <NavBar />
      <main className='main bg-dark'>
        <section className='sign-in-content'>
          <i className='fa fa-user-circle sign-in-icon'></i>
          <h1>Sign In</h1>
          <LoginForm />
        </section>
      </main>
      <Footer />
    </div>
  )
}
