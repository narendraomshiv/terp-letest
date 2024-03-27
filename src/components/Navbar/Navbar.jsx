import { useState } from "react"
import { NavLink } from "react-router-dom"
import Logo from "../../assets/white-logo.png"
import Button from "../Button"
import ChooseLang from "./ChooseLang"
import NavLinks from "./Navlinks.jsx"
import ProfileMenu from "./ProfileMenu"
const Navbar = () => {
	const [open, setOpen] = useState(false)
	return (
		<nav
			className="bg-cyan-950 sticky top-0 w-full navGap"
			style={{ backgroundColor: "#203764", zIndex: "30" }}
		>
			<div className="flex items-center font-medium justify-between">
				<div className="z-50 flex justify-between navLogo w-full md:w-auto">
					<NavLink to="/dashboard" className="flex">
						<img src={Logo} alt="logo" className="md:cursor-pointer h-9" />
						<span className="text-white ml-2  justify-between items-center flex terplogo">
							Terp
						</span>
					</NavLink>
					<button
						type="button"
						className="text-3xl md:hidden ml-auto flex items-center"
						onClick={() => setOpen(!open)}
					>
						<ion-icon name={`${open ? "close" : "menu"}`} />
					</button>
				</div>
				<ul className="md:flex text-white hidden capatalize items-center font-light font-[Poppins] inventoryNav ">
					<NavLinks />
				</ul>
				<div className="md:block hidden">
					<ProfileMenu />
					<span style={{ paddingLeft: "20px" }}>
						<ChooseLang />
					</span>
				</div>

				<ul
					className={`md:hidden fixed w-full top-0 overflow-y-auto bottom-0 py-24 pl-4 duration-500 text-white ${
						open ? "left-0" : "left-[-100%]"
					}`}
					style={{ backgroundColor: "rgb(8 47 73)" }}
				>
					<NavLinks setOpen={setOpen} />
					<div className="py-5">
						<Button />
					</div>
				</ul>
			</div>
		</nav>
	)
}

export default Navbar
