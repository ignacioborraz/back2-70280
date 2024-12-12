export default function ProductCard({ product }) {
  return (
    <article className="bg-white shadow-lg rounded-lg p-4 m-2 flex flex-col justify-center items-center hover:shadow-xl transition-shadow">
      <h2 className="text-lg font-bold text-gray-800 mb-2">{product.title}</h2>
      <p className="text-gray-600">
        <span className="text-green-500 font-semibold">
          USD {product.price}
        </span>
      </p>
      <p
        className={`text-sm font-medium ${
          product.stock > 0 ? "text-gray-500" : "text-red-500"
        }`}
      >
        {product.stock > 0 ? `Stock: ${product.stock}` : "Out of stock"}
      </p>
    </article>
  );
}
