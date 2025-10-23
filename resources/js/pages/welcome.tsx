import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import Header from '@/components/header';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Header/>
            <div className="pt-80 flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-4xl lg:flex-row">
                    <div className="flex-1 rounded-br-lg rounded-bl-lg p-6 pb-12 text-[13px] leading-[20px] shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-tl-lg lg:rounded-br-none lg:p-20 dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                        <h1 className="mb-1 font-medium">Let's get started</h1>
                        <p className="mb-2 text-[#706f6c] dark:text-[#A1A09A]">
                            Laravel has an incredibly rich ecosystem.
                            <br />
                            We suggest starting with the following.
                        </p>

                    </div>
                    <div className="relative -mb-px aspect-[335/376] w-full shrink-0 overflow-hidden rounded-t-lg lg:mb-0 lg:-ml-px lg:aspect-auto lg:w-[438px] lg:rounded-t-none lg:rounded-r-lg">  
                    </div>
                </main>
            </div>
        </>
    );
}
