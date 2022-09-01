import React from 'react';

function Footer() {
     const date = (`© ${new Date().getFullYear()} Mesto Russia`)

  return (
    <footer className="footer">
      <p className="footer__info">{date}</p>
    </footer>
  )
}

export default Footer
