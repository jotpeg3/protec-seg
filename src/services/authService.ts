import { supabase } from '../lib/supabase';

export type AuthRole = 'client' | 'patrol';

export interface Profile {
    id: string;
    full_name: string;
    role: AuthRole;
    cpf_cnpj: string;
    phone: string;
    email: string;
}

export const authService = {
    supabase,
    /**
     * Sign up a new user and create their profile
     */
    async signUp(email: string, password: string, profile: Omit<Profile, 'id'>) {
        // We include the profile data in metadata as a fallback
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: profile.full_name,
                    cpf_cnpj: profile.cpf_cnpj,
                    phone: profile.phone,
                    role: profile.role,
                }
            }
        });

        if (authError) throw authError;
        if (!authData.user) throw new Error('Falha ao criar usuário. Verifique se o e-mail é válido.');

        // Try to create the profile in the profiles table
        // This might fail if email confirmation is required and RLS is strict,
        // but the data is already safe in the user metadata.
        try {
            const { error: profileError } = await supabase.from('profiles').insert({
                id: authData.user.id,
                ...profile,
            });
            if (profileError) {
                console.warn('Profile insert error:', profileError);
                // We don't throw here because the user is already created in Auth
            }
        } catch (e) {
            console.error('Error creating profile entry:', e);
        }

        return authData.user;
    },

    /**
     * Sign in with email and password
     */
    async signIn(email: string, password: string) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;
        if (!data.user) throw new Error('Falha ao entrar.');

        // Fetch the profile to know the role
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

        // If profile doesn't exist, create one from user metadata
        if (profileError || !profile) {
            console.log('[Auth] Profile not found, creating from metadata...');
            const meta = data.user.user_metadata || {};
            const newProfile: Profile = {
                id: data.user.id,
                full_name: meta.full_name || email.split('@')[0],
                role: meta.role || 'client',
                cpf_cnpj: meta.cpf_cnpj || '',
                phone: meta.phone || '',
                email: email,
            };

            const { error: insertError } = await supabase
                .from('profiles')
                .upsert(newProfile);

            if (insertError) {
                console.warn('[Auth] Could not create profile:', insertError.message);
            }

            return { user: data.user, profile: newProfile };
        }

        return { user: data.user, profile: profile as Profile };
    },

    /**
     * Sign in using CPF or CNPJ instead of email
     */
    async signInWithCpfCnpj(cpfCnpj: string, password: string) {
        // 1. Find the email associated with this CPF/CNPJ using the RPC
        const { data: email, error: rpcError } = await supabase.rpc('get_email_by_cpf_cnpj', {
            p_cpf_cnpj: cpfCnpj,
        });

        if (rpcError || !email) {
            throw new Error('CPF/CNPJ não encontrado ou senha incorreta.');
        }

        return this.signIn(email, password);
    },

    /**
     * Send password reset email
     */
    async resetPassword(email: string) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: 'protecseg://reset-password', // Update this based on your deep link
        });

        if (error) throw error;
        return true;
    },

    /**
     * Sign out
     */
    async signOut() {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    },

    /**
     * Get current session and profile
     */
    async getCurrentUser() {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) return null;

        const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

        return { user: session.user, profile: profile as Profile };
    }
};
