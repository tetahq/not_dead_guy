/* eslint-disable jsx-a11y/anchor-is-valid */
import '../styles/dapp.css'
import Flickity from 'react-flickity-component'
import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import { AnimationOnScroll } from 'react-animation-on-scroll'
import useMedia from '../hooks/useMedia'

export default function Dapp() {
    const isMobile = useMedia('(max-width: 1024px)')
    const [isPlayStory, setPlayStory] = useState<boolean | undefined>(undefined)
    const [isPlayMetaverse, setPlayMetaverse] = useState<boolean | undefined>(undefined)
    return (
        <div className='body'>
            <AnimationOnScroll animateIn='animate__fadeIn'>
                <div className='hero-container'>
                    <div className='hero'>
                        <img src='/images/background.png' alt='' className='bg-image' />
                        <img src='/images/background-mobile.png' alt='' className='bg-image-mobile' />
                        <img src='/images/background-mask.png' alt='' className='bg-image-mask' />
                        <div className='hero-right-area'>
                            <h1 className='hero-title'>NotDeadGuy NFT for the metaverse</h1>
                            <a href='https://discord.gg/mHTpcF4yzU' target='_blank' rel='noreferrer'><img src='/images/discord-button.png' alt='' className='button' /></a>
                        </div>
                        <img src='/images/particle.svg' alt='' className='particul' />
                    </div>
                </div>
            </AnimationOnScroll>
            <AnimationOnScroll animateIn='animate__fadeIn'>
                <div className='story-container'>
                    <div className='_2nd-title'>
                        <div className='_2nd-title-text'>
                            <h1 className='heading'>Will you accept the<br />invitation?</h1><img src='/images/pink-vector.svg' alt='' className='decorative' />
                        </div>
                        <img src='/images/nail.png' alt='' className='story-nail' />
                    </div>
                    <div className='video-with-border' onClick={() => {
                        isPlayMetaverse && setPlayMetaverse(false)
                        setPlayStory(x => typeof x === 'undefined' ? true : !x)
                    }}>
                        <ReactPlayer url='/videos/story.mp4' playing={isPlayStory} width={'100%'} height={'auto'} loop playsinline />
                        {/*<Video src={'/videos/story.mp4'} isPlay={isPlayStory} />*/}
                        <img src='/images/video-border.png' alt='' />

                        {!isPlayStory && <img className='video-thumbnail' src='/images/video-story-thumb.png' alt='' />}
                        {!isPlayStory && <img className='video-play-button' src='/images/video-play.png' alt='' />}
                    </div>
                </div>
            </AnimationOnScroll>

            <div className='roadmap-container'>
                <div className='roadmap-title-div'>
                    <AnimationOnScroll animateIn='animate__fadeIn'>
                        <h1 className='heading-2'>Roadmap Summary</h1>
                    </AnimationOnScroll>
                    <img src='/images/nuclei.png' alt='' className='nuclei' />
                </div>
                <img src='/images/roadmap-bg-r.png' alt='' className='roadmap-bg-r' />
                <AnimationOnScroll animateIn='animate__zoomIn' className='link-block w-inline-block'>
                    <a href='/documents/NDGWhitepaper.pdf' target='_blank'>
                        <div className='text-block-2'>White Paper</div>
                    </a>
                </AnimationOnScroll>
                <div className='phase-grid'>
                    <AnimationOnScroll animateIn='animate__zoomIn'>
                        <div className='phase-div'>
                            <div className='phase-title'>Phase 1</div>
                            <div className='seperator' />
                            <div className='body-m'>10% of every minting fee is reflected back to existing NDG holders and can be claimed at any time.</div>
                        </div>
                    </AnimationOnScroll>
                    <AnimationOnScroll animateIn='animate__zoomIn' delay={!isMobile ? 500 : 0}>
                        <div className='phase-div'>
                            <div className='phase-title'>Phase 2</div>
                            <div className='seperator' />
                            <div className='body-m'>Meeting with our early supporters on the metaverse. We will discuss the future of NDG.</div>
                        </div>
                    </AnimationOnScroll>
                    <AnimationOnScroll animateIn='animate__zoomIn' delay={!isMobile ? 1000 : 0}>
                        <div className='phase-div'>
                            <div className='phase-title'>Phase 3</div>
                            <div className='seperator' />
                            <div className='body-m'>Introducing $NDG Token. You earn $NDG for your time spent in the Metaverse.</div>
                        </div>
                    </AnimationOnScroll>
                </div>
            </div>

            <AnimationOnScroll animateIn='animate__fadeIn'>
                <Flickity className='slider'
                          options={{
                              autoPlay: 3000,
                              prevNextButtons: false,
                              wrapAround: true,
                              pageDots: false,
                              lazyLoad: false,
                              initialIndex: 3,
                              contain: true,
                          }}>
                    <img src='/images/nft/1-Waiter.jpg' width='400' alt='' className='image-3' />
                    <img src='/images/nft/2-Pilot.jpg' width='400' alt='' className='image-3' />
                    <img src='/images/nft/4.1-Bride.jpg' width='400' alt='' className='image-3' />
                    <img src='/images/nft/3-Cop.jpg' width='400' alt='' className='image-3' />
                    <img src='/images/nft/5-Firefighter.jpg' width='400' alt='' className='image-3' />
                    <img src='/images/nft/12-Roman.jpg' width='400' alt='' className='image-3' />
                    <img src='/images/nft/13-King.jpg' width='400' alt='' className='image-3' />
                    <img src='/images/nft/14-Ilk-Kurban.jpg' width='400' alt='' className='image-3' />
                    <img src='/images/nft/15-Tattoo-Artist.jpg' width='400' alt='' className='image-3' />
                    <img src='/images/nft/16-Diver.jpg' width='400' alt='' className='image-3' />
                    <img src='/images/nft/17-Doctor.jpg' width='400' alt='' className='image-3' />
                    <img src='/images/nft/18-Amiral.jpg' width='400' alt='' className='image-3' />
                    <img src='/images/nft/19-Street-Artist.jpg' width='400' alt='' className='image-3' />
                    <img src='/images/nft/20-Samurai.jpg' width='400' alt='' className='image-3' />
                    <img src='/images/nft/4.2-Groom.jpg' width='400' alt='' className='image-3' />
                </Flickity>
            </AnimationOnScroll>

            <div className='tokenomics'>
                <AnimationOnScroll animateIn='animate__fadeIn'>
                    <div className='tokenomics-title'>
                        <h1 className='heading-2'>Tokenomics</h1><img src='/images/purple-vector.svg' alt='' className='image-6' />
                    </div>
                    <div className='body-button'>The transaction fee from market sales will be redistributed to our community.</div>
                </AnimationOnScroll>


                <AnimationOnScroll animateIn='animate__fadeInUp'>
                    <div className='div-block-2 tokenomics-wrapper'>
                        <div className='tokenomics-share'>
                            <div className='tokenomics-1'>
                                <h1 className='heading color-w'>1%</h1>
                                <div className='body-m color-g'>will be transferred to the original minter of the NotDeadGuy NFT</div>
                            </div>
                            <div className='tokenomics-1'>
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

                        <img src='/images/seperator-tokenomics.png' alt='' className='seperator-tokenomics' />
                    </div>
                </AnimationOnScroll>
            </div>
            <AnimationOnScroll animateIn='animate__fadeIn'>
                <div className='metaverse-contain'>
                    <div className='metaverse-title-div'>
                        <h3 className='heading-3'>Have you ever thought of being born at the beginning of the world and starting over?</h3>
                    </div>
                    <div className='video-with-border' onClick={() => {
                        isPlayStory && setPlayStory(false)
                        setPlayMetaverse(x => typeof x === 'undefined' ? true : !x)
                    }}>
                        <ReactPlayer url='/videos/metaverse.mp4' playing={isPlayMetaverse} width={'100%'} height={'auto'} loop playsinline />
                        <img src='/images/video-border.png' alt='' />

                        {!isPlayMetaverse && <img className='video-thumbnail' src='/images/video-metaverse-thumb.png' alt='' />}
                        {!isPlayMetaverse && <img className='video-play-button' src='/images/video-play.png' alt='' />}
                    </div>
                </div>
            </AnimationOnScroll>
            <AnimationOnScroll animateIn='animate__fadeIn'>
                <div className='team'>
                    <div className='team-title'>
                        <h1 className='heading margin-4px'>Team</h1><img src='/images/pink-vector.svg' alt='' />
                    </div>
                    <div className='team-peoples'>
                        <a href='#' className='tp-1 rm-40px w-inline-block'><img src='/images/avatar-f.svg' alt='' className='avatar' />
                            <h5 className='avatar-name'>Oxana</h5>
                            <h5 className='avatar-title'>DESIGNER</h5>
                        </a>
                        <a href='#' className='tp-1 w-inline-block'><img src='/images/avatar-m.svg' alt='' className='avatar' />
                            <h5 className='avatar-name'>Can</h5>
                            <h5 className='avatar-title'>DESIGNER</h5>
                        </a>
                    </div>
                    <div className='w-layout-grid grid-2'>
                        <a href='#' className='tp-1 w-inline-block'><img src='/images/avatar-m.svg' alt='' className='avatar' />
                            <h5 className='avatar-name'>Oguz</h5>
                            <h5 className='avatar-title'>B. DEVELOPER</h5>
                        </a>
                        <a href='#' className='tp-1 w-inline-block'><img src='/images/avatar-f.svg' alt='' className='avatar' />
                            <h5 className='avatar-name'>Ceren</h5>
                            <h5 className='avatar-title'>MARKETING</h5>
                        </a>
                        <a href='#' className='tp-1 w-inline-block'><img src='/images/avatar-m.svg' alt='' className='avatar' />
                            <h5 className='avatar-name'>Sezer</h5>
                            <h5 className='avatar-title'>PRODUCT DEV.</h5>
                        </a>
                        <a href='#' className='tp-1 w-inline-block'><img src='/images/avatar-f.svg' alt='' className='avatar' />
                            <h5 className='avatar-name'>Tugce</h5>
                            <h5 className='avatar-title'>MARKETING</h5>
                        </a>
                        <a href='#' className='tp-1 w-inline-block'><img src='/images/avatar-m.svg' alt='' className='avatar' />
                            <h5 className='avatar-name'>Mehmet</h5>
                            <h5 className='avatar-title'>B. DEVELOPER</h5>
                        </a>
                    </div>
                </div>
            </AnimationOnScroll>
            <AnimationOnScroll animateIn='animate__fadeIn'>
                <div className='cta'>
                    <div className='cta-wrapper'>
                        <h1 className='cta-head'>To build better one</h1>
                        <a href='https://discord.gg/mHTpcF4yzU' target='_blank' rel='noreferrer' className='link-block'>
                            <div className='text-block-2'>Join Discord</div>
                        </a>
                    </div>
                    <img className='cta-image' src='/images/footer-top.png' alt='' />
                </div>
            </AnimationOnScroll>
            <AnimationOnScroll animateIn={isMobile ? 'animate__pulse' :'animate__fadeInDown'}>
                <div className='footer'>
                    <div className='div-block-5'>
                        <div className='div-block-4'>
                            <h5 className='heading-4'>What you do in the Metaverse will affect your real life.</h5>
                        </div>
                        <div className='div-block-7'>
                            <div className='footer-rd-1'>
                                <div>
                                    <div className='body-m bm-24px'>FOLLOW US</div>
                                </div>
                                <a href='https://discord.gg/mHTpcF4yzU' target='_blank' rel='noreferrer' className='div-block-6 bm-16px w-inline-block'>
                                    <img src='/images/discord-fill.svg' alt='' className='image-7' />
                                    <div className='text-block-4'>Discord</div>
                                </a>
                                <a href='https://twitter.com/NotDeadGuyNFT' target='_blank' rel='noreferrer' className='div-block-6 bm-16px w-inline-block'>
                                    <img src='/images/twitter-fill.svg' alt='' className='image-7' />
                                    <div className='text-block-4'>Twitter</div>
                                </a>
                                <a href='https://instagram.com/notdeadguynft' className='div-block-6 w-inline-block' target='_blank' rel='noreferrer'>
                                    <img src='/images/instagram-fill.svg' alt='' className='image-7' />
                                    <div className='text-block-4'>Instagram</div>
                                </a>
                            </div>
                            <div className='footer-rd-2'>
                                <div>
                                    <div className='body-m bm-24px'>CONTACT</div>
                                </div>
                                <a href='mailto:contact@notdeadguy.com' className='div-block-6 bm-16px w-inline-block'>
                                    <div className='text-block-underline'>contact@notdeadguy.com</div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </AnimationOnScroll>
        </div>
    )
}
