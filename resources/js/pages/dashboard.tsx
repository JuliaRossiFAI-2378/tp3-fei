import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import "../../css/pages/dashboard.css";
import { usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { timerIncrement } from '@/hooks/timerIncrement';
import { useCallback, useState, useEffect, useRef, useMemo } from 'react';
import { useIncrementTrigger } from '@/hooks/useIncrementTrigger';
import { useAttackOnTrigger } from '@/hooks/useAttackOnTrigger';
import { useHitOnTrigger } from '@/hooks/useHitOnTrigger';
import { useTakeHit } from '@/hooks/useTakeHit';
import Grid from '@/components/player-grid';
import { PlayerStatsContext, EnemyStatsContext } from '@/hooks/StatsContext';
import { DragProvider } from '@/hooks/DragContext';
import Loot from '@/components/loot';
import Header from '@/components/header';
import getPokemon from '../../services/getPokemon';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    //datos
    const {user, game, enemyList, pokemonEnemy} = usePage().props;
    const [currentEntity, setCurrentEntity] = useState("none");//npc
    
    //decide entidad actual
    useEffect(() => {
        if (game?.npc != null) {
            setCurrentEntity("npc");
        } else if (game?.ghost != null) {
            setCurrentEntity("ghost");
        }
    }, [game]);

    const { post } = useForm();
    const sword = game?.equipments?.find(equip => equip.type?.name === "sword");
    const shield = game?.equipments?.find(equip => equip.type?.name === "shield");
    const upper = game?.equipments?.find(equip => equip.type?.name === "helm");
    const lower = game?.equipments?.find(equip => equip.type?.name === "boots");

    //me parece que no safamos de definir estas variables aunque no haya ghost :/
    const ghostSword = game?.ghost?.equipments?.find(equip => equip.type?.name === "sword");
    const ghostShield = game?.ghost?.equipments?.find(equip => equip.type?.name === "shield");
    const ghostUpper = game?.ghost?.equipments?.find(equip => equip.type?.name === "helm");
    const ghostLower = game?.ghost?.equipments?.find(equip => equip.type?.name === "boots");
    //console.log(game);


    //definicion de valores de combate como use states
    //valores de player
    const [maxHp, setMaxHp] = useState(() => upper?.base_item?.material?.defaultHealth ?? 11);
    useEffect(() => {
        if (upper?.base_item?.material?.defaultHealth != null){
            setMaxHp(upper?.base_item?.material?.defaultHealth);
        }
    }, [upper]);
    const [hp, setHp] = useState(() => game?.currentHp ?? 11);
    useEffect(() => {
        if (game?.currentHp != null){
            setHp(game?.currentHp);
        }
    }, [game]);

    const [damage, setDamage] = useState(() => sword?.base_item?.material?.defaultDmg ?? 1);
    useEffect(() => {
        if (sword?.base_item?.material?.defaultDmg != null){
            setDamage(sword?.base_item?.material?.defaultDmg);
        }
    }, [sword]);
    
    const [armor, setArmor] = useState(() => shield?.base_item?.material?.defaultArmor ?? 1);
    useEffect(() => {
        if (shield?.base_item?.material?.defaultArmor != null){
            setArmor(shield?.base_item?.material?.defaultArmor);
        }
    }, [shield]);

    const [speed, setSpeed] = useState(() => lower?.base_item?.material?.defaultSpeed ?? 1);
    useEffect(() => {
        if (lower?.base_item?.material?.defaultSpeed != null){
            setSpeed(lower.base_item.material.defaultSpeed);
        }
    }, [lower]);

    //valores de npc//ghost
    const [maxHp2, setmaxHp2] = useState(() => game?.npc?.hp ?? 15);

    const [hp2, setHp2] = useState(() => game?.npc?.hp ?? 13);
    useEffect(() => {
        if(currentEntity === "npc"){
            if (game?.npc?.hp != null){
                setHp2(game?.npc?.hp);
            }
        }else if (currentEntity === "ghost"){
            if (ghostUpper?.base_item?.material?.defaultHealth != null){
                setHp2(ghostUpper?.base_item?.material?.defaultHealth);
            }
        }
    }, [game, currentEntity]);

    const [enemySpeed, setEnemySpeed] = useState(() => game?.npc?.spd ?? 1.5);
    useEffect(() => {
        if(currentEntity === "npc"){
            if (game?.npc?.spd != null){
                setEnemySpeed(game?.npc?.spd);
            }
        }else if (currentEntity === "ghost"){
            if (ghostLower?.base_item?.material?.defaultSpeed != null){
                setEnemySpeed(ghostLower?.base_item?.material?.defaultSpeed);
            }
        }
    }, [game, currentEntity]);

    const [enemyDamage, setEnemyDamage] = useState(() => game?.npc?.atk ?? 1.5);
    useEffect(() => {
        if(currentEntity === "npc"){
            if (game?.npc?.atk != null){
                setEnemyDamage(game?.npc?.atk);
            }
        }else if (currentEntity === "ghost"){
            if (ghostSword?.base_item?.material?.defaultDmg != null){
                setEnemyDamage(ghostSword?.base_item?.material?.defaultDmg);
            }
        }
    }, [game, currentEntity]);

    const [enemyArmor, setEnemyArmor] = useState(() => game?.npc?.armor ?? 0);
    useEffect(() => {
        if(currentEntity === "npc"){
            if (game?.npc?.armor != null){
                setEnemyArmor(game?.npc?.armor);
            }
        }else if (currentEntity === "ghost"){
            if (ghostShield?.base_item?.material?.defaultArmor != null){
                setEnemyArmor(ghostShield?.base_item?.material?.defaultArmor);
            }
        }
    }, [game, currentEntity]);


    const [play, setPlay] = useState(false);

    //condicion para finalizar combate
    useEffect(() => {
        if (hp <= 0 || hp2 <= 0){
            setPlay(false)
            if(hp>0 && currentEntity === "npc" ){//lo enviamo a la pagina de loot
                router.patch('dashboard', {"currentHp": hp, "currentScene":3});
            }else if(hp>0 && currentEntity === "ghost"){
                //esto deberia comenzar un nuevo dia!
                router.patch('dashboard', {"gameOver": true,});
            }else{
                router.patch('dashboard', {"gameOver": true,});
            }
        }
    }, [hp, hp2])

    //animaciones y logica de ataque
    const [playerAttack, setPlayerAttack] = useState(false);//mouse herramientas que usamos como eventos
    const [playerHit, setPlayerHit] = useState(false);
    const [playerGetHit, setPlayerGetHit] = useState(false);
    const [playerStatusEffects, setPlayerStatusEffects] = useState({});
    const playerOnStartLoaded = useRef(false);
    const [playerLastDamageTaken, setPlayerLastDamageTaken] = useState(0);

    const [enemyAttack, setEnemyAttack] = useState(false);
    const [enemyHit, setEnemyHit] = useState(false);
    const [enemyGetHit, setEnemyGetHit] = useState(false);
    const [enemyStatusEffects, setEnemyStatusEffects] = useState({});
    const enemyOnStartLoaded = useRef(false);
    const [enemyLastDamageTaken, setEnemyLastDamageTaken] = useState(0);

    //////////////////////////Player logic

    //funciones para agregar o remover estados
    const addPlayerStatus = (status, value) => {
        setPlayerStatusEffects(prev => ({...prev, [status]: (prev[status] || 0) + value }));
    };
    const removePlayerStatus = (status) => {
        setPlayerStatusEffects(prev => {const newStatus = { ...prev }; delete newStatus[status]; return newStatus;});
    };

    const addEnemyStatus = (status, value) => {
        setEnemyStatusEffects(prev => ({...prev, [status]: (prev[status] || 0) + value }));
    };
    const removeEnemyStatus = (status) => {
        setEnemyStatusEffects(prev => {const newStatus = { ...prev }; delete newStatus[status]; return newStatus;});
    };

    //aplicar estados onLoad a player
    useEffect(() => {
        if (game && !playerOnStartLoaded.current) {
            const items = [sword, shield, upper, lower];
            const materials = ['base_item', 'addon_item'] as const;
            for (const item of items) {
                for (const material of materials) {
                    if (item?.[material].trigger_id === 5) {
                        console.log(item?.[material].effect?.name+", "+item?.[material].effectValue+" agregado a player")
                        addPlayerStatus(item?.[material].effect?.name, item?.[material].effectValue);
                    }
                }
            }
            playerOnStartLoaded.current = true;
        }
    }, [game]);

    //aplica estados onLoad a enemigos
    useEffect(() => {
        if (game && !enemyOnStartLoaded.current) {
            if(currentEntity === "ghost"){
                const items = [ghostSword, ghostShield, ghostUpper, ghostLower];
                const materials = ['base_item', 'addon_item'] as const;
                for (const item of items) {
                    for (const material of materials) {
                        if (item?.[material].trigger_id == 5) {
                            addEnemyStatus(item?.[material].effect?.name, item?.[material].effectValue);
                            console.log(item?.[material].effect?.name+", "+item?.[material].effectValue+" agregado a enemigo")
                        }
                    }
                }
                enemyOnStartLoaded.current = true;//evita repeticion
            }else if(currentEntity==="npc"){
                //no lo se suerte
                enemyOnStartLoaded.current = true;
            }
        }
    }, [game, currentEntity]);//no estan cargando los estados enemigos bien hasta recargar la pagina una vez, no idea why


    const { value: playerAttackTimer, setValue: setPlayerAttackTimer } = useIncrementTrigger(
        play,   // reproducir o no
        0.02,   // step
        20,     // intervalo en ms
        speed,  // aca va la velocidad de atk
        () => setPlayerAttack(true) //segun quien ataque cambiamo
    );

    const attackRef = useAttackOnTrigger(
        playerAttack,           //trigger
        "playerWeapon",         //id para animar
        "animate-attack",       //clase de animacion
        () => {
            //funciones que necesitemos activar onAttack
            setPlayerHit(true)
            if ((enemyStatusEffects["thorns"] ?? 0) > 0) {
                setPlayerGetHit(true);
                setPlayerLastDamageTaken(enemyStatusEffects["thorns"]);
            }
        }
    );
    
    //mouseherramienta que guarda el ultimo hit realizado por si acaso.
    const lastHit = useHitOnTrigger(
        playerHit,//trigger
        damage, //cantidad de daño
            () => {
                //aca podemos ejecutar otras funciones
                setEnemyGetHit(true);
                setPlayerAttack(false); //resetea trigger de animación
                setPlayerHit(false);    //resetea trigger de golpe   
                setPlayerAttackTimer(0);//resetea el timer/cd
        }
    );

    ///////////////////////////////////////////esto tiene que ir aca porque enemy last hit se usa justo abajo
    const enemyLastHit = useHitOnTrigger(
        enemyHit,   //trigger
        enemyDamage,//cantidad de daño
        () => {
            //aca podemos ejecutar otras funciones
            setPlayerGetHit(true);
            setEnemyAttack(false); //resetea trigger de animación
            setEnemyHit(false);    //resetea trigger de golpe   
            setEnemyAttackCounter(0);//resetea el timer/cd
        }
    );
    //////////////////////////////////////////

    useEffect(() => {
        if (enemyLastHit !== undefined && enemyLastHit !== null && enemyLastHit > 0) {
            setPlayerLastDamageTaken(enemyLastHit);
        }
    }, [enemyLastHit]);

    useTakeHit(
        playerGetHit,//trigger
        setHp,      //funcion para cambiar vida
        setArmor,   //funcion para cambiar armadura
        playerLastDamageTaken,//daño
        () => {
            //funciones al recibir golpes
            setPlayerGetHit(false)
            setPlayerLastDamageTaken(enemyLastHit)//reseta las espinas, vos confia
        }
    );

    /////////////////////////npc-rival logic


    // Incremento que dispara la acción de ataque
    const { value: enemyAttackCounter, setValue: setEnemyAttackCounter } = useIncrementTrigger(
        play,   // reproducir o no
        0.02,   // step
        20,     // intervalo en ms
        enemySpeed,      // aca va la velocidad de atk
        () => {
            setEnemyAttack(true)
        } //segun quien ataque cambiamo
    );

    const enemyAttackRef = useAttackOnTrigger(
        enemyAttack,           //trigger
        currentEntity === "ghost" ? "ghostWeapon" : "enemy",         //id para animar
        "animate-enemy-attack",//clase de animacion
        () => {
            //funciones que necesitemos activar onAttack
            setEnemyHit(true)
            if ((playerStatusEffects["thorns"] ?? 0) > 0) {
                setEnemyGetHit(true);
                setEnemyLastDamageTaken(playerStatusEffects["thorns"]);
            }
        }
    );

    //separamos lastHit y el valor que le enviamos a takeHit
    useEffect(() => {
        if (lastHit !== undefined && lastHit !== null && lastHit > 0) {
            setEnemyLastDamageTaken(lastHit);
        }
    }, [lastHit]);

    useTakeHit(
        enemyGetHit,//trigger
        setHp2,     //funcion para cambiar la vida
        setEnemyArmor,//funcion para cambiar armadura
        enemyLastDamageTaken,    //daño
        () => {
            //funciones al recibir golpes
            setEnemyGetHit(false)
            setEnemyLastDamageTaken(lastHit)//reseta las espinas, vos confia
        }
    );

    //////////////////////// storm
    //la tormenta va haciendo cada vez mas daño despues de un minuto, para evitar combates infinitos

    //play, la duración en segundos, los step, intervalo en ms, y en que momento se activa en segundos
    const { timer, stormDamage, setTimer, setStormDamage } = timerIncrement(play, 360, 0.4, 400, 60);
    const stormInterval = 400;//en ms
    const stormDamageRef = useRef(stormDamage);//usamos useRef para stormDamage pq sino no actualiza bien

    //valor del daño en numero entero
    useEffect(() => {
        //la formula esta es para que el daño aumente de manera no lineal
        stormDamageRef.current = (stormDamage * stormDamage-1).toFixed(0);
        }, [stormDamage]);

            useEffect(() => {
                if (!play) return;
                const storm = setInterval(() => {
                if(stormDamageRef.current>0){
                    setHp(prev => prev - stormDamageRef.current);
                    setHp2(prev => prev - stormDamageRef.current);
                }
            }, stormInterval);

        return () => clearInterval(storm);
    }, [play]);
    
    /////////////////////////
    const [pokemonNpc, setPokemonNpc] = useState([]);
    let auxilio = [];
    useEffect(() => {
        if(game?.currentScene === 4){//para no fetchear en cualquier version de la pagina
            const fetchPokemon = async() => {
                const usedNumbers = new Set();
                for(let i=0; i<3; i++){
                    const randomNumber = Math.floor(Math.random() * 151) + 1;//t puede salir 0 con random
                    if (!usedNumbers.has(randomNumber)){
                        const pokemon = await getPokemon(randomNumber);
                        if(pokemon){
                            auxilio.push(pokemon);
                        }
                        console.log(pokemon)
                    }
                }
                setPokemonNpc(auxilio);
            }
            fetchPokemon();
        }
    }, [game])

    const memoPokemon = useMemo(() => {
        if (!pokemonNpc?.length) return null;
        return enemyList?.slice(0, 3).map((enemy, i) => {
            const npc = pokemonNpc[i];
            if (!npc) return null;
                return (
                    <div key={enemy.id} className={`max-w-xl bg-red-900 rounded-2xl p-4 [grid-area:enemyPick${i + 1}]`}
                        onClick={() => router.patch("dashboard", { currentScene: 2, currentEnemy: enemy.id, pokemonEnemy: npc })}
                    >
                        <p>{npc?.name}</p>
                        <img src={npc?.sprites?.front_default} />
                    </div>
                );
        });
    }, [pokemonNpc, enemyList]);

    return (
        <>
        <Header/>
            <DragProvider>
            {game.currentScene !== 1 ? 

                (game.currentScene === 2 ? //si existe un enemigo
                <div className="main h-full gap-4 rounded-xl p-4 overflow-hidden">
                    <PlayerStatsContext.Provider value={{ damage: damage , cooldown: playerAttackTimer, speed: speed}}>
                        <Grid variant="player" sword={sword} shield={shield} upper={upper} lower={lower} />
                    </PlayerStatsContext.Provider>
                    <div className="spacingtop overflow-hidden [grid-area:spacingtop]">
                        <p>Dia actual: {game.currentDay}</p>
                    </div>
                        <EnemyStatsContext.Provider value={{ damage: enemyDamage , cooldown: enemyAttackCounter, speed: enemySpeed}}>
                            <Grid variant="npc" npc={game?.npc} poke={pokemonEnemy}  />
                        </EnemyStatsContext.Provider>
                    <div className=" [grid-area:versus] rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                        <button onClick={()=>{setPlay(!play)}} className='bg-red-300 rounded-2xl p-4' >
                            animacion
                        </button>
                        <p>Vida jugador: {hp}</p>
                        <p>Armadura jugador: {armor}</p>
                        <p>Enfriamiento jugador: {playerAttackTimer.toFixed(2)}/{speed}</p>
                        <br></br>
                        <p>Vida Enemigo: {hp2}</p>
                        <p>Armadura enemigo: {enemyArmor}</p>
                        <p>Enfriamiento enemigo: {enemyAttackCounter.toFixed(2)}/{enemySpeed}</p>
                        <p>timer de combate: {timer.toFixed(2)}</p>
                        <p>daño actual de tormenta: {(stormDamage * stormDamage-1).toFixed(0)}</p>
                        </div>
                    <div className=" [grid-area:spacingbot] ">
                        hola soy spacing bot
                    </div>
                </div>

                    :

                    (game.currentScene === 4?

                    <div className="enemy-list gap-4">
                        {memoPokemon}
                    </div>
                        
                :
                (/*perdoname por esto diosito */
                game.currentScene === 5 ?

                <div className="main h-full gap-1">
                    <PlayerStatsContext.Provider value={{ damage: damage , cooldown: playerAttackTimer, speed: speed}}>
                        <Grid variant="player" sword={sword} shield={shield} upper={upper} lower={lower} />
                    </PlayerStatsContext.Provider>
                    <div className="spacingtop [grid-area:spacingtop]">
                        <p>Dia actual: {game.currentDay}</p>
                    </div>
                    <EnemyStatsContext.Provider value={{ damage: enemyDamage , cooldown: enemyAttackCounter, speed: enemySpeed}}>
                        <Grid variant="ghost" ghost={game?.ghost} />
                    </EnemyStatsContext.Provider>
                    <div className="versus [grid-area:versus] rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                            <button onClick={()=>{setPlay(!play)}} className='bg-red-300 rounded-2xl p-4' >
                                animacion
                            </button>
                        <p>Vida jugador: {hp}</p>
                        <p>Armadura jugador: {armor}</p>
                        <p>Enfriamiento jugador: {playerAttackTimer.toFixed(2)}/{speed}</p>
                        <br></br>
                        <p>Vida Enemigo: {hp2}</p>
                        <p>Armadura enemigo: {enemyArmor}</p>
                        <p>Enfriamiento enemigo: {enemyAttackCounter.toFixed(2)}/{enemySpeed}</p>
                        <p>timer de combate: {timer.toFixed(2)}</p>
                        <p>daño actual de tormenta: {(stormDamage * stormDamage-1).toFixed(0)}</p>
                    </div>
                    <div className="spacingbot [grid-area:spacingbot] ">
                    </div>
                </div>


                :
                
                <div className="main" >
                    
                    <Grid variant="player" sword={sword} shield={shield} upper={upper} lower={lower} hoverMix={true} />
                    
                    <div className="[grid-area:spacing-top]"></div>
                    <p>loot page!</p>
                    <div className="[grid-area:enemy]" >
                    <div>
                        <Loot material={{id: 2, name: "Rose", image: "Rose.png", defaultDmg: 5, defaultHealth: 40, defaultArmor: 5, defaultSpeed: 5}/*obviamente esto tiene que venir desde DB, suerte */} ></Loot>
                    </div>
                    <div className=" m-10 mt-20 ">
                        <button className="btn bg-red-300 rounded-2xl p-4" onClick={() => {router.patch('dashboard', {"currentScene": 5, "currentDay": 1, "currentEnemy": null});}}>
                            continuar a ghost
                        </button>
                    </div>
                    </div>
                </div>)

                    )
                )


            :   
                //si no existe enemigo
                <div className=" m-10 mt-20 ">
                <Button variant="destructive" size="lg" onClick={() => {router.patch('dashboard', {"currentScene": 4});}}>
                    Jogar
                </Button>
                </div> 
            }
            </DragProvider>
        </>
    );
}
