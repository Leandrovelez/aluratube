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
                <Header></Header>
                <Timeline playlists={config.playlists}></Timeline>
            </div>
        </>
    )
}

export default homePage


const StyledHeader = styled.div`
    img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }

    .user-info{
        margin-top: 50px;
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`;
function Header(){
    return(
        <StyledHeader>
            {/*<img src="banner"/>*/}
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