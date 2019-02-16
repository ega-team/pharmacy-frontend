const intialState = {
  isLoading: false,
  isError: false,
  isChangePath: false,
  currentPath: null,
  title: {
    text: ""
  },
  email: {
    text: "",
    error: true
  },
  name: {
    text: ""
  },
  contents: {
    text: ""
  }
};

export default function uiReducer(state = intialState, action) {
  switch (action.type) {
    case "INPUT_NAME":
      return {
        ...state,
        name: {
          text: action.payload.value
        }
      };
    case "INPUT_TITLE":
      return {
        ...state,
        title: {
          text: action.payload.value
        }
      };
    case "INPUT_EMAIL":
      return {
        ...state,
        email: {
          text: action.payload.value,
          error: action.payload.error
        }
      };
    case "INPUT_CONTENTS":
      return {
        ...state,
        contents: {
          text: action.payload.value
        }
      };
    case "SUBMIT_FROM":
      return {
        ...state,
        isLoading: true
      };
    case "SUCCESS_SUBMIT_FORM":
      return {
        ...state,
        isLoading: false
      };
    case "CHANGE_LOCATION":
      return {
        ...state,
        isChangePath: action.payload.isChangePath
      };
    case "DONE_CHANGE_LOCATION":
      return {
        ...state,
        isChangePath: action.payload.isChangePath,
        currentPath: action.payload.currentPath
      };
    case "SET_CURRENT_PATH":
      return {
        ...state,
        currentPath: action.payload.currentPath
      };
    case "RESET_FORM":
      return {
        ...state,
        name: {
          text: ""
        },
        email: {
          text: "",
          error: false
        },
        title: {
          text: ""
        },
        contents: {
          text: ""
        }
      };
    case "FAIL_CHECK_SUBMIT_FORM_FORMAT":
      return {
        ...state,
        isError: action.payload.isError
      };
    case "SUCCESS_CHECK_SUBMIT_FORM_FORMAT":
      return {
        ...state,
        isError: action.payload.isError
      };
    default:
      return state;
  }
}
