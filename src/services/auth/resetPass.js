import supabase from "../global/supabaseClient";
import toast from "react-hot-toast";

export const resetPass = async (email) => {
    try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/resetpassword`,
        });
        if (error) throw error;
        toast.success("Password reset link sent to your email");
    } catch (error) {
        console.error(error);
    }
}