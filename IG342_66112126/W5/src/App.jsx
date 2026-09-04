
export default function App() {

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-800">

      <header className="bg-white border-b border-gray-200 py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight text-indigo-600">
            IG342 Template
          </h1>
          <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-indigo-500 transition">Home</a>
            <a href="#" className="hover:text-indigo-500 transition">Features</a>
            <a href="#" className="hover:text-indigo-500 transition">About</a>
          </nav>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
          <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Welcome to IG342
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            ไฟล์นี้แสดงมาจาก App.jsx
          </p>
          <div className="mt-8">
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-all shadow-md active:scale-95">
              เริ่มกันเลย
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-400 uppercase tracking-widest">
            Copyright 2026 DPU
          </p>
        </div>
      </footer>

    </div>
  )
}