function DiaryFeed() {

    let data = [
        {
            nama: "dikin",
            age: 2,
            hoby: "sepak bola"
        },
        {
            nama: "sodikin",
            age: 2,
            hoby: "sepak bola"
        },
        {
            nama: "Muhamad",
            age: 2,
            hoby: "sepak bola"
        },
    ]

    return (
        <div className="container mx-auto p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {data.map((el, index) => (
                <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300"
                >
                    <img
                        src={
                            el.gambar ||
                            "https://tse3.mm.bing.net/th?id=OIP.PxfOD7S4SeE1uWR-GBMKjwHaE8&pid=Api&P=0&h=180"
                        }
                        alt={el.nama}
                        className="h-40 object-cover"
                    />
                    <div className="p-3 flex flex-col justify-between h-[120px]">
                        <h2 className="text-sm font-medium text-gray-800 line-clamp-2">{el.nama}</h2>
                        <p className="text-orange-500 font-semibold mt-1 text-base">
                            {el.harga ? `Rp ${el.harga.toLocaleString()}` : 'Rp 0'}
                        </p>
                        <button className="mt-2 bg-orange-500 hover:bg-orange-600 text-white text-sm py-1 rounded">
                            Beli Sekarang
                        </button>
                    </div>
                </div>
            ))}
        </div>


    );

}

export default DiaryFeed
