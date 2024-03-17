
import { Link } from 'react-router-dom'
import moment from 'moment'
const Navbar = () => {
  return (
    <nav className="flex w-full justify-between bg-blue-500 p-4 mb-1">
    <div className="flex gap-8">
      <Link to="/" className="underline">Home</Link>
      <Link to="/chart" className="underline">Chart</Link>
    </div>

    <h1>Date: {moment(Date.now()).format("DD-MM-YYYY")}</h1>
  </nav>
  )
}

export default Navbar