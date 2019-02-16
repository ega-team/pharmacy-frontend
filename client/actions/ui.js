export const inputText = payload => (dispatch) => {
    dispatch(closeModal());
    const { name, value } = payload;
    switch (name) {
      case "name":
        return dispatch({
          type: "INPUT_NAME",
          payload: {
            name,
            value
          }
        });
      case "title":
        return dispatch({
          type: "INPUT_TITLE",
          payload: {
            name,
            value
          }
        });
      case "email":
        return dispatch({
          type: "INPUT_EMAIL",
          payload: {
            name,
            value,
            error: checkMailAddress(value)
          }
        });
      case "contents":
        return dispatch({
          type: "INPUT_CONTENTS",
          payload: {
            name,
            value
          }
        });
    }
  };