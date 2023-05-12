import { createClient } from "@supabase/supabase-js";
import React from "react";
import { videoService } from "../../services/VideoService";
import VideoPreview from "./components/videoPreview";
import { StyledRegisterVideo } from "./styles";
import  {  ToastContainer ,  toast  }  from  'react-toastify' ; 
import  'react-toastify/dist/ReactToastify.css' ;


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

            // if(name === "url"){
            //     setYoutubeUrl(e.target.value)
            // }

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
    const [playlists, setPlaylists] = React.useState({});
    const formCadastro = useForm({
        initialValues: { titulo: "", url: "", playlist: "", newPlaylist: ""}
    })
    const service = videoService();

    const  notifyError  =  (message)  =>  toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        }); 
    
    const  notifySuccess  =  (message)  =>  toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });

    const  youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

    React.useEffect(() => {
        service.getAllPlaylists()
        .then((dados) => {
            
            const novasPlaylists = {...playlists}
            dados.data.forEach((playlistNomes) => {
                if(!novasPlaylists[playlistNomes.id]){
                    novasPlaylists[playlistNomes.id] = [];
                }
                
                novasPlaylists[playlistNomes.id] = {
                    id: playlistNomes.id,
                    nome: playlistNomes.nome
                };
                
                setPlaylists(novasPlaylists);
            })
        })
        
    }, [])
    
    const playlistNames = Object.keys(playlists);

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            { 
                formVisivel ? (
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        
                        if(!formCadastro.values.url.match(youtubeRegex)){
                            notifyError("Digite uma url do youtube!")
                            return false
                        }
                        
                        if(formCadastro.values.playlist === "") {
                            notifyError("Selecione uma playlist!")
                            return false
                        } else if(formCadastro.values.playlist === "new" && formCadastro.values.newPlaylist === ""){
                            notifyError("Digite o nome da nova playlist!")
                            return false
                        }

                        if(formCadastro.values.playlist === "new"){
                            supabase.from("playlist").insert({
                                nome: formCadastro.values.newPlaylist,
                                is_active: 1,
                            })
                            .then((response) => {
                                
                                supabase.from("playlist").select("*").eq("nome", formCadastro.values.newPlaylist)
                                .then((response) => {
                                    
                                    const playlistId = response.data[0].id;

                                    supabase.from("video").insert({
                                        title: formCadastro.values.titulo,
                                        url: formCadastro.values.url,
                                        thumb: getThumbnail(formCadastro.values.url),
                                        playlist: playlistId,
                                    })
                                    .then((response) => {
                                        console.log(response);
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    })
                                })
                                .catch((err) => {
                                    console.log(err);
                                })
                                
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                        } else {
                            supabase.from("video").insert({
                                title: formCadastro.values.titulo,
                                url: formCadastro.values.url,
                                thumb: getThumbnail(formCadastro.values.url),
                                playlist: formCadastro.values.playlist,
                            })
                            .then((response) => {
                                console.log(response);
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                        }
                        
                        setFormVisivel(false);
                        formCadastro.clearForm();
                        notifySuccess("Vídeo cadastrado com sucesso!")
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
                                required
                            />
                            <input 
                                placeholder="URL" 
                                name="url"
                                value={formCadastro.values.url} 
                                onChange={formCadastro.handleChange}
                                required
                            />
                            <select 
                                name="playlist"
                                onChange={formCadastro.handleChange}>
                                <option value="">Selecione uma playlist</option>
                                {
                                    playlistNames.map((playlistId) => {
                                        
                                        return (
                                                <option key={playlistId} value={playlistId}>{playlists[playlistId].nome}</option>
                                            )
                                    })
                                    
                                }
                                <option value="new">Criar nova playlist</option>
                            </select>
                            {
                                formCadastro.values.playlist === "new" ? (
                                    <>
                                        <input 
                                            name="newPlaylist"
                                            placeholder="Digite o nome da playlist"
                                            value={formCadastro.values.newPlaylist}
                                            onChange={formCadastro.handleChange}
                                        />
                                        <span id="newPlaylistMessage"></span>
                                    </>
                                ) : false
                            }
                            
                            <button type="submit">
                                Cadastrar
                            </button>
                            {            
                                formCadastro.values.url ? (
                                    formCadastro.values.url.match(youtubeRegex) ? (
                                        <>
                                            <h2>Preview</h2>
                                            <VideoPreview url={formCadastro.values.url} title={formCadastro.values.title} width={290} height={175}/>
                                        </>
                                    ) : false
                                ) : false
                                
                            }
                            
                        </div>
                    </form>
                ) : false 
            }
            <ToastContainer />
        </StyledRegisterVideo>
    )
}
