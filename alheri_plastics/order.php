<?php

if ($_SERVER['REQUEST_METHOD'] == "POST"){

    // CONNECTS T THE DB
    $host = "localhost";
    $database = "alheri_plastics";
    $username = "root";
    $password = "";
    $conn = mysqli_connect($host, $username, $password, $database);
    
    // GET THE CUSTOMER DETAILS
    $name = $_POST['full_name'];
    $email = ($_POST['email'])? $_POST['email'] : NULL;
    $phone = $_POST['phone'];
    $quantity = intval($_POST['quantity']);
    $product_id = $_POST['product'];

    // RETRIEVES THE QUANTITY OF THE PRODUCT
    $sql2 = "SELECT quantity FROM products 
            WHERE id = $product_id";
    $result = mysqli_query($conn, $sql2);
    $row = mysqli_fetch_assoc($result);

    if ($quantity > $row['quantity'])
        exit("Only ".$row['quantity']." pieces remain");
    $new_quantity = $row['quantity'] - $quantity;

    // RECORDS THE ORDER
    $sql = "INSERT INTO order_table (client_name, email, phone, quantity, product)
            VALUE (?, ?, ?, ?, ?)";
    $stmnt = mysqli_stmt_init($conn);
    if (! mysqli_stmt_prepare($stmnt, $sql)){
        exit("an error ocurred");
    }
    mysqli_stmt_bind_param($stmnt, "sssii", 
                            $name,
                            $email,
                            $phone,
                            $quantity,
                            $product_id);
    mysqli_stmt_execute($stmnt);
    
    // UPDATES THE QUANTITY OF THE PRODUCT
    $sql3 = "UPDATE products
            SET quantity = ?
            WHERE id = ?";
    $stmnt2 = mysqli_stmt_init($conn);
    mysqli_stmt_prepare($stmnt2, $sql3);
    mysqli_stmt_bind_param($stmnt2, "ii",
                            $new_quantity,
                            $product_id);
    mysqli_stmt_execute($stmnt2);
    echo "Done";
}

?>