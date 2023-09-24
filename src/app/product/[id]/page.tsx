const ProductDetails = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      page - {params.id}
      <table className="w-full table-auto text-left text-sm text-gray-500">
        <thead className="bg-brand-orange text-xs font-bold uppercase text-white">
          <tr>
            <th scope="col" className="px-6 py-3">
              Song
            </th>
            <th scope="col" className="px-6 py-3">
              Artist
            </th>
            <th scope="col" className="px-6 py-3">
              Year
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b bg-white ">
            <td
              scope="row"
              className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 "
            >
              The Sliding Mr. Bones (Next Stop, Pottersville)
            </td>
            <td className="px-6 py-4">Malcolm Lockyer</td>
            <td className="px-6 py-4">1961</td>
          </tr>
          <tr className="border-b bg-white ">
            <td
              scope="row"
              className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 "
            >
              Witchy Woman
            </td>
            <td className="px-6 py-4">The Eagles</td>
            <td className="px-6 py-4">1972</td>
          </tr>
          <tr className="border-b bg-white ">
            <td
              scope="row"
              className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 "
            >
              Shining Star
            </td>
            <td className="px-6 py-4">Earth, Wind, and Fire</td>
            <td className="px-6 py-4">1975</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductDetails;
