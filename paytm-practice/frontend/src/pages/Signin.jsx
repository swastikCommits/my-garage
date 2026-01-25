import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200 w-full max-w-[400px] border border-slate-100">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-800">Login to your account</h1>
        </div>

        {/* Form Fields */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Username</label>
            <input 
              type="text" 
              placeholder="Enter your username"
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-sm text-slate-800"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-sm text-slate-800"
            />
          </div>

          <button className="w-full bg-indigo-600 text-white font-semibold py-2.5 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-100 transition-all shadow-md shadow-indigo-100 mt-2">
            Log In
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          Haven't created an account yet? {' '}
          <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500 underline-offset-4 hover:underline" 
          onClick={() => navigate('/signup')}>
            Signup
        </a>
        </p>
      </div>
    </div>
  );
};

export default Signin;