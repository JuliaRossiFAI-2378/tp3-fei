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




const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'dashboard',
        href: '/dashboard',
    },
];

export default function adminBoard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className=" m-10 mt-20 ">
                <p>esta es la zona admin, solo los admin pueden verla!!</p>
                <Link href={route('dashboard')}>
                    <Button variant="destructive" size="lg">
                        Ir al dashboard normal
                    </Button>
                </Link>
            </div> 
        </AppLayout>
    );
}
