import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPokemons, getAbilities } from "../../services/api";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/theme-context";

export default function PokemonDetals() {
    const { theme } = useContext(ThemeContext)
    const [ability, setAbility] = useState([])
    const [stats, setStats] = useState([])
    const [types, setTypes] = useState([])
    const [moves, setMoves] = useState([])
    const [detals, setDetals] = useState({
        pokeName: '',
        pokeImg: '',
        pokeGif: '',
        pokeId: ''
    })
    const { name } = useParams()
    console.log(theme)

    useEffect(() => {
        async function fetchDataDetals() {
            const pokeDetals = await getPokemons(name)
            setDetals({
                pokeName: pokeDetals.name,
                pokeId: pokeDetals.id,
                pokeImg: pokeDetals.sprites.other['official-artwork'].front_default,
                pokeGif: pokeDetals.sprites.versions['generation-v']['black-white']['animated'].front_default
            })

            const pokeMoves = await pokeDetals.moves
            setMoves(pokeMoves.slice(0, 3))

            const pokeTypes = await pokeDetals.types
            setTypes(pokeTypes)

            const pokeStats = await pokeDetals.stats
            setStats(pokeStats)

            const pokeAbilities = await pokeDetals.abilities
            const abilities = await pokeAbilities.map(pokemonData => {
                let abilityName = pokemonData.ability.name
                return getAbilities(abilityName)
            })
            
            const abilitiesPromises = await Promise.all(abilities)
            setAbility(abilitiesPromises.slice(0, 2))
        }

        fetchDataDetals()
    }, [name])
    
    return (
        <div style={{color: theme.color, backgroundColor: theme.background, border: theme.border}}>
            <Container >
                <PokeWrapper>
                    <h3>0{detals.pokeId}-{detals.pokeName}</h3>
                    <img src={detals.pokeImg} alt="" />
                </PokeWrapper>
                <DescriptionWrapper>
                    <Title>Moves</Title>
                    <ul>
                        {
                            moves.map((move, index) => {
                                return (
                                    <li key={index}>{move.move.name}</li>
                                )
                            })
                        }
                    </ul>

                    <Title>Abilities</Title>
                    <ul>
                        {
                            ability.map((ability, index) => {
                                return (
                                    <li key={index}>
                                        <h4>{ability.name}</h4>
                                        <p>{ability.effect_entries[1].effect}</p>
                                    </li>
                                )
                            })
                        }
                    </ul>

                    <Title>Stats</Title>
                    <ul style={{width: '100%'}}>
                        {
                            stats.map((stat, index) => {
                                return (
                                    <li style={{display: 'flex', flexDirection: 'column', width: '100%'}} key={index}>
                                        <label style={{fontSize: 20}}>{stat.stat.name}</label>
                                        <input type="range" min="0" max="200" value={stat.base_stat} title={stat.base_stat}/>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    
                    <Title>Types</Title>
                    <ul style={{display: 'flex', gap: 10}}>
                        {
                            types.map((type, index) => {
                                return (
                                    <li key={index}>{type.type.name}</li>
                                )
                            })
                        }
                    </ul>
                </DescriptionWrapper>
            </Container>
            
            <Link to="/" style={{textDecoration: 'none', color: theme.color, border: '1px solid white'}}>
                <GoBackButton>
                    <img src={detals.pokeGif} alt={detals.pokeName} />
                    <span>Go Back</span>
                </GoBackButton>
            </Link>
        </div>
    )
}

const Container = styled.section`
    min-height: 85vh;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 50px;
    margin-bottom: 20px;
    padding: 1rem;

    @media (max-width: 900px) {
        flex-direction: column;
    }
`

const PokeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50%;

    img {
        max-width: 100%;
    }

    h3 {
        font-size: 3rem;
    }

    h2 {
        width: 100%;
    }

    @media (max-width: 900px) {
        width: 90%;
    }
`

const DescriptionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    gap: 10px;

    ul {
        list-style: none;

        li {
            font-size: 1.2rem;
            text-align: justify;

            h4 {
                margin: 10px 0;
            }
        }
    }

    @media (max-width: 900px) {
        width: 90%;
    }
`

const Title = styled.h2`
    font-size: 2rem;
    border-bottom: 1px solid black;
`

const GoBackButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    margin: auto;
    padding: 10px;
    max-width: 200px;
    border-radius: 5px;
    border: 1px solid black;

    img {
        max-width: 50px;
    }
    
    span {
        font-weight: 700;
    }
`