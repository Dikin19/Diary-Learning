import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiariy } from "../store/ProductSlice";
import Navbar from "../Components/Navbar/Navbar";

export default function DiaryFeed() {

    const dispatch = useDispatch();
    const diaries = useSelector((state) => state.product.items);
    // console.log(items, 'diary feed dapat?')
    const isLoading = useSelector((state) => state.product.isLoading);
    const error = useSelector((state) => state.product.error);

    useEffect(() => {
        dispatch(fetchDiariy());
    }, [dispatch]);

    const diaryItems = diaries.content || []


    if (isLoading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>

    return (
        <div>
            <Navbar />
            <h1>isi dari diary menggunakan redux</h1>
            {diaryItems.map((diary) => (
                <di>
                    <h2>{diary.id}</h2>
                    <p>{diary.content}</p>
                </di>
            ))}
        </div>
    );

}