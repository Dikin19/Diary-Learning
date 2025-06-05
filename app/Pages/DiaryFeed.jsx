import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiariy } from "../store/ProductSlice";
import Navbar from "../Components/Navbar/Navbar";
import { motion, useInView } from "framer-motion";
import CircularText from "../Components/Reactbits/CircularText/CircularText";
import DiaryCard from "../Components/DiaryFeed/DiaryCard";
import SplitText from "../Components/Reactbits/SplitText/SplitText";
import AnimatedContent from "../Components/Reactbits/AnimatedContent/AnimatedContent";


export default function DiaryFeed() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const dispatch = useDispatch();
    const diaries = useSelector((state) => state.product.items);
    const isLoading = useSelector((state) => state.product.isLoading);
    const error = useSelector((state) => state.product.error);

    useEffect(() => {
        dispatch(fetchDiariy());
    }, [dispatch]);

    const diaryItems = diaries?.content || [];

    const cardVariants = {
        initial: { y: 50, opacity: 0 },
        animate: { y: 0, opacity: 1 },
    };

    if (isLoading)
        return (
            <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-70 z-50">
                <CircularText
                    text="WAIT * FOR LOADING * CONNECTION * "
                    onHover="speedUp"
                    spinDuration={50}
                    className="absolute mt-4 ml-4"
                    color="#A78BFA"
                />
            </div>
        );

    if (error) return <p className="text-red-600 text-center mt-10">{error}</p>;

    return (
        <div
            ref={ref}
            className="min-h-screen overflow-x-hidden bg-[#FFF7ED] relative text-[#3E2C23] px-4 md:px-20"
        >


            <Navbar />

            <section className="py-12 pt-24">

                <div className="flex justify-center items-center mt-5 mb-10">
                    <SplitText
                        text="Welcome to Our Diaries Enjoy Your Time Here"
                        className="text-2xl text-black font-semibold text-start"
                        delay={50}
                        animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                        threshold={0.2}
                        rootMargin="-50px"
                    />
                </div>


                <AnimatedContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {diaryItems.length === 0 && (
                            <p className="col-span-full text-center text-[#3E2C23]">
                                No diaries found.
                            </p>
                        )}

                        {diaryItems.map((diary, index) => (
                            <motion.div
                                key={diary.id}
                                variants={cardVariants}
                                initial="initial"
                                animate={isInView ? "animate" : "initial"}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >

                                <DiaryCard
                                    id={diary.id}
                                    title={diary.meta.title}
                                    description={diary.meta.description}
                                    imgUrl={diary.meta.image}
                                    created_dt={diary.created_dt}
                                    meta={diary.meta}
                                />
                            </motion.div>
                        ))}
                    </div>
                </AnimatedContent>
            </section>
        </div>
    );
}
