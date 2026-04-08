import { User } from "@supabase/supabase-js";
import { create } from "zustand";

interface UserState {
    user: User | null;
    profile: {
        id: string | null;
        full_name: string | null;
        email: string | null;
    };
    setUser: (user: User | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    profile: {
        id: null,
        full_name: null,
        email: null,
    },
    setUser: (user) => set({user,
        profile: {
            id: user?.id || null,
            full_name: user?.user_metadata.full_name || null,
            email: user?.email || null,
        }
    })
}))