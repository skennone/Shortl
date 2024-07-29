import { Button } from "./components/ui/button"

function App() {

  return (
    <div className="flex items-center justify-center min-w-full min-h-screen" >
      <form className="flex flex-col md:w-1/5">
        <div className="text-3xl font-bold text-center">
          <span>URL Shortner</span>
        </div>
        <input type="text" placeholder="Long URL" className="p-3 mt-8 rounded-md border-2 border-gray-400 focus:outline-none focus:border-blue-300" />
        <input
          type="text"
          placeholder='UserID'
          className='p-3 mt-4 rounded-md border-2 border-grey focus:outline-none focus:border-blue-300'>
        </input>
        <Button className="p-3 mt-6 rounded-md font-bold text-white">Shorten URL</Button>
      </form>
    </div>
  )
}

export default App
