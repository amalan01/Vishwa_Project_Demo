import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import DressIcon from '../Images/dress_1069326.svg';
import BagsIcon from '../Images/backpack_3436594.svg';
import SweatshirtIcon from '../Images/hoodie_1805017.svg';
import BootsIcon from '../Images/boot_1489753.svg';
import AccessoriesIcon from '../Images/earrings_1650777.svg';
import SneakersIcon from '../Images/running-shoe_933757.svg';
import OuterWearIcon from '../Images/jacket_685074.svg';
import ActiveWear from '../Images/clothes_959007.svg';
import GroomingIcon from '../Images/hand-mirror_1005757.svg';
import ComsmeticsIcon from '../Images/cosmetics_2681814.svg';
import WatchIcon from '../Images/watch_424502.svg';
import TopProductImage1 from '../Images/young-tattoed-man-possing-street-with-urban-wear.png';
import TopProductImage2 from '../Images/urban-street-style-blonde-details-everyday-look-casual-beige-aesthetic.png';
import TopProductImage3 from '../Images/smooth-textured-handkerchief-hanging.png';
import Seller1 from '../Images/Seller1.png';
import banner_three from '../Images/Frame 2event1 (1).png';

import { ArrowForward, ArrowRight, FavoriteBorderOutlined, RemoveRedEye, SendOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import Marquee from 'react-fast-marquee';

const CountdownTimer = ({ endData }) => {
    const calculateTimeLeft = () => {
        const now = new Date();
        const endDate = new Date(endData);
        const difference = endDate - now;

        if (difference < 0) {
            clearInterval(timer);
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        setTimer(interval);

        return () => clearInterval(interval);
    }, [endData]);

    return (
        <div style={{ position: 'absolute', bottom: '25%', left: '66%', transform: 'translateX(-50%)', textAlign: 'center' }}>
            <h3 style={{ margin: '5px 0', padding: '10px', color: "#EB6D20", borderRadius: '5px', display: 'inline-block' }}>
                <div>{timeLeft.days} <span style={{ fontSize: '14px' }}><b>days</b></span></div>
                <div>{timeLeft.hours} <span style={{ fontSize: '14px' }}><b>hours</b></span></div>
                <div>{timeLeft.minutes} <span style={{ fontSize: '14px' }}><b>minutes</b></span></div>
                <div>{timeLeft.seconds} <span style={{ fontSize: '14px' }}><b>seconds</b></span></div>
            </h3>
        </div>


    );
};

const BrandMarquee = ({ brands }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <Marquee pauseOnHover={isHovered} speed={40}>
            {brands.map((brand) => (
                <div
                    key={brand.id}
                    className="brand-logo-container col-md-11 my-3"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className='image-container p-3'>
                        <img
                            src={brand.logo}
                            alt={brand.name}
                            width="100%"
                            className={isHovered ? 'zoom-in' : ''}
                        />
                    </div>
                </div>
            ))}
        </Marquee>

    );
};

function getIconByCategoryName(name) {
    switch (name) {
        case 'Dresses':
            return DressIcon;
        case 'Bags':
            return BagsIcon;
        case 'Sweatshirt':
            return SweatshirtIcon;
        case 'Boots':
            return BootsIcon;
        case 'Accessories':
            return AccessoriesIcon;
        case 'Sneakers':
            return SneakersIcon;
        case 'Outerwear':
            return OuterWearIcon;
        case 'Activewear':
            return ActiveWear;
        case 'Grooming':
            return GroomingIcon;
        case 'Cosmetics':
            return ComsmeticsIcon;
        case 'Watch':
            return WatchIcon;
        default:
            return null; // Return a default icon or handle accordingly
    }
}

