/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayPalButtons } from "@paypal/react-paypal-js";
import { createOrder } from "../../../../api";
import { useNavigate } from "react-router-dom";
type Props = {
  amount: any;
  handlePaypal: any;
};

const PaypalButton = (props: Props) => {
  // const { amount, handlePaypal } = props;
  const naviagte = useNavigate();

  const handlePaymentSuccess = async () => {
    try {
      const storedData = localStorage.getItem("paypalData");
      if (!storedData) {
        throw new Error(
          "Dữ liệu Paypal không được tìm thấy trong local storage."
        );
      }

      const data = JSON.parse(storedData);
      const response = await createOrder(data);

      if (response.status === 201) {
        naviagte("/history");
      } else {
        return "Đặt hàng thất bại";
      }
    } catch (error) {
      console.error("Lỗi trong handlePaymentSuccess:", error);
      return "Đặt hàng thất bại";
    }
  };
  return (
    <div className="mt-4">
      <PayPalButtons
        style={{
          color: "silver",
          layout: "horizontal",
        }}
        createOrder={(_data, actions) => {
          {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: String(`${Math.round(props.amount / 23000)}`),
                  },
                  description: `purchase at ${new Date().toDateString()}`,
                },
              ],
            });
          }
        }}
        onApprove={(_, action): any => {
          return action.order?.capture().then(() => handlePaymentSuccess());
        }}
      />
    </div>
  );
};

export default PaypalButton;
