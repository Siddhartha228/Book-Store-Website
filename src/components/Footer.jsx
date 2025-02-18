import React from "react";

function Footer() {
  return (
    <footer className="bg-black text-white py-4 shadow-lg text-center">
      <p>&copy; {new Date().getFullYear()} Book Haven. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
