import { HeaderContainer } from "./styles";
import IgniteLogo from '../../assets/igniteLogo.svg';
import {Scroll, Timer} from 'phosphor-react'
import {NavLink} from 'react-router-dom'


export function Header(){
    return (
        <HeaderContainer>
            <img src={IgniteLogo} alt="Main Logo" />
            <nav>
                <NavLink to="/" title="timer">
                    <Timer size={24}/>
                </NavLink>

                <NavLink to="/history" title="history">
                    <Scroll size={24}/>
                </NavLink>
              
            </nav>
        </HeaderContainer>
    )
}