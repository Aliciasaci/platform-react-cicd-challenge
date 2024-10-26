import * as React from "react";
import ImageViewer from "react-simple-image-viewer";
import { useTranslation } from "react-i18next";

export const GalleryDisplay = ({ images }) => {
    const [current, setCurrent] = React.useState(0);
    const [isViewerOpen, setIsViewerOpen] = React.useState(false);
    const [imageList, setImageList] = React.useState([]);
    const { t } = useTranslation();

    React.useEffect(() => {
        const fetchData = async () => {
            if (images === undefined) {
                const response = await fetch("https://picsum.photos/v2/list");
                const data = await response.json();
                const imageMapList = data.map((image) => image.download_url);
                setImageList(imageMapList);
            } else {
                setImageList(images);
            }
        };
        fetchData();
    }, []);

    const openLightbox = React.useCallback((index) => {
        setCurrent(index);
        setIsViewerOpen(true);
    }, []);

    const closeLightbox = React.useCallback(() => {
        setCurrent(0);
        setIsViewerOpen(false);
    }, []);

    const imageClass = React.useCallback((index) => {
        if (index === 0) {
            return "first-image";
        } else if (index < 4) {
            return "rounded-xl overflow-hidden";
        } else if (index === 4) {
            return "relative overflow-hidden rounded-xl";
        }
        return "hidden";
    }, []);

    return (
        <div className='my-10'>
            <div>
                <div className='h-[372px] grid grid-wrapper gap-3'>
                    {imageList.map((src, index) => (
                        <div className={imageClass(index)} key={index} onClick={() => openLightbox(index)}>
                            <img src={src} className='h-full w-full object-cover rounded-xl cursor-pointer' />
                            {index === 4 && (
                                <button className='style-none border-none text-center text-white text-sm bottom-0 h-full absolute w-full right-0 bg-[rgba(0,0,0,0.3)]'>
                                    {t("Provider_Page_See_More_Pictures", {
                                        imageList: imageList.length,
                                    })}
                                </button>
                            )}
                        </div>
                    ))}
                </div>
                {isViewerOpen && <ImageViewer src={imageList} currentIndex={current} onClose={closeLightbox} />}
            </div>
        </div>
    );
};
