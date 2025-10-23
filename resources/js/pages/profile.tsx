import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import "../../css/pages/dashboard.css";
import { usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { useCallback, useState, useEffect } from 'react';
import makeChart from '../../services/makeChart';
import Frame from '@/components/Frame';



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile',
        href: '/profile',
    },
];

export default function profile() {       //       datos recibidos
    const {user, games} = usePage().props;//user: user id, name, email, role_id
    const gridRows = games?.length;       //games: id, player_id, isLive, currentDay, currentEnemy, created_at, updated_at, currentHp, ghost_id, currentScene
    const days = [];
    games.forEach(game => {
        days.push(game.currentDay);
    });
    const chartDays = {};
    const uniqueDays = new Set(days);
    uniqueDays.forEach(value => {
        chartDays[value] = days.filter((day) => day === value).length;
    });
    const [history, setHistory] = useState(false);
    const [chart, setChart] = useState("");
    useEffect(() => {
        const fetchChart = async() => {
            const img = await makeChart(chartDays);
            if(img){
                setChart(img.url);
            }
        }
        fetchChart();
    }, [])
    return (                              
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile" />
            <div className="grid grid-rows-2 gap-5 my-3 ml-3">
                <div className='border rounded-md border-orange-900 size-fit p-2'>
                    <span>Nombre de usuario: </span>
                    <span>{user.name}</span>
                </div>
                <div className='border rounded-md border-orange-900 size-fit p-2'>
                    <span>Correo electronico: {user.email}</span>
                </div>
            </div>
            <div className='flex self-center mt-16'>
                <Button className='w-lg text-xl' onClick={() => {setHistory(!history)}}>{history? "Ocultar" : "Ver"} historial de partidas</Button>
            </div>
            <div className={`${history? "" : "hidden"}`}>
                
                <h3 className='text-4xl font-[merriweather] flex justify-center mt-5'>Historial de partidas</h3>
                {games.length!==0 ?
                <Frame> 
                    <Frame>
                    <div className={`grid grid-rows-${gridRows} grid-cols-1 gap-3 my-3 ml-3 border rounded-md border-orange-900 size-fit h-fit py-3`}>
                    
                    <p>{console.log(chartDays)}</p>
                    {games.map((game, i) =>(
                        <div className="border-y px-3 border-cyan-900 py-1" key={i}>
                            <div>
                                <span>Dia actual: </span>
                                <span>{game.currentDay}</span>
                            </div>
                            <div>
                                <span>Enemigo actual: {game?.npc ? game.npc.name : 'No se ha seleccionado'}</span> {/*esto ns si dejarlo como "actual" o que ponerle
                                                                        tampoco se que onda con enemigo null asique lo deje como no seleccionado*/}
                            </div>
                            <div>
                                <span>Estado de la partida: {game?.isLive ? 'En curso' : 'Finalizada'}</span>
                            </div>
                        </div>
                    ))}
                    </div></Frame>
                    
                        <Frame>
                            <img src={`${chart}`} className='size-xl'></img>
                        </Frame>
                </Frame>
                : <p className='text-3xl font-[merriweather] m-6'>No hay partidas en su historial.</p>}
            </div>
        </AppLayout>
    );
}
