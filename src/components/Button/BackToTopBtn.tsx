import { useEffect, useState } from 'react'

function BackTotopBtn() {
    const [isBackToTopVisible, setBackToTopVisible] = useState(false);
    useEffect(() => {
        function handleScroll() {
            if (window.scrollY > 100) {
                setBackToTopVisible(true);
            } else {
                setBackToTopVisible(false);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    return (
        <div>
            {isBackToTopVisible && (
                <button
                    id="backToTopBtn"
                    className="fixed drop-shadow-xl left-4 top-4 bg-pink-400 text-white p-2 rounded-lg z-10"
                    onClick={scrollToTop}
                >
                    Back to top
                </button>
            )}
        </div>
    )
}

export default BackTotopBtn