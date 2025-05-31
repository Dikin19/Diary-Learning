

function App() {

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
              "https://as2.ftcdn.net/v2/jpg/00/77/91/73/1000_F_77917361_EaOTLo6USgDgyuVFcYVqGCkhZJiZFPvK.jpg"
            }
            alt={el.nama}
            className="h-40 object-cover"
          />
          <div>
            <p>{el.nama}</p>
            <p>{el.hoby}</p>
            <p>{el.age}</p>
          </div>
        </div>

      ))}
    </div>


  );

}

export default App
