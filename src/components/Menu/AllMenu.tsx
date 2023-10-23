import { useState, useEffect } from "react";
import { fetchRestaurantData } from "../../composable/getRestaurant";
import { MenuItem, Restaurant} from "../../interface/interface";
import BackTotopBtn from "../Button/BackToTopBtn";
import Navbar from '../../components/Navbar/Navbar'
import ModalMenu, { ModalContext } from "./ModalMenu";
import CategoriesBtn from "../Button/CategoriesBtn";
import NoFoodImage from '../../../public/img/NoFood.jpg';
import BestSeller from '../../../public/icons/BestSeller.png'
import Loading from "../Views/Loading";
import CallStaffBtn from "../Button/CallStaffBtn";
type CategorizedMenu = {
    [category: string]: MenuItem[];
};

function AllMenu() {
    const [allmenu, setAllMenu] = useState<MenuItem[] | null>(null);
    const [isPopupVisible, setPopupVisible] = useState<boolean>(false);
    const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);
    const [menuByCategory, setMenuByCategory] = useState<CategorizedMenu | null>(null);

    useEffect(() => {
        if (!allmenu) {
            fetchRestaurantData()
                .then((data) => {
                    data.forEach((element: Restaurant) => {
                        setAllMenu(element.menus)
                    })
                    const categorizedMenu: CategorizedMenu = data.reduce(
                        (acc: CategorizedMenu, restaurant: Restaurant) => {
                            restaurant.menus.forEach((menu) => {
                                const { categories } = menu;
                                if (!acc[categories]) {
                                    acc[categories] = [];
                                }
                                acc[categories].push(menu);
                            });
                            return acc;
                        },
                        {}
                    );
                    setMenuByCategory(categorizedMenu);
                })
                .catch((error) => console.log("Error", error));
        }
    }, [allmenu]);

    const togglePopup = () => {
        setPopupVisible(!isPopupVisible);
    };

    const findSelectedMenu = (menuName: string) => {
        if (allmenu !== null) {
            togglePopup();
            const selectedMenu = allmenu.find(menu => menu.name === menuName);
            if (selectedMenu !== null && selectedMenu !== undefined) {
                setSelectedMenu(selectedMenu);
            }
        }
    }


    function findTopSellingMenus(sold: number) {
        if (allmenu !== null) {
            const uniqueSoldCounts = Array.from(new Set(allmenu.map(menu => menu.sold)));
            if (uniqueSoldCounts.length === 1) {
                return false;
            } else if (uniqueSoldCounts.length !== 1 && uniqueSoldCounts.length !== 0) {
                const sortedMenuList = allmenu.sort((a, b) => b.sold - a.sold);
                const topSellingMenus = [sortedMenuList[0]];
                const isTopSellingMenu = topSellingMenus.some((menu) => menu.sold === sold)
                return isTopSellingMenu;
            }
        }
    }

    if (allmenu === null) {
        return (
            <div>
                <Loading />
            </div>
        )
    }

    return (
        <div>
            <Navbar />
            <BackTotopBtn />
            <div className="relative callBtn">
                    <div className="fixed right-4 bottom-4">
                        <CallStaffBtn />
                    </div>
            </div>
            <div className='flex flex-wrap items-center 2xl:mx-48'>
                <CategoriesBtn />
                {menuByCategory !== null &&
                    Object.keys(menuByCategory).map((category, index) => (
                        <div key={index} id={category} className="w-full">
                            <h2 className="category-text text-xl mx-12 flex justify-center px-3 py-2 drop-shadow-xl rounded-2xl mb-4 mt-9 md:mb-7 md:mt-14 md:text-3xl">{category}</h2>
                            <div className="flex items-center justify-center flex-wrap">
                                {menuByCategory[category].map((menu, index) => (
                                    <button key={index} className='text-left'
                                        onClick={() => findSelectedMenu(menu.name)}
                                    >
                                        <div className='menucard flex flex-row w-80 drop-shadow-xl m-5 md:w-60 md:h-80 md:flex-col'>
                                            <div className='h-28 w-52 flex items-center justify-center md:w-full md:h-40'>
                                                {menu.largeImage ? (
                                                    <img loading="lazy" src={menu.largeImage} alt={menu.name} className='image-allmenu md:rounded-t-2xl md:rounded-b-none' />
                                                ) : (
                                                    <img loading="lazy" src={NoFoodImage} alt="No image" className='image-allmenu md:rounded-t-2xl md:rounded-b-none' />
                                                )}
                                            </div>
                                            <div className='mt-2 pl-3 w-56'>
                                                <div className='h-12 overflow-hidden text-ellipsis'>
                                                    <p className='mb-2 line-clamp-2'>{menu.name}</p>
                                                </div>
                                                <div className='h-10'>
                                                    {menu.discountedPercent === 0 ? (
                                                        <p className='fullprice text-xl'>{menu.fullPrice}฿</p>
                                                    ) : (
                                                        <div className=''>
                                                            <span className='fullprice-linethrough mr-3'>{menu.fullPrice}฿</span>
                                                            <span className='discount text-xl'>{((100 - menu.discountedPercent) / 100) * menu.fullPrice}฿</span>
                                                            <p className='discount md:text-base mt-2 text-xs'>{menu.discountedTimePeriod.begin}-{menu.discountedTimePeriod.end} Only</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className='flex items-center flex-row justify-end h-12 w-28 mt-auto md:w-full'>
                                                <p className='text-right pr-4 text-xs mt-4'>
                                                    {findTopSellingMenus(menu.sold) ? (
                                                        <>
                                                            <img src={BestSeller} className='w-10 ml-2 mb-4 md:mb-6' alt="Best Seller" />
                                                        </>
                                                    ) : null}</p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                <ModalContext.Provider value={{ togglePopup, isPopupVisible, selectedMenu }}>
                    <ModalMenu />
                </ModalContext.Provider>
            </div>
        </div>
    );
}

export default AllMenu;
