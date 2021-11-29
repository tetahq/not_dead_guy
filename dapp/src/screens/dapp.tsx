import '../styles/dapp.css'
import Flickity from 'react-flickity-component'
import Video from '../components/video'
import React, { useState } from 'react'

export default function Dapp() {
    /* eslint-disable jsx-a11y/anchor-is-valid */
    const [isPlayStory, setPlayStory] = useState<boolean | undefined>(undefined)
    const [isPlayMetaverse, setPlayMetaverse] = useState<boolean | undefined>(undefined)
    return (
        <div className='body'>
            <div className='hero-container w-container'>
                <div className='hero'>
                    <img src='/images/bg-mask.png' sizes='(max-width: 1440px) 100vw, 1440px'
                         srcSet='/images/bg-mask-p-500.png 500w, images/bg-mask-p-800.png 800w, images/bg-mask-p-1080.png 1080w, images/bg-mask.png 1440w' alt=''
                         className='bg-image' />
                    <img src='/images/Title.svg' alt='' className='title' />
                    <img src='/images/Button-Normal.svg' alt='' className='button' />
                    <img src='/images/Particle.svg' alt='' className='particul' />
                </div>
            </div>
            <div className='story-container w-container'>
                <div className='_2nd-title'>
                    <div id='w-node-_404bdba6-9ce3-d980-683f-01359d139531-64834dba' className='_2nd-title-text'>
                        <h1 className='heading'>Will you accept the<br />invitation?</h1><img src='/images/Vector.svg' alt='' className='decorative' />
                    </div>
                </div>
                <div className='video-with-border' onClick={() => {
                    isPlayMetaverse && setPlayMetaverse(false)
                    setPlayStory(x => typeof x === 'undefined' ? true : !x)
                }}>
                    <Video src={'/videos/story.mp4'} isPlay={isPlayStory}/>
                    <img src='/images/video-border.png' alt='' />

                    {!isPlayStory && <img className='video-play-button' src='/images/video-play.png' alt='' />}
                </div>
            </div>
            <div className='roadmap-container w-container'>
                <div className='roadmap-title-div'>
                    <h1 className='heading-2'>Roadmap Summary</h1>
                </div>
                <a href='#' className='link-block w-inline-block'>
                    <div className='text-block-2'>White Paper</div>
                </a>
                <div className='w-layout-grid grid'>
                    <div className='phase-div'>
                        <div className='phase-title'>Phase 1</div>
                        <div id='w-node-a948d2b2-4bfc-c745-7938-547902ae5f8b-64834dba' className='seperator' />
                        <div className='body-m'>10% of every minting fee is reflected back to existing NDG holders and can be claimed at any time.</div>
                    </div>
                    <div className='phase-div-2'>
                        <div className='phase-title'>Phase 2</div>
                        <div id='w-node-_8653c304-3103-4410-fac5-88a8775a5edf-64834dba' className='seperator' />
                        <div className='body-m'>Meeting with our early supporters on the metaverse. We will discuss the future of NDG.</div>
                    </div>
                    <div className='phase-div'>
                        <div className='phase-title'>Phase 3</div>
                        <div id='w-node-_1d5a652f-44d3-f8fc-5f76-b20e6063abcf-64834dba' className='seperator' />
                        <div className='body-m'>Introducing $NDG Token. You earn $NDG for your time spent in the Metaverse.</div>
                    </div>
                </div>
            </div>
                <Flickity className='slider' options={{
                    autoPlay: 1000,
                    prevNextButtons: false,
                    wrapAround: true,
                    pageDots: false,
                    lazyLoad: true,
                    initialIndex: 3
                }} static>
                    <img src='/images/nft/1-Waiter.jpg' width='400' alt='' className='image-3' />
                    <img src='/images/nft/2-Pilot.jpg' width='400' alt='' className='image-3' />
                    <img src='/images/nft/4.1-Bride.jpg' width='400' alt='' className='image-3' />
                    <img src='/images/nft/3-Cop.jpg' width='400' alt='' className='image-3' />
                    <img src='/images/nft/5-Firefighter.jpg' width='400' alt='' className='image-3' />
                    <img src='/images/nft/12-Roman.jpg' width='400' alt='' className='image-3' />
                    <img src='/images/nft/13-King.jpg' width='400' alt='' className='image-3' />
                    <img src='/images/nft/14-İlk Kurban.jpg' width='400' alt='' className='image-3' />
                    <img src='/images/nft/15-Tattoo Artist.jpg' width='400' alt='' className='image-3' />
                    <img src='/images/nft/16-Diver.jpg' width='400' alt='' className='image-3' />
                    <img src='/images/nft/17-Doctor.jpg' width='400' alt='' className='image-3' />
                    <img src='/images/nft/18-Amiral.jpg' width='400' alt='' className='image-3' />
                    <img src='/images/nft/19-Street Artist.jpg' width='400' alt='' className='image-3' />
                    <img src='/images/nft/20-Samurai.jpg' width='400' alt='' className='image-3' />
                    <img src='/images/nft/4.2-Groom.jpg' width='400' alt='' className='image-3' />
                </Flickity>
            <div className='tokenomics w-container'>
                <div className='tokenomics-title'>
                    <h1 className='heading-2'>Tokenomics</h1><img src='/images/mor-tokenomics.svg' alt='' className='image-6' />
                </div>
                <div className='body-button'>The transaction fee from market sales will be redistributed to our community.</div>
                <div className='div-block-2'>
                    <div className='tokenomis-share'>
                        <div id='w-node-_2a890512-f66c-b28d-120a-36e7092b3a2a-64834dba' className='tokenomics-1 r-g'>
                            <h1 className='heading color-w'>1%</h1>
                            <div className='body-m color-g'>will be transferred to the original minter of the NotDeadGuy NFT</div>
                        </div>
                        <div className='tokenomics-1 r-g'>
                            <h1 className='heading color-w'>2%</h1>
                            <div className='body-m color-g'>will be distributed between all NDG holders.</div>
                        </div>
                        <div className='tokenomics-1'>
                            <div className='t-title-3'>
                                <h1 className='heading color-w'>2%</h1>
                                <div className='div-block'>
                                    <div className='badge'>WEEKLY EVENT</div>
                                </div>
                            </div>
                            <div className='body-m color-g'>will be distributed to the 20 wallets with the highest amount of trades in our marketplace (weekly event)</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='metaverse-contain w-container'>
                <div className='metaverse-title-div'>
                    <h3 className='heading-3'>Have you ever thought of being born at the beginning of the world and starting over?</h3>
                </div>
                <div className='video-with-border' onClick={() => {
                    isPlayStory && setPlayStory(false)
                    setPlayMetaverse(x => typeof x === 'undefined' ? true : !x)
                }}>
                    <Video src={'/videos/metaverse.mp4'} isPlay={isPlayMetaverse}/>
                    <img src='/images/video-border.png' alt='' />

                    {!isPlayMetaverse && <img className='video-play-button' src='/images/video-play.png' alt='' />}
                </div>
            </div>

            <div className='team w-container'>
                <div className='team-title'>
                    <h1 className='heading margin-4px'>Team</h1><img src='/images/Vector.svg' alt='' />
                </div>
                <div className='team-peoples'>
                    <a href='#' className='tp-1 rm-40px w-inline-block'><img src='/images/Avatar.svg' alt='' className='avatar' />
                        <h5 className='avatar-name'>Oxana</h5>
                        <h5 className='avatar-title'>DESIGNER</h5>
                    </a>
                    <a href='#' className='tp-1 w-inline-block'><img src='/images/MAvatar.svg' alt='' className='avatar' />
                        <h5 className='avatar-name'>Can</h5>
                        <h5 className='avatar-title'>DESIGNER</h5>
                    </a>
                </div>
                <div className='w-layout-grid grid-2'>
                    <a href='#' className='tp-1 w-inline-block'><img src='/images/MAvatar.svg' alt='' className='avatar' />
                        <h5 className='avatar-name'>Oguz</h5>
                        <h5 className='avatar-title'>B. DEVELOPER</h5>
                    </a>
                    <a href='#' className='tp-1 w-inline-block'><img src='/images/Avatar.svg' alt='' className='avatar' />
                        <h5 className='avatar-name'>Ceren</h5>
                        <h5 className='avatar-title'>MARKETING</h5>
                    </a>
                    <a href='#' className='tp-1 w-inline-block'><img src='/images/MAvatar.svg' alt='' className='avatar' />
                        <h5 className='avatar-name'>Sezer</h5>
                        <h5 className='avatar-title'>PRODUCT DEV.</h5>
                    </a>
                    <a href='#' className='tp-1 w-inline-block'><img src='/images/Avatar.svg' alt='' className='avatar' />
                        <h5 className='avatar-name'>Tugce</h5>
                        <h5 className='avatar-title'>MARKETING</h5>
                    </a>
                    <a href='#' className='tp-1 w-inline-block'><img src='/images/MAvatar.svg' alt='' className='avatar' />
                        <h5 className='avatar-name'>Mehmet</h5>
                        <h5 className='avatar-title'>B. DEVELOPER</h5>
                    </a>
                </div>
            </div>
            <div className='cta w-container'>
                    <h1 className='cta-head'>To build better one</h1>
                    <a href='#' className='link-block bg-w w-inline-block'>
                        <div className='text-block-2'>Join Discord</div>
                    </a>
                    <img className='footer-top' src='/images/footer-top.png' alt=''/>
            </div>
            <div className='footer w-container'>
                <div className='div-block-5'>
                    <div className='div-block-4'>
                        <h5 className='heading-4'>What you do in the Metaverse will affect your real life.</h5>
                    </div>
                    <div className='div-block-7'>
                        <div className='footer-rd-1'>
                            <div>
                                <div className='body-m bm-24px'>FOLLOW US</div>
                            </div>
                            <a href='#' className='div-block-6 bm-16px w-inline-block'><img src='/images/discord-fill-1.svg' alt='' className='image-7' />
                                <div className='text-block-4'>Discord</div>
                            </a>
                            <a href='#' className='div-block-6 bm-16px w-inline-block'><img src='/images/twitter-fill-1.svg' alt='' className='image-7' />
                                <div className='text-block-4'>Twitter</div>
                            </a>
                            <a href='#' className='div-block-6 w-inline-block'><img src='/images/instagram-fill-1.svg' alt='' className='image-7' />
                                <div className='text-block-4'>Instagram</div>
                            </a>
                        </div>
                        <div className='footer-rd-2'>
                            <div>
                                <div className='body-m bm-24px'>CONTACT</div>
                            </div>
                            <a href='#' className='div-block-6 bm-16px w-inline-block'>
                                <div className='text-block-underline'>contact@ndg.com</div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
