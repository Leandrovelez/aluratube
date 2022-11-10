import React from "react";
import config from "../config.json";
import styled from "styled-components"
import { CSSReset } from "../source/components/CSSReset";
import Menu from "../source/components/Menu"
import { StyledTimeline } from "../source/components/Timeline"

function homePage(){
    const estilosHomePage = { 
        //backgroundColor: "red"
    }
    const [valorDoFiltro, setValorDoFiltro] = React.useState("Angular");

    return (
        <>
            <CSSReset/>
            <div style={estilosHomePage}>
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro}></Menu>
                <Header></Header>
                <Timeline searchValue={valorDoFiltro} playlists={config.playlists}></Timeline>
            </div>
        </>
    )
}

export default homePage

const StyledBanner = styled.div`
    width: 100%;
    height: 230px;
    background-image: url(${config.bg});
    /* background-image: url(${({ bg }) => bg }); */
`;

const StyledHeader = styled.div`
    img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }

    .user-info{
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
        /* margin-top: 50px; */
    }

`;

function Header(){
    return(
        <StyledHeader>
            <StyledBanner/>
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`}/>
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    )
}

function Timeline({searchValue, ...props}){
    const playlistNames = Object.keys(props.playlists);

    //statement
    //retorno por expressão
    //map - converte de um para outro
    return(
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = props.playlists[playlistName];

                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {
                                videos.filter((video) => {
                                    const titleNormalized = video.title.toLowerCase();
                                    const searchValueNormalized = searchValue.toLowerCase();
                                    return titleNormalized.includes(searchValueNormalized)
                                }).map((video) => {
                                    return (
                                        <a key={video.url} href={video.url}>
                                            <img src={video.thumb} />
                                            <span>
                                                {video.title}
                                            </span>
                                        </a>
                                    )
                                })
                            }
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
}