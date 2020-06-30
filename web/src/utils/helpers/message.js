import messagesEN from '../../messages/en.json'
import get from "lodash/get";

const getText = (key) => {
    return get(messagesEN, [key], key);
}

function getErrorMessage(error) {
    console.log("action", error)
    return get(error, "response.data.message", getText("error.something_went_wrong"))
}

const getAlertMessage = ({ isSuccess, isError, error, data: slotData }) => {
    if (isSuccess) {
        return { title: getText("messages.slot_saved"), message: `${slotData.length} ${getText("messages.slot_created")}` };
    } else if (isError) {
        return { title: getText("messages.slot_save_failed"), message: error ? error : getText("error.something_went_wrong") };
    }
};


export { getText, getAlertMessage, getErrorMessage };