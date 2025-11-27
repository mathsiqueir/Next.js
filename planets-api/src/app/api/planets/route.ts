import { NextRequest, NextResponse } from "next/server";

let planets = [
    {
        id: 1,
        name: "Terra",
        description: "Planeta em que vivemos",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/1024px-The_Earth_seen_from_Apollo_17.jpg",
    },
    {
        id: 2,
        name: "Marte",
        description: "Planeta vermelho",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/1024px-OSIRIS_Mars_true_color.jpg",
    },
    {
        id: 3,
        name: "Jupiter",
        description: "Maior planeta do sistema solar",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg/1024px-Jupiter_and_its_shrunken_Great_Red_Spot.jpg",
    },
    {
        id: 4,
        name: "Saturno",
        description: "Planeta anão",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/1024px-Saturn_during_Equinox.jpg",
    }
]

export function GET(req: NextRequest){
    return NextResponse.json(planets)
}

export async function POST(req: NextRequest){
    const {name, description, imageUrl} = await req.json()
    
    const newPlanet = {
        id: planets.length + 1,
        name,
        description,
        imageUrl
    }

    planets.push(newPlanet)

    return NextResponse.json(newPlanet, {status: 201})
}

export async function PUT(req: NextRequest){
    const {id, name, description, imageUrl} = await req.json()

    const planetIndex = planets.findIndex(planet => planet.id === id)
    if(planetIndex === -1){
        return NextResponse.json({message: "Planeta não encontrado"}, {status: 404})
    }
    if(name){
        planets[planetIndex].name = name
    }
    if(description){
        planets[planetIndex].description = description
    }
    if(imageUrl){
        planets[planetIndex].imageUrl = imageUrl;
    }

    return NextResponse.json(planets[planetIndex])
}

export async function DELETE(req: NextRequest){
    const {id} = await req.json()

    const planetIndex = planets.findIndex(planet => planet.id === id)
    if(planetIndex === -1){
        return NextResponse.json({message: "Planeta não encontrado"}, {status: 404})
    }
    const deletedPlanet = planets.splice(planetIndex, 1)

    return NextResponse.json({deletedPlanet}, {status: 200})
}