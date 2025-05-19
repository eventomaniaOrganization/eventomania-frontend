// import React, { useState } from 'react';
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../../firebaseConfig.js';

// const Auth = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isLogin, setIsLogin] = useState(true);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       setError('');
//       console.log('User logged in');
//     } catch (err) {
//       setError('Failed to log in. Please check your credentials.');
//       console.error(err.message);
//     }
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       setError('');
//       console.log('User signed up');
//     } catch (err) {
//       setError('Failed to sign up. Please check the details.');
//       console.error(err.message);
//     }
//   };

//   return (
//     <div>
//       <h3>{isLogin ? 'Login' : 'Sign Up'}</h3>
//       <form onSubmit={isLogin ? handleLogin : handleSignup}>
//         <div>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div>
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//         <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
//       </form>

//       <div>
//         <p>
//           {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}{' '}
//           <button onClick={() => setIsLogin(!isLogin)}>
//             {isLogin ? 'Sign Up' : 'Login'}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Auth;
