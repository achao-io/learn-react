import { createFileRoute } from '@tanstack/react-router'
import { Scissors, BrickWall, Scroll, Skull, PartyPopper, Handshake } from 'lucide-react'
import { useState } from 'react'
import Confetti from 'react-confetti'
export const Route = createFileRoute('/rock-paper-scissors')({
  component: RouteComponent,
})

type Weapon = 'Rock' | 'Paper' | 'Scissors'
const weapons = ["Rock", "Paper", "Scissors"] as const


function RouteComponent() {

    const [userChoice, setUserChoice] = useState<Weapon | null>(null)
    const [computerChoice, setComputerChoice] = useState<Weapon | null>(null)
    const [gameState, setGameState] = useState<"playing" | "done">("playing")

    function handleUserChoice(weapon: Weapon) {
        setUserChoice(weapon)
        const randomIndex = Math.floor(Math.random() * weapons.length)
        const randomWeapon = weapons[randomIndex]
        setComputerChoice(randomWeapon)
        setGameState("done")
    }

    function getResult() {

        let message = <></>;
        if (userChoice === computerChoice) {
            message = (
                <>
                    <Handshake className="size-12" />
                    <p>It's a Tie!</p>
                </>
            )
        }
        else if (
            (userChoice === "Rock" && computerChoice === "Scissors") || 
            (userChoice === "Paper" && computerChoice === "Rock") || 
            (userChoice === "Scissors" && computerChoice === "Paper")
        ) {
            message = (
                <>
                    <Confetti numberOfPieces={400}/>
                    <PartyPopper className="size-12" />
                    <p>You Win!</p>
                </>
            )
        } else {
            message = (
                <>
                    <Skull className="size-12" /> 
                    <p>You Lose!</p>
                </>
            )
        }
        return (
            <div className="flex flex-col items-center justify-center gap-8">
                {message}
            </div>
        )
    }

    function resetGame() {
        setUserChoice(null)
        setComputerChoice(null)
        setGameState("playing")
    }

    return (
        <div className="flex flex-col items-center justify-center gap-8 h-screen text-blue-500">    
            {gameState === "playing" ? ( 
                <>
                    <div className="flex items-center justify-center gap-8">
                        <button 
                            onClick={() => handleUserChoice('Rock')} 
                            className="flex flex-col gap-4 justify-center items-center p-8 border border-gray-500 rounded bg-black h-80 w-80 hover:bg-gray-800"
                        >
                            <BrickWall className="size-12" />
                            Rock
                        </button>
                        <button 
                            onClick={() => handleUserChoice('Paper')} 
                            className="flex flex-col gap-4 justify-center items-center p-8 border border-gray-500 rounded bg-black h-80 w-80 hover:bg-gray-800"
                        >
                            <Scroll className="size-12" />
                            Paper
                        </button>
                        <button 
                            onClick={() => handleUserChoice('Scissors')} 
                            className="flex flex-col gap-4 justify-center items-center p-8 border border-gray-500 rounded bg-black h-80 w-80 hover:bg-gray-800"
                        >
                            <Scissors className="size-12" />
                            Scissors
                        </button>
                    </div>
                </> 
            ) : ( 
                <>
                    <div className="flex flex-col items-center justify-center gap-8">
                        <p>You chose <span className="font-bold">{userChoice}</span>, Computer chose <span className="font-bold">{computerChoice}</span></p> 
                        <p className="font-bold">{getResult()}</p>
                        <button className="bg-blue-500 text-white p-2 rounded" onClick={resetGame}>Play Again</button>
                    </div>
                </>
            )}
        </div>
        )
    }
