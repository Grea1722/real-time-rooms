'use client'

import { supabase } from "@/lib/supabase";
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";


export default function AuthProvider(){
    const setUser = useUserStore((state) => state.setUser);

    useEffect(()=> {
        //get user on mount
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user || null);
            console.log(session,'session flag')
        });
        //listen for auth changes
        const {data: {subscription}} = supabase.auth.onAuthStateChange((_event,session) => {
            setUser(session?.user || null);
        })

        return () => subscription.unsubscribe()

    }, [setUser])

    //this component only provides auth state, it doesn't render anything
    return null;
}