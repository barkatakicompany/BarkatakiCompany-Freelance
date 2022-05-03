exports.numberOnly=(element)=>{
    var regex = /[^0-9]/gi;
    element.target.value = element.target.value.replace(regex, "");
}