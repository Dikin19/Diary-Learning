import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiaryById } from "../store/ProductSlice";
import { useParams } from "react-router";
import CircularText from "../Components/Reactbits/CircularText/CircularText";

export default function DiaryContent() {

    const params = useParams();
    const dispatch = useDispatch();
    const diaries = useSelector((state) => state.product.detail)
    const error = useSelector((state) => state.product.error)
    const isLoading = useSelector((state) => state.product.isLoading)

    useEffect(() => {
        dispatch(getDiaryById(params.id))
    }, [dispatch], params.id);

    // console.log(diaries, 'diaryById')
    const arrDiary = diaries.content
    const diary = arrDiary[0]
    // console.log(diary, 'newData')

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
        <div className="container mx-auto p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">


        </div>


    );

}

