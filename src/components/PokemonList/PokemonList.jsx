import { useEffect, useState } from "react"
import styled from "styled-components"
import  { pokemon, getPokemons } from "../../services/api"
import { Link } from "react-router-dom"
import pokeballGif from '../../assets/pokeballGif.gif'
import { useContext } from "react"
import { ThemeContext } from "../../contexts/theme-context"

export default function PokemonList() {

    const { theme } = useContext(ThemeContext)
    const [pokemons, setPokemons] = useState([])
    const [loadMore, setLoadMore] = useState(0)
    const pokemonsPerPage = 10

    useEffect(() => {
        async function fetchData() {
            const pokeNames = await pokemon(pokemonsPerPage, loadMore)
            const names = pokeNames.map(async name => {
                return await getPokemons(name)
            })
            
            const pokemonsPromises = await Promise.all(names)
            
            setPokemons([...pokemons, ...pokemonsPromises])
        }

        fetchData()
    }, [loadMore])

    function handleShowMorePokemons() {
        setLoadMore(pokemonsPerPage + loadMore)
    }
    
    return (
        <div style={{color: theme.color, backgroundColor: theme.background}}>
            <PokemonsWrapper>
                {
                    pokemons.map((pokemon, index) => {
                        return (
                            <Link to={`/Detals/${pokemon.name}`} key={index}>
                                <CardPokemon>
                                    <h4>#0{pokemon.id}</h4>
                                    <img src={pokemon.sprites.other['official-artwork'].front_default} alt="CardPokemon" />
                                    <h3>{pokemon.name}</h3>
                                </CardPokemon>
                            </Link>
                        )
                    })
                }
            </PokemonsWrapper>
            <ShowMoreButton onClick={handleShowMorePokemons}>
                    <img src={pokeballGif} alt="Pokeball" />
                    <span>Show More</span>
            </ShowMoreButton>
        </div>
    )
}

export const PokemonsWrapper = styled.section`
    width: 100%;
    min-height: 500px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;

    a {
        text-decoration: none;
        color: black;
    }
`

const CardPokemon = styled.div`
    max-width: 250px;
    width: 100%;
    height: 280px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 8px;
    box-shadow: 0 3px 6px #00000052;
    margin: 10px;
    transition: 0.2s;
    border: 2px solid #B7B9D0;

    h4 {
        align-self: flex-end;
        padding: 5px 10px 0 0;
        color: #585858;
    }

    img {
        width: 80%;
        margin-bottom: 10px;
    }

    h3 {
        background-color: #B7B9D0;
        width: 100%;
        height: 50px;
        display: grid;
        place-items: center;
    }

    :hover {
        transform: scale(1.05);
    }
`

const ShowMoreButton = styled.div`
    padding: 10px 20px;
    background-color: #F7F7F7;
    border: 2px solid #FF3D00;
    border-radius: 5px;
    margin: 50px auto 0;
    cursor: pointer;
    color: black;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    transition: 0.1s;
    text-align: center;

    img {
        max-width: 50px;
    }

    :hover {
        background-color: #FF3D00;
        color: white;
    }

    :active {
        transform: scale(0.99);
    }
`