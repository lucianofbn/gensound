import React, { useEffect, useState } from 'react'
import { callGenerateMusic } from '../../model/calls';
import LoginWidget from '../../model/login/LoginWidget';
import '../css/Gensound.css';

function Gensound() {
    const [music, setMusic] = useState(undefined)
    const [genre, setGenre] = useState('rock')

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
                    {music === undefined ? "" : <MusicContainer music={music}></MusicContainer>}
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
                            <div className='body-fav-frame'>
                                <div className='myfavsong-off noselect'>
                                    <div className='ray-frame'>
                                        <div className='icon-logout noselect'>
                                        </div>
                                    </div>
                                    <div className='current-song'>
                                        <p>Heaven and Hell - Black Sabbathaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                                    </div>
                                </div>
                                <div className='myfavsong noselect'>
                                    <div className='ray-frame'>
                                        <div className='icon-logout noselect'>
                                            <img src='/images/icons/ray_ic.png' />
                                        </div>
                                    </div>
                                    <div className='current-song'>
                                        <p>Heaven and Hell - Black Sabbathaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                                    </div>
                                </div>
                            </div>

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
                <div className='heart-frame noselect'>
                    <img src='/images/icons/heartoff_ic.png' />
                </div>
            </div>
        </div>
        <div className='video-frame'>
            <div className='video-label'>
                <p>Video</p>
            </div>
            <div onClick={() => window.open(props.music.videolink, "_blank")} className='video-container'>
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
            <div className='btn-playmusic noselect'>Play Music</div>
        </div>
    </div>);
}

function generateMusic(genre, setMusic) {
    callGenerateMusic(genre).then((result) => {
        setMusic(result)
    })
}

export default Gensound