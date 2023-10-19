const CartSide = () => {
  return (
    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Latest Customers
        </h5>
      </div>
      <div className="flow-root">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          <li className="py-3 sm:py-4">
            <div className="flex justify-between items-center space-x-4">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                SubTotal
              </p>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                $320
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex justify-between items-center space-x-4">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                Ship
              </p>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                $320
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex justify-between items-center space-x-4">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                Discount
              </p>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                $320
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex justify-between items-center space-x-4">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                Total Price
              </p>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                $320
              </div>
            </div>
          </li>
        </ul>
        <div className="text-center">
          <button className="text-center bg-gray-800 w-full py-2 rounded-md text-white">
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSide;
