import supabase from "../global/supabaseClient";

export const getProfile = async (session, setProfile, setLoading) => {
    setLoading(true)
    try {
        const { user } = session
        if (user?.id) {
            let { data, error } = await supabase
                .from("profiles")
                .select(`username, avatar_url`)
                .eq("id", user?.id)
                .single();

            console.log(data)

            if (error) {
                console.error(error)
            }

            let { data: avatarData, error: avatarError } = supabase.storage
                .from("avatars")
                .getPublicUrl(`Profile Photo/${data.avatar_url}`);
            if (avatarError) {
                console.error(error)
            } else {
                setProfile({ username: data.username, avatarUrl: avatarData.publicUrl });
            }
        }


    } catch (error) {
        console.log(error.message);
    }
    finally {
        setLoading(false)
    }
};