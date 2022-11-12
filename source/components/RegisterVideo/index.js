import React from "react";
import VideoPreview from "./components/videoPreview";
import { StyledRegisterVideo } from "./styles";

export default function RegisterVideo(){
    const [formVisivel, setFormVisivel] = React.useState(false);
    const [urlVideo, setUrlVideo] = React.useState();

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            { 
            formVisivel ? (
                <form>
                    <div>
                        <button className="close-modal" onClick={() => setFormVisivel(false)}>
                            x
                        </button>
                        <input placeholder="Título do vídeo" />
                        <input placeholder="URL" onChange={(e) => setUrlVideo(e.target.value)}/>
                        <button type="submit">
                            Cadastrar
                        </button>
                        {
                            urlVideo ? (
                                <VideoPreview url={urlVideo}/>
                            ) : false
                        }
                        
                    </div>
                </form>
            ) : false 
            }
        </StyledRegisterVideo>
    )
}
