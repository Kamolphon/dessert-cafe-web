import { createContext, useContext, useState } from "react";
import { MenuItem } from "../../interface/interface";
import NoFoodImage from '../../../public/img/NoFood.jpg';
import BestSeller from '../../../public/icons/BestSeller.png';
import Close from "../../../public/icons/close.svg"

interface ModalContextProps {
    togglePopup: () => void;
    isPopupVisible: boolean;
    selectedMenu: MenuItem | null;
}

//create context ในfileที่ต้องการรับมา
export const ModalContext = createContext<ModalContextProps | undefined>(undefined);
export function useModal() {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalContextProvider');
    }
    return context;
}

function ModalMenu({ }) {
    const { togglePopup, isPopupVisible, selectedMenu } = useModal();
    const [selectedChoices, setSelectedChoices] = useState<Record<string, { choice: string, menu: string } | null>>({});
    const [showLargeImage, setShowLargeImage] = useState(false);

    const handleChoiceChange = (optionLabel: string, choiceData: { choice: string, menu: string }) => {
        setSelectedChoices((prevChoices) => ({
            ...prevChoices,
            [optionLabel]: choiceData,
        }));
    };

    return (
        <div>{isPopupVisible && (
            <div className="fixed text-zinc-700 inset-0 z-10 flex justify-center items-center bg-gray-100 bg-opacity-40 h-full modal">
                <div className="lg:w-2/6 md:w-3/6 w-5/6 bg-white rounded-3xl shadow-2xl modal-content">
                    <div>
                        <div className='text-right my-3 mr-4 flex justify-between items-center mx-5'>
                            <p className='xl:text-xl text-left font-semibold'>{selectedMenu?.name}</p>
                            <button className='text-right bg-pink-400 rounded-full hover:bg-gray-300 ml-2' onClick={togglePopup}>
                                <img src={Close} />
                            </button>
                        </div>
                        <div className='xl:h-80 h-44'>
                            {selectedMenu?.largeImage ? (
                                <div className='xl:h-80 h-44'>
                                    <img
                                        src={selectedMenu.largeImage}
                                        alt={selectedMenu.name}
                                        className='object-cover w-full h-full'
                                        onClick={() => setShowLargeImage(true)}
                                    />
                                    {showLargeImage && (
                                        <div className='fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-90 z-50'>
                                            <div>
                                                <img
                                                    src={selectedMenu.largeImage}
                                                    alt={selectedMenu.name}
                                                    className='object-contain max-h-[80vh] max-w-[80vw]'
                                                />
                                                <button
                                                    className='absolute top-4 right-4 bg-pink-400 rounded-full text-black hover:bg-gray-300'
                                                    onClick={() => setShowLargeImage(false)}
                                                >
                                                    <img src={Close} />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <img
                                    src={NoFoodImage}
                                    alt="No image"
                                    className='object-cover w-full h-full rounded-b-2xl'
                                />
                            )}
                        </div>
                        <div className='h-8 mx-3 text-lg flex justify-between items-center'>
                            <span className='text-base'>stock: {selectedMenu?.totalInStock}</span>
                            {selectedMenu?.discountedPercent === 0 ? (
                                <span className='fullprice xl:text-xl text-base'>{selectedMenu?.fullPrice}฿</span>
                            ) : (
                                <div className='flex items-center justify-end w-1/2'>
                                    <span className='fullprice-linethrough mr-2 ml-3'>{selectedMenu?.fullPrice}฿</span>
                                    {selectedMenu?.discountedPercent !== undefined ? (
                                        <div className='mt-3 flex sm:items-center sm:mt-0 md:mt-2 xl:mt-3 2xl:mt-0'>
                                            <p className='discount xl:text-xl text-base'>{((100 - selectedMenu?.discountedPercent) / 100) * selectedMenu?.fullPrice}฿</p>
                                            <p className='discount ml-2 text-xs xl:text-base break-words underline'>{selectedMenu?.discountedTimePeriod.begin} - {selectedMenu?.discountedTimePeriod.end} Only</p>
                                        </div>
                                    ) : (
                                        undefined
                                    )}
                                </div>
                            )}
                        </div>
                        <div className='overflow-y-auto xl:h-40 lg:h-32 sm:h-48 mx-6  2xl:h-60 h-48 mt-3'>
                            {
                                selectedMenu?.options.map((option, index) => (
                                    <div key={index} className='2xl:text-lg text-sm'>
                                        <label className='font-semibold'>{option.label}
                                            {option.choices?.map((choice, index) => (
                                                <div key={index} className='ml-7 mt-2 flex items-center'>
                                                    <input type='radio'
                                                        value={index}
                                                        key={index}
                                                        className='w-5 h-6'
                                                        checked={selectedChoices[option.label]?.choice === choice.label && selectedChoices[option.label]?.menu === selectedMenu.name}
                                                        onChange={() => handleChoiceChange(option.label, { choice: choice.label, menu: selectedMenu.name })}
                                                    />
                                                    <label className='ml-2 font-normal'>{choice.label}</label>
                                                </div>
                                            ))}
                                        </label>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='text-xs h-4 ml-2 xl:text-base mt-2 flex items-end justify-end mx-5 2xl:h-10 mb-3 '>
                            <img src={BestSeller} alt="Best Seller" className="md:w-10 w-6 sm:w-7" />
                            <p className='mr-3 ml-2 text-white bg-pink-400 rounded-full py-1 px-2'>sold: {selectedMenu?.sold}</p>
                        </div>
                    </div>
                </div>
            </div>
        )}</div>
    )
}

export default ModalMenu