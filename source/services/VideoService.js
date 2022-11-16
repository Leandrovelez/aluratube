import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://caevfzvybkdisrhzmkyg.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhZXZmenZ5YmtkaXNyaHpta3lnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyOTE5MTgsImV4cCI6MTk4Mzg2NzkxOH0.OXteKuOweh8990cD6km3cxITIYq2oSyICFOfalzB8RU";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService(){
    return {
        getAllVideos(){
            return supabase.from("video")
                .select("*")
        },
        getAllPlaylists(){
            return supabase.from("playlist")
                .select("*")
        }
    }
}