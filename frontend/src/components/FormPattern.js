import React from "react";

function FormPattern({
  title,
  formName,
  buttonText,
  handleChange,
  handleSubmit,
  name,
  password
})
{

  return (
    <div className="form-pattern">
      <h2 className="form-pattern__title">{title}</h2>
      <form
        className="form-pattern__form"
        name={`form-pattern-${formName}`}
        id={`form-pattern-${formName}`}
        onSubmit={handleSubmit}
      >
      <fieldset className="form-pattern__fieldset">
        <input
          className="form-pattern__inp"
          name="email"
          type="email"
          placeholder="Email"
          required
          value={name || ''}
          onChange={handleChange}
        />
        <input
          className="form-pattern__inp"
          name="password"
          type="password"
          placeholder="Пароль"
          required
          value={password || ''}
          onChange={handleChange}
        />
        <button className="form-pattern__btn-save" type="submit">{buttonText}</button>
      </fieldset>
      </form>
    </div>
  )
}

export default FormPattern

