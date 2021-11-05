import axios from "axios";


export const fetchBookData = async () => {
      const response = await axios.get("http://localhost:4001/books").then((response) => {
        // console.log("****** ", response.data);
      });
      return response;

};

export const sendBookData = (book) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        "https://react-18851-default-rtdb.firebaseio.com/onlineportal-book.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: book.items,
            totalQuantity: book.totalQuantity,
            totalPrice: book.totalPrice,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Sending book data failed.");
      }
    };

    try {
      await sendRequest();
    } catch (error) {
    }
  };
};
