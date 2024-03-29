import React, { useState } from 'react'
import { callGenerateMusic } from '../../model/calls';
import LoginWidget from '../../model/login/LoginWidget';
import '../css/Gensound.css';


function ItemsList() {
    return (<div className='body-fav-frame'>
        <div className='myfavsong-off noselect'>
            <div className='ray-frame'>
                <div className='icon-logout noselect'>
                </div>
            </div>
            <div className='current-song'>
                <p>Heaven and Hell - Black Sabbath</p>
            </div>
        </div>
        <div className='myfavsong noselect'>
            <div className='ray-frame'>
                <div className='icon-logout noselect'>
                    <img src='/images/icons/ray_ic.png' />
                </div>
            </div>
            <div className='current-song'>
                <p>Heaven and Hell - Black Sabbath</p>
            </div>
        </div>
    </div>);
}


function EmptyList() {
    return (<div className='body-fav-frame'>
        <div className='ic-addplaylist-frame'>
            <img src='/images/icons/addplaylist_ic.png' />
        </div>
        <div className='alert-frame'>
            <p>You don't have any favorite songs yet.
                Generate a song of your preferred style and
                click the heart to add it here!</p>
        </div>
    </div>);
}


function Gensound() {
    const [music, setMusic] = useState(undefined)
    const [genre, setGenre] = useState('rock')
    const [favorite, setFavorite] = useState(false)
    const [play, setPlay] = React.useState(false);

    return (
        <div className='Gensound'>
            <div className='navbar'>
                <div className='logo'>
                    <img src='/images/nav_logo.png' />
                    <p>Gen<span>Sound</span></p>
                </div>
                <LoginWidget></LoginWidget>
            </div>

            <div className='frame'>
                <div className='left-frame'>
                    <div className='gen-frame'>
                        <p className='genres-label'>What genre would you like to hear?</p>
                        <div className='radios-frame noselect'>
                            <div className='left-radios'>
                                <div>
                                    <input type="radio" value="Rock" name="genre" onClick={() => setGenre('rock')} defaultChecked='true' /> Rock
                                </div>
                                <div>
                                    <input type="radio" value="Hip-Hop" name="genre" onClick={() => setGenre('hiphop')} /> Hip-Hop
                                </div>
                            </div>
                            <div className='right-radios'>
                                <div>
                                    <input type="radio" value="Electronic" name="genre" onClick={() => setGenre('electronic')} /> Electronic
                                </div>

                                <div>
                                    <input type="radio" value="Pop" name="genre" onClick={() => setGenre('pop')} /> Pop
                                </div>
                            </div>
                        </div>
                        <div onClick={() => generateMusic(genre, setMusic)} className='btn-generate noselect'>Generate</div>
                    </div >
                    {music === undefined ? "" : <MusicContainer
                        music={music} favorite={favorite} setFavorite={setFavorite} play={play} setPlay={setPlay} ></MusicContainer>}

                </div>

                <div className='right-frame'>
                    <div className='wrapper'>
                        <div className='favorite-frame'>
                            <div className='top-fav-frame'>
                                <div className='fav-frame'>
                                    <div className='player-frame'>
                                        <div className='favorite-title'>
                                            <p>My Favorites Songs</p>
                                        </div>
                                        <hr className='divider' />
                                    </div>
                                </div>
                            </div>

                            <EmptyList></EmptyList>

                        </div>
                        <hr className='divider' />
                        <div className='bottom-fav-frame'>
                            <div className='favplayer-container'>
                                <div className='favplayer-controller noselect'>
                                    <div className='btn-back'>
                                        <img src='/images/icons/back_ic.png' />
                                    </div>
                                    <div className='btn-playpause'>
                                        <img src='/images/icons/play_ic.png' />
                                    </div>
                                    <div className='btn-next'>
                                        <img src='/images/icons/next_ic.png' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function MusicContainer(props) {
    var embbedurl = ""
    embbedurl = props.play === false ? "" : "https://www.youtube.com/embed/" + props.music.videolink + "?autoplay=1"

    return (<div className='music-container'>
        <div className='music-frame'>
            <div className='left-music-label'>
                <div className='music-label'>
                    <p>Music</p>
                </div>
                <div className='song-label'>
                    <p>{props.music.song} - {props.music.band}</p>
                </div>
            </div>
            <div className='right-music-label'>
                <div onClick={() => props.setFavorite(!props.favorite)} className='heart-frame noselect'>
                    {props.favorite === false ? <img src='/images/icons/heartoff_ic.png' /> : <img src='/images/icons/heart_ic.png' />}
                </div>
            </div>
        </div>
        <div className='video-frame'>
            <div className='video-label'>
                <p>Video</p>
            </div>
            <div onClick={() => window.open("https://www.youtube.com/watch?v=" + props.music.videolink, "_blank")} className='video-container'>
                <div className='img-album noselect'>
                    <img src={props.music.img} />
                </div>

                <div className='song-description-frame'>
                    <div className='video-song-label noselect'>
                        <p>{props.music.song}</p>
                    </div>
                    <div className='video-band-label noselect'>
                        <p>{props.music.band}</p>
                    </div>

                </div>
            </div>
        </div>
        <div className='btn-frame'>
            <div onClick={() => props.setPlay(!props.play)} className='btn-playmusic noselect'>{props.play === true ? "Stop Music" : "Play Music"}</div>
            <iframe
                width="0"
                height="0"
                src={embbedurl}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>

        </div>
    </div>);
}

function generateMusic(genre, setMusic) {
    callGenerateMusic(genre).then((result) => {
        setMusic(result)
    })
}

export default Gensound