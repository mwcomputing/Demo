function open_order(name, quantity, image, email, phone, price, product_name){
    var detail_container = document.getElementById("detail")
    var detail = '<div class="justify-content-center d-grid" style="height:45vh">'
    detail += '<h2 class="text-center">'+product_name.toUpperCase()+'</h2>'
    detail += '<img src="./media/images/'+image+'" class="d-block rounded-5" style="height:40vh"></div>'
    detail += '<div class="ps-5"><h5>Name: '+name+'</h5><h5>Email: '+email+'</h5><h5>Phone: '+phone+'</h5>'
    detail += '<h5>Quantity: '+quantity+'</h5><h5>Amount: N'+quantity*price+'</h5>'
    detail+= '</div>'
    detail_container.innerHTML = detail
}