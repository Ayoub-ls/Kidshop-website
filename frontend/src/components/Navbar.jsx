import { NavLink } from "react-router-dom"
import { assets } from "../assets/assets"

function Navbar() {

  return (
    <div className="fixed bottom-2 left-1/2 px-8 py-4 rounded-full bg-sec -translate-1/2">
      <ul className="flex gap-x-8 m-0 p-0">
          {
            [assets.home, assets.heart, assets.basket, assets.profile].map((icon, index)=> (
              <NavLink to={`${index === 0 ? '/' : index === 1 ? '/favorets' : index === 2 ? '/cart' : '/login' }`} key={index} className={`w-6 rounded-xl p-1`} >
                <img src={icon} className="w-full" />
              </NavLink>
            ))
          }
      </ul>
    </div>
  )
}

export default Navbar