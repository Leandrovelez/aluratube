import config from "../config.json";
import styled from "styled-components"
import { CSSReset } from "../source/components/CSSReset";
import Menu from "../source/components/Menu"
import { StyledTimeline } from "../source/components/Timeline"

function homePage(){
    const estilosHomePage = { 
        //backgroundColor: "red"
    }

    return (
        <>
            <CSSReset/>
            <div style={estilosHomePage}>
                <Menu></Menu>
                <Thumb></Thumb>
                <Header></Header>
                <Timeline playlists={config.playlists}></Timeline>
            </div>
        </>
    )
}

export default homePage

const StyledThumb = styled.div`
    img{
        width: 100%;
        height: 200px;
        margin-top: 55px;
        object-fit: cover;
        object-position: 20% 50%;
    }
`;

function Thumb(){
    return (
        <StyledThumb>
            <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"/>
        </StyledThumb>
    )
}

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
    }

    .thumb{
        width: 100%auto;
        height: 80px;
        border-radius: 0% !important;
    }
`;

function Header(){
    return(
        <StyledHeader>
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

function Timeline(props){
    const playlistNames = Object.keys(props.playlists);

    //statement
    //retorno por expressão
    //map - converte de um para outro
    return(
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = props.playlists[playlistName];

                return (
                    <section>
                        <h2>{playlistName}</h2>
                        <div>
                            {
                                videos.map((video) => {
                                    return (
                                        <a href={video.url}>
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