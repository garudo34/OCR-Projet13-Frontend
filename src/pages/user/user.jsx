import { useDispatch, useSelector } from 'react-redux'
import { Footer } from '../../components/footer/footer'
import { NavBar } from '../../components/navbar/navbar'
import './user.css'
import { userSlice } from '../../features/user/userSlice'
import { useState } from 'react'
import { updateUserProfile } from '../../services/user'
import { useNavigate } from 'react-router'

export const User = () => {
  const [toggleForm, setToggleForm] = useState(false)
  const { token } = useSelector((state) => state.auth)
  const { firstName, lastName } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleToggleEditForm = (e) => {
    e.preventDefault()
    setToggleForm((toggle) => !toggle)
  }

  const handleSubmitEditForm = async (e) => {
    e.preventDefault()
    const firstName = e.currentTarget.firstName.value
    const lastName = e.currentTarget.lastName.value
    if (firstName && lastName) {
      try {
        console.log(token)
        const response = await updateUserProfile(token, firstName, lastName)
        console.log(response)
        dispatch(
          userSlice.actions.editUserProfile({
            firstName: firstName,
            lastName: lastName,
          })
        )
        setToggleForm((toggle) => !toggle)
        navigate('/')
      } catch (err) {
        console.log(err)
      }
    } else {
      alert('Champs vides')
    }
  }

  if (!firstName) {
    navigate('/login')
  }

  return (
    <div>
      <NavBar />
      <main className='main bg-dark'>
        <div className='header'>
          <h1>
            Welcome back
            <br />
            {firstName} {lastName}!
          </h1>
          <button
            className='edit-button'
            onClick={(e) => handleToggleEditForm(e)}
          >
            Edit Name
          </button>
          {toggleForm && (
            <form
              className='edit-form'
              onSubmit={(e) => handleSubmitEditForm(e)}
            >
              <div className='profile-input-wrapper'>
                <input
                  type='text'
                  id='firstName'
                  name='firstName'
                  placeholder={firstName}
                />
                <input
                  type='text'
                  id='lastName'
                  name='lastName'
                  placeholder={lastName}
                />
              </div>
              <div className='profile-button-wrapper'>
                <button>Save</button>
                <input type='reset' value='Cancel' />
              </div>
            </form>
          )}
        </div>
        <h2 className='sr-only'>Accounts</h2>
        <section className='account'>
          <div className='account-content-wrapper'>
            <h3 className='account-title'>Argent Bank Checking (x8349)</h3>
            <p className='account-amount'>$2,082.79</p>
            <p className='account-amount-description'>Available Balance</p>
          </div>
          <div className='account-content-wrapper cta'>
            <button className='transaction-button'>View transactions</button>
          </div>
        </section>
        <section className='account'>
          <div className='account-content-wrapper'>
            <h3 className='account-title'>Argent Bank Savings (x6712)</h3>
            <p className='account-amount'>$10,928.42</p>
            <p className='account-amount-description'>Available Balance</p>
          </div>
          <div className='account-content-wrapper cta'>
            <button className='transaction-button'>View transactions</button>
          </div>
        </section>
        <section className='account'>
          <div className='account-content-wrapper'>
            <h3 className='account-title'>Argent Bank Credit Card (x8349)</h3>
            <p className='account-amount'>$184.30</p>
            <p className='account-amount-description'>Current Balance</p>
          </div>
          <div className='account-content-wrapper cta'>
            <button className='transaction-button'>View transactions</button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
