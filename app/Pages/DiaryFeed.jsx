import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiariy } from "../store/ProductSlice";
import Navbar from "../Components/Navbar/Navbar";
import { motion, useInView } from "framer-motion";
import CircularText from "../Components/Reactbits/CircularText/CircularText";
import DiaryCard from "../Components/DiaryFeed/DiaryCard";
import RotatingText from "../Components/Reactbits/RotatingText/RotatingText";
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

            <AnimatedContent>
                <Navbar />
            </AnimatedContent>

            <section className="py-12 pt-24">

                <div className="flex justify-center items-center mt-5 mb-10">
                    <RotatingText
                        texts={['Welcome', 'to Our Diary', 'Enjoy Your Time Here']}
                        mainClassName="bg-[#FFF7ED] text-[#3E2C23] text-2xl md:text-3xl font-semibold px-4 py-2 rounded-lg shadow-md"
                        staggerFrom="last"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-120%" }}
                        staggerDuration={0.025}
                        splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                        transition={{ type: "spring", damping: 30, stiffness: 400 }}
                        rotationInterval={2000}
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
                                />
                            </motion.div>
                        ))}
                    </div>
                </AnimatedContent>
            </section>
        </div>
    );
}
