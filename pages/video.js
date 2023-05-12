import Menu from "../source/components/Menu";
import VideoPreview from "../source/components/RegisterVideo/components/videoPreview";
import styled from "styled-components";

const StyledVideo = styled.div`
        
    iframe{
        margin-top: 5rem;
        margin-left: 2rem;
        margin-right: auto;
    }

    h2{
        margin-left: 2rem;
        margin-top: 1rem;
    }
`;

const videoEmbed = "";

export default function video(...props){
    const url = "https://www.youtube.com/watch?v=9BMwcO6_hyA"
    const title = "Bon Jovi - Always (Official Music Video)"
    return(
        <StyledVideo>
            <Menu></Menu>
            <VideoPreview url={url} width={560} height={315}></VideoPreview>
            <h2>{title}</h2>
        </StyledVideo>
    )
}
