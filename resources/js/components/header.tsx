import { Link, router, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { Button } from './ui/button';

const Header = () => {
    const { auth } = usePage<SharedData>().props;

    return (
        <header className="relative z-30">
            <div className="flex items-center justify-between px-15  h-64 sm:h-48 md:h-64 lg:h-80 bg-no-repeat bg-center" style={{backgroundImage: "url('/images/header.jpg')", backgroundPosition: 'center top', backgroundSize: '100% 100%' }} >
                <Link href={route('home')} >
                    <h1 className="text-red-950 text-2xl lg:text-4xl font-semibold drop-shadow-lg">
                    Ghost Castle
                    </h1>
                </Link>

                <nav className=" flex items-center gap-4 sm:gap-4">
                    {auth.user ? (
                        <>
                            <Link href={route('dashboard')} >
                                <Button>
                                    Dashboard
                                </Button>
                            </Link>

                            <Link href={route('profile')}>
                                <Button>
                                    Profile
                                </Button>
                            </Link>

                            <Button onClick={() => router.post('logout')} >
                                Log Out
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link href={route('login')}>
                                <Button>
                                    Log in
                                </Button>
                            </Link>

                            <Link href={route('register')} >
                                <Button>
                                    Register
                                </Button>
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
