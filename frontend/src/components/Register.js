import React, {useState} from "react";
import Header from "./Header";
import FormPattern from "./FormPattern";


function Register ({
  onRegister
 })
 {
  const [regState, setRegState] = useState({
    email: '',
    password: ''
  })

  function handleChange (evt) {
    const {name, value} = evt.target
    setRegState({...regState, [name]: value})
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    onRegister(regState.email, regState.password)
  }

  return (
    <>
      <Header
        headerButtonText={'Войти'}
        userEmail={''}
        headerLink={'/login'}
      />
      <FormPattern
       title={'Регистрация'}
       formName={'register'}
       buttonText={'Зарегистрироваться'}
       handleChange={handleChange}
       handleSubmit={handleSubmit}
       name={regState.email}
       password={regState.password}
      />
    </>
  )
}

export default Register
