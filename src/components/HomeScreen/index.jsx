import React from 'react'
import story from '../../assets/story.jpg'
import header_1 from '../../assets/header-1.jpg'
import header_2 from '../../assets/header-2.jpg'
import destination_1 from '../../assets/destination-1.jpg'
import destination_2 from '../../assets/destination-2.jpg'
import destination_3 from '../../assets/destination-3.jpg'
import destination_4 from '../../assets/destination-4.jpg'
import trip_1 from '../../assets/trip-1.jpg'
import trip_2 from '../../assets/trip-2.jpg'
import trip_3 from '../../assets/trip-3.jpg'
import gallery_1 from '../../assets/gallery-1.jpg'
import gallery_2 from '../../assets/gallery-2.jpg'
import gallery_3 from '../../assets/gallery-3.jpg'
import { Link } from 'react-router-dom'
import './homescreen.scss'
const HomeScreen = () => {
    return (
        <>
            <main className='homescreen'>
                <header>
                    <div className="section__container header__container">
                        <div className="header__image  animate__animated animate__bounceInLeft">
                            <img src={ header_1 } alt="header" className='' />
                            <img src={ header_2 } alt="header" className='' />
                        </div>
                        <div className="header__content">
                            <div>
                                <p className="sub__header">Book Now</p>
                                <h1>The Smiling 😊<br />agent for travel</h1>
                                <p className="section__subtitle">
                                    Make your travel more enjoyable with us. We are the best travel
                                    agency and we are providing the best travel services for our
                                    clients.
                                </p>
                                <div className="action__btn-blues">
                                    <button className="btn-blue">Plan a Trip</button>
                                    <div className="story">
                                        <div className="video__image">
                                            <img src={ story } alt="story" />
                                            <span><i className="ri-play-fill"></i></span>
                                        </div>
                                        <span>Watch our story</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <section className="section__container destination__container">
                    <div className="section__header">
                        <div>
                            <h2 className="section__title">Explore top destinations</h2>
                            <p className="section__subtitle">
                                Explore your suitable and dream places around the world. Here you
                                can find your right destination.
                            </p>
                        </div>
                        <div className="destination__nav">
                            <span><i className="ri-arrow-left-s-line"></i></span>
                            <span><i className="ri-arrow-right-s-line"></i></span>
                        </div>
                    </div>
                    <div className="destination__grid">
                        <div className="destination__card">
                            <img src={ destination_1 } alt="destination" />
                            <div className="destination__details">
                                <p className="destination__title">Banff</p>
                                <p className="destination__subtitle">Canada</p>
                            </div>
                        </div>
                        <div className="destination__card">
                            <img src={ destination_2 } alt="destination" />
                            <div className="destination__details">
                                <p className="destination__title">Machu Picchu</p>
                                <p className="destination__subtitle">Peru</p>
                            </div>
                        </div>
                        <div className="destination__card">
                            <img src={ destination_3 } alt="destination" />
                            <div className="destination__details">
                                <p className="destination__title">Lauterbrunnen</p>
                                <p className="destination__subtitle">Switzerland</p>
                            </div>
                        </div>
                        <div className="destination__card">
                            <img src={ destination_4 } alt="destination" />
                            <div className="destination__details">
                                <p className="destination__title">Zhangjiajie</p>
                                <p className="destination__subtitle">China</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="trip">
                    <div className="section__container trip__container">
                        <h2 className="section__title">Best trip package</h2>
                        <p className="section__subtitle">
                            Explore your suitable and dream places around the world. Here you can
                            find your right destination.
                        </p>
                        <div className="trip__grid">
                            <div className="trip__card">
                                <img src={ trip_1 } alt="trip" />
                                <div className="trip__details">
                                    <p>Wasserwerk Frelberg, Germany</p>
                                    <div className="rating"><i className="ri-star-fill"></i> 4.2</div>
                                    <div className="booking__price">
                                        <div className="price"><span>From</span> $300</div>
                                        <button className="book__now">Book Now</button>
                                    </div>
                                </div>
                            </div>
                            <div className="trip__card">
                                <img src={ trip_2 } alt="trip" />
                                <div className="trip__details">
                                    <p>Patagonia, Argentina and Chile</p>
                                    <div className="rating"><i className="ri-star-fill"></i> 4.5</div>
                                    <div className="booking__price">
                                        <div className="price"><span>From</span> $450</div>
                                        <button className="book__now">Book Now</button>
                                    </div>
                                </div>
                            </div>
                            <div className="trip__card">
                                <img src={ trip_3 } alt="trip" />
                                <div className="trip__details">
                                    <p>The Dolomites, Italy</p>
                                    <div className="rating"><i className="ri-star-fill"></i> 4.7</div>
                                    <div className="booking__price">
                                        <div className="price"><span>From</span> $400</div>
                                        <button className="book__now">Book Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="view__all">
                            <Link to={ '/tours' } className="btn-blue"> View All</Link>
                        </div>
                    </div>
                </section>

                <section className="gallary">
                    <div className="section__container gallary__container">
                        <div className="image__gallary">
                            <div className="gallary__col">
                                <img src={ gallery_1 } alt="gallary" />
                            </div>
                            <div className="gallary__col">
                                <img src={ gallery_2 } alt="gallary" />
                                <img src={ gallery_3 } alt="gallary" />
                            </div>
                        </div>
                        <div className="gallary__content">
                            <div>
                                <h2 className="section__title">
                                    Our trip gallary that will inspire you
                                </h2>
                                <p className="section__subtitle">
                                    Explore your suitable and dream places around the world. Here you
                                    can find your right destination.
                                </p>
                                <Link to={ '/tours' } className="btn-blue">View All</Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="subscribe">
                    <div className="section__container subscribe__container">
                        <div className="subscribe__content">
                            <h2 className="section__title">Subscribe to get special prize</h2>
                            <p className="section__subtitle">
                                Explore your suitable and dream places around the world. Here you
                                can find your right destination.
                            </p>
                        </div>
                        <div className="subscribe__form">
                            <form>
                                <input type="email" placeholder="Your email here" />
                                <button className="btn-blue" type="submit">Send</button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default HomeScreen