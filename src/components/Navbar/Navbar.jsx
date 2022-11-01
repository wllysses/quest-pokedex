import styled from "styled-components"
import Pokeball from '../../assets/pokeball.png'
import ThemeTogglerButton from "../ThemeTogglerButton/ThemeTogglerButton"
import { ThemeContext } from "../../contexts/theme-context"
import { useContext } from "react"

export default function Navbar() {

    const { theme } = useContext(ThemeContext)
    
    return (
        <Header style={{color: theme.color, backgroundColor: theme.background}}>
            <TitleWrapper>
                <img src={Pokeball} alt="Pokeball" />
                <h1>My Pokedéx</h1>
            </TitleWrapper>
            <ThemeTogglerButton />
        </Header>
    )
}

const Header = styled.header`
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid #B7B9D0;

    img {
        max-width: 3rem;
    }
`

const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`