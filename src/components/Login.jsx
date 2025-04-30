import React from "react";

const Login = () => {
  return (
    <div>
      <div>
        <h1>Admin Panel</h1>
        <form>
          {/* --- Form --- */}
          <div>
            <p>Email Address</p>
            <input className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none" type="email" placeholder="your@email.com" required />
          </div>
          <div>
            <p>Password</p>
            <input className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none" type="password" placeholder="Enter your password" required />
          </div>
          <button>Login</button>
        {/* --- End --- */}
        </form>
      </div>
    </div>
  );
};

export default Login;
