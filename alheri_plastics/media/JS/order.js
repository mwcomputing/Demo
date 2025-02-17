function order(name, price, image, quantity, product_id){
    var contentBox = document.getElementById("content")
    var content = '<div class="col-11 col-md-5 bg-light p-3">'
    content += '<h3 class="">' + name.toUpperCase() + '</h3>'
    content += '<img src="./media/images/' + image + '" style="height:200px;width:250px">'
    content += '<h4 class="pt-3">Price: N' + price + '</h4>'
    content += '<h4>Pieces Left: : ' + quantity + '</h4>'
    content += '</div>'
    content += '<div class="col-11 col-md-4">'
    content += '<form action="order.php" method="post" enctype="multipart/form-data">'
    content += '<label class="form-label">Full Name</label>'
    content += '<input type="text" class="form-control mb-3" name="full_name" />'
    content += '<label class="form-label">Email</label>'
    content += '<input type="email" class="form-control mb-3" name="email" />'
    content += '<label class="form-label">Pone Number</label>'
    content += '<input type="number" min="0" class="form-control mb-3" name="phone" />'
    content += '<label class="form-label">Quantity</label>'
    content += '<input type="number" min="0" class="form-control mb-3" name="quantity" />'
    content += '<input type="radio" class="d-none" checked name="product" value="' + product_id + '" />'
    content += '<button class="btn btn-dark mt-2 py-2 rounded-pill" style="width: 100%" > Submit </button>'
    content += '</form></div>'
    contentBox.innerHTML = content
}