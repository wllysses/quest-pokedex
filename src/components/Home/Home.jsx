import { useContext } from "react"
import styled from "styled-components"
import PokemonList from "../PokemonList/PokemonList"
import { ThemeContext } from "../../contexts/theme-context"

export default function Home() {

    const { theme } = useContext(ThemeContext)
    return (
        
        <Container style={{color: theme.color, backgroundColor: theme.background}}>
            <PokemonList />
        </Container>
       
    )
}

const Container = styled.div`
    width: 100%;
    background-color: #F7F7F7;
    min-height: 100vh;

`