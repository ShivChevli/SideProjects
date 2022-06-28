function SuccessMsg(msg, title=""){
    swal({
        title: title,
        text: msg,
        icon: "success",
        button: "Aww yiss!",
      });
}

export default{
    "SucessMsg" : SuccessMsg,
}