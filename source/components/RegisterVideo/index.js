import { createClient } from "@supabase/supabase-js";
import React from "react";
import VideoPreview from "./components/videoPreview";
import { StyledRegisterVideo } from "./styles";

function getThumbnail(url){
    var videoId = url.split('watch?v=')[1];

        if(videoId.substr(0, videoId.indexOf('&t=')) != ""){
            videoId = videoId.substr(0, videoId.indexOf('&t='))
        }
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

function useForm(props){
    const [values, setValues] = React.useState(props.initialValues);

    return {
        values,
        handleChange: (e) => {
            const value = e.target.value;
            const name = e.target.name;
            setValues({
                ...values,
                [name]: value,
            });
        },
        clearForm(){
            setValues({});
        }
    }
}

const PROJECT_URL = "https://caevfzvybkdisrhzmkyg.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhZXZmenZ5YmtkaXNyaHpta3lnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyOTE5MTgsImV4cCI6MTk4Mzg2NzkxOH0.OXteKuOweh8990cD6km3cxITIYq2oSyICFOfalzB8RU";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export default function RegisterVideo(){
    const [formVisivel, setFormVisivel] = React.useState(false);
    const formCadastro = useForm({
        initialValues: { titulo: "", url: ""}
    })

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            { 
                formVisivel ? (
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        console.log(formCadastro.values.titulo, formCadastro.values.url, getThumbnail(formCadastro.values.url))
                        supabase.from("video").insert({
                            title: formCadastro.values.titulo,
                            url: formCadastro.values.url,
                            thumb: getThumbnail(formCadastro.values.url),
                            playlist: "Outros",
                        })
                        .then((response) => {
                            console.log(response);
                        })
                        .catch((err) => {
                            console.log(err);
                        })

                        setFormVisivel(false);
                        formCadastro.clearForm();
                    }}>
                        <div>
                            <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                                x
                            </button>
                            <input 
                                placeholder="Título do vídeo" 
                                name="titulo"
                                value={formCadastro.values.titulo} 
                                onChange={formCadastro.handleChange}
                            />
                            <input 
                                placeholder="URL" 
                                name="url"
                                value={formCadastro.values.url} 
                                onChange={formCadastro.handleChange}
                            />
                            <button type="submit">
                                Cadastrar
                            </button>
                            {
                                formCadastro.values.url ? (
                                    <VideoPreview url={formCadastro.values.url}/>
                                ) : false
                            }
                            
                        </div>
                    </form>
                ) : false 
            }
        </StyledRegisterVideo>
    )
}