function HomePage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('//amalan.us/shopping/admin/api');
            setData(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    const slidersData = data?.sliders || [];
    const homepage_categories = data?.homepage_categories || [];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        appendDots: (dots) => (

            <div style={{ position: 'absolute', bottom: '20px', left: '0%', transform: 'translateX(-50%,-50%)' }}>
                <ul style={{ margin: '0', padding: '0', listStyle: 'none', display: 'flex', alignItems: "center", justifyContent: "center" }}>{dots}</ul>
            </div>
        ),
        customPaging: (i) => {
            const isActive = i === currentSlide;
            return (
                <div>
                    {isActive ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="31" height="8" viewBox="0 0 31 8" fill="none">
                            <rect x="0.5" width="30" height="8" rx="4" fill="#FEFEFE" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="8" viewBox="0 0 9 8" fill="none">
                            <circle cx="4.5" cy="4" r="4" fill="#FEFEFE" />
                        </svg>
                    )}
                </div>
            );
        },
        beforeChange: (oldIndex, newIndex) => {
            setCurrentSlide(newIndex);
        },
    };

    return (
        <div>
            <div className='container'>
                <div className='row my-4'>
                    <div className='col-md-7'>
                        <Slider {...settings}>
                            {slidersData.map((slider) => (
                                <div key={slider.id} className="slider-item">
                                    <img src={`${slider.image}`} alt={`Slider ${slider.id}`} />
                                    <div className="text-overlay d-flex flex-column gap-4">
                                        <h3 >{slider.title_two}</h3>

                                        <h1>{slider.title_one}</h1>
                                        <a href={slider.link} target="_blank" rel="noopener noreferrer">
                                            <div>
                                                <button className='button-container btn' style={{
                                                    borderRadius: "62px",
                                                    background: "#000",
                                                    color: "#fff",
                                                    position: 'relative',
                                                    overflow: 'hidden',
                                                }}>
                                                    <div className='p-1 px-5 button-content'>Shop Now</div>
                                                </button>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>

                    <div className='col-md-5'>
                        <div className='row'>

                            <div className='col-md-12 mb-4 position-relative'>
                                <img src={`${data.banner_one.image}`} width="100%" alt={`Banner`} />
                                <div className="banner_one-text-overlay d-flex flex-column gap-3 justify-content-between">
                                    <h2>{data.banner_one.title_one}</h2>
                                    <h1>{data.banner_one.title_two}</h1>
                                </div>
                            </div>


                            <div className='col-md-12 mb-4 position-relative'>
                                <img src={`${data.banner_two.image}`} width="100%" alt={`Banner`} />
                                <div className="banner_two-text-overlay d-flex flex-column gap-4">
                                    <h2>{data.banner_two.title_one}</h2>
                                    <h1>{data.banner_two.title_two}</h1>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className='row my-4 mx-1 rounded' style={{ background: "#FFF9F3" }}>
                    <div className='col-md-4 d-flex align-items-center'>
                        <div className='d-flex gap-4 p-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="68" height="67" viewBox="0 0 68 67" fill="none">
                                <path d="M49.6333 14.8238L33.8604 6.33711C32.1854 5.44378 30.2033 5.44378 28.5283 6.33711L12.7833 14.8238C11.6387 15.4659 10.9129 16.6942 10.9129 18.0342C10.9129 19.4021 11.6108 20.6304 12.7833 21.2446L28.5562 29.7313C29.3937 30.1779 30.315 30.4013 31.2083 30.4013C32.1017 30.4013 33.0508 30.1779 33.8604 29.7313L49.6333 21.2446C50.7779 20.6304 51.5037 19.4021 51.5037 18.0342C51.5037 16.6942 50.7779 15.4659 49.6333 14.8238Z" fill="#EB6D20" />
                                <path d="M25.96 32.6905L11.3037 25.3763C10.1591 24.7901 8.87498 24.8738 7.78623 25.5159C6.7254 26.1859 6.08331 27.3305 6.08331 28.5867V42.4334C6.08331 44.8342 7.42331 46.9838 9.5729 48.0726L24.2291 55.3867C24.7316 55.638 25.29 55.7776 25.8483 55.7776C26.4904 55.7776 27.1604 55.5822 27.7466 55.2472C28.8075 54.5772 29.4496 53.4326 29.4496 52.1763V38.3297C29.4216 35.9288 28.0816 33.7792 25.96 32.6905Z" fill="#EB6D20" />
                                <path d="M56.3333 28.5867V35.4542C54.9933 35.0634 53.5696 34.8959 52.1458 34.8959C48.3492 34.8959 44.6362 36.208 41.705 38.553C37.685 41.7076 35.3958 46.4813 35.3958 51.6459C35.3958 53.0138 35.5633 54.3817 35.9262 55.6938C35.5075 55.638 35.0887 55.4705 34.6979 55.2192C33.6371 54.5772 32.995 53.4326 32.995 52.1763V38.3297C32.995 35.9288 34.335 33.7792 36.4567 32.6905L51.1129 25.3763C52.2575 24.7901 53.5417 24.8738 54.6304 25.5159C55.6912 26.1859 56.3333 27.3305 56.3333 28.5867Z" fill="#EB6D20" />
                                <path d="M61.8608 43.7454C59.5716 40.9258 56.0821 39.1392 52.1458 39.1392C49.1866 39.1392 46.4508 40.1721 44.3012 41.9029C41.3979 44.1921 39.5833 47.7375 39.5833 51.7017C39.5833 54.0467 40.2533 56.28 41.3979 58.1783C42.1516 59.4346 43.1008 60.5233 44.2175 61.4167H44.2454C46.395 63.2033 49.1587 64.2642 52.1458 64.2642C55.3283 64.2642 58.2037 63.0917 60.4091 61.1375C61.3862 60.3 62.2237 59.295 62.8937 58.1783C64.0383 56.28 64.7083 54.0467 64.7083 51.7017C64.7083 48.6867 63.6475 45.895 61.8608 43.7454ZM58.455 50.1383L51.755 56.3358C51.3641 56.6987 50.8337 56.8942 50.3312 56.8942C49.8008 56.8942 49.2704 56.6987 48.8516 56.28L45.7529 53.1812C44.9433 52.3717 44.9433 51.0317 45.7529 50.2221C46.5625 49.4125 47.9025 49.4125 48.7121 50.2221L50.3871 51.8971L55.6075 47.0675C56.445 46.2858 57.785 46.3417 58.5666 47.1792C59.3762 48.0446 59.3204 49.3567 58.455 50.1383Z" fill="#EB6D20" />
                            </svg>
                            <div>
                                <h3>Free delivery</h3>
                                <h6>on order above $50,00</h6>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4 d-flex align-items-center'>
                        <div className='d-flex gap-4 p-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="68" height="67" viewBox="0 0 68 67" fill="none">
                                <path d="M47.9584 61.4166H20.0417C18.8971 61.4166 17.9479 60.4675 17.9479 59.3229C17.9479 58.1783 18.8971 57.2291 20.0417 57.2291H47.9584C49.1029 57.2291 50.0521 58.1783 50.0521 59.3229C50.0521 60.4675 49.1029 61.4166 47.9584 61.4166Z" fill="#EB6D20" />
                                <path d="M57.3104 15.4099L46.1438 23.3941C44.6642 24.4549 42.5425 23.8129 41.9004 22.1099L36.6242 8.03995C35.7308 5.6112 32.2971 5.6112 31.4038 8.03995L26.0996 22.082C25.4575 23.8129 23.3638 24.4549 21.8842 23.3662L10.7175 15.382C8.48417 13.8187 5.525 16.0241 6.44625 18.6204L18.0596 51.1433C18.4504 52.2599 19.5113 52.9858 20.6838 52.9858H47.2883C48.4608 52.9858 49.5217 52.232 49.9125 51.1433L61.5258 18.6204C62.475 16.0241 59.5158 13.8187 57.3104 15.4099ZM40.9792 41.177H27.0208C25.8763 41.177 24.9271 40.2279 24.9271 39.0833C24.9271 37.9387 25.8763 36.9895 27.0208 36.9895H40.9792C42.1238 36.9895 43.0729 37.9387 43.0729 39.0833C43.0729 40.2279 42.1238 41.177 40.9792 41.177Z" fill="#EB6D20" />
                            </svg>
                            <div>
                                <h3>Best quality</h3>
                                <h6>best quality in low price</h6>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4 d-flex align-items-center'>
                        <div className='d-flex gap-4 p-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="68" height="67" viewBox="0 0 68 67" fill="none">
                                <path d="M52.2575 11.6412L36.9033 5.89037C35.3121 5.30412 32.7158 5.30412 31.1246 5.89037L15.7704 11.6412C12.8112 12.7579 10.4104 16.2195 10.4104 19.3741V41.9866C10.4104 44.2479 11.89 47.235 13.7046 48.575L29.0587 60.0487C31.7667 62.0866 36.2054 62.0866 38.9133 60.0487L54.2675 48.575C56.0821 47.207 57.5617 44.2479 57.5617 41.9866V19.3741C57.5896 16.2195 55.1888 12.7579 52.2575 11.6412ZM36.0938 35.9287V43.2708C36.0938 44.4154 35.1446 45.3645 34 45.3645C32.8554 45.3645 31.9062 44.4154 31.9062 43.2708V35.9287C29.0867 35.0354 27.0208 32.4112 27.0208 29.3125C27.0208 25.46 30.1475 22.3333 34 22.3333C37.8525 22.3333 40.9792 25.46 40.9792 29.3125C40.9792 32.4391 38.9133 35.0354 36.0938 35.9287Z" fill="#EB6D20" />
                            </svg>
                            <div>
                                <h3>1 year warranty</h3>
                                <h6>Avaliable warranty</h6>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="row mb-4 d-flex align-items-center">
                    {homepage_categories.map((category) => (
                        <div key={category.id} className="col-md-2 col-6 d-flex align-items-center justify-content-center">
                            <div className='mb-3'>
                                <div className="category-icon"></div>
                                <div className="category-image p-4 border rounded" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                                    <img src={getIconByCategoryName(category.name)} alt={category.name} />
                                </div>

                                <div className="category-name text-center"><b className=''>{category.name}</b></div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="row mb-4">
                    {data.popularCategoryVisibilty === true ? (
                        <>
                            <div className='col-md-12 d-flex justify-content-between'><h2>Popular Products</h2> <h5>View All <ArrowForward /></h5></div>
                            <div className='col-md-3' style={{ position: 'relative' }}>
                                <img className='py-3' src={data.popularCategorySidebarBanner} width="100%" style={{ borderRadius: '8px', height: "100%" }} alt="Popular Categories Banner" />

                                <div style={{ position: 'absolute', top: "2%", left: "2%", padding: '20px', display: "flex", flexDirection: "column", gap: "20px" }}>
                                    <h4 style={{ margin: 0 }}><b>Popular Categories</b></h4>
                                    {data.popularCategories.map((categories) => (
                                        <h5 key={categories.id} style={{ margin: 0 }}>{categories.category.name}</h5>
                                    ))}
                                </div>
                                <div style={{ position: 'absolute', bottom: "8%", right: "2%", padding: '20px' }}>
                                    <button className='button-container btn' style={{
                                        borderRadius: "62px",
                                        background: "#000",
                                        color: "#fff",
                                        position: 'relative',
                                        overflow: 'hidden',
                                    }}>
                                        <div className=' px-3 button-content'>Shop Now</div>
                                    </button>
                                </div>
                            </div>
                            <div className='col-md-9 d-flex justify-content-center align-items-center'>
                                <div className='row'>
                                    {(() => {
                                        const displayedCategories = {};
                                        return data.popularCategoryProducts.map((product) => {
                                            const categoryId = parseInt(product.category_id);
                                            if (!displayedCategories[categoryId]) {
                                                displayedCategories[categoryId] = true;
                                                const renderStars = (averageRating) => {
                                                    const starCount = Math.round(averageRating); // Round to the nearest whole number
                                                    const stars = Array.from({ length: 5 }, (_, index) => (
                                                        <svg key={index} xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill={index < starCount ? "#F9B741" : "#ddd"}>
                                                            <path d="M8.03834 1.10997C8.20914 0.699319 8.79086 0.699318 8.96166 1.10996L10.4987 4.80556C10.5707 4.97868 10.7336 5.09696 10.9204 5.11194L14.9102 5.4318C15.3535 5.46734 15.5332 6.02059 15.1955 6.30993L12.1557 8.91378C12.0133 9.03576 11.9512 9.22715 11.9947 9.40952L12.9234 13.3028C13.0265 13.7354 12.5559 14.0773 12.1764 13.8455L8.76063 11.7592C8.60062 11.6615 8.39938 11.6615 8.23937 11.7592L4.82363 13.8455C4.44408 14.0773 3.97345 13.7354 4.07665 13.3028L5.00534 9.40952C5.04884 9.22715 4.98665 9.03576 4.84426 8.91378L1.80453 6.30993C1.46676 6.02059 1.64652 5.46734 2.08985 5.4318L6.07955 5.11194C6.26645 5.09696 6.42925 4.97868 6.50126 4.80556L8.03834 1.10997Z" />
                                                        </svg>
                                                    ));
                                                    return stars;
                                                };
                                                return (
                                                    <div key={product.id} className='col-md-4 py-3'>
                                                        <div className='px-4' style={{ position: 'relative' }}>
                                                            <img src={product.thumb_image} alt={product.name} width="100%" />
                                                            <p style={{ position: 'absolute', top: '4%', left: '14%' }}><b style={{ background: '#f8f9fa', padding: '2px', borderRadius: '3px' }}>HOT</b></p>
                                                            <p style={{ position: 'absolute', top: '4%', right: '14%' }}><b style={{ background: '#f8f9fa', padding: '4px', borderRadius: '50px' }}><FavoriteBorderOutlined /></b></p>
                                                            <button className='button-container btn' style={{
                                                                borderRadius: "10px",
                                                                background: "#000",
                                                                color: "#fff",
                                                                position: 'relative',
                                                                overflow: 'hidden',
                                                                position: 'absolute',
                                                                bottom: '25%',
                                                                right: '23%',
                                                                transition: 'bottom 0.3s ease-in-out'
                                                            }}>
                                                                <div className=' px-3 button-content'>Add to Cart</div>
                                                            </button>
                                                            <div>
                                                                {renderStars(product.averageRating)}
                                                                <h5>{product.name}</h5>
                                                                <h6>${product.price}</h6>
                                                            </div>
                                                        </div>
                                                    </div>

                                                );
                                            }
                                            return null;
                                        });
                                    })()}
                                </div>
                            </div>

                        </>

                    ) : (<></>)
                    }

                </div>
                <div className='row mb-4'>
                    <div className='col-md-12 py-3'><h2>Search by Brand</h2></div>

                    <BrandMarquee brands={data.brands} />
                </div>
                <div className="row mb-4">
                    <div className='col-md-6 mb-2' style={{ position: 'relative' }}>
                        <img src={data.flashSale.homepage_image} width="100%"></img>
                        <h1 style={{ position: 'absolute', top: '5%', right: '10%' }}>{data.flashSale.title}</h1>
                        <h4 style={{ position: 'absolute', top: '15%', left: '38%', right: "10%" }} className='text-center'>{data.flashSale.description}</h4>
                        <CountdownTimer endData={data.flashSale.end_time} />
                        <h3 style={{ position: 'absolute', top: '75%', left: '72%', right: "10%", color: "white" }}>{data.flashSale.offer}%</h3>

                        <button className='button-container btn' style={{
                            borderRadius: "62px",
                            background: "#000",
                            color: "#fff",
                            position: "absolute",
                            top: '90%', left: '75%'
                        }}>
                            <div className=' button-content'>Shop Now</div>
                        </button>
                    </div>
                    <div className='col-md-6 mb-2' style={{ position: 'relative' }}>
                        <img src={data.flashSaleSidebarBanner.image} width="100%"></img>
                    </div>

                </div>
                <div className="row mb-4">
                    {data.topRatedVisibility === true && data.topRatedProducts.length > 0 && (
                        <>
                            <div className='col-md-12 d-flex justify-content-between'>
                                <h2>Top Rated Products</h2>
                                <h5>View All <ArrowForward /></h5>
                            </div>

                            <div className='col-md-7 border rounded'>
                                <div className='p-4'>
                                    <div className='row d-flex align-items-center'>
                                        <div className='col-md-6'>
                                            <img src={TopProductImage1} alt={data.topRatedProducts[0].name} width="100%" />
                                        </div>
                                        <div className='col-md-6'>
                                            <h4>{data.topRatedProducts[0].name}</h4>
                                            <h6>${data.topRatedProducts[0].price}</h6>
                                            {(() => {
                                                const renderStars = (averageRating) => {
                                                    const starCount = Math.round(averageRating); // Round to the nearest whole number
                                                    const stars = Array.from({ length: 5 }, (_, index) => (
                                                        <svg key={index} xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill={index < starCount ? "#F9B741" : "#ddd"}>
                                                            <path d="M8.03834 1.10997C8.20914 0.699319 8.79086 0.699318 8.96166 1.10996L10.4987 4.80556C10.5707 4.97868 10.7336 5.09696 10.9204 5.11194L14.9102 5.4318C15.3535 5.46734 15.5332 6.02059 15.1955 6.30993L12.1557 8.91378C12.0133 9.03576 11.9512 9.22715 11.9947 9.40952L12.9234 13.3028C13.0265 13.7354 12.5559 14.0773 12.1764 13.8455L8.76063 11.7592C8.60062 11.6615 8.39938 11.6615 8.23937 11.7592L4.82363 13.8455C4.44408 14.0773 3.97345 13.7354 4.07665 13.3028L5.00534 9.40952C5.04884 9.22715 4.98665 9.03576 4.84426 8.91378L1.80453 6.30993C1.46676 6.02059 1.64652 5.46734 2.08985 5.4318L6.07955 5.11194C6.26645 5.09696 6.42925 4.97868 6.50126 4.80556L8.03834 1.10997Z" />
                                                        </svg>
                                                    ));
                                                    return stars;
                                                };

                                                // Call the renderStars function
                                                return renderStars(data.topRatedProducts[0].averageRating);
                                            })()}
                                            {data.topRatedProducts[0]?.active_variants?.map((variantGroup) => (
                                                <div key={variantGroup.id}>
                                                    <h5>{variantGroup.name}</h5>
                                                    <div className='d-flex gap-4'>
                                                        {variantGroup.active_variant_items.map((variant) => (
                                                            <div key={variant.id}>
                                                                {variantGroup.name.toLowerCase() === 'color' ? (
                                                                    <div
                                                                        style={{
                                                                            width: '30px',
                                                                            height: '30px',
                                                                            borderRadius: '50%',
                                                                            backgroundColor: variant.name.toLowerCase(),
                                                                            display: 'inline-block',
                                                                            marginRight: '5px',
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    <h5 style={{ background: "#FFF9F3", color: "#EB6D20", padding: "10px", borderRadius: "20px" }}>{variant.name}</h5>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                            <div className='d-flex gap-4'>
                                                <button className='d-flex gap-2 my-2 justify-content-between btn px-3 py-2' style={{ background: "#EB6D20", color: "#FFFFFF" }}>
                                                    <b>Add to cart</b> <ShoppingCartOutlined />
                                                </button>
                                                <button className='d-flex gap-2 my-2 justify-content-between btn px-3 py-2' style={{ background: "#EB6D20", color: "#FFFFFF" }}>
                                                    <RemoveRedEye />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-5 '>

                                <div className='col-md-12 mb-2 border rounded'>
                                    <div className='row p-3'>
                                        <div className='col-md-8'>
                                            <img src={TopProductImage2} alt={data.topRatedProducts[1].name} width="100%" />
                                        </div>
                                        <div className='col-md-4 d-flex flex-column justify-content-center'>
                                            <h4>{data.topRatedProducts[1].name}</h4>
                                            <h5>${data.topRatedProducts[1].price}</h5>
                                            <div>
                                                {(() => {
                                                    const renderStars = (averageRating) => {
                                                        const starCount = Math.round(averageRating); // Round to the nearest whole number
                                                        const stars = Array.from({ length: 5 }, (_, index) => (
                                                            <svg key={index} xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill={index < starCount ? "#F9B741" : "#ddd"}>
                                                                <path d="M8.03834 1.10997C8.20914 0.699319 8.79086 0.699318 8.96166 1.10996L10.4987 4.80556C10.5707 4.97868 10.7336 5.09696 10.9204 5.11194L14.9102 5.4318C15.3535 5.46734 15.5332 6.02059 15.1955 6.30993L12.1557 8.91378C12.0133 9.03576 11.9512 9.22715 11.9947 9.40952L12.9234 13.3028C13.0265 13.7354 12.5559 14.0773 12.1764 13.8455L8.76063 11.7592C8.60062 11.6615 8.39938 11.6615 8.23937 11.7592L4.82363 13.8455C4.44408 14.0773 3.97345 13.7354 4.07665 13.3028L5.00534 9.40952C5.04884 9.22715 4.98665 9.03576 4.84426 8.91378L1.80453 6.30993C1.46676 6.02059 1.64652 5.46734 2.08985 5.4318L6.07955 5.11194C6.26645 5.09696 6.42925 4.97868 6.50126 4.80556L8.03834 1.10997Z" />
                                                            </svg>
                                                        ));
                                                        return stars;
                                                    };

                                                    // Call the renderStars function
                                                    return renderStars(data.topRatedProducts[1].averageRating);
                                                })()}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className='col-md-12  border rounded'>
                                    <div className='row p-3'>
                                        <div className='col-md-8'>
                                            <img src={TopProductImage3} alt={data.topRatedProducts[2].name} width="100%" />
                                        </div>
                                        <div className='col-md-4 d-flex flex-column justify-content-center'>
                                            <h4>{data.topRatedProducts[2].name}</h4>
                                            <h5>${data.topRatedProducts[2].price}</h5>
                                            <div>
                                                {(() => {
                                                    const renderStars = (averageRating) => {
                                                        const starCount = Math.round(averageRating); // Round to the nearest whole number
                                                        const stars = Array.from({ length: 5 }, (_, index) => (
                                                            <svg key={index} xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill={index < starCount ? "#F9B741" : "#ddd"}>
                                                                <path d="M8.03834 1.10997C8.20914 0.699319 8.79086 0.699318 8.96166 1.10996L10.4987 4.80556C10.5707 4.97868 10.7336 5.09696 10.9204 5.11194L14.9102 5.4318C15.3535 5.46734 15.5332 6.02059 15.1955 6.30993L12.1557 8.91378C12.0133 9.03576 11.9512 9.22715 11.9947 9.40952L12.9234 13.3028C13.0265 13.7354 12.5559 14.0773 12.1764 13.8455L8.76063 11.7592C8.60062 11.6615 8.39938 11.6615 8.23937 11.7592L4.82363 13.8455C4.44408 14.0773 3.97345 13.7354 4.07665 13.3028L5.00534 9.40952C5.04884 9.22715 4.98665 9.03576 4.84426 8.91378L1.80453 6.30993C1.46676 6.02059 1.64652 5.46734 2.08985 5.4318L6.07955 5.11194C6.26645 5.09696 6.42925 4.97868 6.50126 4.80556L8.03834 1.10997Z" />
                                                            </svg>
                                                        ));
                                                        return stars;
                                                    };

                                                    // Call the renderStars function
                                                    return renderStars(data.topRatedProducts[2].averageRating);
                                                })()}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </>
                    )}
                </div>
                <div className="row mb-4">
                    {data.sellerVisibility === true && (
                        <>
                            <div className='col-md-12 d-flex justify-content-between'>
                                <h2>Best Seller</h2>
                                <h5>View All <ArrowForward /></h5>
                            </div>

                            <div className='row'>
                                {data.sellers.slice(0, 6).map((seller) => (
                                    <div key={seller.id} className='col-md-2 col-6'>
                                        <img src={Seller1} alt={seller.shop_name} width="100%" />
                                        <h4 className='text-center'>{seller.shop_name}</h4>
                                    </div>
                                ))}
                            </div>

                        </>
                    )}
                </div>
                <div className="row mb-4">
                    <div className='col-md-8 mb-2' style={{ position: 'relative' }}>
                        <img src={banner_three} width="100%"></img>
                        <h1 style={{
                            color: "#F5F5F5",
                            fontFamily: "Poppins",
                            fontSize: "72px",
                            fontStyle: "normal",
                            fontWeight: "500",
                            lineHeight: "76px", /* 105.556% */
                            letterSpacing: "-2px", position: 'absolute', top: '25%', left: "35%", right: '0%'
                        }}>Simply Unique/
                            Simply Better.</h1>
                    </div>
                    <div className='col-md-4 mb-2 p-4' style={{ background: "#FFF9F3" }} >
                        <div className='d-flex flex-column gap-4'>
                            <h1 >{data.banner_four.title_one}</h1>
                            <h2 style={{ color: "#EB6D20" }}>{data.banner_four.title_two}</h2>
                            <div>
                                <button className='button-container btn' style={{
                                    borderRadius: "62px",
                                    background: "#000",
                                    color: "#fff",
                                }}>
                                    <div className=' button-content'>Shop Now</div>
                                </button>
                            </div>

                        </div>
                    </div>

                </div>
                <div className="row mb-4">
                    {data.featuredProductVisibility === true ? (
                        <>
                            <div className='col-md-12 d-flex justify-content-between'><h2>Featured Products</h2> <h5>View All <ArrowForward /></h5></div>
                            <div className='col-md-3' style={{ position: 'relative' }}>
                                <img className='py-3' src={data.featuredCategorySidebarBanner} width="100%" style={{ borderRadius: '8px' }} alt="Popular Categories Banner" />

                                <div style={{ position: 'absolute', top: "2%", left: "2%", padding: '20px', display: "flex", flexDirection: "column", gap: "20px" }}>
                                    <h4 style={{ margin: 0 }}><b>Featured Categories</b></h4>
                                    {data.featuredCategories.map((categories) => (
                                        <h5 key={categories.id} style={{ margin: 0 }}>{categories.category.name}</h5>
                                    ))}
                                </div>
                                <div style={{ position: 'absolute', bottom: "8%", right: "2%", padding: '20px' }}>
                                    <button className='button-container btn' style={{
                                        borderRadius: "62px",
                                        background: "#000",
                                        color: "#fff",
                                        position: 'relative',
                                        overflow: 'hidden',
                                    }}>
                                        <div className=' px-3 button-content'>Shop Now</div>
                                    </button>
                                </div>
                            </div>
                            <div className='col-md-9 d-flex justify-content-center align-items-center'>
                                <div className='row'>
                                    {data.featuredCategoryProducts.slice(0, 3).map((product) => {
                                        const categoryId = parseInt(product.category_id);
                                        const renderStars = (averageRating) => {
                                            const starCount = Math.round(averageRating); // Round to the nearest whole number
                                            const stars = Array.from({ length: 5 }, (_, index) => (
                                                <svg key={index} xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill={index < starCount ? "#F9B741" : "#ddd"}>
                                                    <path d="M8.03834 1.10997C8.20914 0.699319 8.79086 0.699318 8.96166 1.10996L10.4987 4.80556C10.5707 4.97868 10.7336 5.09696 10.9204 5.11194L14.9102 5.4318C15.3535 5.46734 15.5332 6.02059 15.1955 6.30993L12.1557 8.91378C12.0133 9.03576 11.9512 9.22715 11.9947 9.40952L12.9234 13.3028C13.0265 13.7354 12.5559 14.0773 12.1764 13.8455L8.76063 11.7592C8.60062 11.6615 8.39938 11.6615 8.23937 11.7592L4.82363 13.8455C4.44408 14.0773 3.97345 13.7354 4.07665 13.3028L5.00534 9.40952C5.04884 9.22715 4.98665 9.03576 4.84426 8.91378L1.80453 6.30993C1.46676 6.02059 1.64652 5.46734 2.08985 5.4318L6.07955 5.11194C6.26645 5.09696 6.42925 4.97868 6.50126 4.80556L8.03834 1.10997Z" />
                                                </svg>
                                            ));
                                            return stars;
                                        };

                                        return (
                                            <div key={product.id} className='col-md-4 py-3'>
                                                <div className='px-4' style={{ position: 'relative' }}>
                                                    <img src={product.thumb_image} alt={product.name} width="100%" />
                                                    <p style={{ position: 'absolute', top: '4%', left: '14%' }}><b style={{ background: '#f8f9fa', padding: '2px', borderRadius: '3px' }}>HOT</b></p>
                                                    <p style={{ position: 'absolute', top: '4%', right: '14%' }}><b style={{ background: '#f8f9fa', padding: '4px', borderRadius: '50px' }}><FavoriteBorderOutlined /></b></p>
                                                    <button className='button-container btn' style={{
                                                        borderRadius: "10px",
                                                        background: "#000",
                                                        color: "#fff",
                                                        position: 'relative',
                                                        overflow: 'hidden',
                                                        position: 'absolute',
                                                        bottom: '25%', /* Initial position set to bottom */
                                                        right: '23%',
                                                        transition: 'bottom 0.3s ease-in-out' /* Transition for smooth animation */
                                                    }}>
                                                        <div className=' px-3 button-content'>Add to Cart</div>
                                                    </button>
                                                    <div>
                                                        {renderStars(product.averageRating)}
                                                        <h6><b>{product.name}</b></h6>
                                                        <h6>${product.price}</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}


                                </div>
                            </div>

                        </>

                    ) : (<></>)
                    }

                </div>
                <div className='row my-4'>
                    <div className='col-md-12' style={{ position: 'relative' }}>
                        <img src={data.singleBannerOne.image} width="100%"></img>
                        <h1 style={{ position: 'absolute', top: '15%', left: '5%', color: "#EB6D20", right: '45%' }} className='text-center'>{data.singleBannerOne.title_one}</h1>
                        <h2 style={{ position: 'absolute', top: '45%', left: '5%', right: '45%' }} className='text-center'>{data.singleBannerOne.title_two}</h2>
                        <div style={{ position: 'absolute', top: "3%", right: "2%", padding: '20px' }}>
                            <button className='button-container btn' style={{
                                borderRadius: "62px",
                                background: "#000",
                                color: "#fff",
                                position: 'relative',
                                overflow: 'hidden',
                            }}>
                                <div className=' px-3 button-content'>Shop Now</div>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='row mb-4'>
                    {data.newArrivalProductVisibility === true ?
                        (<>
                            <div className='col-md-12 d-flex justify-content-between'>
                                <h2>New Arrivals</h2>
                                <h5>View All <ArrowForward /></h5>
                            </div>

                            {(() => {
                                const displayedCategories = {};
                                const firstFourProducts = data.newArrivalProducts.slice(0, 5);

                                return firstFourProducts.map((product) => {
                                    const categoryId = parseInt(product.category_id);
                                    if (!displayedCategories[categoryId]) {
                                        displayedCategories[categoryId] = true;

                                        const renderStars = (averageRating) => {
                                            const starCount = Math.round(averageRating); // Round to the nearest whole number
                                            const stars = Array.from({ length: 5 }, (_, index) => (
                                                <svg key={index} xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill={index < starCount ? "#F9B741" : "#ddd"}>
                                                    <path d="M8.03834 1.10997C8.20914 0.699319 8.79086 0.699318 8.96166 1.10996L10.4987 4.80556C10.5707 4.97868 10.7336 5.09696 10.9204 5.11194L14.9102 5.4318C15.3535 5.46734 15.5332 6.02059 15.1955 6.30993L12.1557 8.91378C12.0133 9.03576 11.9512 9.22715 11.9947 9.40952L12.9234 13.3028C13.0265 13.7354 12.5559 14.0773 12.1764 13.8455L8.76063 11.7592C8.60062 11.6615 8.39938 11.6615 8.23937 11.7592L4.82363 13.8455C4.44408 14.0773 3.97345 13.7354 4.07665 13.3028L5.00534 9.40952C5.04884 9.22715 4.98665 9.03576 4.84426 8.91378L1.80453 6.30993C1.46676 6.02059 1.64652 5.46734 2.08985 5.4318L6.07955 5.11194C6.26645 5.09696 6.42925 4.97868 6.50126 4.80556L8.03834 1.10997Z" />
                                                </svg>
                                            ));
                                            return stars;
                                        };

                                        return (
                                            <div key={product.id} className='col-md-3 p-3'>
                                                <div className='px-4' style={{ position: 'relative' }}>
                                                    <img src={product.thumb_image} alt={product.name} width="100%" />
                                                    <p style={{ position: 'absolute', top: '4%', left: '14%' }}><b style={{ background: '#f8f9fa', padding: '2px', borderRadius: '3px' }}>HOT</b></p>
                                                    <p style={{ position: 'absolute', top: '4%', right: '14%' }}><b style={{ background: '#f8f9fa', padding: '4px', borderRadius: '50px' }}><FavoriteBorderOutlined /></b></p>
                                                    <button className='button-container btn' style={{
                                                        borderRadius: "10px",
                                                        background: "#000",
                                                        color: "#fff",
                                                        position: 'relative',
                                                        overflow: 'hidden',
                                                        position: 'absolute',
                                                        bottom: '25%', /* Initial position set to bottom */
                                                        right: '23%',
                                                        transition: 'bottom 0.3s ease-in-out' /* Transition for smooth animation */
                                                    }}>
                                                        <div className=' px-3 button-content'>Add to Cart</div>
                                                    </button>
                                                    <div>
                                                        {renderStars(product.averageRating)}
                                                        <h6><b>{product.name}</b></h6>
                                                        <h6>${product.price}</h6>
                                                    </div>
                                                </div>
                                                {/* Add other product information as needed */}
                                            </div>
                                        );
                                    }
                                    return null;
                                });
                            })()}

                        </>) :
                        (<></>)}

                </div>
                {data.bestProductVisibility === true ?
                    (<>
                        <div className='row mb-4'>
                            <div className='col-md-12' style={{ position: 'relative' }}>
                                <img src={data.singleBannerTwo.image} width="100%"></img>
                                <h2 style={{ position: 'absolute', top: '28%', left: '35%', color: "#FFF" }} className='text-center'>{data.singleBannerOne.title_one}</h2>
                                <div style={{ position: 'absolute', top: "40%", right: "40%", padding: '20px' }}>
                                    <button className='button-container btn' style={{
                                        borderRadius: "62px",
                                        background: "#000",
                                        color: "#fff",
                                        position: 'relative',
                                        overflow: 'hidden',
                                    }}>
                                        <div className=' px-3 button-content'>Shop Now</div>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='row mb-4'>

                            <div className='col-md-12 d-flex justify-content-between'>
                                <h2>Best Products</h2>
                                <h5>View All <ArrowForward /></h5>
                            </div>
                        </div>
                        <div className='row mb-4 d-flex justify-content-between'>
                            {data.bestProducts.slice(0, 12).map((product) => (
                                <div className='col-md-4 col-6' key={product.id}>
                                    <div className='row bestProductBorder p-3 rounded' style={{ backgroundColor: "#FFF9F3", margin: "3px" }}>
                                        <div className='col-md-6'>
                                            <img src={TopProductImage2} width="100%" alt={product.name} />
                                        </div>
                                        <div className='col-md-6 d-flex flex-column'>
                                            <span style={{ fontSize: "16px" }}><b>{product.name}</b></span>
                                            <span style={{ fontSize: "14px", color: "#EB6D20" }}><b>${product.price}</b></span>
                                        </div>
                                    </div>
                                    {/* Add other product information as needed */}
                                </div>
                            ))}
                        </div>

                    </>) :
                    (<></>)}
                <div className='row mb-4'>
                    <div className='col-md-12 d-flex flex-column gap-3 rounded p-4' style={{ backgroundColor: "#FFF9F3" }}>
                        <h2 className='text-center'>{data.subscriptionBanner.header}</h2>
                        <h5 className='text-center' >{data.subscriptionBanner.title}</h5>
                        <div className='d-flex w-100 align-items-center justify-content-center '>
                            <div className='d-flex  p-2 px-4' style={{ background: "#EB6D20", borderRadius: "20px" }}>
                                <input className='bg-transparent' style={{ border: "none", color: "white" }} type='text' placeholder='Email'></input>
                                <b className='text-white p-2'><SendOutlined /></b>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>


    );
}

export default HomePage;
