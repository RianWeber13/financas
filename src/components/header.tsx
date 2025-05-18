import { CirclePlus } from "lucide-react"
import Image from "next/image"
import LogoImage from "../assets/logo.svg"

export function Header(){
    return(
    <header style={{display: "flex", 
    justifyContent: "space-between", 
    width:"100%",
    }}>
    <Image 
    src={LogoImage}
    width={40}
    height={40}
    alt="Picture of a piggy bank"
    />
    <button>
    <CirclePlus/>
    </button>
    </header>
)
    }